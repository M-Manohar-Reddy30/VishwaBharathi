"use client";

import { useQuery } from "@tanstack/react-query";

import { getTrashStaff } from "../api/staff.api";

export function useTrashStaff() {
  return useQuery({
    queryKey: ["staff", "trash"],
    queryFn: getTrashStaff,
  });
}