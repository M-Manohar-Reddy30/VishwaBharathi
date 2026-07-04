"use client";

import { useRouter } from "next/navigation";

import {
  Toolbar,
  SearchInput,
} from "@/components/admin";

import { Button } from "@/components/ui";

interface HeroToolbarProps {
  search: string;
  status: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function HeroToolbar({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: HeroToolbarProps) {
  const router = useRouter();

  return (
    <Toolbar>

      <div className="flex items-center gap-4">

        <SearchInput
          value={search}
          placeholder="Search heroes..."
          onChange={onSearchChange}
        />

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
          className="h-10 rounded-xl border border-slate-300 bg-white px-3"
        >
          <option value="">
            All Status
          </option>

          <option value="PUBLISHED">
            Published
          </option>

          <option value="DRAFT">
            Draft
          </option>

          <option value="ARCHIVED">
            Archived
          </option>

        </select>

      </div>

      <Button
        onClick={() =>
          router.push("/hero/create")
        }
      >
        + New Hero
      </Button>

    </Toolbar>
  );
}