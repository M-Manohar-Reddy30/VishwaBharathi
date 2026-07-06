import { PageHeader } from "@/components/admin";

import StaffForm from "@/features/staff/components/StaffForm";

export default function CreateStaffPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Create Staff"
        description="Add a new staff member."
      />

      <StaffForm mode="create" />
    </div>
  );
}