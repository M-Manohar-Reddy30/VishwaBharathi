import {
  FormSection,
  DateField,
  SelectField,
  TextField,
} from "@/components/admin/form";

export default function NoticeOptions() {
  return (
    <FormSection
      title="Publishing Options"
      description="Configure notice settings."
    >
      <DateField
        name="publishDate"
        label="Publish Date"
      />

      <TextField
        name="displayOrder"
        label="Display Order"
        type="number"
      />

      <SelectField
        name="status"
        label="Status"
        options={[
          {
            label: "Active",
            value: "ACTIVE",
          },
          {
            label: "Inactive",
            value: "INACTIVE",
          },
        ]}
      />
    </FormSection>
  );
}