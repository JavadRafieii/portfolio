import type { PortfolioReview } from "@/lib/portfolio/reviews";
import ReviewCard from "@/components/portfolio/review-card";

type VisitorCommentsProps = {
  comments: PortfolioReview[];
};

export default function VisitorComments({ comments }: VisitorCommentsProps) {
  return (
    <section aria-labelledby="visitor-comments-heading" className="space-y-6">
      <h2
        id="visitor-comments-heading"
        className="text-2xl font-bold text-slate-900"
      >
        نظرات کاربران
      </h2>
      {comments.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {comments.map((comment) => (
            <li key={comment.id}>
              <ReviewCard name={comment.name} opinion={comment.opinion} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-600">هنوز نظری ثبت نشده است.</p>
      )}
    </section>
  );
};