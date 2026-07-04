import ProtectedRoute from "@/components/auth/ProtectedRoute";

import {
  Sidebar,
  Header,
  Breadcrumb,
  PageContainer,
} from "@/components/layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>

      <Sidebar />

      <PageContainer>

        <Header />

        <Breadcrumb />

        <div className="p-8">
          {children}
        </div>

      </PageContainer>

    </ProtectedRoute>
  );
}