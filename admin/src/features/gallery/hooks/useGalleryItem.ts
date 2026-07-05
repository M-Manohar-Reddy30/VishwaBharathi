"use client";

import { useQuery } from "@tanstack/react-query";

import { getGalleryItem } from "../api/gallery.api";
import { GALLERY_QUERY_KEYS } from "../constants/gallery.constants";

export function useGalleryItem(id: string) {
  return useQuery({
    queryKey: GALLERY_QUERY_KEYS.detail(id),
    queryFn: () => getGalleryItem(id),
    enabled: !!id,
  });
}