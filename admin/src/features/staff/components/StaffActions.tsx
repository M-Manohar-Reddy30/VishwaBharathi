"use client";

import { useRouter } from "next/navigation";

import ActionMenu from "@/components/admin/action/ActionMenu";

import { useStaffActions } from "../hooks/useStaffActions";

interface StaffActionsProps {
  staffId: string;
  trashed?: boolean;
}

export default function StaffActions({
  staffId,
  trashed = false,
}: StaffActionsProps) {
  const router = useRouter();

  const actions = useStaffActions();

  if (trashed) {
    return (
      <ActionMenu
        items={[
          {
            label: "Restore",
            onClick: () => actions.restore(staffId),
          },
          {
            label: "Delete Permanently",
            danger: true,
            onClick: () =>
              actions.forceDelete(staffId),
          },
        ]}
      />
    );
  }

  return (
    <ActionMenu
      items={[
        {
          label: "Edit",
          onClick: () =>
            router.push(`/staff/${staffId}/edit`),
        },
        {
          label: "Move to Trash",
          danger: true,
          onClick: () => actions.trash(staffId),
        },
      ]}
    />
  );
}