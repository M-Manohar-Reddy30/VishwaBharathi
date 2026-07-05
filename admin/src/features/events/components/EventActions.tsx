"use client";

import { useRouter } from "next/navigation";

import ActionMenu from "@/components/admin/action/ActionMenu";

import { useEventActions } from "../hooks/useEventActions";

interface EventActionsProps {
  eventId: string;
  trashed?: boolean;
}

export default function EventActions({
  eventId,
  trashed = false,
}: EventActionsProps) {
  const router = useRouter();

  const actions = useEventActions();

  if (trashed) {
    return (
      <ActionMenu
        items={[
          {
            label: "Restore",
            onClick: () => actions.restore(eventId),
          },
          {
            label: "Delete Permanently",
            danger: true,
            onClick: () =>
              actions.forceDelete(eventId),
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
            router.push(`/events/${eventId}/edit`),
        },
        {
          label: "Move to Trash",
          danger: true,
          onClick: () => actions.trash(eventId),
        },
      ]}
    />
  );
}