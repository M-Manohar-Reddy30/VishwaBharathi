"use client";

import { useQuery } from "@tanstack/react-query";

import { getStaffStats } from "../api/staff.api";

export function useStaffStats() {
  return useQuery({
    queryKey: ["staff", "stats"],
    queryFn: getStaffStats,
  });
}