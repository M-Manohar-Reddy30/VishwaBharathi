"use client";

import { useQuery } from "@tanstack/react-query";

import { getHeroStats } from "../api/hero.api";

export function useHeroStats() {
  return useQuery({
    queryKey: ["hero-stats"],
    queryFn: getHeroStats,
  });
}