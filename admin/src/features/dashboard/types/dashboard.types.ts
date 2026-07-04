export interface DashboardStats {
  totalHeroes: number;
  totalGallery: number;
  totalEvents: number;
  totalStaff: number;
  totalNotices: number;
  totalAdmissions: number;
  totalContacts: number;
}

export interface RecentActivity {
  _id: string;

  action: string;

  entity: string;

  description: string;

  createdAt: string;
}

export interface DashboardResponse {
  stats: DashboardStats;

  recentActivities: RecentActivity[];
}