import api from "@/lib/api";

import { ENDPOINTS } from "@/constants/endpoints";

import type {
    Hero,
} from "../types/hero.types";

import type {
    QueryParams,
} from "@/types/query.types";

import type {
    PaginatedResponse,
} from "@/types/pagination.types";

export async function getHeroes(
    params?: QueryParams
) {
    const response =
        await api.get<
            PaginatedResponse<Hero>
        >(
            ENDPOINTS.HERO,
            {
                params,
            }
        );

    return response.data;
}