"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { Spinner } from "@/components/ui";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props) {
  const router = useRouter();

  const { admin, loading } = useAuth();

  useEffect(() => {
    if (!loading && !admin) {
      router.replace("/login");
    }
  }, [loading, admin, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size={30} />
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return <>{children}</>;
}