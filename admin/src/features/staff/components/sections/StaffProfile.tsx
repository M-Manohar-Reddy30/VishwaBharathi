import {
  FormSection,
  ImageField,
} from "@/components/admin/form";

export default function StaffProfile() {
  return (
    <FormSection
      title="Profile Photo"
      description="Upload the staff profile image."
    >
      <ImageField
        name="photo"
        label="Profile Photo"
      />
    </FormSection>
  );
}