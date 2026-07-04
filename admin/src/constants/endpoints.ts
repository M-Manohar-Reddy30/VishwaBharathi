export const ENDPOINTS = {
  // Authentication
  LOGIN: "/auth/login",
  ME: "/auth/me",

  // Dashboard
  DASHBOARD_STATS: "/admin/dashboard/stats",
  DASHBOARD_RECENT_ACTIVITIES:
    "/admin/dashboard/recent-activities",

  // Hero
  HERO: "/admin/heroes",

  // Gallery
  GALLERY: "/admin/gallery",

  // Events
  EVENTS: "/admin/events",

  // Staff
  STAFF: "/admin/staff",

  // Notices
  NOTICES: "/admin/notices",

  // Admissions
  ADMISSIONS: "/admin/admissions",

  // Contact
  CONTACT: "/admin/contact",

  // Settings
  SETTINGS: "/admin/settings",

  // Upload
  IMAGE_UPLOAD: "/image",
  IMAGES_UPLOAD: "/images",
} as const;