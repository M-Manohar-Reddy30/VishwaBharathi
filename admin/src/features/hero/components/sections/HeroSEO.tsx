"use client";

import {
  FormSection,
  TextAreaField,
  TextField,
} from "@/components/admin/form";

export default function HeroSEO() {
  return (
    <FormSection
      title="SEO Settings"
      description="Configure search engine optimization for this hero banner."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TextField
          name="seo.metaTitle"
          label="Meta Title"
          placeholder="Enter SEO title"
        />

        <TextField
          name="seo.canonicalUrl"
          label="Canonical URL"
          placeholder="https://example.com/page"
        />
      </div>

      <TextAreaField
        name="seo.metaDescription"
        label="Meta Description"
        placeholder="Enter SEO description"
        rows={4}
      />

      <TextField
        name="seo.keywords"
        label="Keywords"
        placeholder="school, education, admissions, hero"
      />

      <TextField
        name="seo.ogImage"
        label="Open Graph Image URL"
        placeholder="https://example.com/image.jpg"
      />
    </FormSection>
  );
}