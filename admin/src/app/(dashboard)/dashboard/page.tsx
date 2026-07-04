import { Card } from "@/components/ui";

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <Card>
        <h2 className="text-lg font-semibold">
          Welcome 👋
        </h2>

        <p className="mt-2 text-slate-500">
          Vishwa Bharathi CMS Dashboard
        </p>
      </Card>

    </div>
  );
}