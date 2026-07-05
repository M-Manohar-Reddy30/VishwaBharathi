"use client";

import { useQuery } from "@tanstack/react-query";

import { getTrashGallery } from "../api/gallery.api";

import { GALLERY_QUERY_KEYS } from "../constants/gallery.constants";

export function useTrashGallery() {
  return useQuery({
    queryKey: GALLERY_QUERY_KEYS.trash,
    queryFn: getTrashGallery,
  });
}