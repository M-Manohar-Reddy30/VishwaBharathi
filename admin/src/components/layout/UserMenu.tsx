"use client";

import { LogOut } from "lucide-react";

import useAuth from "@/features/auth/hooks/useAuth";

export default function UserMenu() {
  const {
    admin,
    logout,
  } = useAuth();

  return (
    <div className="flex items-center gap-4">

      <div className="text-right">
        <p className="text-sm font-semibold">
          {admin?.fullName}
        </p>

        <p className="text-xs text-slate-500">
          {admin?.email}
        </p>
      </div>

      <button
        onClick={logout}
        className="rounded-lg border p-2 transition hover:bg-slate-100"
      >
        <LogOut size={18} />
      </button>

    </div>
  );
}