"use client";

import {
  Controller,
  useFormContext,
} from "react-hook-form";

import FileUploader from "../upload/FileUploader";

interface FileFieldProps {
  name: string;

  label: string;

  accept?: string;
}

export default function FileField({
  name,
  label,
  accept,
}: FileFieldProps) {
  const { control } =
    useFormContext();

  return (
    <div className="space-y-2">

      <label className="text-sm font-medium">
        {label}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FileUploader
            value={field.value}
            onChange={field.onChange}
            accept={accept}
          />
        )}
      />

    </div>
  );
}