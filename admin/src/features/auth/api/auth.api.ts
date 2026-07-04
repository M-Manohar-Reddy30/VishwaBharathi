import api from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";

import type { ApiResponse } from "@/types/api.types";
import type {
  LoginPayload,
  LoginResponse,
  Admin,
} from "../types/auth.types";

export async function login(
  payload: LoginPayload
) {
  const response =
    await api.post<ApiResponse<LoginResponse>>(
      ENDPOINTS.LOGIN,
      payload
    );

  return response.data.data;
}

export async function getMe() {
  const response =
    await api.get<ApiResponse<Admin>>(
      ENDPOINTS.ME
    );

  return response.data.data;
}