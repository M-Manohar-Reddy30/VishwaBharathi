"use client";

import {
  FormSection,
  SelectField,
  TextField,
} from "@/components/admin/form";

import {
  GALLERY_CATEGORIES,
  GALLERY_STATUS,
} from "../../constants/gallery.constants";

export default function GalleryOptions() {
  return (
    <FormSection
      title="Gallery Options"
      description="Configure category and display settings."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SelectField
          name="category"
          label="Category"
          options={GALLERY_CATEGORIES}
        />

        <SelectField
          name="status"
          label="Status"
          options={GALLERY_STATUS}
        />

        <TextField
          name="displayOrder"
          label="Display Order"
          type="number"
          required
        />
      </div>
    </FormSection>
  );
}