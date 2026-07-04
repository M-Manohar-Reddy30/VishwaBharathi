"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

type ButtonSize =
  | "sm"
  | "md"
  | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantClasses: Record<
  ButtonVariant,
  string
> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700",

  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200",

  outline:
    "border border-slate-300 bg-white hover:bg-slate-50",

  ghost:
    "hover:bg-slate-100",

  danger:
    "bg-red-600 text-white hover:bg-red-700",
};

const sizeClasses: Record<
  ButtonSize,
  string
> = {
  sm: "h-9 px-3 text-sm",

  md: "h-10 px-4",

  lg: "h-11 px-6",
};

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2
          size={18}
          className="animate-spin"
        />
      )}

      {children}
    </button>
  );
}