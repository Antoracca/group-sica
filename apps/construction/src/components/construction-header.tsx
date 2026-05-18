import Image from "next/image";
import { Button, Logo, SiteHeader } from "@sica/ui";
import { constructionNav, constructionTopNav } from "@/lib/nav";

export function ConstructionHeader({ forceScrolled = false }: { forceScrolled?: boolean }) {
  return (
    <SiteHeader
      brand="construction"
      nav={constructionNav}
      topNav={constructionTopNav}
      forceScrolled={forceScrolled}
      logo={
        <Logo
          brand="construction"
          imgClassName="h-16 w-auto select-none sm:h-[4.5rem] lg:h-20 xl:h-24"
          imageRenderer={({ src, alt, width, height, className }) => (
            <Image src={src} alt={alt} width={width} height={height} className={className} priority />
          )}
        />
      }
      badgeLogo={
        <Logo
          brand="construction"
          imgClassName="h-20 w-auto sm:h-24"
          imageRenderer={({ src, alt, width, height, className }) => (
            <Image src={src} alt={alt} width={width} height={height} className={className} />
          )}
        />
      }
      rightSlotScrolled={
        <Button asChild variant="accent" size="md">
          <a href="/devis">Lancer un devis</a>
        </Button>
      }
    />
  );
}

