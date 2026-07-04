"use client";

import { useQuery } from "@tanstack/react-query";

import { getHeroes } from "../api/hero.api";

import {
    HERO_QUERY_KEY,
} from "../constants/hero.constants";

import type {
    QueryParams,
} from "@/types/query.types";

export function useHeroes(
    params?: QueryParams
) {
    return useQuery({

        queryKey: [
            ...HERO_QUERY_KEY,
            params,
        ],

        queryFn: () =>
            getHeroes(params),

    });
}