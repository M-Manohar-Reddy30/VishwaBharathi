"use client";

import { notFound, useParams } from "next/navigation";

import { PageHeader } from "@/components/admin";

import StaffForm from "@/features/staff/components/StaffForm";
import { useStaffMember } from "@/features/staff/hooks/useStaffMember";

export default function EditStaffPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data: staff,
    isLoading,
    isError,
  } = useStaffMember(id);

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Loading staff member...
      </div>
    );
  }

  if (isError || !staff) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit Staff"
        description="Update staff information."
      />

      <StaffForm
        mode="edit"
        staff={staff}
      />
    </div>
  );
}