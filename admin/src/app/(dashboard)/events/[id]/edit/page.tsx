"use client";

import { notFound, useParams } from "next/navigation";

import { PageHeader } from "@/components/admin";

import EventForm from "@/features/events/components/EventForm";

import { useEvent } from "@/features/events/hooks/useEvent";

export default function EditEventPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data: event,
    isLoading,
    isError,
  } = useEvent(id);

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Loading event...
      </div>
    );
  }

  if (isError || !event) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit Event"
        description="Update event details."
      />

      <EventForm
        mode="edit"
        event={event}
      />
    </div>
  );
}