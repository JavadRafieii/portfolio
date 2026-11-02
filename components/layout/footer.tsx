import Link from "next/link";
import { ArrowUpLeftIcon, SparklesIcon } from "lucide-react";
import { navigationItems } from "@/components/layout/navigation-items";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-40 size-96 rounded-full bg-blue-600/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 right-1/3 size-80 rounded-full bg-indigo-500/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 py-12 md:py-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-sm font-medium text-blue-200">
              <SparklesIcon aria-hidden="true" className="size-4" />
              ایده‌ای برای ساختن داریم؟
            </p>
            <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
              بیایید چیزی عالی بسازیم.
            </h2>
            <p className="mt-3 max-w-xl leading-8 text-slate-300">
              اگر ایده‌ای در ذهن داری یا به همکاری نیاز داری، از دستیار گفتگو
              در همین صفحه بپرس.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 py-7 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="پیوندهای فوتر">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              {navigationItems.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-sm text-slate-400">
           کدنویسی با دقت، خلاقیت با AI
          </p>
        </div>

        <Link
          href="/"
          aria-label="بازگشت به صفحهٔ اصلی"
          className="absolute left-4 top-5 grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-blue-300/40 hover:bg-blue-400/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300 sm:left-6 lg:left-8"
        >
          <ArrowUpLeftIcon aria-hidden="true" className="size-5" />
        </Link>
      </div>
    </footer>
  );
}
