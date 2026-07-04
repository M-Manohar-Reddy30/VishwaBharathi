"use client";

import { ReactNode } from "react";

import { Label } from "@/components/ui";
import { FormError } from "./FormError";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export function FormField({
  label,
  htmlFor,
  error,
  required,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </Label>

      {children}

      <FormError
        message={error}
      />
    </div>
  );
}