"use client";

import { useActionState } from "react";

import {
  savePortfolioReview,
  type ReviewSaveState,
} from "@/app/actions/reviews";
import type { PortfolioReviewValues } from "@/lib/portfolio/reviews";

const initialState: ReviewSaveState = {
  status: "idle",
  message: "",
};

export default function ReviewForm({
  review,
}: {
  review: PortfolioReviewValues;
}) {
  const [state, formAction, isPending] = useActionState(
    savePortfolioReview,
    initialState,
  );

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-500">دسترسی محدود</p>
        <h2 className="mt-2 text-2xl font-black text-slate-900">ثبت نظر</h2>
      </div>

      <form className="space-y-5" action={formAction}>
        <div>
          <label htmlFor="review-name" className="mb-2 block text-sm font-medium text-slate-700">
            نام
          </label>
          <input
            id="review-name"
            name="name"
            defaultValue={review.name}
            required
            maxLength={100}
            autoComplete="name"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-slate-500 focus:bg-white"
            placeholder="نام شما"
          />
        </div>

        <div>
          <label htmlFor="review-email" className="mb-2 block text-sm font-medium text-slate-700">
            ایمیل
          </label>
          <input
            id="review-email"
            type="email"
            value={review.email}
            readOnly
            autoComplete="email"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-slate-500 focus:bg-white"
          />
        </div>

        <div>
          <label htmlFor="review-message" className="mb-2 block text-sm font-medium text-slate-700">
            پیام
          </label>
          <textarea
            id="review-message"
            name="opinion"
            rows={5}
            defaultValue={review.opinion}
            required
            maxLength={5000}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-slate-500 focus:bg-white"
            placeholder="نظر یا پیشنهاد شما..."
          />
        </div>

        {state.message ? (
          <p
            role={state.status === "error" ? "alert" : "status"}
            className={
              state.status === "error"
                ? "text-sm text-red-600"
                : "text-sm text-green-700"
            }
          >
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending || !review.email}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-700"
        >
          {isPending ? "در حال ثبت..." : review.opinion ? "به‌روزرسانی نظر" : "ارسال نظر"}
        </button>
      </form>
    </div>
  );
}
