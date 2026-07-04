"use client";

import { useQuery } from "@tanstack/react-query";

import { getHero } from "../api/hero.api";
import { HERO_QUERY_KEYS } from "../constants/hero.constants";

export function useHero(id: string) {
  return useQuery({
    queryKey: HERO_QUERY_KEYS.detail(id),
    queryFn: () => getHero(id),
    enabled: !!id,
  });
}