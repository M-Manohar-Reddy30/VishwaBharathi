"use client";

import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui";

interface TextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  disabled?: boolean;
}

export default function TextField({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
}: TextFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Supports nested field names like "seo.metaTitle"
  const error = name
    .split(".")
    .reduce<any>((obj, key) => obj?.[key], errors);

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-slate-700"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, {
          valueAsNumber: type === "number",
        })}
      />

      {error?.message && (
        <p className="text-sm text-red-500">
          {String(error.message)}
        </p>
      )}
    </div>
  );
}