export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full relative flex justify-center py-6 md:py-10">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
}
