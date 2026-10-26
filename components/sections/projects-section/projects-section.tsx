import {
  ExternalLinkIcon,
  FolderKanbanIcon,
  Layers3Icon,
} from "lucide-react";

const sampleProject = {
  title: "داشبورد مدیریت پروژه",
  description:
    "مدیریت پروژه‌ها و پیگیری روند کار تیم با تمرکز بر نمایش شفاف وضعیت، اولویت‌ها و فعالیت‌های اخیر در یک فضای ساده و کاربردی.",
  technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
  href: "https://github.com/JavadRafieii",
};

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="my-30 w-full space-y-8"
    >
      <header className="max-w-2xl space-y-3">
        <p className="inline-flex items-center gap-2 font-semibold text-blue-700">
          <FolderKanbanIcon aria-hidden="true" className="size-4" />
          نمونه‌کارها
        </p>
        <h2
          id="projects-heading"
          className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl"
        >
          نمونه‌ای از کارهای من
        </h2>
        <p className="leading-8 text-slate-600">
          نگاهی به ایده‌ها و تجربه‌هایی که به محصولات دیجیتال تبدیل می‌شوند.
        </p>
      </header>

      <article className="group relative isolate overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-28 z-0 size-72 rounded-full bg-blue-100/60 blur-3xl transition-transform duration-500 group-hover:scale-110"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-blue-600 via-sky-400 to-indigo-500"
        />

        <div className="relative z-10 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-105">
                <Layers3Icon aria-hidden="true" className="size-6" />
              </span>
            </div>
            <span className="rounded-xl border border-slate-200 bg-white/80 px-3 py-1.5 font-mono text-xs font-bold tracking-wider text-slate-400">
              01
            </span>
          </div>

          <div className="mt-7 max-w-3xl">
            <h3 className="text-2xl font-black tracking-tight text-slate-900 transition-colors group-hover:text-blue-800 sm:text-3xl">
              {sampleProject.title}
            </h3>
            <p className="mt-3 leading-8 text-slate-600">
              {sampleProject.description}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-6 border-t border-slate-100 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500">
                تکنولوژی‌های استفاده‌شده
              </h4>
              <ul className="flex flex-wrap gap-2">
                {sampleProject.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors group-hover:border-blue-100 group-hover:bg-blue-50/60"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={sampleProject.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`مشاهدهٔ ${sampleProject.title} در گیت‌هاب`}
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
            >
              <ExternalLinkIcon aria-hidden="true" className="size-4" />
              مشاهده
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}
