"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LucideIcon } from "lucide-react";

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
    pathname === href ||
    pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
        active
          ? "bg-blue-600 text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      <Icon size={18} />

      <span>{title}</span>
    </Link>
  );
}