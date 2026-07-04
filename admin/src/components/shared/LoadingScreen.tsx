"use client";

export default function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            Loading...
          </h2>

          <p className="text-sm text-slate-500">
            Please wait
          </p>
        </div>
      </div>
    </div>
  );
}