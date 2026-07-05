"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createGallery } from "../api/gallery.api";
import { GALLERY_QUERY_KEYS } from "../constants/gallery.constants";

export function useCreateGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGallery,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GALLERY_QUERY_KEYS.all,
      });
    },
  });
}