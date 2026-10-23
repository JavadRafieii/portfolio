import Navigation from "@/components/layout/navigation";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}