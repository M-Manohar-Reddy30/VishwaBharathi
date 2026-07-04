"use client";

import {
  FormSection,
  TextAreaField,
  TextField,
} from "@/components/admin/form";

export default function HeroBasicInfo() {
  return (
    <FormSection
      title="Basic Information"
      description="Enter the main content displayed on the homepage hero banner."
    >
      <TextField
        name="title"
        label="Title"
        placeholder="Enter hero title"
        required
      />

      <TextField
        name="subtitle"
        label="Subtitle"
        placeholder="Enter subtitle (optional)"
      />

      <TextAreaField
        name="description"
        label="Description"
        placeholder="Enter hero description"
        rows={5}
      />
    </FormSection>
  );
}