"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";

export default function Header() {
  const { admin } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">

      <div>
        <h1 className="text-lg font-semibold">
          Dashboard
        </h1>
      </div>

      <div className="text-right">
        <p className="font-medium">
          {admin?.fullName}
        </p>

        <p className="text-sm text-slate-500">
          {admin?.email}
        </p>
      </div>

    </header>
  );
}