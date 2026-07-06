"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateNotice } from "../api/notice.api";

export function useUpdateNotice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: any;
    }) => updateNotice(id, values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notices"],
      });
    },
  });
}