"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateHero } from "../api/hero.api";
import { HERO_QUERY_KEYS } from "../constants/hero.constants";

export function useUpdateHero() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: any;
    }) =>
      updateHero(id, values),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: HERO_QUERY_KEYS.all,
      });

      queryClient.invalidateQueries({
        queryKey: HERO_QUERY_KEYS.detail(
          variables.id
        ),
      });
    },
  });
}