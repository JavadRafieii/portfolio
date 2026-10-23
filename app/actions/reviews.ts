"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type ReviewSaveState = {
  status: "idle" | "success" | "error";
  message: string;
};

function getRequiredText(formData: FormData, field: string, maxLength: number) {
  const entries = formData.getAll(field);
  const value = entries[0];

  if (
    entries.length !== 1 ||
    typeof value !== "string" ||
    !value.trim() ||
    value.trim().length > maxLength
  ) {
    return null;
  }

  return value.trim();
}

export async function savePortfolioReview(
  _previousState: ReviewSaveState,
  formData: FormData,
): Promise<ReviewSaveState> {
  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: "error",
      message: "برای ثبت نظر، با حساب کاربری دارای ایمیل وارد شوید.",
    };
  }

  const name = getRequiredText(formData, "name", 100);
  const opinion = getRequiredText(formData, "opinion", 5000);

  if (!name || !opinion) {
    return {
      status: "error",
      message: "نام و نظر را تکمیل کنید؛ نام حداکثر ۱۰۰ و نظر حداکثر ۵۰۰۰ نویسه باشد.",
    };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
    return {
      status: "error",
      message: "متغیرهای اتصال امن Supabase در تنظیمات سرور تعریف نشده‌اند.",
    };
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("portfolio_reviews").upsert(
    {
      email,
      name,
      opinion,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email" },
  );

  if (error) {
    console.error("Failed to save portfolio review to Supabase:", {
      code: error.code,
      message: error.message,
    });

    return {
      status: "error",
      message: "ثبت نظر در پایگاه داده انجام نشد؛ تنظیمات جدول را بررسی کنید.",
    };
  }

  revalidatePath("/dashboard");

  return {
    status: "success",
    message: "نظر شما با موفقیت ثبت شد.",
  };
}