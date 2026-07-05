"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  gallerySchema,
  GalleryFormValues,
} from "../schemas/gallery.schema";

import type { Gallery } from "../types/gallery.types";

import { useCreateGallery } from "../hooks/useCreateGallery";
import { useUpdateGallery } from "../hooks/useUpdateGallery";

import GalleryBasicInfo from "./sections/GalleryBasicInfo";
import GalleryImage from "./sections/GalleryImage";
import GalleryOptions from "./sections/GalleryOptions";

import {
  FormActions,
} from "@/components/admin/form";

interface GalleryFormProps {
  mode: "create" | "edit";
  gallery?: Gallery;
}

export default function GalleryForm({
  mode,
  gallery,
}: GalleryFormProps) {
  const router = useRouter();

  const createGallery = useCreateGallery();
  const updateGallery = useUpdateGallery();

  const methods = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),

    defaultValues: {
      title: "",
      description: "",

      image: undefined,

      category: "CAMPUS",

      tags: "",

      displayOrder: 1,

      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (mode !== "edit" || !gallery) return;

    methods.reset({
        title: gallery.title,
        description: gallery.description ?? "",
        image: gallery.image,
        category: gallery.category,
        tags: gallery.tags?.join(", ") ?? "",
        displayOrder: gallery.displayOrder,
        status: gallery.status,
    });
    }, [gallery, mode, methods]);

    async function onSubmit(
        values: GalleryFormValues
    ) {
        const payload = {
            ...values,
            tags: values.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        };

        try {
            if (mode === "create") {
            await createGallery.mutateAsync(payload);

            toast.success(
                "Gallery image created successfully."
            );
            } else {
            await updateGallery.mutateAsync({
                id: gallery!._id,
                values: payload,
            });

            toast.success(
                "Gallery image updated successfully."
            );
            }

            router.push("/gallery");
        } catch (error: any) {
            toast.error(
            error?.response?.data?.message ??
                "Something went wrong."
            );
        }
    }

  const loading =
    createGallery.isPending ||
    updateGallery.isPending;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <GalleryBasicInfo />

        <GalleryImage />

        <GalleryOptions />

        <FormActions
          loading={loading}
          submitLabel={
            mode === "create"
              ? "Create Image"
              : "Update Image"
          }
        />
      </form>
    </FormProvider>
  );
}