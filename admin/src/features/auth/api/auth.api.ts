import api from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";

import {
  setAccessToken,
  removeAccessToken,
} from "../utils/token";

import type {
  ApiResponse,
  Admin,
  LoginRequest,
  LoginResponse,
} from "../types/auth.types";

/**
 * Login
 */
export async function login(
  payload: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post<ApiResponse<LoginResponse>>(
    ENDPOINTS.LOGIN,
    payload
  );

  const data = response.data.data;

  setAccessToken(data.accessToken);

  return data;
}

/**
 * Current Logged-in Admin
 */
export async function getMe(): Promise<Admin> {
  const response = await api.get<ApiResponse<Admin>>(
    ENDPOINTS.ME
  );

  return response.data.data;
}

/**
 * Logout
 */
export function logout() {
  removeAccessToken();
}