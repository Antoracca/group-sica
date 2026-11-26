import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

/*
  Layout des pages publiques localisées. Le <html>/<body> et le <head>
  (fonts, préchargements) restent dans le layout racine (src/app/layout.tsx),
  qui englobe aussi les routes mono-langue (espace client, panel).
  Ici on se contente de valider la locale et d'exposer les messages.
*/

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
