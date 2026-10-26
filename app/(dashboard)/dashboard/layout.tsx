import { Suspense, type ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

import DashboardNavigation from "@/components/layout/dashboard-navigation";
import MainContainer from "@/components/layout/main-container";
import FullPageLoader from "@/components/shared/full-page-loader";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<FullPageLoader label="در حال آماده‌سازی داشبورد" />}>
      <AuthenticatedDashboardLayout>{children}</AuthenticatedDashboardLayout>
    </Suspense>
  );
}

async function AuthenticatedDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/");

  return (
    <MainContainer>
      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-4">
          <div className="flex flex-col items-start gap-y-6 sticky top-6">
            <div className="flex items-center gap-x-2">
              <Avatar className="size-20">
                <AvatarFallback>
                  <UserIcon className="size-10" />
                </AvatarFallback>
                {user.image ? (
                  <AvatarImage
                    src={user.image}
                    alt={user.name ?? "تصویر کاربر"}
                  />
                ) : null}
              </Avatar>
              <span className="text-sm font-normal">{user.email}</span>
            </div>
            <div className="flex w-full flex-col gap-2.5 rounded-2xl bg-white px-4 py-6 text-[15px] font-normal text-gray-500 shadow-[0_0_20px_0_(--shadow)]">
              <span className="text-xl font-semibold text-gray-900">
                {user.name} عزیز، سلام
              </span>
              <span>به وبسایت خودت خوش آمدی.</span>
            </div>
            <div className="w-full">
              <DashboardNavigation />
            </div>
          </div>
        </aside>
        <section className="col-span-8 rounded-3xl bg-white p-10">
          {children}
        </section>
      </div>
    </MainContainer>
  );
}
