"use client";

interface EventStats {
  total: number;
  published: number;
  draft: number;
  archived: number;
  trash: number;
}

interface EventTabsProps {
  active: string;
  stats: EventStats;
  onChange: (tab: string) => void;
}

export default function EventTabs({
  active,
  stats,
  onChange,
}: EventTabsProps) {
  const tabs = [
    {
      key: "all",
      label: "All",
      count: stats.total,
    },
    {
      key: "PUBLISHED",
      label: "Published",
      count: stats.published,
    },
    {
      key: "DRAFT",
      label: "Draft",
      count: stats.draft,
    },
    {
      key: "ARCHIVED",
      label: "Archived",
      count: stats.archived,
    },
    {
      key: "trash",
      label: "Trash",
      count: stats.trash,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
            active === tab.key
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          }`}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
}