"use client";

import { useRouter } from "next/navigation";

import { Toolbar, SearchInput } from "@/components/admin";
import { Button } from "@/components/ui";

interface StaffToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function StaffToolbar({
  search,
  onSearchChange,
}: StaffToolbarProps) {
  const router = useRouter();

  return (
    <Toolbar>
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search staff..."
      />

      <Button
        onClick={() => router.push("/staff/create")}
      >
        + New Staff
      </Button>
    </Toolbar>
  );
}