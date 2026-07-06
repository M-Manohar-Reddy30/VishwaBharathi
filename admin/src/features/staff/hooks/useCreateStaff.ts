"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createStaff } from "../api/staff.api";

export function useCreateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStaff,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["staff"],
      });
    },
  });
}