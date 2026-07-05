import api from "@/lib/api";

import { ENDPOINTS } from "@/constants/endpoints";

import type { ApiResponse } from "@/types/api.types";
import type { PaginatedResponse } from "@/types/pagination.types";
import type { QueryParams } from "@/types/query.types";

import type {
  Gallery,
} from "../types/gallery.types";

import type {
  GalleryFormValues,
} from "../schemas/gallery.schema";
import type { GalleryStats } from "../types/gallery.stats";

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

export async function getGallery(
  params?: QueryParams
) {
  const response =
    await api.get<
      PaginatedResponse<Gallery>
    >(
      ENDPOINTS.GALLERY,
      {
        params,
      }
    );

  return response.data;
}

/*
|--------------------------------------------------------------------------
| Trash
|--------------------------------------------------------------------------
*/

export async function getTrashGallery() {
  const response =
    await api.get<
      ApiResponse<Gallery[]>
    >(
      `${ENDPOINTS.GALLERY}/trash`
    );

  return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Detail
|--------------------------------------------------------------------------
*/

export async function getGalleryItem(
  id: string
) {
  const response =
    await api.get<
      ApiResponse<Gallery>
    >(
      `${ENDPOINTS.GALLERY}/${id}`
    );

  return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

export async function createGallery(
  payload: GalleryFormValues
) {
  const response =
    await api.post<
      ApiResponse<Gallery>
    >(
      ENDPOINTS.GALLERY,
      payload
    );

  return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

export async function updateGallery(
  id: string,
  payload: GalleryFormValues
) {
  const response =
    await api.put<
      ApiResponse<Gallery>
    >(
      `${ENDPOINTS.GALLERY}/${id}`,
      payload
    );

  return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Trash
|--------------------------------------------------------------------------
*/

export async function trashGallery(
  id: string
) {
  const response =
    await api.delete<
      ApiResponse<Gallery>
    >(
      `${ENDPOINTS.GALLERY}/${id}`
    );

  return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Restore
|--------------------------------------------------------------------------
*/

export async function restoreGallery(
  id: string
) {
  const response =
    await api.patch<
      ApiResponse<Gallery>
    >(
      `${ENDPOINTS.GALLERY}/${id}/restore`
    );

  return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Force Delete
|--------------------------------------------------------------------------
*/

export async function forceDeleteGallery(
  id: string
) {
  await api.delete(
    `${ENDPOINTS.GALLERY}/${id}/force`
  );
}

/*
|--------------------------------------------------------------------------
| Gallery Stats
|--------------------------------------------------------------------------
*/

export async function getGalleryStats() {
  const response =
    await api.get<ApiResponse<GalleryStats>>(
      `${ENDPOINTS.GALLERY}/stats`
    );

  return response.data.data;
}