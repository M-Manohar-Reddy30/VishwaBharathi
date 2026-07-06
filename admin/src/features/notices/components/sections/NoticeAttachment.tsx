import {
  FormSection,
  ImageField,
  FileField,
} from "@/components/admin/form";

export default function NoticeAttachment() {
  return (
    <>
      <FormSection
        title="Cover Image"
        description="Upload an optional cover image."
      >
        <ImageField
          name="coverImage"
          label="Cover Image"
        />
      </FormSection>

      <FormSection
        title="Notice PDF"
        description="Upload the notice document."
      >
        <FileField
          name="pdf"
          label="Notice PDF"
          accept=".pdf"
        />
      </FormSection>
    </>
  );
}