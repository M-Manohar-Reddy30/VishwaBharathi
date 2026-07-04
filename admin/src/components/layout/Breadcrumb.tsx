"use client";

import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();

  const page =
    pathname.split("/").filter(Boolean).pop() ??
    "Dashboard";

  return (
    <div>
      <p className="text-sm text-slate-500">
        Vishwa Bharathi CMS
      </p>

      <h1 className="text-3xl font-bold capitalize">
        {page}
      </h1>
    </div>
  );
}