import { cn } from "@/lib/cn";

interface ToolbarProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Toolbar({
  children,
  className,
}: ToolbarProps) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}