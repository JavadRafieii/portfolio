"use client";

import { useActionState } from "react";

import {
  savePortfolio,
  type PortfolioSaveState,
} from "@/app/actions/portfolio";

import type { PortfolioProfileValues } from "@/lib/portfolio/types";
import ExperiencesSection from "@/components/portfolio/experiences-section";
import SkillsSection from "@/components/portfolio/skills-section";
import WorkItemsSection from "@/components/portfolio/work-items-section";

const initialState: PortfolioSaveState = {
  status: "idle",
  message: "",
};

export default function PortfolioForm({
  profile,
}: {
  profile: PortfolioProfileValues | null;
}) {
  const [state, formAction, isPending] = useActionState(
    savePortfolio,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="sub-title" className="text-sm font-medium">
          پیام خوش آمدگویی:
        </label>
        <input
          id="sub-title"
          name="subTitle"
          type="text"
          defaultValue={profile?.subTitle ?? ""}
          required
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-medium">
          عنوان اصلی:
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={profile?.title ?? ""}
          required
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm font-medium">
          معرفی کوتاه:
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={profile?.description ?? ""}
          required
          rows={5}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="about-title" className="text-sm font-medium">
          درباره من (عنوان):
        </label>
        <input
          id="about-title"
          name="aboutTitle"
          defaultValue={profile?.aboutTitle ?? ""}
          required
          type="text"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="about-description" className="text-sm font-medium">
          درباره من (توضیحات):
        </label>
        <textarea
          id="about-description"
          name="aboutDescription"
          defaultValue={profile?.aboutDescription ?? ""}
          required
          rows={5}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <div className="flex items-center gap-5">
        <div className="flex flex-col gap-2 w-1/2">
          <label htmlFor="email" className="text-sm font-medium">
            ایمیل:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={profile?.email ?? ""}
            required
            autoComplete="email"
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <label htmlFor="phone" className="text-sm font-medium">
            شماره تماس:
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={profile?.phone ?? ""}
            required
            autoComplete="tel"
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex flex-col gap-2 w-1/2">
          <label htmlFor="status" className="text-sm font-medium">
            وضعیت همکاری:
          </label>
          <select
            id="status"
            name="status"
            required
            defaultValue={profile?.status ?? ""}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="" disabled>
              انتخاب وضعیت
            </option>
            <option value="available">آماده همکاری</option>
            <option value="busy">مشغول همکاری</option>
            <option value="unavailable">فعلاً در دسترس نیستم</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <label htmlFor="years-of-experience" className="text-sm font-medium">
            سابقهٔ کاری (سال):
          </label>
          <input
            id="years-of-experience"
            name="yearsOfExperience"
            type="number"
            defaultValue={profile?.yearsOfExperience ?? ""}
            min={0}
            step={1}
            required
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="location" className="text-sm font-medium">
          محل سکونت:
        </label>
        <input
          id="location"
          name="location"
          type="text"
          defaultValue={profile?.location ?? ""}
          required
          autoComplete="address-level2"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <WorkItemsSection initialItems={profile?.workItems} />
      <ExperiencesSection initialExperiences={profile?.experiences} />
      <SkillsSection initialSkills={profile?.skills} />
      {state.message ? (
        <p
          role={state.status === "error" ? "alert" : "status"}
          className={
            state.status === "error" ? "text-sm text-destructive" : "text-sm"
          }
        >
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-fit items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "در حال ارسال..." : "ذخیره و آزمایش اتصال"}
      </button>
    </form>
  );
}
