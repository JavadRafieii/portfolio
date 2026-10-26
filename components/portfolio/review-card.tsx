import { QuoteIcon, UserRoundIcon } from "lucide-react";

export type ReviewCardProps = {
  name: string;
  opinion: string;
};

export default function ReviewCard({ name, opinion }: ReviewCardProps) {
  return (
    <article className="group relative flex h-[22rem] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 sm:p-7">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 -top-10 size-32 rounded-full bg-blue-50 transition-transform duration-300 group-hover:scale-125"
      />
      <div className="relative flex items-start justify-between gap-4">
        <span className="grid size-11 place-items-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
          <QuoteIcon aria-hidden="true" className="size-5" />
        </span>
        <span className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
          نظر بازدیدکننده
        </span>
      </div>

      <blockquote
        tabIndex={0}
        aria-label={`متن نظر ${name}`}
        className="relative mt-6 min-h-0 flex-1 overflow-y-auto overscroll-contain whitespace-pre-line leading-8 text-slate-700 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        {opinion}
      </blockquote>

      <footer className="relative mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-700"
        >
          {name ? (
            <span className="font-bold">{name.slice(0, 1)}</span>
          ) : (
            <UserRoundIcon className="size-5" />
          )}
        </span>
        <div className="min-w-0">
          <p className="truncate font-bold text-slate-900">{name}</p>
          <p className="mt-0.5 text-xs text-slate-500">بازدیدکنندهٔ وب‌سایت</p>
        </div>
      </footer>
    </article>
  );
}
