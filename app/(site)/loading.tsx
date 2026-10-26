import { SparklesIcon } from "lucide-react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[100] flex min-h-dvh items-center justify-center overflow-hidden bg-slate-950 px-6 text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-40 size-96 rounded-full bg-blue-600/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 right-1/4 size-96 rounded-full bg-indigo-500/15 blur-3xl"
      />

      <div className="relative flex flex-col items-center text-center">
        <div className="relative grid size-20 place-items-center">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-white/10"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-blue-400 motion-reduce:animate-none"
          />
          <span className="grid size-12 place-items-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/30">
            <SparklesIcon aria-hidden="true" className="size-6" />
          </span>
        </div>
        <p className="mt-6 text-lg font-bold sm:text-xl">
          در حال آماده‌سازی صفحه
        </p>
        <p className="mt-2 text-sm text-slate-400">
          لطفاً چند لحظه صبر کنید
        </p>
        <span className="sr-only">در حال بارگیری اطلاعات صفحه</span>
      </div>
    </div>
  );
}
