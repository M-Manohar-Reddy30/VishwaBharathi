"use client";

import { useQuery } from "@tanstack/react-query";

import { getNoticeStats } from "../api/notice.api";

export function useNoticeStats() {
  return useQuery({
    queryKey: ["notice", "stats"],
    queryFn: getNoticeStats,
  });
}