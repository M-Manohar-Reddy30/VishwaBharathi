import EmptyState from "../empty/EmptyState";
import Pagination from "../pagination/Pagination";

import { Spinner } from "@/components/ui";
import { cn } from "@/lib/cn";

interface DataTableProps {
  loading?: boolean;

  empty?: boolean;

  emptyTitle?: string;

  emptyDescription?: string;

  children: React.ReactNode;

  page?: number;

  totalPages?: number;

  onPageChange?: (page: number) => void;

  className?: string;
}

export default function DataTable({
  loading = false,

  empty = false,

  emptyTitle = "No Data",

  emptyDescription = "No records found.",

  children,

  page,

  totalPages,

  onPageChange,

  className,
}: DataTableProps) {
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-slate-200 bg-white">
        <Spinner size={30} />
      </div>
    );
  }

  if (empty) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          {children}
        </table>
      </div>

      {page &&
        totalPages &&
        onPageChange && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
    </div>
  );
}