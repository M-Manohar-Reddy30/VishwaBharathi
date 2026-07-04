"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";

interface SidebarItemProps {
  title: string;
  href: string;
  icon: LucideIcon;
}

export default function SidebarItem({
  title,
  href,
  icon: Icon,
}: SidebarItemProps) {
  const pathname = usePathname();

  const active =
    pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex h-11 items-center gap-3 rounded-xl px-4 text-sm font-medium transition-all",

        active
          ? "bg-blue-600 text-white shadow"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      <Icon size={20} />

      <span>{title}</span>
    </Link>
  );
}