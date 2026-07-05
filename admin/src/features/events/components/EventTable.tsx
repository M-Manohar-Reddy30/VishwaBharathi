"use client";

import Image from "next/image";

import {
  DataTable,
  TableHead,
  StatusBadge,
} from "@/components/admin";

import type { Event } from "../types/event.types";
import type { PaginationMeta } from "@/types/pagination.types";

import EventActions from "./EventActions";

interface EventTableProps {
  events: Event[];
  pagination: PaginationMeta;
  loading: boolean;
  onPageChange: (page: number) => void;
  trashed?: boolean;
}

export default function EventTable({
  events,
  pagination,
  loading,
  onPageChange,
  trashed = false,
}: EventTableProps) {
  return (
    <DataTable
      loading={loading}
      empty={events.length === 0}
      emptyTitle="No Events"
      emptyDescription="Create your first event."
      page={pagination.page}
      totalPages={pagination.totalPages}
      onPageChange={onPageChange}
    >
      <TableHead
        columns={[
          "Banner",
          "Title",
          "Category",
          "Venue",
          "Start Date",
          "Status",
          "Actions",
        ]}
      />

      <tbody>
        {events.map((event) => (
          <tr
            key={event._id}
            className="border-t hover:bg-slate-50"
          >
            <td className="px-6 py-4">
              <Image
                src={event.bannerImage.url}
                alt={event.title}
                width={90}
                height={60}
                className="rounded-lg object-cover"
              />
            </td>

            <td className="px-6 py-4 font-medium">
              {event.title}
            </td>

            <td className="px-6 py-4">
              {event.category}
            </td>

            <td className="px-6 py-4">
              {event.venue}
            </td>

            <td className="px-6 py-4">
              {new Date(
                event.startDate
              ).toLocaleDateString()}
            </td>

            <td className="px-6 py-4">
              <StatusBadge
                status={event.status}
              />
            </td>

            <td className="px-6 py-4">
              <EventActions
                eventId={event._id}
                trashed={trashed}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </DataTable>
  );
}