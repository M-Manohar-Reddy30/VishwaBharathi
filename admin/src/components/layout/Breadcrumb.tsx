"use client";

import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean);

  return (
    <div className="border-b border-slate-200 bg-white px-8 py-3 text-sm text-slate-500">
      {segments.length === 0
        ? "Dashboard"
        : segments
            .map(
              (segment) =>
                segment.charAt(0).toUpperCase() +
                segment.slice(1)
            )
            .join(" / ")}
    </div>
  );
}