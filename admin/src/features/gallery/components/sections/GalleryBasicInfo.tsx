"use client";

import {
  FormSection,
  TextAreaField,
  TextField,
} from "@/components/admin/form";

export default function GalleryBasicInfo() {
  return (
    <FormSection
      title="Gallery Information"
      description="Basic information about this gallery image."
    >
      <TextField
        name="title"
        label="Title"
        placeholder="Enter image title"
        required
      />

      <TextAreaField
        name="description"
        label="Description"
        placeholder="Enter description"
        rows={4}
      />

      <TextField
        name="tags"
        label="Tags"
        placeholder="campus, students, sports"
      />
    </FormSection>
  );
}