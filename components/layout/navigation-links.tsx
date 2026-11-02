"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { MenuIcon } from "lucide-react";
import { navigationItems } from "@/components/layout/navigation-items";

function handleSectionClick(event: MouseEvent<HTMLAnchorElement>) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const targetUrl = new URL(event.currentTarget.href);
  if (
    targetUrl.origin !== window.location.origin ||
    targetUrl.pathname !== window.location.pathname ||
    targetUrl.hash.length < 2
  ) {
    return;
  }

  const target = document.getElementById(targetUrl.hash.slice(1));
  if (!target) return;

  event.currentTarget.closest("details")?.removeAttribute("open");
  event.preventDefault();

  if (window.location.hash !== targetUrl.hash) {
    window.history.pushState(null, "", targetUrl.hash);
  }

  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
}

export default function NavigationLinks() {
  return (
    <nav className="min-w-0 flex-1 lg:flex-none" aria-label="ناوبری اصلی">
      <details className="relative w-fit lg:hidden">
        <summary
          aria-label="فهرست ناوبری"
          className="grid size-10 cursor-pointer list-none place-items-center rounded-xl text-slate-600 transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden"
        >
          <MenuIcon aria-hidden="true" className="size-5" />
        </summary>
        <ul className="absolute right-0 top-full z-50 mt-2 flex w-52 flex-col rounded-2xl border border-slate-200 bg-white p-2 text-slate-600 shadow-xl">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={handleSectionClick}
                className="block rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </details>

      <ul className="hidden items-center gap-0.5 whitespace-nowrap text-slate-600 lg:flex lg:gap-1">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={handleSectionClick}
              className="block rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
