"use client";

import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  function getPages() {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4",
        className
      )}
    >
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>

      <div className="flex items-center gap-2">
        {getPages().map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-slate-500"
              >
                ...
              </span>
            );
          }

          return (
            <Button
              key={item}
              size="sm"
              variant={
                item === page
                  ? "primary"
                  : "outline"
              }
              onClick={() => onPageChange(item)}
            >
              {item}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}