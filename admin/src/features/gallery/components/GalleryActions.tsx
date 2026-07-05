"use client";

import { useRouter } from "next/navigation";

import ActionMenu from "@/components/admin/action/ActionMenu";

import { useGalleryActions } from "../hooks/useGalleryActions";

interface GalleryActionsProps {
  galleryId: string;
  trashed?: boolean;
}

export default function GalleryActions({
  galleryId,
  trashed = false,
}: GalleryActionsProps) {
  const router = useRouter();

  const actions = useGalleryActions();

  if (trashed) {
    return (
      <ActionMenu
        items={[
          {
            label: "Restore",
            onClick: () =>
              actions.restore(galleryId),
          },
          {
            label: "Delete Permanently",
            danger: true,
            onClick: () =>
              actions.forceDelete(galleryId),
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
              `/gallery/${galleryId}/edit`
            ),
        },
        {
          label: "Move to Trash",
          danger: true,
          onClick: () =>
            actions.trash(galleryId),
        },
      ]}
    />
  );
}