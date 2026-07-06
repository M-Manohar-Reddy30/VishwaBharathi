import {
  FormSection,
  TextField,
  TextAreaField,
} from "@/components/admin/form";

export default function StaffBasicInfo() {
  return (
    <FormSection
      title="Basic Information"
      description="Enter the staff member details."
    >
      <TextField
        name="name"
        label="Full Name"
        placeholder="Dr. John Doe"
        required
      />

      <TextField
        name="designation"
        label="Designation"
        placeholder="Principal"
        required
      />

      <TextField
        name="qualification"
        label="Qualification"
        placeholder="M.Ed, Ph.D"
        required
      />

      <TextField
        name="experience"
        label="Experience"
        placeholder="10 Years"
      />

      <TextAreaField
        name="bio"
        label="Biography"
        placeholder="Write about the staff member..."
        rows={6}
      />
    </FormSection>
  );
}