"use client";

import { navigation } from "@/config/navigation";
import { UI } from "@/constants/ui";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 flex h-screen flex-col border-r border-slate-200 bg-white p-6"
      style={{
        width: UI.sidebarWidth,
      }}
    >
      <Logo />

      <nav className="mt-10 flex-1 space-y-2 overflow-y-auto">
        {navigation.map((item) => (
          <SidebarItem
            key={item.href}
            {...item}
          />
        ))}
      </nav>
    </aside>
  );
}