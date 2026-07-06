"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createNotice } from "../api/notice.api";

export function useCreateNotice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNotice,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notices"],
      });
    },
  });
}