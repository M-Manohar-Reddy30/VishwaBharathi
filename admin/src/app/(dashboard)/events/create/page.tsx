import { PageHeader } from "@/components/admin";

import EventForm from "@/features/events/components/EventForm";

export default function CreateEventPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Create Event"
        description="Create a new university event."
      />

      <EventForm mode="create" />
    </div>
  );
}