import {
  CalendarDays,
  FileText,
  GraduationCap,
  Home,
  Image,
  Images,
  Settings,
  Users,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
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
    title: "Staff",
    href: "/staff",
    icon: Users,
  },
  {
    title: "Notices",
    href: "/notices",
    icon: FileText,
  },
  {
    title: "Admissions",
    href: "/admissions",
    icon: GraduationCap,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
] as const;