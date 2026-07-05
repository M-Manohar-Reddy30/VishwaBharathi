"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  eventSchema,
  EventFormValues,
} from "../schemas/event.schema";

import type { Event } from "../types/event.types";

import { useCreateEvent } from "../hooks/useCreateEvent";
import { useUpdateEvent } from "../hooks/useUpdateEvent";

import EventBasicInfo from "./sections/EventBasicInfo";
import EventBanner from "./sections/EventBanner";
import EventDetails from "./sections/EventDetails";
import EventSchedule from "./sections/EventSchedule";

import {
  FormActions,
} from "@/components/admin/form";

interface EventFormProps {
  mode: "create" | "edit";
  event?: Event;
}

export default function EventForm({
  mode,
  event,
}: EventFormProps) {
  const router = useRouter();

  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();

  const methods = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),

    defaultValues: {
      title: "",
      slug: "",
      description: "",

      bannerImage: undefined as any,

      venue: "",

      category: "ACADEMIC",

      startDate: new Date(),

      endDate: new Date(),

      displayOrder: 1,

      status: "DRAFT",
    },
  });

  useEffect(() => {
    if (mode !== "edit" || !event) return;

    methods.reset({
      title: event.title,
      slug: event.slug,
      description: event.description,

      bannerImage: event.bannerImage,

      venue: event.venue,

      category: event.category,

      startDate: new Date(event.startDate),

      endDate: new Date(event.endDate),

      displayOrder: event.displayOrder,

      status: event.status,
    });
  }, [event, mode, methods]);

  async function onSubmit(
    values: EventFormValues
  ) {
    try {
      if (mode === "create") {
        await createEvent.mutateAsync(values);

        toast.success(
          "Event created successfully."
        );
      } else {
        await updateEvent.mutateAsync({
          id: event!._id,
          values,
        });

        toast.success(
          "Event updated successfully."
        );
      }

      router.push("/events");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Something went wrong."
      );
    }
  }

  const loading =
    createEvent.isPending ||
    updateEvent.isPending;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <EventBasicInfo />

        <EventBanner />

        <EventDetails />

        <EventSchedule />

        <FormActions
          loading={loading}
          submitLabel={
            mode === "create"
              ? "Create Event"
              : "Update Event"
          }
        />
      </form>
    </FormProvider>
  );
}