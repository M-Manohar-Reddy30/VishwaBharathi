"use client";

import { useState } from "react";

import { PageHeader } from "@/components/admin";

import HeroToolbar from "@/features/hero/components/HeroToolbar";
import HeroTable from "@/features/hero/components/HeroTable";

import { useHeroes } from "@/features/hero/hooks/useHeroes";

export default function HeroPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const {
    data,
    isLoading,
  } = useHeroes({
    page,
    search,
    status,
  });

  return (
    <>

      <PageHeader
        title="Hero Banners"
        description="Manage homepage hero banners."
      />

      <HeroToolbar
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      <HeroTable
        heroes={data?.data ?? []}
        pagination={
          data?.pagination ?? {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1,
          }
        }
        loading={isLoading}
        onPageChange={setPage}
      />

    </>
  );
}