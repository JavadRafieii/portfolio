import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";

import { auth } from "@/auth";
import { DropdownMenuAvatar } from "@/components/shared/dropdown-menu-avatar";

export default function Navigation() {
  return (
    <header className="sticky top-12 z-50 backdrop-blur-2xl blur-0 w-full border border-black">
      <div className="w-full max-w-7xl top-0 py-2 md:py-2 px-4 sm:px-6 lg:px-8 border border-black mx-auto flex flex-row justify-between items-center">
        <ul className="flex flex-row gap-10 items-center text-[#4a5565] text-sm font-medium">
          <li>
            <Link href="/">خانه</Link>
          </li>
          <li>
            <Link href="/about">درباره ما</Link>
          </li>
          <li>
            <Link href="/contact">تماس با ما</Link>
          </li>
        </ul>
        <div className="flex flex-row items-center">
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
