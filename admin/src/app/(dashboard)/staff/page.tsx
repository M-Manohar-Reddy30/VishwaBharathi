"use client";

import { useState } from "react";

import { PageHeader } from "@/components/admin";

import StaffToolbar from "@/features/staff/components/StaffToolbar";
import StaffTable from "@/features/staff/components/StaffTable";
import StaffTabs from "@/features/staff/components/StaffTabs";

import { useStaff } from "@/features/staff/hooks/useStaff";
import { useTrashStaff } from "@/features/staff/hooks/useTrashStaff";
import { useStaffStats } from "@/features/staff/hooks/useStaffStats";

export default function StaffPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const staff = useStaff({
    page,
    limit: 10,
    search: search || undefined,
    status:
      status === "all" || status === "trash"
        ? undefined
        : status,
  });

  const trashStaff = useTrashStaff();

  const stats = useStaffStats();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Staff"
        description="Manage school staff."
      />

      <StaffTabs
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
        <StaffToolbar
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
      )}

      <StaffTable
        staff={
          status === "trash"
            ? trashStaff.data ?? []
            : staff.data?.data ?? []
        }
        pagination={
          staff.data?.pagination ?? {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1,
          }
        }
        loading={
          status === "trash"
            ? trashStaff.isLoading
            : staff.isLoading
        }
        trashed={status === "trash"}
        onPageChange={setPage}
      />
    </div>
  );
}