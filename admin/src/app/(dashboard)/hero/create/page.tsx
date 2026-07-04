import { PageHeader } from "@/components/admin";

import HeroForm from "@/features/hero/components/HeroForm";

export default function CreateHeroPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Create Hero Banner"
        description="Create a new homepage hero banner."
      />

      <HeroForm mode="create" />
    </div>
  );
}