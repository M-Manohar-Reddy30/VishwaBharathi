"use client";

import {
  DataTable,
  TableHead,
  StatusBadge,
} from "@/components/admin";

import type {
  Hero,
} from "../types/hero.types";

import type {
  PaginationMeta,
} from "@/types/pagination.types";

interface HeroTableProps {
  heroes: Hero[];

  pagination: PaginationMeta;

  loading: boolean;

  onPageChange: (
    page: number
  ) => void;
}

export default function HeroTable({
  heroes,
  pagination,
  loading,
  onPageChange,
}: HeroTableProps) {
  return (
    <DataTable
      loading={loading}
      empty={heroes.length === 0}
      emptyTitle="No Hero Banners"
      emptyDescription="Create your first hero banner."

      page={pagination.page}
      totalPages={pagination.totalPages}
      onPageChange={onPageChange}
    >
      <TableHead
        columns={[
          "Title",
          "Status",
          "Order",
          "Updated",
          "Actions",
        ]}
      />

      <tbody>

        {heroes.map((hero) => (

          <tr
            key={hero._id}
            className="border-t"
          >
            <td className="px-6 py-4 font-medium">
              {hero.title}
            </td>

            <td className="px-6 py-4">
              <StatusBadge
                status={hero.status}
              />
            </td>

            <td className="px-6 py-4">
              {hero.displayOrder}
            </td>

            <td className="px-6 py-4">
              {new Date(
                hero.updatedAt
              ).toLocaleDateString()}
            </td>

            <td className="px-6 py-4">
              Edit
            </td>

          </tr>

        ))}

      </tbody>

    </DataTable>
  );
}