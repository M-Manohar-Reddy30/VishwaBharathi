"use client";

import { useRouter } from "next/navigation";

import ActionMenu from "@/components/admin/action/ActionMenu";

import { useHeroActions } from "../hooks/useHeroActions";

interface HeroActionsProps {
  heroId: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  trashed?: boolean;
}

export default function HeroActions({
  heroId,
  status,
  trashed = false,
}: HeroActionsProps) {
  const router = useRouter();

  const actions = useHeroActions();

  const items = [
    {
      label: "Edit",
      onClick: () =>
        router.push(`/hero/${heroId}/edit`),
    },
  ];

  if (!trashed) {
    if (status !== "PUBLISHED") {
      items.push({
        label: "Publish",
        onClick: () => actions.publish(heroId),
      });
    }

    if (status !== "ARCHIVED") {
      items.push({
        label: "Archive",
        onClick: () => actions.archive(heroId),
      });
    }

    items.push({
      label: "Move to Trash",
      danger: true,
      onClick: () => actions.trash(heroId),
    });
  } else {
    items.push({
      label: "Restore",
      onClick: () => actions.restore(heroId),
    });

    items.push({
      label: "Delete Permanently",
      danger: true,
      onClick: () => actions.forceDelete(heroId),
    });
  }

  return <ActionMenu items={items} />;
}