"use client";

import { useQuery } from "@tanstack/react-query";

import { getEvent } from "../api/event.api";

export function useEvent(id: string) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
    enabled: !!id,
  });
}