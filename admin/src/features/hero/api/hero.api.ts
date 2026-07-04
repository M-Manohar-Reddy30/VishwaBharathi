import api from "@/lib/api";

import { ENDPOINTS } from "@/constants/endpoints";

import type { ApiResponse } from "@/types/api.types";
import type { PaginatedResponse } from "@/types/pagination.types";
import type { QueryParams } from "@/types/query.types";

import type { Hero } from "../types/hero.types";
import type { HeroFormValues } from "../schemas/hero.schema";
import type { HeroStats } from "../types/hero.stats";

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

export async function getHeroes(
  params?: QueryParams
) {
  const response =
    await api.get<PaginatedResponse<Hero>>(
      ENDPOINTS.HERO,
      {
        params,
      }
    );

  return response.data;
}

/*
|--------------------------------------------------------------------------
| Detail
|--------------------------------------------------------------------------
*/

export async function getHero(id: string) {
  const response =
    await api.get<ApiResponse<Hero>>(
      `${ENDPOINTS.HERO}/${id}`
    );

  return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

export async function createHero(
  payload: HeroFormValues
) {
  const cleanedPayload = {
    ...payload,

    subtitle: payload.subtitle || undefined,

    description: payload.description || undefined,

    publishedAt:
      payload.publishedAt || undefined,

    expiresAt:
      payload.expiresAt || undefined,

    seo: payload.seo
      ? {
          ...payload.seo,

          metaTitle:
            payload.seo.metaTitle || undefined,

          metaDescription:
            payload.seo.metaDescription || undefined,

          canonicalUrl:
            payload.seo.canonicalUrl || undefined,

          ogImage:
            payload.seo.ogImage || undefined,
        }
      : undefined,
  };

  const response =
    await api.post(
      ENDPOINTS.HERO,
      cleanedPayload
    );

  return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

export async function updateHero(
  id: string,
  payload: HeroFormValues
) {
  const response =
    await api.put<ApiResponse<Hero>>(
      `${ENDPOINTS.HERO}/${id}`,
      payload
    );

  return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Publish
|--------------------------------------------------------------------------
*/

export async function publishHero(id: string) {
  const response = await api.patch<ApiResponse<Hero>>(
    `${ENDPOINTS.HERO}/${id}/publish`
  );

  return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Archive
|--------------------------------------------------------------------------
*/

export async function archiveHero(id: string) {
  const response = await api.patch<ApiResponse<Hero>>(
    `${ENDPOINTS.HERO}/${id}/archive`
  );

  return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Trash
|--------------------------------------------------------------------------
*/

export async function trashHero(id: string) {
  const response = await api.patch<ApiResponse<Hero>>(
    `${ENDPOINTS.HERO}/${id}/trash`
  );

  return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Restore
|--------------------------------------------------------------------------
*/

export async function restoreHero(id: string) {
  const response = await api.patch<ApiResponse<Hero>>(
    `${ENDPOINTS.HERO}/${id}/restore`
  );

  return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Force Delete
|--------------------------------------------------------------------------
*/

export async function forceDeleteHero(id: string) {
  await api.delete(
    `${ENDPOINTS.HERO}/${id}/force`
  );
}

/*
|--------------------------------------------------------------------------
| Delete (Soft Delete)
|--------------------------------------------------------------------------
*/

export async function deleteHero(
  id: string
) {
  return api.delete(
    `${ENDPOINTS.HERO}/${id}`
  );
}

/*
|--------------------------------------------------------------------------
| Trash Heroes
|--------------------------------------------------------------------------
*/

export async function getTrashHeroes() {
  const response =
    await api.get<ApiResponse<Hero[]>>(
      `${ENDPOINTS.HERO}/trash`
    );

  return response.data.data;
}

export async function getHeroStats() {
  const response =
    await api.get<ApiResponse<HeroStats>>(
      `${ENDPOINTS.HERO}/stats`
    );

  return response.data.data;
}