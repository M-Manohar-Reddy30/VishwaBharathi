"use client";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import {
  trashGallery,
  restoreGallery,
  forceDeleteGallery,
} from "../api/gallery.api";

import { GALLERY_QUERY_KEYS } from "../constants/gallery.constants";

export function useGalleryActions() {
  const queryClient = useQueryClient();

  async function refresh() {
    await queryClient.invalidateQueries({
      queryKey: GALLERY_QUERY_KEYS.all,
    });

    await queryClient.invalidateQueries({
      queryKey: GALLERY_QUERY_KEYS.trash,
    });
  }

  async function trash(id: string) {
    await trashGallery(id);

    toast.success("Image moved to trash.");

    await refresh();
  }

  async function restore(id: string) {
    await restoreGallery(id);

    toast.success("Image restored successfully.");

    await refresh();
  }

  async function forceDelete(id: string) {
    await forceDeleteGallery(id);

    toast.success("Image permanently deleted.");

    await refresh();
  }

  return {
    trash,
    restore,
    forceDelete,
  };
}