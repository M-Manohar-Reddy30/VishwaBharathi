import {
  FormSection,
  DateField,
} from "@/components/admin/form";

export default function EventSchedule() {
  return (
    <FormSection
      title="Schedule"
      description="Set the event dates."
    >
      <DateField
        name="startDate"
        label="Start Date"
      />

      <DateField
        name="endDate"
        label="End Date"
      />
    </FormSection>
  );
}