"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[120px] w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm",
        "placeholder:text-slate-400",
        "focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";