import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { auth } from "@/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type PortfolioReviewValues = {
  email: string;
  name: string;
  opinion: string;
};

export type PortfolioReview = {
  id: string;
  name: string;
  opinion: string;
};

export async function getPortfolioReviews(): Promise<PortfolioReview[]> {
  "use cache";

  cacheLife("hours");
  cacheTag("portfolio-reviews");

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("portfolio_reviews")
    .select("id, name, opinion")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load portfolio reviews: ${error.message}`);
  }

  return data;
}

export async function getPortfolioReviewForCurrentUser(): Promise<PortfolioReviewValues> {
  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase();

  if (!email) {
    return {
      email: "",
      name: session?.user?.name ?? "",
      opinion: "",
    };
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("portfolio_reviews")
    .select("email, name, opinion")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load portfolio review: ${error.message}`);
  }

  return {
    email,
    name: data?.name ?? session?.user?.name ?? "",
    opinion: data?.opinion ?? "",
  };
}
