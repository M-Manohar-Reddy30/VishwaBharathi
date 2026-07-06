"use client";

import { useQuery } from "@tanstack/react-query";

import { getStaff } from "../api/staff.api";

export function useStaff(params?: any) {
  return useQuery({
    queryKey: ["staff", params],
    queryFn: () => getStaff(params),
  });
}