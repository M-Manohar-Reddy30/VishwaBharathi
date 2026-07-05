"use client";

import { useQuery } from "@tanstack/react-query";

import { getEventStats } from "../api/event.api";

export function useEventStats() {
  return useQuery({
    queryKey: ["events", "stats"],
    queryFn: getEventStats,
  });
}