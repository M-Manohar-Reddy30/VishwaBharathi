"use client";

import { useState } from "react";

import { PageHeader } from "@/components/admin";

import EventToolbar from "@/features/events/components/EventToolbar";
import EventTable from "@/features/events/components/EventTable";
import EventTabs from "@/features/events/components/EventTabs";

import { useEvents } from "@/features/events/hooks/useEvents";
import { useTrashEvents } from "@/features/events/hooks/useTrashEvents";
import { useEventStats } from "@/features/events/hooks/useEventStats";

export default function EventsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const events = useEvents({
    page,
    limit: 10,
    search: search || undefined,
    status:
      status === "all" || status === "trash"
        ? undefined
        : status,
  });

  const trashEvents = useTrashEvents();

  const stats = useEventStats();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Events"
        description="Manage university events."
      />

      <EventTabs
        active={status}
        onChange={setStatus}
        stats={
          stats.data ?? {
            total: 0,
            published: 0,
            draft: 0,
            archived: 0,
            trash: 0,
          }
        }
      />

      {status !== "trash" && (
        <EventToolbar
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
      )}

      <EventTable
        events={
          status === "trash"
            ? trashEvents.data ?? []
            : events.data?.data ?? []
        }
        pagination={
          events.data?.pagination ?? {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1,
          }
        }
        loading={
          status === "trash"
            ? trashEvents.isLoading
            : events.isLoading
        }
        trashed={status === "trash"}
        onPageChange={setPage}
      />
    </div>
  );
}