"use client";

import { useActionState } from "react";

import {
  savePortfolio,
  type PortfolioSaveState,
} from "@/app/actions/portfolio";

import type { PortfolioProfileValues } from "@/lib/portfolio/types";
import ExperiencesSection from "@/components/portfolio/experiences-section";
import ProjectsFormSection from "@/components/portfolio/projects-section";
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
      <section className="space-y-4 rounded-xl border border-border p-4 sm:p-5">
        <header>
          <h2 className="font-semibold">محتوای بخش آغازین</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            این اطلاعات در بالای صفحهٔ اصلی و در اولین نگاه بازدیدکننده نمایش داده می‌شوند.
          </p>
        </header>
        <div className="flex flex-col gap-2">
          <label htmlFor="sub-title" className="text-sm font-medium">
            پیام خوش‌آمدگویی:
          </label>
          <p className="text-sm text-muted-foreground">
            یک عبارت کوتاه برای معرفی یا خوشامدگویی.
          </p>
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
            تیتر اصلی:
          </label>
          <p className="text-sm text-muted-foreground">
            عنوان اصلی و برجستهٔ معرفی شما در صفحهٔ اصلی.
          </p>
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
            متن معرفی کوتاه:
          </label>
          <p className="text-sm text-muted-foreground">
            خلاصه‌ای از تخصص و ارزشی که برای پروژه‌ها ایجاد می‌کنید.
          </p>
          <textarea
            id="description"
            name="description"
            defaultValue={profile?.description ?? ""}
            required
            rows={5}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-border p-4 sm:p-5">
        <header>
          <h2 className="font-semibold">دربارهٔ من</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            اطلاعات این قسمت در سکشن «آشنایی بیشتر» صفحهٔ اصلی نمایش داده می‌شود.
          </p>
        </header>
        <div className="flex flex-col gap-2">
          <label htmlFor="about-title" className="text-sm font-medium">
            تیتر بخش:
          </label>
          <p className="text-sm text-muted-foreground">
            یک عنوان کوتاه برای شروع معرفی کامل‌تر.
          </p>
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
            متن دربارهٔ من:
          </label>
          <p className="text-sm text-muted-foreground">
            دربارهٔ مسیر، علاقه‌مندی‌ها و رویکرد حرفه‌ای خود بنویسید.
          </p>
          <textarea
            id="about-description"
            name="aboutDescription"
            defaultValue={profile?.aboutDescription ?? ""}
            required
            rows={5}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-border p-4 sm:p-5">
        <header>
          <h2 className="font-semibold">اطلاعات تماس و وضعیت همکاری</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            این موارد در کارت اطلاعات بخش «دربارهٔ من» نمایش داده می‌شوند.
          </p>
        </header>
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="flex w-full flex-col gap-2 sm:w-1/2">
            <label htmlFor="email" className="text-sm font-medium">
              نشانی ایمیل:
            </label>
            <p className="text-sm text-muted-foreground">
              بازدیدکنندگان از این نشانی برای تماس ایمیلی استفاده می‌کنند.
            </p>
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
          <div className="flex w-full flex-col gap-2 sm:w-1/2">
            <label htmlFor="phone" className="text-sm font-medium">
              شمارهٔ تماس:
            </label>
            <p className="text-sm text-muted-foreground">
              شماره‌ای که برای تماس مستقیم در سایت نشان داده می‌شود.
            </p>
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
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="flex w-full flex-col gap-2 sm:w-1/2">
            <label htmlFor="status" className="text-sm font-medium">
              وضعیت فعلی همکاری:
            </label>
            <p className="text-sm text-muted-foreground">
              مشخص کنید برای شروع همکاری جدید در دسترس هستید یا خیر.
            </p>
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
              <option value="available">آمادهٔ همکاری</option>
              <option value="busy">مشغول همکاری</option>
              <option value="unavailable">فعلاً در دسترس نیستم</option>
            </select>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-1/2">
            <label htmlFor="years-of-experience" className="text-sm font-medium">
              میزان سابقهٔ کاری (سال):
            </label>
            <p className="text-sm text-muted-foreground">
              عدد سال‌های تجربهٔ حرفه‌ای خود را وارد کنید.
            </p>
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
          <p className="text-sm text-muted-foreground">
            شهر یا منطقه‌ای که در کارت اطلاعات عمومی شما نمایش داده شود.
          </p>
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
      </section>
      <WorkItemsSection initialItems={profile?.workItems} />
      <ProjectsFormSection initialProjects={profile?.projects} />
      <ExperiencesSection initialExperiences={profile?.experiences} />
      <SkillsSection initialSkills={profile?.skills} />
      {state.message ? (
        <p
          role={state.status === "error" ? "alert" : "status"}
          className={`rounded-lg border px-4 py-3 text-sm ${
            state.status === "error"
              ? "border-destructive/30 bg-destructive/5 text-destructive"
              : "border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
        >
          {state.message}
        </p>
      ) : null}
      <div className="sticky bottom-0 z-20 -mx-5 px-5 py-4 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "در حال ذخیرهٔ تغییرات..." : "ذخیرهٔ تغییرات"}
        </button>
      </div>
    </form>
  );
}
