import {
  BadgeCheckIcon,
  BriefcaseBusinessIcon,
  EyeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SparklesIcon,
} from "lucide-react";

import type { PortfolioProfileValues } from "@/lib/portfolio/types";

type AboutSectionProps = {
  profile: PortfolioProfileValues | null;
};

const collaborationStatus = {
  available: {
    label: "آمادهٔ همکاری",
    dot: "bg-emerald-400",
  },
  busy: {
    label: "مشغول همکاری",
    dot: "bg-amber-300",
  },
  unavailable: {
    label: "فعلاً در دسترس نیستم",
    dot: "bg-slate-300",
  },
} as const;

export default function AboutSection({ profile }: AboutSectionProps) {
  const status = profile ? collaborationStatus[profile.status] : null;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="my-30 scroll-mt-28 w-full rounded-[2rem] border border-slate-100 bg-white p-5 shadow-xl shadow-slate-900/[0.04] sm:p-8 lg:p-10"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-8">
        <div className="relative overflow-hidden py-4 sm:py-8 lg:py-10">
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
                <SparklesIcon aria-hidden="true" className="size-4" />
                آشنایی بیشتر
              </span>
            </div>

            <h2
              id="about-title"
              className="mt-6 text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]"
            >
              {profile?.aboutTitle || "کمی بیشتر دربارهٔ من"}
            </h2>
            <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
              {profile?.aboutDescription ||
                "من به ساخت تجربه‌های دیجیتال ساده و کاربردی علاقه‌مندم و تلاش می‌کنم هر ایده را به راه‌حلی قابل‌استفاده تبدیل کنم."}
            </p>

          </div>
        </div>

        <aside
          aria-label="خلاصهٔ اطلاعات"
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-800 p-6 text-white sm:p-8 lg:p-9"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -left-16 size-52 rounded-full border-[30px] border-white/[0.06]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 -left-8 size-36 rounded-full border border-white/10"
          />

          <div className="relative flex h-full flex-col">
            <p className="inline-flex items-center gap-2 text-lg font-bold text-blue-100">
              <EyeIcon aria-hidden="true" className="size-5" />
              در یک نگاه
            </p>

            {profile ? (
              <>
                <div className="mt-7 border-b border-white/15 pb-6">
                  <p className="text-sm text-blue-100">تجربهٔ حرفه‌ای</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-6xl font-black tracking-tight">
                      {profile.yearsOfExperience.toLocaleString("fa-IR")}
                    </span>
                    <span className="font-medium text-blue-100">سال</span>
                  </div>
                </div>

                <dl className="mt-5 flex flex-col gap-5">
                  <div className="flex items-start gap-3">
                    <MapPinIcon
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-blue-200"
                    />
                    <div>
                      <dt className="text-xs text-blue-200">محل سکونت</dt>
                      <dd className="mt-1 font-semibold">{profile.location}</dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BadgeCheckIcon
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-blue-200"
                    />
                    <div>
                      <dt className="text-xs text-blue-200">
                        وضعیت همکاری
                      </dt>
                      <dd className="mt-1 inline-flex items-center gap-2 font-semibold">
                        <span
                          aria-hidden="true"
                          className={`size-2 rounded-full ${status?.dot}`}
                        />
                        {status?.label}
                      </dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-6 border-t border-white/15 pt-5">
                  <p className="mb-4 text-sm font-semibold text-blue-100">
                    راه‌های ارتباطی
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href={`mailto:${profile.email}`}
                      className="group flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3 transition-colors hover:border-white/25 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <MailIcon
                        aria-hidden="true"
                        className="size-4 shrink-0 text-blue-200"
                      />
                      <span className="min-w-0 flex-1 break-all text-sm font-medium text-white">
                        {profile.email}
                      </span>
                    </a>
                    <a
                      href={`tel:${profile.phone}`}
                      className="group flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3 transition-colors hover:border-white/25 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <PhoneIcon
                        aria-hidden="true"
                        className="size-4 shrink-0 text-blue-200"
                      />
                      <span
                        dir="ltr"
                        className="min-w-0 flex-1 text-right text-sm font-medium text-white"
                      >
                        {profile.phone}
                      </span>
                    </a>
                  </div>
                </div>

                <div className="mt-auto hidden items-center gap-2 pt-8 text-xs text-blue-100 lg:flex">
                  <BriefcaseBusinessIcon
                    aria-hidden="true"
                    className="size-4"
                  />
                  <span>آمادهٔ ساختن تجربه‌های بهتر</span>
                </div>
              </>
            ) : (
              <p className="mt-7 leading-7 text-blue-100">
                اطلاعات تکمیلی به‌زودی اینجا نمایش داده می‌شوند.
              </p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
