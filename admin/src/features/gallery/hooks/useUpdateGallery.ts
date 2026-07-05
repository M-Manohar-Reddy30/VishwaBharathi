"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateGallery } from "../api/gallery.api";
import { GALLERY_QUERY_KEYS } from "../constants/gallery.constants";

export function useUpdateGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: any;
    }) => updateGallery(id, values),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: GALLERY_QUERY_KEYS.all,
      });

      queryClient.invalidateQueries({
        queryKey: GALLERY_QUERY_KEYS.detail(variables.id),
      });
    },
  });
}