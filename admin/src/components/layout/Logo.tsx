"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-3"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-md">
        VB
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-900">
          Vishwa Bharathi
        </span>

        <span className="text-xs text-slate-500">
          Admin Portal
        </span>
      </div>
    </Link>
  );
}