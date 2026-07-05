"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  trashEvent,
  restoreEvent,
  forceDeleteEvent,
} from "../api/event.api";

export function useEventActions() {
  const queryClient = useQueryClient();

  async function trash(id: string) {
    await trashEvent(id);

    toast.success("Event moved to trash.");

    queryClient.invalidateQueries({
      queryKey: ["events"],
    });
  }

  async function restore(id: string) {
    await restoreEvent(id);

    toast.success("Event restored.");

    queryClient.invalidateQueries({
      queryKey: ["events"],
    });
  }

  async function forceDelete(id: string) {
    await forceDeleteEvent(id);

    toast.success("Event permanently deleted.");

    queryClient.invalidateQueries({
      queryKey: ["events"],
    });
  }

  return {
    trash,
    restore,
    forceDelete,
  };
}