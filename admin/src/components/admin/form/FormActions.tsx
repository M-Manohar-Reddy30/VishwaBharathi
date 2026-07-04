"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";

interface FormActionsProps {
  loading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
}

export default function FormActions({
  loading = false,
  submitLabel = "Save",
  cancelLabel = "Cancel",
}: FormActionsProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={() => router.back()}
      >
        {cancelLabel}
      </Button>

      <Button
        type="submit"
        loading={loading}
      >
        {submitLabel}
      </Button>
    </div>
  );
}