"use client";

import { useFormContext } from "react-hook-form";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  options: SelectOption[];
}

export default function SelectField({
  name,
  label,
  options,
}: SelectFieldProps) {
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

      <select
        id={name}
        {...register(name)}
        className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 outline-none focus:border-blue-600"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}