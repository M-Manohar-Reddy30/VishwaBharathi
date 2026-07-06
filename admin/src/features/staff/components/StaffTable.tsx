"use client";

import Image from "next/image";

import {
  DataTable,
  TableHead,
  StatusBadge,
} from "@/components/admin";

import type { Staff } from "../types/staff.types";
import type { PaginationMeta } from "@/types/pagination.types";

import StaffActions from "./StaffActions";

interface StaffTableProps {
  staff: Staff[];
  pagination: PaginationMeta;
  loading: boolean;
  onPageChange: (page: number) => void;
  trashed?: boolean;
}

export default function StaffTable({
  staff,
  pagination,
  loading,
  onPageChange,
  trashed = false,
}: StaffTableProps) {
  return (
    <DataTable
      loading={loading}
      empty={staff.length === 0}
      emptyTitle="No Staff Members"
      emptyDescription="Create your first staff member."
      page={pagination.page}
      totalPages={pagination.totalPages}
      onPageChange={onPageChange}
    >
      <TableHead
        columns={[
          "Photo",
          "Name",
          "Designation",
          "Department",
          "Status",
          "Actions",
        ]}
      />

      <tbody>
        {staff.map((member) => (
          <tr
            key={member._id}
            className="border-t hover:bg-slate-50"
          >
            <td className="px-6 py-4">
              <Image
                src={member.photo.url}
                alt={member.name}
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
            </td>

            <td className="px-6 py-4 font-medium">
              {member.name}
            </td>

            <td className="px-6 py-4">
              {member.designation}
            </td>

            <td className="px-6 py-4">
              {member.department}
            </td>

            <td className="px-6 py-4">
              <StatusBadge status={member.status} />
            </td>

            <td className="px-6 py-4">
              <StaffActions
                staffId={member._id}
                trashed={trashed}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </DataTable>
  );
}