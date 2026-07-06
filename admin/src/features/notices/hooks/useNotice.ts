"use client";

import { useQuery } from "@tanstack/react-query";

import { getNotice } from "../api/notice.api";

export function useNotice(id: string) {
  return useQuery({
    queryKey: ["notice", id],
    queryFn: () => getNotice(id),
    enabled: !!id,
  });
}