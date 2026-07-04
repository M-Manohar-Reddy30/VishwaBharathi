"use client";

import { useState } from "react";

import { ContentTabs, PageHeader } from "@/components/admin";

import HeroToolbar from "@/features/hero/components/HeroToolbar";
import HeroTable from "@/features/hero/components/HeroTable";

import { useHeroes } from "@/features/hero/hooks/useHeroes";
import { useTrashHeroes } from "@/features/hero/hooks/useTrashHeroes";
import { useHeroStats } from "@/features/hero/hooks/useHeroStats";

export default function HeroPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const { data: stats } = useHeroStats();

  const isTrash = activeTab === "trash";

  const heroes = useHeroes({
    page,
    limit: 10,
    search: search || undefined,
    status:
      activeTab === "all" || activeTab === "trash"
        ? undefined
        : activeTab.toUpperCase(),
  });

  const trashHeroes = useTrashHeroes();

  if (heroes.isError || trashHeroes.isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700">
          Failed to load hero banners
        </h2>

        <p className="mt-2 text-sm text-red-600">
          Please refresh the page or try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hero Banners"
        description="Manage homepage hero banners."
      />

      <ContentTabs
        active={activeTab}
        onChange={(value) => {
          setActiveTab(value);
          setPage(1);
        }}
        stats={
          stats ?? {
            total: 0,
            published: 0,
            draft: 0,
            archived: 0,
            trash: 0,
          }
        }
      />

      {!isTrash && (
        <HeroToolbar
          search={search}
          onSearchChange={(value) => {
            setPage(1);
            setSearch(value);
          }}
        />
      )}

      <HeroTable
        heroes={
          isTrash
            ? trashHeroes.data ?? []
            : heroes.data?.data ?? []
        }
        pagination={
          heroes.data?.pagination ?? {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1,
          }
        }
        loading={
          isTrash
            ? trashHeroes.isLoading
            : heroes.isLoading
        }
        onPageChange={setPage}
        trashed={isTrash}
      />
    </div>
  );
}