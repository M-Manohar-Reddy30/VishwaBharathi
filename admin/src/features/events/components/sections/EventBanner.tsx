import {
  FormSection,
  ImageField,
} from "@/components/admin/form";

export default function EventBanner() {
  return (
    <FormSection
      title="Banner Image"
      description="Upload the event banner."
    >
      <ImageField
        name="bannerImage"
        label="Banner Image"
      />
    </FormSection>
  );
}