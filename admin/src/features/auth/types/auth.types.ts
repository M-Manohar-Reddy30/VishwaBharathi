export interface Admin {
  id: string;
  fullName: string;
  email: string;
  role: "SUPER_ADMIN";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  admin: Admin;
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta: unknown;
  errors: unknown;
}