import "server-only";

import { auth } from "@/auth";

export async function isPortfolioAdmin() {
  const adminEmail = process.env.PORTFOLIO_ADMIN_EMAIL?.trim().toLowerCase();
  const session = await auth();
  const userEmail = session?.user?.email?.trim().toLowerCase();

  return Boolean(adminEmail && userEmail && userEmail === adminEmail);
};