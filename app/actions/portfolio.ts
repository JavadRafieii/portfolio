"use server";

import { revalidatePath } from "next/cache";
import { isPortfolioAdmin } from "@/lib/portfolio/access";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type {
  PortfolioStatus,
  PortfolioSkill,
} from "@/lib/portfolio/types";

export type PortfolioSaveState = {
  status: "idle" | "success" | "error";
  message: string;
};

const portfolioStatuses: readonly PortfolioStatus[] = [
  "available",
  "busy",
  "unavailable",
];

const skillLevels: readonly PortfolioSkill["level"][] = [
  "beginner",
  "intermediate",
  "advanced",
];

function isOneOf<Value extends string>(
  value: string,
  options: readonly Value[],
): value is Value {
  return options.some((option) => option === value);
}

function getRequiredText(formData: FormData, name: string) {
  const entries = formData.getAll(name);
  const value = entries[0];

  if (entries.length !== 1 || typeof value !== "string" || !value.trim()) {
    return null;
  }

  return value.trim();
}

function getRows(
  formData: FormData,
  collection: string,
  fields: readonly string[],
) {
  const rows: string[][] = [];
  const expectedNames = new Set<string>();
  let foundGap = false;

  for (let index = 0; index < 10; index += 1) {
    const names = fields.map((field) => `${collection}[${index}].${field}`);
    const entriesByField = names.map((name) => formData.getAll(name));
    const isMissingRow = entriesByField.every((entries) => entries.length === 0);

    if (isMissingRow) {
      foundGap = true;
      continue;
    }

    if (foundGap) {
      return null;
    }

    const row: string[] = [];
    for (const [fieldIndex, entries] of entriesByField.entries()) {
      const value = entries[0];
      if (entries.length !== 1 || typeof value !== "string" || !value.trim()) {
        return null;
      }

      expectedNames.add(names[fieldIndex]);
      row.push(value.trim());
    }
    rows.push(row);
  }

  const hasUnexpectedField = [...formData.keys()].some(
    (name) => name.startsWith(`${collection}[`) && !expectedNames.has(name),
  );

  return rows.length > 0 && !hasUnexpectedField ? rows : null;
}

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

export async function savePortfolio(
  _previousState: PortfolioSaveState,
  formData: FormData,
): Promise<PortfolioSaveState> {
  const adminEmail = process.env.PORTFOLIO_ADMIN_EMAIL?.trim().toLowerCase();
  if (!adminEmail) {
    return {
      status: "error",
      message: "تنظیم PORTFOLIO_ADMIN_EMAIL در فایل محیطی سرور الزامی است.",
    };
  }

  if (!(await isPortfolioAdmin())) {
    return {
      status: "error",
      message: "برای ذخیره اطلاعات، با حساب مجاز وارد شوید.",
    };
  }

  const subTitle = getRequiredText(formData, "subTitle");
  const title = getRequiredText(formData, "title");
  const description = getRequiredText(formData, "description");
  const aboutTitle = getRequiredText(formData, "aboutTitle");
  const aboutDescription = getRequiredText(formData, "aboutDescription");
  const email = getRequiredText(formData, "email");
  const phone = getRequiredText(formData, "phone");
  const rawStatus = getRequiredText(formData, "status");
  const location = getRequiredText(formData, "location");
  const rawYears = getRequiredText(formData, "yearsOfExperience");

  if (
    !subTitle ||
    !title ||
    !description ||
    !aboutTitle ||
    !aboutDescription ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !phone ||
    !rawStatus ||
    !isOneOf(rawStatus, portfolioStatuses) ||
    !location ||
    !rawYears ||
    !/^\d+$/.test(rawYears)
  ) {
    return {
      status: "error",
      message: "لطفاً همه فیلدهای فرم را با مقادیر معتبر تکمیل کنید.",
    };
  }

  const yearsOfExperience = Number(rawYears);
  const workRows = getRows(formData, "workItems", ["title", "description"]);
  const experienceRows = getRows(formData, "experiences", [
    "startDate",
    "endDate",
    "company",
    "jobTitle",
    "location",
    "description",
  ]);
  const skillRows = getRows(formData, "skills", ["name", "level"]);

  if (
    !Number.isSafeInteger(yearsOfExperience) ||
    !workRows ||
    !experienceRows ||
    !skillRows
  ) {
    return {
      status: "error",
      message: "فهرست کارها، تجربیات یا مهارت‌ها کامل و معتبر نیست.",
    };
  }

  const experiences = experienceRows.map(
    ([startDate, endDate, company, jobTitle, experienceLocation, details]) => ({
      startDate,
      endDate,
      company,
      jobTitle,
      location: experienceLocation,
      description: details,
    }),
  );
  if (
    experiences.some(
      ({ startDate, endDate }) =>
        !isValidDate(startDate) ||
        !isValidDate(endDate) ||
        startDate > endDate,
    )
  ) {
    return {
      status: "error",
      message: "تاریخ شروع و پایان تجربیات را بررسی کنید.",
    };
  }

  const skills = [];
  for (const [name, level] of skillRows) {
    if (!isOneOf(level, skillLevels)) {
      return {
        status: "error",
        message: "سطح یکی از مهارت‌ها معتبر نیست.",
      };
    }
    skills.push({ name, level });
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
    return {
      status: "error",
      message: "متغیرهای اتصال امن Supabase در تنظیمات سرور تعریف نشده‌اند.",
    };
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("portfolio_profiles").upsert(
    {
      id: 1,
      welcome_message: subTitle,
      title,
      description,
      about_title: aboutTitle,
      about_description: aboutDescription,
      email,
      phone,
      status: rawStatus,
      location,
      years_of_experience: yearsOfExperience,
      work_items: workRows.map(([itemTitle, details]) => ({
        title: itemTitle,
        description: details,
      })),
      experiences,
      skills,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    console.error("Failed to save portfolio data to Supabase:", {
      code: error.code,
      message: error.message,
    });
    return {
      status: "error",
      message: "ذخیره‌سازی در Supabase انجام نشد؛ تنظیمات جدول را بررسی کنید.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/");

  return {
    status: "success",
    message: "اطلاعات فرم با موفقیت در Supabase ذخیره شد.",
  };
}
