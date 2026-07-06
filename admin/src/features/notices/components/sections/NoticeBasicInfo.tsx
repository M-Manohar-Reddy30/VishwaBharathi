import {
  FormSection,
  TextField,
  TextAreaField,
} from "@/components/admin/form";

export default function NoticeBasicInfo() {
  return (
    <FormSection
      title="Notice Information"
      description="Enter the notice details."
    >
      <TextField
        name="title"
        label="Title"
        placeholder="School Holiday Notice"
        required
      />

      <TextAreaField
        name="description"
        label="Description"
        placeholder="Write notice description..."
        rows={8}
      />
    </FormSection>
  );
}