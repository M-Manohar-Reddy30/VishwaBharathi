"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  noticeSchema,
  NoticeFormValues,
} from "../schemas/notice.schema";

import type { Notice } from "../types/notice.types";

import { useCreateNotice } from "../hooks/useCreateNotice";
import { useUpdateNotice } from "../hooks/useUpdateNotice";

import NoticeBasicInfo from "./sections/NoticeBasicInfo";
import NoticeAttachment from "./sections/NoticeAttachment";
import NoticeOptions from "./sections/NoticeOptions";

import {
  FormActions,
} from "@/components/admin/form";

interface NoticeFormProps {
  mode: "create" | "edit";
  notice?: Notice;
}

export default function NoticeForm({
  mode,
  notice,
}: NoticeFormProps) {
  const router = useRouter();

  const createNotice = useCreateNotice();
  const updateNotice = useUpdateNotice();

  const methods = useForm<NoticeFormValues>({
    resolver: zodResolver(noticeSchema),

    defaultValues: {
      title: "",
      description: "",

      pdf: undefined,
      coverImage: undefined,

      publishDate: new Date(),

      displayOrder: 1,

      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (mode !== "edit" || !notice) return;

    methods.reset({
      title: notice.title,
      description: notice.description,

      pdf: notice.pdf,

      coverImage: notice.coverImage,

      publishDate: new Date(
        notice.publishDate
      ),

      displayOrder: notice.displayOrder,

      status: notice.status,
    });
  }, [notice, mode, methods]);

  async function onSubmit(
    values: NoticeFormValues
  ) {
    try {
      if (mode === "create") {
        await createNotice.mutateAsync(values);

        toast.success(
          "Notice created successfully."
        );
      } else {
        await updateNotice.mutateAsync({
          id: notice!._id,
          values,
        });

        toast.success(
          "Notice updated successfully."
        );
      }

      router.push("/notices");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Something went wrong."
      );
    }
  }

  const loading =
    createNotice.isPending ||
    updateNotice.isPending;

  return (
    <FormProvider {...methods}>
      <form
            onSubmit={methods.handleSubmit(
                (values) => {
                console.log("SUBMITTED", values);
                onSubmit(values);
                },
                (errors) => {
                console.log("FORM ERRORS", errors);
                }
            )}
            className="space-y-8"
        >
        <NoticeBasicInfo />

        <NoticeAttachment />

        <NoticeOptions />

        <FormActions
          loading={loading}
          submitLabel={
            mode === "create"
              ? "Create Notice"
              : "Update Notice"
          }
        />
      </form>
    </FormProvider>
  );
}