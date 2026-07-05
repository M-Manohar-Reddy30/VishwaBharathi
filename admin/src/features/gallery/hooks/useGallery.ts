"use client";

import { useQuery } from "@tanstack/react-query";

import { getGallery } from "../api/gallery.api";
import { GALLERY_QUERY_KEYS } from "../constants/gallery.constants";

import type { QueryParams } from "@/types/query.types";

export function useGallery(params?: QueryParams) {
  return useQuery({
    queryKey: GALLERY_QUERY_KEYS.list(params),
    queryFn: () => getGallery(params),
  });
}