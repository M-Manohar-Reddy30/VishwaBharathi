import api from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";

import type {
  ApiResponse,
} from "@/features/auth/types/auth.types";

import type {
  DashboardStats,
  RecentActivity,
} from "../types/dashboard.types";

export async function getDashboardStats() {
  const response =
    await api.get<ApiResponse<DashboardStats>>(
      ENDPOINTS.DASHBOARD_STATS
    );

  return response.data.data;
}

export async function getRecentActivities() {
  const response =
    await api.get<ApiResponse<RecentActivity[]>>(
      ENDPOINTS.DASHBOARD_ACTIVITY
    );

  return response.data.data;
}