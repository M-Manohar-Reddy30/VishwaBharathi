"use client";

import { useState } from "react";

import { PageHeader } from "@/components/admin";

import GalleryTabs from "@/features/gallery/components/GalleryTabs";
import GalleryToolbar from "@/features/gallery/components/GalleryToolbar";
import GalleryTable from "@/features/gallery/components/GalleryTable";

import { useGallery } from "@/features/gallery/hooks/useGallery";
import { useGalleryStats } from "@/features/gallery/hooks/useGalleryStats";
import { useTrashGallery } from "@/features/gallery/hooks/useTrashGallery";

export default function GalleryPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const { data: stats, isLoading: statsLoading } =
    useGalleryStats();

  const gallery = useGallery({
    page,
    limit: 10,
    search: search || undefined,
    category:
      activeTab === "all" ||
      activeTab === "trash"
        ? undefined
        : activeTab,
  });

  const trashGallery = useTrashGallery();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gallery"
        description="Manage gallery images."
      />

      <GalleryTabs
        active={activeTab}
        onChange={setActiveTab}
        stats={
          stats ?? {
            total: 0,
            campus: 0,
            event: 0,
            sports: 0,
            academics: 0,
            cultural: 0,
            other: 0,
            trash: 0,
          }
        }
      />

      {activeTab !== "trash" && (
        <GalleryToolbar
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
      )}

      <GalleryTable
        gallery={
          activeTab === "trash"
            ? trashGallery.data ?? []
            : gallery.data?.data ?? []
        }
        pagination={
          gallery.data?.pagination ?? {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1,
          }
        }
        loading={
          statsLoading ||
          (activeTab === "trash"
            ? trashGallery.isLoading
            : gallery.isLoading)
        }
        onPageChange={setPage}
        trashed={activeTab === "trash"}
      />
    </div>
  );
}