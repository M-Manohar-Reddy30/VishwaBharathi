"use client";

import type { GalleryStats } from "../types/gallery.stats";

interface GalleryTabsProps {
  active: string;
  stats: GalleryStats;
  onChange: (tab: string) => void;
}

export default function GalleryTabs({
  active,
  stats,
  onChange,
}: GalleryTabsProps) {
  const tabs = [
    {
      key: "all",
      label: "All",
      count: stats.total,
    },
    {
      key: "CAMPUS",
      label: "Campus",
      count: stats.campus,
    },
    {
      key: "EVENT",
      label: "Events",
      count: stats.event,
    },
    {
      key: "SPORTS",
      label: "Sports",
      count: stats.sports,
    },
    {
      key: "ACADEMICS",
      label: "Academics",
      count: stats.academics,
    },
    {
      key: "CULTURAL",
      label: "Cultural",
      count: stats.cultural,
    },
    {
      key: "OTHER",
      label: "Other",
      count: stats.other,
    },
    {
      key: "trash",
      label: "Trash",
      count: stats.trash,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = active === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        );
      })}
    </div>
  );
}