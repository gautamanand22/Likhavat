"use client";

/**
 * HERO — "the press floor". No stock photography: a dark ink stage with a
 * giant outlined लिखावट watermark, editorial type, and — on the right — a
 * running offset unit (PressRig) that feeds blank sheets through its roller
 * and turns out printed letterheads and prescription pads on a loop. The rig
 * gets a whisper of pointer parallax; all copy is server-rendered so the
 * headline is the LCP.
 */

import { useRef } from "react";
import { m, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Phone, ChevronRight, FileCheck, Zap, Truck, ReceiptText } from "lucide-react";
import { useLang } from "@/components/i18n/LanguageProvider";
import { waLink, telLink, enquiryMessage } from "@/lib/whatsapp";
import { AssembledCard } from "@/components/ui/BrandCard";
import { PressRig } from "@/components/ui/PressRig";
import { CmykDots } from "@/components/ui/CmykDots";

const chipIcons = [FileCheck, Zap, Truck, ReceiptText];

export function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 16, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 16, mass: 0.6 });
  const rigX = useTransform(sx, (v) => v * -14);
  const rigY = useTransform(sy, (v) => v * -10);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="grain relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink text-paper lg:max-h-[56rem] lg:min-h-[42rem]"
    >
      {/* stage dressing */}
      <div className="halftone pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-40 -top-24 h-[34rem] w-[34rem] rounded-full bg-magenta/[0.13] blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[30rem] w-[30rem] rounded-full bg-cyan/[0.1] blur-[140px]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 32% 38%, rgba(250,247,240,0.05), transparent 70%)",
        }}
      />
      {/* outlined watermark */}
      <span
        className="text-outline-paper pointer-events-none absolute -right-4 top-[5%] hidden select-none font-hindi font-bold leading-none md:block"
        style={{ fontSize: "clamp(9rem, 21vw, 19rem)" }}
        aria-hidden
      >
        लिखावट
      </span>

      {/* the running press */}
      <m.div
        className="pointer-events-none absolute right-[4%] top-1/2 z-[2] hidden w-[clamp(20rem,26vw,24.5rem)] -translate-y-[54%] select-none lg:block"
        style={{ x: rigX, y: rigY }}
      >
        <div className="fade-in" style={{ animationDelay: "0.45s" }}>
          <PressRig />
        </div>
      </m.div>

      {/* copy */}
      <div className="container-x relative z-10 flex flex-1 flex-col justify-center pb-8 pt-24">
        <div className="max-w-3xl 2xl:max-w-4xl">
          <div className="rise-in flex flex-col items-start gap-2.5 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3" style={{ animationDelay: "0.05s" }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-paper/10 px-3 py-1.5 backdrop-blur-sm">
              <CmykDots size={6} />
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-paper/90">
                {t.hero.badge}
              </span>
            </span>
          </div>

          <h1
            className="rise-in mt-5 font-display font-semibold leading-[1.04] tracking-[-0.02em] text-[2.3rem] [overflow-wrap:break-word] sm:text-[3.4rem] sm:leading-[1.01] lg:text-[4rem] xl:text-[4.6rem]"
            style={{ animationDelay: "0.1s" }}
          >
            {t.hero.titleA}
            <br />
            <span className="relative inline-block">
              <span className="text-gradient-print italic">{t.hero.titleB}</span>
              <svg
                viewBox="0 0 220 14"
                className="absolute -bottom-2 left-0 w-[86%] sm:-bottom-3"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 10.5 C 55 3.5, 150 12.5, 217 5.5"
                  stroke="var(--color-yellow)"
                  strokeOpacity="0.75"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  pathLength="1"
                  className="draw-swash"
                />
              </svg>
            </span>
          </h1>

          <p className="font-hindi rise-in mt-5 flex items-center gap-2 text-base text-yellow/90 sm:text-lg" style={{ animationDelay: "0.2s" }}>
            <span className="h-px w-6 bg-yellow/50" />
            {t.hero.tagline}
          </p>

          <p className="rise-in mt-4 max-w-xl text-[0.98rem] leading-relaxed text-paper/72" style={{ animationDelay: "0.28s" }}>
            {t.hero.subtitle}
          </p>

          <div className="rise-in mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.36s" }}>
            <a
              href={waLink(enquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-wa px-6 py-3.5 text-base font-bold text-white shadow-[0_14px_40px_-10px_rgba(37,211,102,0.8)] transition-transform hover:-translate-y-0.5"
            >
              {t.hero.enquireNow}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={telLink}
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 bg-paper/[0.06] px-5 py-3.5 text-base font-bold text-paper backdrop-blur-sm transition-colors hover:bg-paper/[0.12]"
            >
              <Phone className="h-5 w-5 text-yellow" />
              {t.hero.callNow}
            </a>
          </div>

          {/* the show-card, hand-placed on small screens */}
          <div className="fade-in mt-10 w-60 rotate-[-5deg] sm:w-64 lg:hidden" style={{ animationDelay: "0.5s" }} aria-hidden>
            <AssembledCard name={t.press.cardName} role={t.press.cardRole} />
          </div>
        </div>

        {/* bottom bar */}
        <div className="rise-in mt-10 flex flex-col gap-4 border-t border-paper/12 pt-4 lg:mt-7 lg:flex-row lg:items-center lg:justify-between" style={{ animationDelay: "0.5s" }}>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {t.hero.chips.map((c, idx) => {
              const Icon = chipIcons[idx] ?? Zap;
              return (
                <li key={c} className="inline-flex items-center gap-2 text-sm font-medium text-paper/85">
                  <Icon className="h-4 w-4 text-yellow" />
                  {c}
                  {idx < t.hero.chips.length - 1 && (
                    <span className="ml-3 hidden h-1 w-1 rounded-full bg-paper/30 sm:inline-block" />
                  )}
                </li>
              );
            })}
          </ul>
          <p className="inline-flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-paper/50">
            {t.hero.trustNote}
            <CmykDots size={5} />
          </p>
        </div>
      </div>
    </section>
  );
}
