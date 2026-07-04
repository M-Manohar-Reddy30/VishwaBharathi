import {
  Header,
  PageContainer,
  Sidebar,
} from "@/components/layout";

export default function Home() {
  return (
    <>
      <Sidebar />

      <PageContainer>
        <Header />

        <div className="p-8">
          <h2 className="text-2xl font-bold">
            Dashboard
          </h2>

          <p className="mt-2 text-slate-600">
            Welcome to Vishwa Bharathi Admin.
          </p>
        </div>
      </PageContainer>
    </>
  );
}