"use client";

import { ReactNode } from "react";

import Dialog from "./Dialog";

import { Button } from "@/components/ui";

interface ConfirmDialogProps {
  open: boolean;

  title: string;

  description: string;

  icon?: ReactNode;

  confirmText?: string;

  cancelText?: string;

  loading?: boolean;

  danger?: boolean;

  onConfirm: () => void;

  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  icon,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="md"
    >
      <div className="p-6">

        {icon && (
          <div className="mb-4 flex justify-center">
            {icon}
          </div>
        )}

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          {description}
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            loading={loading}
            variant={
              danger
                ? "destructive"
                : "primary"
            }
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>

      </div>
    </Dialog>
  );
}