"use client";

import { ChangeEvent, useRef } from "react";

import { Button } from "@/components/ui";

import {
  UploadedFile,
  useFileUpload,
} from "@/features/upload";

interface FileUploaderProps {
  value?: UploadedFile;

  onChange: (file: UploadedFile) => void;

  accept?: string;
}

export default function FileUploader({
  value,
  onChange,
  accept = ".pdf",
}: FileUploaderProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const uploadMutation =
    useFileUpload();

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    try {
      const uploaded =
        await uploadMutation.mutateAsync(file);

      console.log("UPLOADED FILE:", uploaded);

      onChange(uploaded);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-4">

      {value?.url ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

          <p className="font-medium">
            {value.publicId ?? "Uploaded File"}
          </p>

          {value.url && (
            <a
              href={value.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-600 underline"
            >
              View Uploaded File
            </a>
          )}

          <p className="mt-1 text-xs text-slate-500">
            {value.format
              ? value.format.toUpperCase()
              : "FILE"}
            {" • "}
            {value.bytes
              ? `${(value.bytes / 1024).toFixed(1)} KB`
              : "--"}
          </p>

        </div>
      ) : (
        <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">

          <p className="text-sm text-slate-500">
            No file selected
          </p>

        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        onChange={handleFileChange}
      />

      <Button
        type="button"
        loading={uploadMutation.isPending}
        onClick={() =>
          inputRef.current?.click()
        }
      >
        {value
          ? "Change File"
          : "Upload File"}
      </Button>

    </div>
  );
}