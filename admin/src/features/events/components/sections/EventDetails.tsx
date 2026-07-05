import {
  FormSection,
  TextField,
  SelectField,
} from "@/components/admin/form";

export default function EventDetails() {
  return (
    <FormSection
      title="Event Details"
      description="Venue, category and display options."
    >
      <TextField
        name="venue"
        label="Venue"
        placeholder="Main Auditorium"
        required
      />

      <SelectField
        name="category"
        label="Category"
        options={[
          { label: "Academic", value: "ACADEMIC" },
          { label: "Cultural", value: "CULTURAL" },
          { label: "Sports", value: "SPORTS" },
          { label: "Workshop", value: "WORKSHOP" },
          { label: "Seminar", value: "SEMINAR" },
          { label: "Awareness", value: "AWARENESS" },
          { label: "Celebration", value: "CELEBRATION" },
          { label: "Other", value: "OTHER" },
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
          { label: "Draft", value: "DRAFT" },
          { label: "Published", value: "PUBLISHED" },
          { label: "Archived", value: "ARCHIVED" },
        ]}
      />
    </FormSection>
  );
}