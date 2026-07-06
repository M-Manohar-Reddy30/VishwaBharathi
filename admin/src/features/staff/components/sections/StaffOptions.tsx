import {
  FormSection,
  SelectField,
  TextField,
} from "@/components/admin/form";

export default function StaffOptions() {
  return (
    <FormSection
      title="Department & Status"
      description="Configure staff information."
    >
      <SelectField
        name="department"
        label="Department"
        options={[
          {
            label: "Management",
            value: "MANAGEMENT",
          },
          {
            label: "Administration",
            value: "ADMINISTRATION",
          },
          {
            label: "Special Education",
            value: "SPECIAL_EDUCATION",
          },
          {
            label: "Therapy",
            value: "THERAPY",
          },
          {
            label: "Vocational Training",
            value: "VOCATIONAL_TRAINING",
          },
          {
            label: "Support Staff",
            value: "SUPPORT_STAFF",
          },
          {
            label: "Other",
            value: "OTHER",
          },
        ]}
      />

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