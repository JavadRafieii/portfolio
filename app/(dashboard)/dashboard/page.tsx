import PortfolioForm from "@/components/portfolio/portfolio-form";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black">تنظیمات پروفایل</h1>
      </div>
      <PortfolioForm />
    </div>
  );
}
