"use client";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import {
  trashNotice,
  restoreNotice,
  forceDeleteNotice,
} from "../api/notice.api";

export function useNoticeActions() {
  const queryClient = useQueryClient();

  async function trash(id: string) {
    await trashNotice(id);

    toast.success(
      "Notice moved to trash."
    );

    queryClient.invalidateQueries({
      queryKey: ["notices"],
    });
  }

  async function restore(id: string) {
    await restoreNotice(id);

    toast.success(
      "Notice restored."
    );

    queryClient.invalidateQueries({
      queryKey: ["notices"],
    });
  }

  async function forceDelete(id: string) {
    await forceDeleteNotice(id);

    toast.success(
      "Notice permanently deleted."
    );

    queryClient.invalidateQueries({
      queryKey: ["notices"],
    });
  }

  return {
    trash,
    restore,
    forceDelete,
  };
}