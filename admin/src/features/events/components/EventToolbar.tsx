"use client";

import { useRouter } from "next/navigation";

import { Toolbar, SearchInput } from "@/components/admin";
import { Button } from "@/components/ui";

interface EventToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function EventToolbar({
  search,
  onSearchChange,
}: EventToolbarProps) {
  const router = useRouter();

  return (
    <Toolbar>
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search events..."
      />

      <Button
        onClick={() => router.push("/events/create")}
      >
        + New Event
      </Button>
    </Toolbar>
  );
}