import { Suspense } from "react";

import { getPortfolioProfile } from "@/lib/portfolio/data";
import { getPortfolioReviews } from "@/lib/portfolio/reviews";

export default function HomePage() {
  return (
    <div>
      <Suspense fallback={<div aria-hidden="true" className="size-10" />}>
        <PortfolioFormWithSavedData />
      </Suspense>
    </div>
  );
}

async function PortfolioFormWithSavedData() {
  const [profile, reviews] = await Promise.all([
    getPortfolioProfile(),
    getPortfolioReviews(),
  ]);

  return <div>HomePage</div>;
}
