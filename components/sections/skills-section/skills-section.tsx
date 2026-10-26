import {
  AwardIcon,
  ChevronDownIcon,
  CodeXmlIcon,
  SparklesIcon,
} from "lucide-react";

import type { PortfolioSkill, SkillLevel } from "@/lib/portfolio/types";

type SkillsSectionProps = {
  skills: PortfolioSkill[];
};

const skillLevelLabels: Record<SkillLevel, string> = {
  beginner: "مبتدی",
  intermediate: "متوسط",
  advanced: "پیشرفته",
};

const skillLevelSteps: Record<SkillLevel, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

const VISIBLE_SKILLS_COUNT = 6;

function SkillCards({ skills, startIndex = 0 }: {
  skills: PortfolioSkill[];
  startIndex?: number;
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill, index) => {
        const activeSteps = skillLevelSteps[skill.level];

        return (
          <li
            key={`${skill.name}-${startIndex + index}`}
            className="group rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm shadow-blue-950/[0.02] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/5 sm:p-5"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <CodeXmlIcon aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-bold text-slate-900">
                  {skill.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  سطح {skillLevelLabels[skill.level]}
                </p>
              </div>
            </div>

            <div aria-hidden="true" className="mt-5 flex gap-1.5">
              {[1, 2, 3].map((step) => (
                <span
                  key={step}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    step <= activeSteps ? "bg-blue-600" : "bg-slate-100"
                  }`}
                />
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const visibleSkills = skills.slice(0, VISIBLE_SKILLS_COUNT);
  const remainingSkills = skills.slice(VISIBLE_SKILLS_COUNT);

  return (
    <section
      aria-labelledby="skills-heading"
      className="relative isolate my-30 w-full overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-slate-50 via-white to-blue-50/80 p-5 sm:p-8 lg:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-28 -z-10 size-72 rounded-full bg-blue-100/60 blur-3xl"
      />

      <div className="space-y-8">
        <header className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-sm font-semibold text-blue-700">
              <SparklesIcon aria-hidden="true" className="size-4" />
              توانمندی‌ها
            </p>
            <h2
              id="skills-heading"
              className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl"
            >
              مهارت‌های من
            </h2>
            <p className="leading-8 text-slate-600">
              ترکیبی از مهارت‌های تخصصی و فردی که در پروژه‌ها و مسیر حرفه‌ای‌ام
              به کار می‌گیرم.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white bg-white/80 px-4 py-3 shadow-sm shadow-blue-950/5">
            <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
              <AwardIcon aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-xl font-black leading-none text-slate-900">
                {skills.length.toLocaleString("fa-IR")}
              </p>
              <p className="mt-1 text-xs text-slate-500">مهارت ثبت‌شده</p>
            </div>
          </div>
        </header>

        {skills.length > 0 ? (
          <div className="space-y-5">
            <SkillCards skills={visibleSkills} />
            {remainingSkills.length > 0 ? (
              <details className="group/skills grid gap-5">
                <summary className="order-2 mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-xl border border-blue-100 bg-white/80 px-4 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:border-blue-200 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
                  <span className="group-open/skills:hidden">
                    نمایش مهارت‌های بیشتر
                  </span>
                  <span className="hidden group-open/skills:inline">
                    نمایش مهارت‌های کمتر
                  </span>
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 group-open/skills:hidden">
                    {remainingSkills.length.toLocaleString("fa-IR")}
                  </span>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="size-4 transition-transform group-open/skills:rotate-180"
                  />
                </summary>
                <div className="order-1">
                  <SkillCards
                    skills={remainingSkills}
                    startIndex={VISIBLE_SKILLS_COUNT}
                  />
                </div>
              </details>
            ) : null}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-blue-200 bg-white/70 px-6 py-10 text-center">
            <p className="font-medium text-slate-700">
              مهارت‌ها به‌زودی اینجا نمایش داده می‌شوند.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
