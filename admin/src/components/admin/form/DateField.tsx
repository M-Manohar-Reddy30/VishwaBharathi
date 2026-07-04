"use client";

import { Controller, useFormContext } from "react-hook-form";

interface DateFieldProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

export default function DateField({
  name,
  label,
  required = false,
  disabled = false,
}: DateFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Support nested field names like "seo.publishAt"
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

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type="datetime-local"
            disabled={disabled}
            value={
              field.value
                ? new Date(field.value)
                    .toISOString()
                    .slice(0, 16)
                : ""
            }
            onChange={(e) =>
              field.onChange(
                e.target.value
                  ? new Date(e.target.value)
                  : undefined
              )
            }
            className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        )}
      />

      {error?.message && (
        <p className="text-sm text-red-500">
          {String(error.message)}
        </p>
      )}
    </div>
  );
}