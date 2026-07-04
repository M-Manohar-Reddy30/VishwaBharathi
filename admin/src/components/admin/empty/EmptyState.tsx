import { Button } from "@/components/ui";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center">

      <h2 className="text-xl font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-slate-500">
        {description}
      </p>

      {actionLabel && (
        <Button
          className="mt-6"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}

    </div>
  );
}