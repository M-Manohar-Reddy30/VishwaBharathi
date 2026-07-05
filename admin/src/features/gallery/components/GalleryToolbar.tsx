"use client";

import { useRouter } from "next/navigation";

import { Toolbar, SearchInput } from "@/components/admin";
import { Button } from "@/components/ui";

interface GalleryToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function GalleryToolbar({
  search,
  onSearchChange,
}: GalleryToolbarProps) {
  const router = useRouter();

  return (
    <Toolbar>
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search gallery..."
      />

      <Button
        onClick={() => router.push("/gallery/create")}
      >
        + Add Image
      </Button>
    </Toolbar>
  );
}