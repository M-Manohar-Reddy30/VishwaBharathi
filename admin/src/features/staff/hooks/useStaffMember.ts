"use client";

import { useQuery } from "@tanstack/react-query";

import { getStaffMember } from "../api/staff.api";

export function useStaffMember(id: string) {
  return useQuery({
    queryKey: ["staff", id],
    queryFn: () => getStaffMember(id),
    enabled: !!id,
  });
}