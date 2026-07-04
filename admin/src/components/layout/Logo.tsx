import Link from "next/link";

import { UI } from "@/constants/ui";

export default function Logo() {
  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-3"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
        VB
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900">
          Vishwa Bharathi
        </h2>

        <p className="text-xs text-slate-500">
          {UI.appName}
        </p>
      </div>
    </Link>
  );
}