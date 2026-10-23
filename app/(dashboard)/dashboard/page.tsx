import { Suspense } from "react";
import { redirect } from "next/navigation";

import PortfolioForm from "@/components/portfolio/portfolio-form";
import { isPortfolioAdmin } from "@/lib/portfolio/access";
import { getPortfolioProfile } from "@/lib/portfolio/data";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black">تنظیمات پروفایل</h1>
      </div>
      <Suspense fallback={<p>در حال بارگذاری اطلاعات پروفایل...</p>}>
        <PortfolioFormWithSavedData />
      </Suspense>
    </div>
  );
}

async function PortfolioFormWithSavedData() {
  if (!(await isPortfolioAdmin())) {
    redirect("/");
  }

  const profile = await getPortfolioProfile();
  return <PortfolioForm profile={profile} />;
}
