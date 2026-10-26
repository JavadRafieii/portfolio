"use client";

import { LogInIcon, LogOutIcon, UserIcon, LayoutDashboard } from "lucide-react";

import { loginWithGoogle, logout } from "@/app/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

type DropdownMenuAvatarProps = {
  user: {
    email?: string | null;
    name?: string | null;
    image?: string | null;
  } | null;
};

export function DropdownMenuAvatar({ user }: DropdownMenuAvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label={user ? "منوی حساب کاربری" : "ورود به حساب کاربری"}
          >
            <Avatar className="size-10">
              <AvatarFallback>
                <UserIcon className="size-6" />
              </AvatarFallback>
              {user?.image ? (
                <AvatarImage
                  src={user.image}
                  alt={user.name ?? "تصویر کاربر"}
                />
              ) : null}
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem className="text-xs text-[#4a5565] font-medium">
          <LayoutDashboard className="size-4" />
          {user?.email === "j.rafiei999@gmail.com" ? (
            <Link href="/dashboard" className="w-full">
              پنل مدیر
            </Link>
          ) : (
            <Link href="/dashboard" className="w-full">
              داشبورد
            </Link>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user ? (
          <form action={logout}>
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                render={<button type="submit" className="w-full text-left" />}
                nativeButton
                className="text-xs text-[#4a5565] font-medium"
              >
                <LogOutIcon className="size-4" />
                خروج از حساب
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </form>
        ) : (
          <form action={loginWithGoogle}>
            <DropdownMenuGroup>
              <DropdownMenuItem
                render={<button type="submit" className="w-full text-left" />}
                nativeButton
                className="text-xs text-[#4a5565] font-medium"
              >
                <LogInIcon className="size-4" />
                ورود با گوگل
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </form>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
