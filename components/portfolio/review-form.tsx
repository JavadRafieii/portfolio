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
    <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="h-1 bg-gradient-to-l from-blue-600 via-sky-400 to-indigo-500" />
      <div className="p-6 sm:p-8">
        <p className="text-sm font-semibold text-blue-700">دیدگاه شما</p>
        <h2 className="mt-2 text-2xl font-black text-slate-900">
          تجربه‌تان را با ما به اشتراک بگذارید
        </h2>
        <p className="mt-3 leading-7 text-slate-600">
          از اینکه برای نوشتن دیدگاه وقت می‌گذارید سپاسگزاریم. نام و متن دیدگاه
          در سایت نمایش داده می‌شود؛ نشانی ایمیل شما عمومی نخواهد شد.
        </p>

        <form className="mt-7 space-y-5" action={formAction}>
          <div>
            <label
              htmlFor="review-name"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              نامی که نمایش داده می‌شود
            </label>
            <input
              id="review-name"
              name="name"
              defaultValue={review.name}
              required
              maxLength={100}
              autoComplete="name"
              aria-describedby="review-name-help"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              placeholder="مثلاً نام کوچک شما"
            />
            <p id="review-name-help" className="mt-2 text-xs leading-5 text-slate-500">
              این نام همراه دیدگاهتان در سایت نشان داده می‌شود.
            </p>
          </div>

          <div>
            <label
              htmlFor="review-email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              ایمیل حساب کاربری
            </label>
            <input
              id="review-email"
              type="email"
              value={review.email}
              readOnly
              autoComplete="email"
              aria-describedby="review-email-help"
              className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-3 py-3 text-left text-slate-500 outline-none"
              dir="ltr"
            />
            <p id="review-email-help" className="mt-2 text-xs leading-5 text-slate-500">
              ایمیل از حساب کاربری شما دریافت شده و در سایت نمایش داده نمی‌شود.
            </p>
          </div>

          <div>
            <label
              htmlFor="review-message"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              دیدگاه شما
            </label>
            <textarea
              id="review-message"
              name="opinion"
              rows={6}
              defaultValue={review.opinion}
              required
              maxLength={5000}
              aria-describedby="review-message-help"
              className="w-full resize-y rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 leading-7 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              placeholder="تجربه‌تان از همکاری یا استفاده از خدمات را بنویسید..."
            />
            <p id="review-message-help" className="mt-2 text-xs leading-5 text-slate-500">
              لطفاً از درج اطلاعات خصوصی خودداری کنید. حداکثر ۵۰۰۰ نویسه.
            </p>
          </div>

          {state.message ? (
            <p
              role={state.status === "error" ? "alert" : "status"}
              className={`rounded-xl border px-4 py-3 text-sm ${
                state.status === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-emerald-200 bg-emerald-50 text-emerald-800"
              }`}
            >
              {state.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isPending || !review.email}
            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending
              ? "در حال ذخیرهٔ دیدگاه..."
              : review.opinion
                ? "ذخیرهٔ تغییرات"
                : "ثبت دیدگاه"}
          </button>
        </form>
      </div>
    </div>
  );
}
