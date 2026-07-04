"use client";

import {
  FormSection,
  TextField,
  SelectField,
  DateField,
} from "@/components/admin/form";

export default function HeroOptions() {
  return (
    <FormSection
      title="Hero Options"
      description="Configure display settings, scheduling, and action buttons."
    >
      {/* Display Settings */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TextField
          name="displayOrder"
          label="Display Order"
          type="number"
          required
        />

        <SelectField
          name="status"
          label="Status"
          options={[
            {
              label: "Draft",
              value: "DRAFT",
            },
            {
              label: "Published",
              value: "PUBLISHED",
            },
            {
              label: "Archived",
              value: "ARCHIVED",
            },
          ]}
        />

        <SelectField
          name="textAlign"
          label="Text Alignment"
          options={[
            {
              label: "Left",
              value: "left",
            },
            {
              label: "Center",
              value: "center",
            },
            {
              label: "Right",
              value: "right",
            },
          ]}
        />

        <TextField
          name="overlayOpacity"
          label="Overlay Opacity (%)"
          type="number"
        />
      </div>

      {/* Schedule */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DateField
          name="publishedAt"
          label="Publish Date"
        />

        <DateField
          name="expiresAt"
          label="Expiry Date"
        />
      </div>

      {/* Primary Button */}
      <div className="rounded-lg border border-slate-200 p-4">
        <h3 className="mb-4 text-base font-semibold">
          Primary Button
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <TextField
            name="primaryButton.text"
            label="Button Text"
          />

          <TextField
            name="primaryButton.url"
            label="Button URL"
          />

          <SelectField
            name="primaryButton.target"
            label="Target"
            options={[
              {
                label: "Same Tab",
                value: "_self",
              },
              {
                label: "New Tab",
                value: "_blank",
              },
            ]}
          />

          <SelectField
            name="primaryButton.variant"
            label="Variant"
            options={[
              {
                label: "Primary",
                value: "primary",
              },
              {
                label: "Secondary",
                value: "secondary",
              },
              {
                label: "Outline",
                value: "outline",
              },
            ]}
          />
        </div>
      </div>

      {/* Secondary Button */}
      <div className="rounded-lg border border-slate-200 p-4">
        <h3 className="mb-4 text-base font-semibold">
          Secondary Button
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <TextField
            name="secondaryButton.text"
            label="Button Text"
          />

          <TextField
            name="secondaryButton.url"
            label="Button URL"
          />

          <SelectField
            name="secondaryButton.target"
            label="Target"
            options={[
              {
                label: "Same Tab",
                value: "_self",
              },
              {
                label: "New Tab",
                value: "_blank",
              },
            ]}
          />

          <SelectField
            name="secondaryButton.variant"
            label="Variant"
            options={[
              {
                label: "Primary",
                value: "primary",
              },
              {
                label: "Secondary",
                value: "secondary",
              },
              {
                label: "Outline",
                value: "outline",
              },
            ]}
          />
        </div>
      </div>
    </FormSection>
  );
}