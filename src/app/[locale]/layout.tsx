// src/app/[locale]/layout.tsx  ← FICHIER CLÉ
import { notFound } from 'next/navigation';

const supportedLocales = ['fr', 'en'];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  return <>{children}</>;
}