import { Suspense } from "react";

import PortfolioForm from "@/components/portfolio/portfolio-form";
import ReviewForm from "@/components/portfolio/review-form";
import { isPortfolioAdmin } from "@/lib/portfolio/access";
import { getPortfolioProfile } from "@/lib/portfolio/data";
import { getPortfolioReviewForCurrentUser } from "@/lib/portfolio/reviews";

export default function DashboardPage() {
  return (
    <Suspense fallback={<p>در حال بارگذاری داشبورد...</p>}>
      <DashboardContent />
    </Suspense>
  );
}

async function DashboardContent() {
  const isAdmin = await isPortfolioAdmin();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black">
          {isAdmin ? "تنظیمات پروفایل" : "ثبت نظر"}
        </h1>
      </div>

      <Suspense fallback={<p>در حال بارگذاری اطلاعات...</p>}>
        {isAdmin ? <PortfolioFormWithSavedData /> : <ReviewFormWithSavedData />}
      </Suspense>
    </div>
  );
}

async function PortfolioFormWithSavedData() {
  const profile = await getPortfolioProfile();
  return <PortfolioForm profile={profile} />;
}

async function ReviewFormWithSavedData() {
  const review = await getPortfolioReviewForCurrentUser();
  return <ReviewForm review={review} />;
}
