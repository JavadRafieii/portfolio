import { Suspense } from "react";

import { getPortfolioReviews } from "@/lib/portfolio/reviews";

import VisitorComments from "@/components/sections/visitor-comments/visitor-comments";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Suspense fallback={<div aria-hidden="true" className="size-10" />}>
        <CommentsSection />
      </Suspense>
    </main>
  );
}

async function CommentsSection() {
  const reviews = await getPortfolioReviews();
  return <VisitorComments comments={reviews}/>;
};