import {
  FormSection,
  TextField,
  TextAreaField,
} from "@/components/admin/form";

export default function EventBasicInfo() {
  return (
    <FormSection
      title="Basic Information"
      description="Enter the event details."
    >
      <TextField
        name="title"
        label="Event Title"
        placeholder="Annual Sports Meet"
        required
      />

      <TextField
        name="slug"
        label="Slug"
        placeholder="annual-sports-meet"
        required
      />

      <TextAreaField
        name="description"
        label="Description"
        placeholder="Describe the event..."
        rows={6}
      />
    </FormSection>
  );
}