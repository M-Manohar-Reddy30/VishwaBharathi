import {
  Header,
  PageContainer,
  Sidebar,
} from "@/components/layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-100">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Header />

        <PageContainer>

          {children}

        </PageContainer>

      </div>

    </div>
  );
}