"use client";

interface ContentTabsProps {
  active: string;

  onChange: (value: string) => void;

  stats: {
    total: number;
    published: number;
    draft: number;
    archived: number;
    trash: number;
  };
}

export default function ContentTabs({
  active,
  onChange,
  stats,
}: ContentTabsProps) {
  const tabs = [
    {
      key: "all",
      label: "All",
      count: stats.total,
    },
    {
      key: "published",
      label: "Published",
      count: stats.published,
    },
    {
      key: "draft",
      label: "Draft",
      count: stats.draft,
    },
    {
      key: "archived",
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
    <div className="flex flex-wrap gap-3">
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