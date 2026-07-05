"use client";

import { useQuery } from "@tanstack/react-query";

import { getEvents } from "../api/event.api";

export function useEvents(params?: any) {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => getEvents(params),
  });
}