"use client";

interface Props {
  children: React.ReactNode;
}

export default function ThemeProvider({
  children,
}: Props) {
  return <>{children}</>;
}