"use client";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import {
  useState,
} from "react";

import { Input } from "@/components/ui";
import { cn } from "@/lib/cn";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function PasswordInput({
  className,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={
          showPassword
            ? "text"
            : "password"
        }
        className={cn(
          "pr-12",
          className
        )}
      />

      <button
        type="button"
        onClick={() =>
          setShowPassword(
            !showPassword
          )
        }
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
      >
        {showPassword ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}
      </button>
    </div>
  );
}