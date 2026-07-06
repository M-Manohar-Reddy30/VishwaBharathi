"use client";

import Image from "next/image";

import {
  DataTable,
  TableHead,
  StatusBadge,
} from "@/components/admin";

import type { Notice } from "../types/notice.types";
import type { PaginationMeta } from "@/types/pagination.types";

import NoticeActions from "./NoticeActions";

interface NoticeTableProps {
  notices: Notice[];
  pagination: PaginationMeta;
  loading: boolean;
  onPageChange: (page: number) => void;
  trashed?: boolean;
}

export default function NoticeTable({
  notices,
  pagination,
  loading,
  onPageChange,
  trashed = false,
}: NoticeTableProps) {
  return (
    <DataTable
      loading={loading}
      empty={notices.length === 0}
      emptyTitle="No Notices"
      emptyDescription="Create your first notice."
      page={pagination.page}
      totalPages={pagination.totalPages}
      onPageChange={onPageChange}
    >
      <TableHead
        columns={[
          "Cover",
          "Title",
          "Publish Date",
          "Status",
          "PDF",
          "Actions",
        ]}
      />

      <tbody>
        {notices.map((notice) => (
          <tr
            key={notice._id}
            className="border-t hover:bg-slate-50"
          >
            <td className="px-6 py-4">
              {notice.coverImage ? (
                <Image
                  src={notice.coverImage.url}
                  alt={notice.title}
                  width={70}
                  height={70}
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-[70px] w-[70px] items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-500">
                  No Image
                </div>
              )}
            </td>

            <td className="px-6 py-4 font-medium">
              {notice.title}
            </td>

            <td className="px-6 py-4">
              {new Date(
                notice.publishDate
              ).toLocaleDateString()}
            </td>

            <td className="px-6 py-4">
              <StatusBadge
                status={notice.status}
              />
            </td>

            <td className="px-6 py-4">
              <a
                href={notice.pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                View PDF
              </a>
            </td>

            <td className="px-6 py-4">
              <NoticeActions
                noticeId={notice._id}
                trashed={trashed}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </DataTable>
  );
}