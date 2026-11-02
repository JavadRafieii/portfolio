"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
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
    <nav className="min-w-0 flex-1 sm:flex-none" aria-label="ناوبری اصلی">
      <ul className="flex items-center gap-0.5 overflow-x-auto whitespace-nowrap text-slate-600 sm:gap-1">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={handleSectionClick}
              className="block rounded-lg px-2 py-2 text-[11px] font-semibold transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-600 sm:px-3 sm:text-sm"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
