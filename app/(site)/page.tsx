import { Suspense } from "react";

import { getPortfolioProfile } from "@/lib/portfolio/data";

export default function HomePage() {
  return (
    <div>
      <div>HomePage</div>
      <Suspense fallback={<div aria-hidden="true" className="size-10" />}>
        <PortfolioFormWithSavedData />
      </Suspense>
    </div>
  );
}

async function PortfolioFormWithSavedData() {
  const profile = await getPortfolioProfile();

  console.log("profile", profile);
  return <div>PortfolioFormWithSavedData</div>;
}
