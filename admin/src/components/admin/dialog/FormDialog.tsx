"use client";

import { ReactNode } from "react";

import Dialog from "./Dialog";

interface FormDialogProps {
  open: boolean;

  onClose: () => void;

  title: string;

  children: ReactNode;

  maxWidth?: "md" | "lg" | "xl";
}

export default function FormDialog({
  open,
  onClose,
  title,
  children,
  maxWidth = "lg",
}: FormDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
    >
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>
      </div>

      <div className="p-6">
        {children}
      </div>
    </Dialog>
  );
}