"use client";

import SidebarItem from "./SidebarItem";

import { LogOut } from "lucide-react";

export default function SidebarFooter() {
  return (
    <div className="border-t border-slate-200 pt-4">
      <SidebarItem
        title="Logout"
        href="/logout"
        icon={LogOut}
      />
    </div>
  );
}