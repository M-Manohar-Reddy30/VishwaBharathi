"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui";
import { cn } from "@/lib/cn";

interface SearchInputProps {
  value?: string;
  placeholder?: string;
  onChange?: (
    value: string
  ) => void;
  className?: string;
}

export default function SearchInput({
  value,
  placeholder = "Search...",
  onChange,
  className,
}: SearchInputProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-sm",
        className
      )}
    >
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <Input
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange?.(e.target.value)
        }
        className="pl-10"
      />
    </div>
  );
}