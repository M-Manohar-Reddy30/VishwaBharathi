"use client";

import { cn } from "@/lib/cn";

type Variant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "default";

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variants = {
  success:
    "bg-green-100 text-green-700",

  warning:
    "bg-amber-100 text-amber-700",

  danger:
    "bg-red-100 text-red-700",

  info:
    "bg-blue-100 text-blue-700",

  default:
    "bg-slate-100 text-slate-700",
};

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}