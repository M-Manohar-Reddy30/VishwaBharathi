import api from "@/lib/api";

import type {
  NoticeFormPayload,
} from "../types/notice.types";

const ENDPOINT = "/admin/notices";

export async function getNotices(params?: any) {
  const response = await api.get(
    ENDPOINT,
    {
      params,
    }
  );

  return response.data;
}

export async function getNotice(
  id: string
) {
  const response = await api.get(
    `${ENDPOINT}/${id}`
  );

  return response.data.data;
}

export async function createNotice(
  payload: NoticeFormPayload
) {
  const response = await api.post(
    ENDPOINT,
    payload
  );

  return response.data.data;
}

export async function updateNotice(
  id: string,
  payload: NoticeFormPayload
) {
  const response = await api.put(
    `${ENDPOINT}/${id}`,
    payload
  );

  return response.data.data;
}

export async function trashNotice(
  id: string
) {
  await api.delete(
    `${ENDPOINT}/${id}`
  );
}

export async function restoreNotice(
  id: string
) {
  await api.patch(
    `${ENDPOINT}/${id}/restore`
  );
}

export async function forceDeleteNotice(
  id: string
) {
  await api.delete(
    `${ENDPOINT}/${id}/force`
  );
}

export async function getTrashNotices() {
  const response = await api.get(
    `${ENDPOINT}/trash`
  );

  return response.data.data;
}

export async function getNoticeStats() {
  const response = await api.get(
    "/admin/notices/stats"
  );

  return response.data.data;
}