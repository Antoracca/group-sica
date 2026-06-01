import Image from "next/image";
import { Button, Logo, SiteHeader } from "@sica/ui";
import { assistanceNav, assistanceTopNav } from "@/lib/nav";

export function AssistanceHeader({ forceScrolled = false }: { forceScrolled?: boolean }) {
  return (
    <SiteHeader
      brand="assistance"
      nav={assistanceNav}
      topNav={assistanceTopNav}
      forceScrolled={forceScrolled}
      logo={
        <Logo
          brand="assistance"
          imgClassName="h-16 w-auto select-none sm:h-[4.5rem] lg:h-20 xl:h-24"
          imageRenderer={({ src, alt, width, height, className }) => (
            <Image src={src} alt={alt} width={width} height={height} className={className} priority />
          )}
        />
      }
      badgeLogo={
        <Logo
          brand="assistance"
          imgClassName="h-20 w-auto sm:h-24"
          imageRenderer={({ src, alt, width, height, className }) => (
            <Image src={src} alt={alt} width={width} height={height} className={className} />
          )}
        />
      }
      rightSlotScrolled={
        <Button asChild variant="accent" size="md">
          <a href="/#contact">Démarrer mon dossier</a>
        </Button>
      }
    />
  );
}
