"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
}