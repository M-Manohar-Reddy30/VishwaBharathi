"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import HeroBasicInfo from "./sections/HeroBasicInfo";
import HeroImages from "./sections/HeroImages";
import HeroOptions from "./sections/HeroOptions";
import HeroSEO from "./sections/HeroSEO";

import { FormActions } from "@/components/admin/form";

import {
  heroSchema,
  HeroFormValues,
} from "../schemas/hero.schema";

import { Hero } from "../types/hero.types";

import { useCreateHero } from "../hooks/useCreateHero";
import { useUpdateHero } from "../hooks/useUpdateHero";

interface HeroFormProps {
  mode: "create" | "edit";
  hero?: Hero;
}

export default function HeroForm({
  mode,
  hero,
}: HeroFormProps) {
  const router = useRouter();

  const createHero = useCreateHero();
  const updateHero = useUpdateHero();

  const methods = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),

    defaultValues: {
      title: "",
      subtitle: "",
      description: "",

      desktopImage: undefined,
      mobileImage: undefined,

      displayOrder: 1,

      status: "DRAFT",

      overlayOpacity: 40,

      textAlign: "left",

      primaryButton: {
        text: "",
        url: "",
        target: "_self",
        variant: "primary",
      },

      secondaryButton: {
        text: "",
        url: "",
        target: "_self",
        variant: "secondary",
      },

      publishedAt: undefined,

      expiresAt: undefined,

      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: [],
        canonicalUrl: "",
        ogImage: "",
      },
    },
  });

  useEffect(() => {
    if (mode === "edit" && hero) {
      methods.reset({
        ...hero,
      });
    }
  }, [hero, mode, methods]);

  async function onSubmit(
    values: HeroFormValues
  ) {
    try {
      if (mode === "create") {
        await createHero.mutateAsync(values);

        toast.success(
          "Hero banner created successfully."
        );
      } else {
        await updateHero.mutateAsync({
          id: hero!._id,
          values,
        });

        toast.success(
          "Hero banner updated successfully."
        );
      }

      router.push("/hero");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Something went wrong."
      );
    }
  }

  const loading =
    createHero.isPending ||
    updateHero.isPending;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <HeroBasicInfo />

        <HeroImages />

        <HeroOptions />

        <HeroSEO />

        <FormActions
          loading={loading}
          submitLabel={
            mode === "create"
              ? "Create Hero"
              : "Update Hero"
          }
        />
      </form>
    </FormProvider>
  );
}