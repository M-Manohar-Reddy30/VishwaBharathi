"use client";

import { Controller, useFormContext } from "react-hook-form";

import ImageUploader from "../upload/ImageUploader";

interface ImageFieldProps {
  name: string;
  label: string;
}

export default function ImageField({
  name,
  label,
}: ImageFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="space-y-2">

      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ImageUploader
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}