import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";

import { auth } from "@/auth";
import { DropdownMenuAvatar } from "@/components/shared/dropdown-menu-avatar";

export default function Navigation() {
  return (
    <header className="sticky top-3 z-50 w-full px-3 sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 rounded-2xl border border-white/80 bg-white/85 p-2 shadow-lg shadow-slate-900/5 backdrop-blur-xl sm:gap-4 sm:px-4">
        <Link
          href="/"
          aria-label="جواد رفیعی، صفحهٔ اصلی"
          className="flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-black tracking-wide text-white shadow-md shadow-blue-600/20">
            JR
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-black text-slate-900">
              جواد رفیعی
            </span>
            <span className="mt-0.5 block text-xs text-slate-500">
              طراح و توسعه‌دهنده
            </span>
          </span>
        </Link>

        <nav aria-label="ناوبری اصلی">
          <ul className="flex items-center gap-0.5 text-slate-600 sm:gap-1">
            <li>
              <Link
                href="/"
                className="block rounded-lg px-2 py-2 text-[11px] font-semibold transition-colors hover:bg-white hover:text-blue-700 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-blue-600 sm:px-3 sm:text-sm"
              >
                خانه
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block rounded-lg px-2 py-2 text-[11px] font-semibold transition-colors hover:bg-white hover:text-blue-700 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-blue-600 sm:px-3 sm:text-sm"
              >
                درباره من
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block rounded-lg px-2 py-2 text-[11px] font-semibold transition-colors hover:bg-white hover:text-blue-700 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-blue-600 sm:px-3 sm:text-sm"
              >
                تماس
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Suspense fallback={<div aria-hidden="true" className="size-10" />}>
            <AccountMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

async function AccountMenu() {
  await connection();
  const session = await auth();
  const user = session?.user;

  return (
    <DropdownMenuAvatar
      user={
        user
          ? {
              email: user.email,
              name: user.name,
              image: user.image,
            }
          : null
      }
    />
  );
}
