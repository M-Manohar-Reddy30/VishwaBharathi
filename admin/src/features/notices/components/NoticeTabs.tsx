"use client";

interface NoticeStats {
  total: number;
  active: number;
  inactive: number;
  trash: number;
}

interface NoticeTabsProps {
  active: string;
  stats: NoticeStats;
  onChange: (tab: string) => void;
}

export default function NoticeTabs({
  active,
  stats,
  onChange,
}: NoticeTabsProps) {
  const tabs = [
    {
      key: "all",
      label: "All",
      count: stats.total,
    },
    {
      key: "ACTIVE",
      label: "Active",
      count: stats.active,
    },
    {
      key: "INACTIVE",
      label: "Inactive",
      count: stats.inactive,
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