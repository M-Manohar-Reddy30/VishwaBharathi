"use client";

import { useQuery } from "@tanstack/react-query";

import { getNotices } from "../api/notice.api";

export function useNotices(params?: any) {
  return useQuery({
    queryKey: ["notices", params],
    queryFn: () => getNotices(params),
  });
}