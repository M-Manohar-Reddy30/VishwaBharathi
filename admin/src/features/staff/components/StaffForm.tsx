"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  staffSchema,
  StaffFormValues,
} from "../schemas/staff.schema";

import type { Staff } from "../types/staff.types";

import { useCreateStaff } from "../hooks/useCreateStaff";
import { useUpdateStaff } from "../hooks/useUpdateStaff";

import StaffBasicInfo from "./sections/StaffBasicInfo";
import StaffProfile from "./sections/StaffProfile";
import StaffOptions from "./sections/StaffOptions";

import {
  FormActions,
} from "@/components/admin/form";

interface StaffFormProps {
  mode: "create" | "edit";
  staff?: Staff;
}

export default function StaffForm({
  mode,
  staff,
}: StaffFormProps) {
  const router = useRouter();

  const createStaff = useCreateStaff();
  const updateStaff = useUpdateStaff();

  const methods = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),

    defaultValues: {
      name: "",
      designation: "",
      qualification: "",
      experience: "",
      bio: "",

      photo: undefined as any,

      department: "MANAGEMENT",

      displayOrder: 1,

      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (mode !== "edit" || !staff) return;

    methods.reset({
      name: staff.name,
      designation: staff.designation,
      qualification: staff.qualification,
      experience: staff.experience ?? "",
      bio: staff.bio,

      photo: staff.photo,

      department: staff.department,

      displayOrder: staff.displayOrder,

      status: staff.status,
    });
  }, [staff, mode, methods]);

  async function onSubmit(
    values: StaffFormValues
  ) {
    try {
      if (mode === "create") {
        await createStaff.mutateAsync(values);

        toast.success(
          "Staff member created successfully."
        );
      } else {
        await updateStaff.mutateAsync({
          id: staff!._id,
          values,
        });

        toast.success(
          "Staff member updated successfully."
        );
      }

      router.push("/staff");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Something went wrong."
      );
    }
  }

  const loading =
    createStaff.isPending ||
    updateStaff.isPending;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <StaffBasicInfo />

        <StaffProfile />

        <StaffOptions />

        <FormActions
          loading={loading}
          submitLabel={
            mode === "create"
              ? "Create Staff"
              : "Update Staff"
          }
        />
      </form>
    </FormProvider>
  );
}