import { MessageCircleHeartIcon } from "lucide-react";

import type { PortfolioReview } from "@/lib/portfolio/reviews";
import ReviewCard from "@/components/portfolio/review-card";

type VisitorCommentsProps = {
  comments: PortfolioReview[];
};

export default function VisitorComments({ comments }: VisitorCommentsProps) {
  return (
    <section
      id="visitor-comments"
      aria-labelledby="visitor-comments-heading"
      className="my-30 scroll-mt-28 w-full space-y-8"
    >
      <header className="max-w-2xl space-y-3">
        <p className="inline-flex items-center gap-2 font-semibold text-blue-700">
          <MessageCircleHeartIcon aria-hidden="true" className="size-4" />
          دیدگاه همراهان
        </p>
        <h2
          id="visitor-comments-heading"
          className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl"
        >
          تجربهٔ دیگران از همکاری
        </h2>
        <p className="leading-8 text-slate-600">
          نظر کسانی که تجربهٔ همکاری یا استفاده از خدمات را داشته‌اند.
        </p>
      </header>

      {comments.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {comments.map((comment) => (
            <li key={comment.id}>
              <ReviewCard name={comment.name} opinion={comment.opinion} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
          <p className="font-medium text-slate-700">
            هنوز دیدگاهی ثبت نشده است.
          </p>
        </div>
      )}
    </section>
  );
}