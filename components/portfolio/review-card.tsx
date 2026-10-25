import { QuoteIcon } from "lucide-react";

export type ReviewCardProps = {
  name: string;
  opinion: string;
};

export default function ReviewCard({ name, opinion }: ReviewCardProps) {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <QuoteIcon
        aria-hidden="true"
        className="mb-4 size-8 text-slate-300"
        fill="currentColor"
      />
      <blockquote className="flex-1 leading-8 text-slate-700">
        {opinion}
      </blockquote>
      <footer className="mt-6 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2">
          <p className="font-bold text-slate-900">{name}</p>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <p>بازدیدکنندهٔ وب‌سایت</p>
        </div>
      </footer>
    </article>
  );
}
