// src/app/admin/translations/layout.tsx
import { requireAdmin } from "@/lib/auth/adminCheck";
import Sidebar from "@/app/[locale]/(admin)/admin/translations/Sidebar";

export default async function AdminTranslationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin(); // Protège toute la section admin/translations

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}