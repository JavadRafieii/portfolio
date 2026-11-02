import Image from "next/image";
import Link from "next/link";
import { SparklesIcon } from "lucide-react";

import type { PortfolioProfileValues } from "@/lib/portfolio/types";

type HeroSectionProps = {
  profile: PortfolioProfileValues | null;
};

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="my-30 scroll-mt-28 grid grid-cols-2 items-center gap-10"
    >
      <div>
        <p className="inline-flex items-center gap-2 font-medium text-blue-700">
          <SparklesIcon aria-hidden="true" className="size-4" />
          {profile?.subTitle || "سلام، خوش اومدی"}
        </p>
        <div className="my-5">
          <h1
            id="hero-title"
            className="text-5xl font-black leading-tight text-slate-900 mb-5"
          >
            {profile?.title || "طراحی و توسعهٔ تجربه‌های دیجیتال"}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {profile?.description ||
              "ایده‌ها را به تجربه‌هایی ساده، زیبا و کاربردی تبدیل می‌کنم."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="#projects"
            className="inline-flex items-center rounded-xl border border-slate-500 px-5 py-3 font-medium text-slate-800 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
          >
           پروژه‌هام رو ببین
          </Link>
        </div>
      </div>

      <div className="flex h-full items-center justify-center">
        <Image
          src="/images/hero.png"
          alt="تصویر فردی در حال کار با لپ‌تاپ"
          width={1024}
          height={1536}
          priority
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 32rem"
          className="h-auto max-h-[min(70vh,42rem)] w-full max-w-lg object-contain"
        />
      </div>
    </section>
  );
}
