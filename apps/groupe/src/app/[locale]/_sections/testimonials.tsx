"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@sica/ui";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

const THIRD_IMAGE_CANDIDATES = [
  "/CONFIANCE3.jpeg",
  "/confiance3.jpeg",
  "/confiance3.jpg",
  "/confiance-3.jpeg",
  "/confiance-pro.jpeg",
  "/confiance-pro.jpg",
];

function useResolvedThirdImage() {
  const [src, setSrc] = React.useState("/CONFIANCE3.jpeg");

  React.useEffect(() => {
    let cancelled = false;

    const testImage = (path: string) =>
      new Promise<boolean>((resolve) => {
        const img = new window.Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = path;
      });

    const run = async () => {
      for (const candidate of THIRD_IMAGE_CANDIDATES) {
        // eslint-disable-next-line no-await-in-loop
        const ok = await testImage(candidate);
        if (ok && !cancelled) {
          setSrc(candidate);
          return;
        }
      }
      if (!cancelled) setSrc("/confiance2.jpeg");
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return src;
}

function PhotoCard({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[20px] border border-[#E6EAF6] bg-white shadow-[0_12px_40px_rgba(18,35,102,0.12)]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 42vw, 86vw"
        className="object-contain p-2 sm:p-3"
        priority={priority}
        unoptimized
      />
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("Home.testimonials");
  const sectionRef = React.useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
    margin: "0px 0px -12% 0px",
  });
  const shouldReduceMotion = useReducedMotion();
  const thirdSrc = useResolvedThirdImage();
  const phrase = t("typewriter");
  const [typed, setTyped] = React.useState("");

  const stageDuration = shouldReduceMotion ? 0.7 : 6.2;
  const thirdRevealStart = shouldReduceMotion ? 0.55 : 0.66;

  React.useEffect(() => {
    if (!inView) return;

    if (shouldReduceMotion) {
      setTyped(phrase);
      return;
    }

    setTyped("");
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const timeoutId = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        i += 1;
        setTyped(phrase.slice(0, i));
        if (i >= phrase.length && intervalId) {
          clearInterval(intervalId);
        }
      }, 40);
    }, Math.round(stageDuration * 1000 * 0.74));

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [inView, phrase, shouldReduceMotion, stageDuration]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white pb-20 pt-10 sm:pb-24 sm:pt-12 lg:pb-28 lg:pt-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-20"
        style={{
          background: "linear-gradient(to bottom, #FAFAF6 0%, rgba(250,250,246,0.45) 45%, rgba(255,255,255,0) 100%)",
        }}
      />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-[#1E2F8A]/70">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-balance text-[clamp(1.7rem,4vw,3.1rem)] font-bold leading-[1.08] tracking-tight text-[#0F1E5A]">
            {t("heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-neutral-600 sm:text-base">
            {t("subtitle")}
          </p>
        </div>

        <div
          className="relative mx-auto mt-10 w-full max-w-[1320px] overflow-hidden rounded-[28px] border border-[#E7EBF7] bg-white"
          style={{
            aspectRatio: "16 / 9",
            boxShadow: "0 26px 70px rgba(20,37,110,0.12)",
          }}
        >
          <motion.div
            className="absolute inset-0 z-[1]"
            initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)", y: "8%" }}
            animate={
              inView
                ? shouldReduceMotion
                  ? { opacity: [0, 1], clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"], y: ["8%", "0%"] }
                  : {
                      opacity: [0, 0, 0, 1],
                      clipPath: [
                        "inset(100% 0% 0% 0%)",
                        "inset(100% 0% 0% 0%)",
                        "inset(34% 0% 0% 0%)",
                        "inset(0% 0% 0% 0%)",
                      ],
                      y: ["8%", "8%", "3%", "0%"],
                    }
                : {}
            }
            transition={{
              duration: stageDuration,
              times: shouldReduceMotion ? [0, 1] : [0, thirdRevealStart, 0.83, 1],
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={
                shouldReduceMotion
                  ? { scale: 1 }
                  : { scale: [1, 1.045, 1.02], y: [0, -4, 0] }
              }
              transition={{
                duration: shouldReduceMotion ? 0.1 : 10,
                repeat: shouldReduceMotion ? 0 : Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: shouldReduceMotion ? 0 : 4.2,
              }}
            >
              <div className="relative h-full w-full bg-white">
                <Image
                  src={thirdSrc}
                  alt="Confiance Pro"
                  fill
                  sizes="(min-width: 1024px) 92vw, 100vw"
                  className="object-contain p-3 sm:p-4 lg:p-5"
                  unoptimized
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            aria-hidden
            className="absolute inset-0 z-[4]"
            initial={{ opacity: 0 }}
            animate={
              inView
                ? shouldReduceMotion
                  ? { opacity: [1, 0] }
                  : { opacity: [1, 1, 1, 0.85, 0.18, 0] }
                : {}
            }
            transition={{
              duration: stageDuration,
              times: shouldReduceMotion ? [0, 1] : [0, 0.45, 0.62, 0.78, 0.9, 1],
            }}
          >
            <motion.div
              className="absolute left-[4%] top-[9%] h-[74%] w-[44%]"
              initial={{ x: "-18%", y: "10%", rotate: -3, scale: 1.04 }}
              animate={
                inView
                  ? shouldReduceMotion
                    ? { x: "-8%", y: "4%", rotate: -2, scale: 1 }
                    : {
                        x: ["-18%", "0%", "0%", "-9%", "-11%"],
                        y: ["10%", "0%", "0%", "5%", "5%"],
                        rotate: [-3, -1.2, -1.2, -1.8, -1.8],
                        scale: [1.04, 1, 1, 1.02, 1.02],
                      }
                  : {}
              }
              transition={{
                duration: stageDuration,
                times: shouldReduceMotion ? [0, 1] : [0, 0.2, 0.58, 0.82, 1],
                ease: "easeInOut",
              }}
            >
              <PhotoCard src="/confiance1.jpeg" alt="Inauguration" priority />
            </motion.div>

            <motion.div
              className="absolute bottom-[9%] right-[4%] h-[74%] w-[44%]"
              initial={{ x: "18%", y: "-10%", rotate: 3, scale: 1.04 }}
              animate={
                inView
                  ? shouldReduceMotion
                    ? { x: "8%", y: "-4%", rotate: 2, scale: 1 }
                    : {
                        x: ["18%", "0%", "0%", "9%", "11%"],
                        y: ["-10%", "0%", "0%", "-5%", "-5%"],
                        rotate: [3, 1.2, 1.2, 1.8, 1.8],
                        scale: [1.04, 1, 1, 1.02, 1.02],
                      }
                  : {}
              }
              transition={{
                duration: stageDuration,
                times: shouldReduceMotion ? [0, 1] : [0, 0.2, 0.58, 0.82, 1],
                ease: "easeInOut",
              }}
            >
              <PhotoCard src="/confiance2.jpeg" alt="Partenariat" />
            </motion.div>

            <motion.div
              className="absolute left-1/2 top-1/2 z-[6] h-[2px] w-[170%] -translate-x-1/2 -translate-y-1/2 bg-[#1E2F8A]/65"
              style={{ rotate: "-18deg" }}
              initial={{ opacity: 0 }}
              animate={
                inView
                  ? shouldReduceMotion
                    ? { opacity: 0.8 }
                    : { opacity: [0, 0, 0.28, 0.88, 0.9] }
                  : {}
              }
              transition={{
                duration: stageDuration,
                times: shouldReduceMotion ? [0, 1] : [0, 0.55, 0.7, 0.86, 1],
              }}
            />
          </motion.div>
        </div>

        <motion.div
          className="mx-auto mt-5 max-w-[1320px] px-1 sm:mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={
            inView
              ? shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: [0, 0, 1], y: [20, 20, 0] }
              : {}
          }
          transition={{
            duration: shouldReduceMotion ? 0.35 : 4.9,
            times: shouldReduceMotion ? [0, 1] : [0, 0.72, 1],
            ease: "easeOut",
          }}
        >
          <p className="text-center font-mono text-[clamp(0.85rem,2vw,1.08rem)] font-medium tracking-[0.06em] text-[#0F1E5A]">
            {typed}
            <span className={typed.length < phrase.length ? "animate-pulse" : "opacity-0"}>|</span>
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
