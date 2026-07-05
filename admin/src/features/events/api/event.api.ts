import api from "@/lib/api";

import type { Event } from "../types/event.types";
import type { EventFormPayload } from "../types/event.types";

const ENDPOINT = "/admin/events";

export async function getEvents(params?: any) {
  const response = await api.get(ENDPOINT, {
    params,
  });

  return response.data;
}

export async function getEvent(id: string) {
  const response = await api.get(
    `${ENDPOINT}/${id}`
  );

  return response.data.data;
}

export async function createEvent(
  payload: EventFormPayload
) {
  const response = await api.post(
    ENDPOINT,
    payload
  );

  return response.data.data;
}

export async function updateEvent(
  id: string,
  payload: EventFormPayload
) {
  const response = await api.put(
    `${ENDPOINT}/${id}`,
    payload
  );

  return response.data.data;
}

export async function trashEvent(
  id: string
) {
  await api.delete(`${ENDPOINT}/${id}`);
}

export async function restoreEvent(
  id: string
) {
  await api.patch(
    `${ENDPOINT}/${id}/restore`
  );
}

export async function forceDeleteEvent(
  id: string
) {
  await api.delete(
    `${ENDPOINT}/${id}/force`
  );
}

export async function getTrashEvents() {
  const response = await api.get(
    `${ENDPOINT}/trash`
  );

  return response.data.data;
}

export async function getEventStats() {
  const response = await api.get(
    "/admin/events/stats"
  );

  return response.data.data;
}