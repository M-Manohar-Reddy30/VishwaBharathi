"use client";

import { useQuery } from "@tanstack/react-query";

import { getTrashHeroes } from "../api/hero.api";

export function useTrashHeroes() {
  return useQuery({
    queryKey: ["hero-trash"],

    queryFn: getTrashHeroes,
  });
}