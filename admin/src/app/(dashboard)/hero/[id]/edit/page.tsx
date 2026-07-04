"use client";

import { notFound } from "next/navigation";

import { PageHeader } from "@/components/admin";

import HeroForm from "@/features/hero/components/HeroForm";
import { useHero } from "@/features/hero/hooks/useHero";

interface EditHeroPageProps {
  params: {
    id: string;
  };
}

export default function EditHeroPage({
  params,
}: EditHeroPageProps) {
  const { data: hero, isLoading, isError } = useHero(params.id);

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