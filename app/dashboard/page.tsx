import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="mt-36">در حال بارگذاری داشبورد...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

async function DashboardContent() {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/");

  return (
    <div className="mt-36">
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard, {user.name ?? user.email}!</p>
    </div>
  );
}
