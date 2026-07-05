"use client";

import Image from "next/image";

import {
  DataTable,
  TableHead,
  StatusBadge,
} from "@/components/admin";

import type { Gallery } from "../types/gallery.types";
import type { PaginationMeta } from "@/types/pagination.types";

import GalleryActions from "./GalleryActions";

interface GalleryTableProps {
  gallery: Gallery[];
  pagination: PaginationMeta;
  loading: boolean;
  onPageChange: (page: number) => void;
  trashed?: boolean;
}

export default function GalleryTable({
  gallery,
  pagination,
  loading,
  onPageChange,
  trashed = false,
}: GalleryTableProps) {
  return (
    <DataTable
      loading={loading}
      empty={gallery.length === 0}
      emptyTitle="No Gallery Images"
      emptyDescription="Create your first gallery image."
      page={pagination.page}
      totalPages={pagination.totalPages}
      onPageChange={onPageChange}
    >
      <TableHead
        columns={[
          "Image",
          "Title",
          "Category",
          "Status",
          "Order",
          "Actions",
        ]}
      />

      <tbody>
        {gallery.map((item) => (
          <tr
            key={item._id}
            className="border-t hover:bg-slate-50"
          >
            <td className="px-6 py-4">
              <Image
                src={item.image.url}
                alt={item.title}
                width={80}
                height={60}
                className="rounded-lg object-cover"
              />
            </td>

            <td className="px-6 py-4">
              {item.title}
            </td>

            <td className="px-6 py-4">
              {item.category}
            </td>

            <td className="px-6 py-4">
              <StatusBadge
                status={item.status}
              />
            </td>

            <td className="px-6 py-4">
              {item.displayOrder}
            </td>

            <td className="px-6 py-4">
              <GalleryActions
                galleryId={item._id}
                trashed={trashed}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </DataTable>
  );
}