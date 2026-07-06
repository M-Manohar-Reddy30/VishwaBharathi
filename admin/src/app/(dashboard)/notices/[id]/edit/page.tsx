"use client";

import {
  notFound,
  useParams,
} from "next/navigation";

import { PageHeader } from "@/components/admin";

import NoticeForm from "@/features/notices/components/NoticeForm";

import { useNotice } from "@/features/notices/hooks/useNotice";

export default function EditNoticePage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data: notice,
    isLoading,
    isError,
  } = useNotice(id);

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Loading notice...
      </div>
    );
  }

  if (isError || !notice) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit Notice"
        description="Update notice."
      />

      <NoticeForm
        mode="edit"
        notice={notice}
      />
    </div>
  );
}