"use client";

import { notFound, useParams } from "next/navigation";

import { PageHeader } from "@/components/admin";

import GalleryForm from "@/features/gallery/components/GalleryForm";
import { useGalleryItem } from "@/features/gallery/hooks/useGalleryItem";

export default function EditGalleryPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data: gallery,
    isLoading,
    isError,
  } = useGalleryItem(id);

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Loading gallery...
      </div>
    );
  }

  if (isError || !gallery) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit Gallery Image"
        description="Update gallery image details."
      />

      <GalleryForm
        mode="edit"
        gallery={gallery}
      />
    </div>
  );
}