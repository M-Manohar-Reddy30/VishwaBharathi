"use client";

import { useQuery } from "@tanstack/react-query";

import { getTrashEvents } from "../api/event.api";

export function useTrashEvents() {
  return useQuery({
    queryKey: ["events", "trash"],
    queryFn: getTrashEvents,
  });
}