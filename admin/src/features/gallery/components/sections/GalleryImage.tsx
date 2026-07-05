"use client";

import {
  FormSection,
  ImageField,
} from "@/components/admin/form";

export default function GalleryImage() {
  return (
    <FormSection
      title="Gallery Image"
      description="Upload the gallery image."
    >
      <ImageField
        name="image"
        label="Gallery Image"
      />
    </FormSection>
  );
}