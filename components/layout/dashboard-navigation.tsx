"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  HomeIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";
import { logout } from "@/app/actions/auth";

export default function DashboardNavigation() {
  const pathname = usePathname();
  const isDashboardPage = pathname === "/dashboard";

  return (
    <ul>
      <li
        className="
              flex items-center gap-x-3 rounded-2xl
              text-sm font-medium transition-all duration-200
              w-full
              text-zinc-600 hover:bg-blue-600 hover:text-white
            "
      >
        <Link
          href="/"
          className="flex w-full items-center gap-x-3 rounded-2xl px-3 py-4"
        >
          <HomeIcon size={20} />
          <span>صفحه اصلی</span>
        </Link>
      </li>
      <li
        className="
              flex items-center gap-x-3 rounded-2xl
              text-sm font-medium transition-all duration-200
              w-full
              text-zinc-600 hover:bg-blue-600 hover:text-white
            "
      >
        <Link
          href="/dashboard"
          aria-current={isDashboardPage ? "page" : undefined}
          className={`flex w-full items-center gap-x-3 rounded-2xl px-3 py-4 ${
            isDashboardPage
              ? "bg-blue-600 text-white hover:bg-blue-600 hover:text-white"
              : ""
          }`}
        >
          <SettingsIcon size={20} />
          <span>تنظیمات پروفایل</span>
        </Link>
      </li>
      <li
        className="
              flex items-center rounded-2xl
              text-sm font-medium transition-all duration-200
              w-full
              text-red-500 hover:bg-red-500 hover:text-white
            "
      >
        <form action={logout} className="w-full">
          <button
            type="submit"
            className="flex w-full items-center gap-x-3 rounded-2xl px-3 py-4 text-right cursor-pointer"
          >
            <LogOutIcon size={20} />
            <span>خروج از حساب</span>
          </button>
        </form>
      </li>
    </ul>
  );
}
