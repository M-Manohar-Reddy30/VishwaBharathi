import api from "@/lib/api";

import type {
  Staff,
  StaffFormPayload,
} from "../types/staff.types";

const ENDPOINT = "/admin/staff";

export async function getStaff(params?: any) {
  const response = await api.get(
    ENDPOINT,
    {
      params,
    }
  );

  return response.data;
}

export async function getStaffMember(
  id: string
) {
  const response = await api.get(
    `${ENDPOINT}/${id}`
  );

  return response.data.data;
}

export async function createStaff(
  payload: StaffFormPayload
) {
  const response = await api.post(
    ENDPOINT,
    payload
  );

  return response.data.data;
}

export async function updateStaff(
  id: string,
  payload: StaffFormPayload
) {
  const response = await api.put(
    `${ENDPOINT}/${id}`,
    payload
  );

  return response.data.data;
}

export async function trashStaff(
  id: string
) {
  await api.delete(
    `${ENDPOINT}/${id}`
  );
}

export async function restoreStaff(
  id: string
) {
  await api.patch(
    `${ENDPOINT}/${id}/restore`
  );
}

export async function forceDeleteStaff(
  id: string
) {
  await api.delete(
    `${ENDPOINT}/${id}/force`
  );
}

export async function getTrashStaff() {
  const response = await api.get(
    `${ENDPOINT}/trash`
  );

  return response.data.data;
}

export async function getStaffStats() {
  const response = await api.get(
    "/admin/staff/stats"
  );

  return response.data.data;
}