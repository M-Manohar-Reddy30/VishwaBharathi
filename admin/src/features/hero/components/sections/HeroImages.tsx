"use client";

import {
  FormSection,
  ImageField,
} from "@/components/admin/form";

export default function HeroImages() {
  return (
    <FormSection
      title="Hero Images"
      description="Upload desktop and mobile versions of the hero banner."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ImageField
          name="desktopImage"
          label="Desktop Image"
        />

        <ImageField
          name="mobileImage"
          label="Mobile Image"
        />
      </div>
    </FormSection>
  );
}