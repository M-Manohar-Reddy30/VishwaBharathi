"use client";

interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({
  children,
}: PageContainerProps) {
  return (
    <main className="flex-1 overflow-auto bg-slate-50">
      <div className="mx-auto w-full max-w-7xl p-6">
        {children}
      </div>
    </main>
  );
}