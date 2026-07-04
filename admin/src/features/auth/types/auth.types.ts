export interface Admin {
  id: string;
  fullName: string;
  email: string;
  role: "SUPER_ADMIN";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  admin: Admin;
  accessToken: string;
  refreshToken: string;
}