"use client";

interface HeroTabsProps {
  trash: boolean;

  onChange: (trash: boolean) => void;
}

export default function HeroTabs({
  trash,
  onChange,
}: HeroTabsProps) {
  return (
    <div className="flex gap-2 rounded-xl border border-slate-200 bg-white p-1 w-fit">

      <button
        onClick={() => onChange(false)}
        className={`rounded-lg px-5 py-2 text-sm font-medium transition ${
          !trash
            ? "bg-blue-600 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        All Heroes
      </button>

      <button
        onClick={() => onChange(true)}
        className={`rounded-lg px-5 py-2 text-sm font-medium transition ${
          trash
            ? "bg-red-600 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        Trash
      </button>

    </div>
  );
}