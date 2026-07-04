"use client";

import { useFormContext } from "react-hook-form";

import { Textarea } from "@/components/ui";

interface TextAreaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}

export default function TextAreaField({
  name,
  label,
  placeholder,
  rows = 5,
}: TextAreaFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <Textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}