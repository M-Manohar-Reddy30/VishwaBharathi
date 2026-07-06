"use client";

import { useState } from "react";

import { PageHeader } from "@/components/admin";

import NoticeTabs from "@/features/notices/components/NoticeTabs";
import NoticeToolbar from "@/features/notices/components/NoticeToolbar";
import NoticeTable from "@/features/notices/components/NoticeTable";

import { useNotices } from "@/features/notices/hooks/useNotices";
import { useTrashNotices } from "@/features/notices/hooks/useTrashNotices";
import { useNoticeStats } from "@/features/notices/hooks/useNoticeStats";

export default function NoticePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const notices = useNotices({
    page,
    limit: 10,
    search: search || undefined,
    status:
      status === "all" ||
      status === "trash"
        ? undefined
        : status,
  });

  const trash = useTrashNotices();

  const stats = useNoticeStats();

  return (
    <div className="space-y-8">

      <PageHeader
        title="Notices"
        description="Manage school notices."
      />

      <NoticeTabs
        active={status}
        onChange={setStatus}
        stats={
          stats.data ?? {
            total: 0,
            active: 0,
            inactive: 0,
            trash: 0,
          }
        }
      />

      {status !== "trash" && (
        <NoticeToolbar
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
      )}

      <NoticeTable
        notices={
          status === "trash"
            ? trash.data ?? []
            : notices.data?.data ?? []
        }
        pagination={
          notices.data?.pagination ?? {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1,
          }
        }
        loading={
          status === "trash"
            ? trash.isLoading
            : notices.isLoading
        }
        trashed={status === "trash"}
        onPageChange={setPage}
      />

    </div>
  );
}