"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { HERO_QUERY_KEYS } from "../constants/hero.constants";

interface HeroMutationOptions<T> {
  mutationFn: (id: string) => Promise<T>;
}

export function useHeroMutation<T>({
  mutationFn,
}: HeroMutationOptions<T>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: HERO_QUERY_KEYS.all,
      });
    },
  });
}