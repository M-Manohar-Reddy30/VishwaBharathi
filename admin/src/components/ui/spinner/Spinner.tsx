"use client";

import { Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";

interface SpinnerProps {
  className?: string;
  size?: number;
}

export default function Spinner({
  className,
  size = 18,
}: SpinnerProps) {
  return (
    <Loader2
      size={size}
      className={cn(
        "animate-spin",
        className
      )}
    />
  );
}