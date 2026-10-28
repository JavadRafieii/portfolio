import {
  Building2Icon,
  CalendarDaysIcon,
  ChartNoAxesColumnIncreasingIcon,
  MapPinIcon,
} from "lucide-react";

import type { PortfolioExperience } from "@/lib/portfolio/types";

type ExperienceSectionProps = {
  experiences: PortfolioExperience[];
};

function formatExperienceDate(value: string) {
  const date = new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("fa-IR", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  const reversedExperiences = [...experiences].reverse();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="my-30 scroll-mt-28 w-full space-y-8"
    >
      <header className="max-w-2xl space-y-3">
        <p className="inline-flex items-center gap-2 font-semibold text-blue-700">
          <ChartNoAxesColumnIncreasingIcon
            aria-hidden="true"
            className="size-4"
          />
          مسیر حرفه‌ای
        </p>
        <h2
          id="experience-heading"
          className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl"
        >
          تجربیات کاری
        </h2>
        <p className="leading-8 text-slate-600">
          نگاهی به مسیر شغلی، مسئولیت‌ها و تجربه‌هایی که در طول این مسیر به دست
          آورده‌ام.
        </p>
      </header>

      {reversedExperiences.length > 0 ? (
        <ol className="space-y-5 border-r-2 border-slate-200 pr-6 sm:pr-8">
          {reversedExperiences.map((experience, index) => (
            <li
              key={`${experience.company}-${experience.startDate}-${index}`}
              className="relative"
            >
              <span
                aria-hidden="true"
                className="absolute -right-[calc(1.5rem+9px)] top-7 size-4 rounded-full border-4 border-white bg-blue-600 ring-2 ring-blue-100 sm:-right-[calc(2rem+9px)]"
              />
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 sm:p-7">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-blue-50 transition-transform duration-300 group-hover:scale-125"
                />

                <div className="relative flex flex-col gap-5 sm:flex-row">
                  <div
                    aria-hidden="true"
                    className="grid size-14 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white"
                  >
                    <Building2Icon className="size-7" />
                  </div>

                  <div className="min-w-0 flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {experience.jobTitle}
                      </h3>
                      <p className="mt-1 text-base font-semibold text-slate-700">
                        {experience.company}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                      <p className="inline-flex items-center gap-2">
                        <CalendarDaysIcon
                          aria-hidden="true"
                          className="size-4 text-blue-600"
                        />
                        <time dateTime={experience.startDate}>
                          {formatExperienceDate(experience.startDate)}
                        </time>
                        <span aria-hidden="true">-</span>
                        <time dateTime={experience.endDate}>
                          {formatExperienceDate(experience.endDate)}
                        </time>
                      </p>
                      <p className="inline-flex items-center gap-2">
                        <MapPinIcon
                          aria-hidden="true"
                          className="size-4 text-blue-600"
                        />
                        {experience.location}
                      </p>
                    </div>

                    <p className="whitespace-pre-line leading-8 text-slate-600">
                      {experience.description}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
          <p className="font-medium text-slate-700">
            تجربه‌های کاری به‌زودی اینجا نمایش داده می‌شوند.
          </p>
        </div>
      )}
    </section>
  );
}
