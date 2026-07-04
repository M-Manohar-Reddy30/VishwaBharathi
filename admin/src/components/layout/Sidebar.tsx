"use client";

import Logo from "./Logo";
import SidebarFooter from "./SidebarFooter";
import SidebarItem from "./SidebarItem";

import { navigation } from "@/config/navigation";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">

      <div className="border-b border-slate-200 p-6">
        <Logo />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">

        {navigation.map((section) => (
          <div
            key={section.label}
            className="mb-8"
          >
            <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
              {section.label}
            </p>

            <div className="space-y-2">
              {section.items.map((item) => (
                <SidebarItem
                  key={item.href}
                  {...item}
                />
              ))}
            </div>
          </div>
        ))}

      </div>

      <div className="border-t border-slate-200 p-4">
        <SidebarFooter />
      </div>

    </aside>
  );
}