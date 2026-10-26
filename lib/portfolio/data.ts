import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type {
  PortfolioExperience,
  PortfolioProfileValues,
  PortfolioProject,
  PortfolioSkill,
  PortfolioStatus,
  PortfolioWorkItem,
} from "@/lib/portfolio/types";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isWorkItem(value: unknown): value is PortfolioWorkItem {
  return (
    isObject(value) &&
    typeof value.title === "string" &&
    typeof value.description === "string"
  );
}

function isExperience(value: unknown): value is PortfolioExperience {
  return (
    isObject(value) &&
    typeof value.startDate === "string" &&
    typeof value.endDate === "string" &&
    typeof value.company === "string" &&
    typeof value.jobTitle === "string" &&
    typeof value.location === "string" &&
    typeof value.description === "string"
  );
}

function isProject(value: unknown): value is PortfolioProject {
  return (
    isObject(value) &&
    typeof value.title === "string" &&
    typeof value.category === "string" &&
    typeof value.description === "string" &&
    Array.isArray(value.technologies) &&
    value.technologies.every(
      (technology): technology is string => typeof technology === "string",
    ) &&
    typeof value.href === "string"
  );
}

function isSkill(value: unknown): value is PortfolioSkill {
  return (
    isObject(value) &&
    typeof value.name === "string" &&
    (value.level === "beginner" ||
      value.level === "intermediate" ||
      value.level === "advanced")
  );
}

function isPortfolioStatus(value: string): value is PortfolioStatus {
  return (
    value === "available" || value === "busy" || value === "unavailable"
  );
}

function parseArray<Value>(
  value: unknown,
  isValue: (item: unknown) => item is Value,
  columnName: string,
): Value[] {
  if (!Array.isArray(value) || !value.every(isValue)) {
    throw new Error(`Invalid ${columnName} data in portfolio_profiles.`);
  }

  return value;
}

export async function getPortfolioProfile(): Promise<PortfolioProfileValues | null> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("portfolio_profiles")
    .select(
      "welcome_message, title, description, about_title, about_description, email, phone, status, location, years_of_experience, work_items, projects, experiences, skills",
    )
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load portfolio profile: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  if (!isPortfolioStatus(data.status)) {
    throw new Error("Invalid status data in portfolio_profiles.");
  }

  return {
    subTitle: data.welcome_message,
    title: data.title,
    description: data.description,
    aboutTitle: data.about_title,
    aboutDescription: data.about_description,
    email: data.email,
    phone: data.phone,
    status: data.status,
    location: data.location,
    yearsOfExperience: data.years_of_experience,
    workItems: parseArray(data.work_items, isWorkItem, "work_items"),
    projects: parseArray(data.projects, isProject, "projects"),
    experiences: parseArray(data.experiences, isExperience, "experiences"),
    skills: parseArray(data.skills, isSkill, "skills"),
  };
}
