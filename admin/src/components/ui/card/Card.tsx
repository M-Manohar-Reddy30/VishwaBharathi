"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default function Card({
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-6 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}