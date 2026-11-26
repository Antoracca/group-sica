"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  Logo,
  SiteHeader,
  getTopNav,
  type NavItem,
  type TopNavItem,
} from "@sica/ui";
import { usePathname, useRouter } from "@/i18n/navigation";
import { getMainNav } from "@/lib/nav";
import { links } from "@/lib/links";

/*
  En-tête du site Groupe câblé à next-intl.
  - Fournit la locale active + le callback de bascule au SiteHeader partagé
    (le sélecteur FR/EN devient fonctionnel : router.replace vers la même page
    dans l'autre langue).
  - Préfixe les liens INTERNES (/a-propos, /contact…) avec la locale courante
    pour rester dans la bonne langue en navigant. Les liens externes (autres
    sites du groupe) sont laissés tels quels.
*/

type Locale = "fr" | "en";

function prefixHref(href: string, locale: string, external?: boolean): string {
  if (external || !href.startsWith("/")) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

function localizeTopNav(topNav: TopNavItem[], locale: string): TopNavItem[] {
  return topNav.map((item) => ({
    ...item,
    href: prefixHref(item.href, locale, item.external),
  }));
}

export function GroupeHeader({ forceScrolled = false }: { forceScrolled?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const tNav = useTranslations("Nav");
  const tTop = useTranslations("TopNav");

  const mainNav: NavItem[] = getMainNav(tNav, locale);

  // Le bandeau utilitaire utilise des libellés courts traduits (Corporate,
  // Partenaires, Contact…). On part de la structure de getTopNav puis on
  // traduit les libellés internes ; les libellés "marque" (SICA Construction,
  // SICA Assistance, SICA) restent tels quels (noms propres).
  const rawTopNav = getTopNav("groupe", {
    constructionUrl: links.construction.base,
    assistanceUrl: links.assistance.base,
    groupeUrl: links.groupe.base,
    landingUrl: links.landing.base,
  });
  const internalLabels: Record<string, string> = {
    Corporate: tTop("corporate"),
    Partenaires: tTop("partners"),
    Contact: tTop("contact"),
  };
  const topNav = localizeTopNav(
    rawTopNav.map((item) => ({
      ...item,
      label: internalLabels[item.label] ?? item.label,
    })),
    locale,
  );

  return (
    <SiteHeader
      brand="groupe"
      logo={
        <Logo
          brand="groupe"
          imgClassName="h-16 w-auto select-none sm:h-[4.5rem] lg:h-20 xl:h-24"
          imageRenderer={({ src, alt, width, height, className }) => (
            <Image src={src} alt={alt} width={width} height={height} className={className} priority />
          )}
        />
      }
      nav={mainNav}
      topNav={topNav}
      forceScrolled={forceScrolled}
      activeLocale={locale}
      onLocaleChange={(next) => router.replace(pathname, { locale: next })}
    />
  );
}
