"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateEvent } from "../api/event.api";

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: any;
    }) => updateEvent(id, values),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });
}