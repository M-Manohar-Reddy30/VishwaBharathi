"use client";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import {
  trashStaff,
  restoreStaff,
  forceDeleteStaff,
} from "../api/staff.api";

export function useStaffActions() {
  const queryClient = useQueryClient();

  async function trash(id: string) {
    await trashStaff(id);

    toast.success(
      "Staff member moved to trash."
    );

    queryClient.invalidateQueries({
      queryKey: ["staff"],
    });
  }

  async function restore(id: string) {
    await restoreStaff(id);

    toast.success(
      "Staff member restored."
    );

    queryClient.invalidateQueries({
      queryKey: ["staff"],
    });
  }

  async function forceDelete(id: string) {
    await forceDeleteStaff(id);

    toast.success(
      "Staff member permanently deleted."
    );

    queryClient.invalidateQueries({
      queryKey: ["staff"],
    });
  }

  return {
    trash,
    restore,
    forceDelete,
  };
}