import {
  BrushIcon,
  BriefcaseBusinessIcon,
  ClipboardListIcon,
  CodeXmlIcon,
  DatabaseIcon,
  GaugeIcon,
  LayoutGridIcon,
  Layers3Icon,
  LightbulbIcon,
  MonitorIcon,
  PanelsTopLeftIcon,
  SearchIcon,
  SparklesIcon,
  SmartphoneIcon,
  ShoppingCartIcon,
  WorkflowIcon,
  type LucideIcon,
} from "lucide-react";

import type { PortfolioWorkItem } from "@/lib/portfolio/types";

type ServicesSectionProps = {
  items: PortfolioWorkItem[];
};

const defaultServiceIcon = Layers3Icon;

function getServiceIcon(title: string): LucideIcon {
  const normalizedTitle = title
    .toLocaleLowerCase()
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u200c\s]+/g, " ");

  if (/بهینه.?سازی|بهبود عملکرد|سرعت|optimization|performance|optimiz/.test(normalizedTitle)) {
    return GaugeIcon;
  }

  if (/مدیریت|پشتیبانی|نگهداری|برنامه.?ریزی|management|maintenance|project manager/.test(normalizedTitle)) {
    return ClipboardListIcon;
  }

  if (/فرایند|گردش.?کار|اتوماسیون|workflow|automation|یکپارچه.?سازی/.test(normalizedTitle)) {
    return WorkflowIcon;
  }

  if (/ui\/ux|ux|ui|رابط کاربری|تجربه کاربری|wireframe|prototype/.test(normalizedTitle)) {
    return PanelsTopLeftIcon;
  }

  if (/طراحی|گرافیک|تصویرسازی|illustrat|graphic|branding|برندینگ/.test(normalizedTitle)) {
    return BrushIcon;
  }

  if (/موبایل|اپلیکیشن|اندروید|ios|application|mobile/.test(normalizedTitle)) {
    return SmartphoneIcon;
  }

  if (/فروشگاه|تجارت الکترونیک|e-?commerce|shop/.test(normalizedTitle)) {
    return ShoppingCartIcon;
  }

  if (/سئو|seo|جستجو|search/.test(normalizedTitle)) {
    return SearchIcon;
  }

  if (/پایگاه داده|دیتابیس|database|backend|بک.?اند/.test(normalizedTitle)) {
    return DatabaseIcon;
  }

  if (/مشاوره|ایده|استراتژی|consult/.test(normalizedTitle)) {
    return LightbulbIcon;
  }

  if (/وب|سایت|فرانت.?اند|توسعه|برنامه.?نویسی|کدنویسی|web|frontend|develop/.test(normalizedTitle)) {
    return CodeXmlIcon;
  }

  if (/رسانه|ویدیو|فیلم|visual media/.test(normalizedTitle)) {
    return MonitorIcon;
  }

  if (/انیمیشن|موشن|motion|animation/.test(normalizedTitle)) {
    return SparklesIcon;
  }

  if (/معماری|سیستم|architecture|integration/.test(normalizedTitle)) {
    return LayoutGridIcon;
  }

  return defaultServiceIcon;
}

export default function ServicesSection({ items }: ServicesSectionProps) {
  return (
    <section
      aria-labelledby="services-heading"
      id="services"
      className="my-16 scroll-mt-28 w-full space-y-8 sm:my-20 lg:my-30"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="inline-flex items-center gap-2 font-semibold text-blue-700">
            <BriefcaseBusinessIcon aria-hidden="true" className="size-4" />
            خدمات من
          </p>
          <h2
            id="services-heading"
            className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl"
          >
            کارهایی که انجام می‌دهم
          </h2>
          <p className="leading-8 text-slate-600">
            از شکل‌گیری ایده تا اجرای نهایی، برای ساخت تجربه‌هایی کاربردی و
            خوش‌ساخت همراهتان هستم.
          </p>
        </div>
      </div>

      {items.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = getServiceIcon(item.title);

            return (
              <li key={`${item.title}-${index}`} className="h-full">
                <article className="group relative flex h-full min-h-60 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 sm:p-7">
                  <span
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 size-32 rounded-full bg-blue-50 transition-transform duration-300 group-hover:scale-125"
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <span className="font-mono text-sm font-semibold text-slate-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="relative mt-8 space-y-3">
                    <h3 className="text-xl font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="whitespace-pre-line leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
          <p className="font-medium text-slate-700">
            خدمات به‌زودی اینجا معرفی می‌شوند.
          </p>
        </div>
      )}
    </section>
  );
}
