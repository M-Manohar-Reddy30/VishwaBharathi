"use client";

import { useQuery } from "@tanstack/react-query";

import { getGalleryStats } from "../api/gallery.api";

export function useGalleryStats() {
  return useQuery({
    queryKey: ["gallery", "stats"],
    queryFn: getGalleryStats,
  });
}