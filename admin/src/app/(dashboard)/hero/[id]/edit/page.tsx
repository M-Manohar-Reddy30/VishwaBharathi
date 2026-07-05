"use client";

import { notFound, useParams } from "next/navigation";

import { PageHeader } from "@/components/admin";

import HeroForm from "@/features/hero/components/HeroForm";
import { useHero } from "@/features/hero/hooks/useHero";

export default function EditHeroPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data: hero,
    isLoading,
    isError,
  } = useHero(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-slate-500">
          Loading hero banner...
        </p>
      </div>
    );
  }

  if (isError || !hero) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit Hero Banner"
        description="Update the homepage hero banner."
      />

      <HeroForm
        mode="edit"
        hero={hero}
      />
    </div>
  );
}