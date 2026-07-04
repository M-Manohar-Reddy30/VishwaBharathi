"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  DataTable,
  TableHead,
  StatusBadge,
} from "@/components/admin";

import HeroActions from "./HeroActions";
import type { Hero } from "../types/hero.types";
import type { PaginationMeta } from "@/types/pagination.types";

interface HeroTableProps {
  heroes: Hero[];

  pagination: PaginationMeta;

  loading: boolean;

  onPageChange: (page: number) => void;

  trashed?: boolean;
}

export default function HeroTable({
  heroes,
  pagination,
  loading,
  onPageChange,
  trashed = false,
}: HeroTableProps) {
  const router = useRouter();

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
          "Image",
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
            className="border-t hover:bg-slate-50 transition-colors"
          >
            {/* Image */}
            <td className="px-6 py-4">
              <div className="overflow-hidden rounded-lg border border-slate-200">
                <Image
                  src={hero.desktopImage.url}
                  alt={hero.title}
                  width={80}
                  height={50}
                  className="h-12 w-20 object-cover"
                />
              </div>
            </td>

            {/* Title */}
            <td className="px-6 py-4">
              <div>
                <p className="font-medium text-slate-900">
                  {hero.title}
                </p>

                {hero.subtitle && (
                  <p className="mt-1 text-sm text-slate-500 line-clamp-1">
                    {hero.subtitle}
                  </p>
                )}
              </div>
            </td>

            {/* Status */}
            <td className="px-6 py-4">
              <StatusBadge status={hero.status} />
            </td>

            {/* Display Order */}
            <td className="px-6 py-4">
              {hero.displayOrder}
            </td>

            {/* Updated */}
            <td className="px-6 py-4 whitespace-nowrap">
              {new Date(hero.updatedAt).toLocaleDateString()}
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
              <HeroActions
                heroId={hero._id}
                status={hero.status}
                trashed={trashed}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </DataTable>
  );
}