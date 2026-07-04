"use client";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import {
  publishHero,
  archiveHero,
  trashHero,
  restoreHero,
  forceDeleteHero,
} from "../api/hero.api";

import { HERO_QUERY_KEYS } from "../constants/hero.constants";

export function useHeroActions() {
  const queryClient = useQueryClient();

  async function refresh() {
    await queryClient.invalidateQueries({
      queryKey: HERO_QUERY_KEYS.all,
    });
  }

  async function publish(id: string) {
    await publishHero(id);

    toast.success("Hero published successfully.");

    refresh();
  }

  async function archive(id: string) {
    await archiveHero(id);

    toast.success("Hero archived successfully.");

    refresh();
  }

  async function trash(id: string) {
    await trashHero(id);

    toast.success("Hero moved to trash.");

    refresh();
  }

  async function restore(id: string) {
    await restoreHero(id);

    toast.success("Hero restored successfully.");

    refresh();
  }

  async function forceDelete(id: string) {
    await forceDeleteHero(id);

    toast.success("Hero permanently deleted.");

    refresh();
  }

  return {
    publish,
    archive,
    trash,
    restore,
    forceDelete,
  };
}