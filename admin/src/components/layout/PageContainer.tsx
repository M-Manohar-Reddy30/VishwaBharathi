import { UI } from "@/constants/ui";

interface Props {
  children: React.ReactNode;
}

export default function PageContainer({
  children,
}: Props) {
  return (
    <main
      style={{
        marginLeft: UI.sidebarWidth,
      }}
      className="min-h-screen bg-slate-50"
    >
      {children}
    </main>
  );
}