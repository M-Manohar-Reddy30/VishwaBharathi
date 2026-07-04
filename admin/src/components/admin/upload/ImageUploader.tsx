"use client";

import Image from "next/image";
import { ChangeEvent, useRef } from "react";

import { Button } from "@/components/ui";

import {
  UploadedImage,
  useUpload,
} from "@/features/upload";

interface ImageUploaderProps {
  value?: UploadedImage;
  onChange: (image: UploadedImage) => void;
}

export default function ImageUploader({
  value,
  onChange,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUpload();

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const image =
        await uploadMutation.mutateAsync(file);

      onChange(image);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-4">

      {value?.url ? (
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <Image
            src={value.url}
            alt="Uploaded Image"
            width={800}
            height={500}
            className="h-56 w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-56 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
          <p className="text-sm text-slate-500">
            No image selected
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />

      <Button
        type="button"
        loading={uploadMutation.isPending}
        onClick={() => inputRef.current?.click()}
      >
        {value ? "Change Image" : "Upload Image"}
      </Button>

    </div>
  );
}