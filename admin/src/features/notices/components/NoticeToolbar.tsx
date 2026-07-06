"use client";

import { useRouter } from "next/navigation";

import {
  Toolbar,
  SearchInput,
} from "@/components/admin";

import { Button } from "@/components/ui";

interface NoticeToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function NoticeToolbar({
  search,
  onSearchChange,
}: NoticeToolbarProps) {
  const router = useRouter();

  return (
    <Toolbar>
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search notices..."
      />

      <Button
        onClick={() =>
          router.push("/notices/create")
        }
      >
        + New Notice
      </Button>
    </Toolbar>
  );
}