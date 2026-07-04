"use client";

import { MoreHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ActionItem {
  label: string;
  onClick: () => void;
  danger?: boolean;
}

interface ActionMenuProps {
  items: ActionItem[];
}

export default function ActionMenu({
  items,
}: ActionMenuProps) {
  const [open, setOpen] = useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() =>
          setOpen(!open)
        }
        className="rounded-md p-2 hover:bg-slate-100"
      >
        <MoreHorizontal
          className="h-5 w-5"
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-lg">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className={`flex w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${
                item.danger
                  ? "text-red-600"
                  : "text-slate-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}