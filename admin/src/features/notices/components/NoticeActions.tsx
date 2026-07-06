"use client";

import { useRouter } from "next/navigation";

import ActionMenu from "@/components/admin/action/ActionMenu";

import { useNoticeActions } from "../hooks/useNoticeActions";

interface NoticeActionsProps {
  noticeId: string;
  trashed?: boolean;
}

export default function NoticeActions({
  noticeId,
  trashed = false,
}: NoticeActionsProps) {
  const router = useRouter();

  const actions = useNoticeActions();

  if (trashed) {
    return (
      <ActionMenu
        items={[
          {
            label: "Restore",
            onClick: () =>
              actions.restore(noticeId),
          },
          {
            label: "Delete Permanently",
            danger: true,
            onClick: () =>
              actions.forceDelete(noticeId),
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
            router.push(
              `/notices/${noticeId}/edit`
            ),
        },
        {
          label: "Move to Trash",
          danger: true,
          onClick: () =>
            actions.trash(noticeId),
        },
      ]}
    />
  );
}