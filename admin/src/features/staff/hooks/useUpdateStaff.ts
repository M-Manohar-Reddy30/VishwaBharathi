"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateStaff } from "../api/staff.api";

export function useUpdateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: any;
    }) => updateStaff(id, values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["staff"],
      });
    },
  });
}