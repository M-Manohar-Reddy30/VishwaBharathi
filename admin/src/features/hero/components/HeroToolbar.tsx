"use client";

import { useRouter } from "next/navigation";

import {
  Toolbar,
  SearchInput,
} from "@/components/admin";

import { Button } from "@/components/ui";

interface HeroToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function HeroToolbar({
  search,
  onSearchChange,
}: HeroToolbarProps) {
  const router = useRouter();

  return (
    <Toolbar>
      <div className="flex items-center gap-4">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search hero..."
        />

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="h-10 rounded-lg border border-slate-300 px-3"
        >
          <option value="">All Status</option>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      <Button
        onClick={() => router.push("/hero/create")}
      >
        + New Hero
      </Button>
    </Toolbar>
  );
}