"use client";

import { useQuery } from "@tanstack/react-query";

import { getTrashNotices } from "../api/notice.api";

export function useTrashNotices() {
  return useQuery({
    queryKey: ["notices", "trash"],
    queryFn: getTrashNotices,
  });
}