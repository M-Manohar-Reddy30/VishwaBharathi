import { PageHeader } from "@/components/admin";

import NoticeForm from "@/features/notices/components/NoticeForm";

export default function CreateNoticePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Create Notice"
        description="Publish a new notice."
      />

      <NoticeForm mode="create" />
    </div>
  );
}