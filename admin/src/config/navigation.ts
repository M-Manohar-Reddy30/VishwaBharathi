import {
  LayoutDashboard,
  Image,
  Images,
  CalendarDays,
  Users,
  Bell,
  GraduationCap,
  MessageSquare,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    label: "GENERAL",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "WEBSITE",
    items: [
      {
        title: "Hero",
        href: "/hero",
        icon: Image,
      },
      {
        title: "Gallery",
        href: "/gallery",
        icon: Images,
      },
      {
        title: "Events",
        href: "/events",
        icon: CalendarDays,
      },
      {
        title: "Notices",
        href: "/notices",
        icon: Bell,
      },
    ],
  },

  {
    label: "MANAGEMENT",
    items: [
      {
        title: "Staff",
        href: "/staff",
        icon: Users,
      },
      {
        title: "Admissions",
        href: "/admissions",
        icon: GraduationCap,
      },
      {
        title: "Contact",
        href: "/contact",
        icon: MessageSquare,
      },
    ],
  },

  {
    label: "SYSTEM",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];