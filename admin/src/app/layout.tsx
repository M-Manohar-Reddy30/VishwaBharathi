import type { Metadata } from "next";
import "./globals.css";

import QueryProvider from "@/providers/query-provider";
import ThemeProvider from "@/providers/theme-provider";
import { AuthProvider } from "@/features/auth/context/AuthProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: "Administration Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              {children}
              <Toaster richColors position="top-right" />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}