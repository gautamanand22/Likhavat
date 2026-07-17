"use client";

/**
 * HERO — "the composing desk". No stock photography: a dark ink stage with a
 * giant outlined लिखावट watermark and a floating cluster of print artifacts
 * built entirely in CSS (the brand visiting card, a sealed wedding envelope,
 * a prescription pad, a process-ink fan). Artifacts bob on a slow CSS
 * keyframe and parallax with the pointer via framer-motion springs.
 * All copy is server-rendered — the headline is the LCP, no image race.
 */

import { useRef } from "react";
import {
  m,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import clsx from "clsx";
import { Phone, ChevronRight, FileCheck, Zap, Truck, ReceiptText } from "lucide-react";
import { useLang } from "@/components/i18n/LanguageProvider";
import { waLink, telLink, enquiryMessage } from "@/lib/whatsapp";
import { AssembledCard } from "@/components/ui/BrandCard";
import { CmykDots } from "@/components/ui/CmykDots";

const chipIcons = [FileCheck, Zap, Truck, ReceiptText];

/** Positioned artifact: pointer-parallax (outer) → rotation → slow bob → art. */
function Artifact({
  sx,
  sy,
  depth,
  rotate,
  bobDelay = "0s",
  bobDuration = "7s",
  className,
  children,
}: {
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  depth: number;
  rotate: number;
  bobDelay?: string;
  bobDuration?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth * 0.72);
  return (
    <m.div
      className={clsx("pointer-events-none absolute hidden select-none lg:block", className)}
      style={{ x, y }}
      aria-hidden
    >
      <div className="fade-in" style={{ animationDelay: "0.55s" }}>
        <div style={{ transform: `rotate(${rotate}deg)` }}>
          <div
            className="animate-float"
            style={{ animationDelay: bobDelay, animationDuration: bobDuration }}
          >
            {children}
          </div>
        </div>
      </div>
    </m.div>
  );
}

/* ---------------------------- CSS print artifacts ---------------------------- */

function WeddingEnvelope() {
  return (
    <div className="relative aspect-[5/3.4] w-full overflow-hidden rounded-lg bg-[#f7f0e4] shadow-[0_26px_50px_-18px_rgba(0,0,0,0.55)]">
      {/* flap */}
      <div
        className="absolute inset-x-0 top-0 h-[62%] bg-[#efe5d2]"
        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[62%] border-b border-ink/[0.07]"
        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
      />
      {/* gold wax seal at the flap tip */}
      <div
        className="absolute left-1/2 top-[46%] flex h-[26%] w-[16%] -translate-x-1/2 items-center justify-center rounded-full pb-[1%] shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #f1dc8e 0%, #d4af37 45%, #8a6d1c 100%)",
        }}
      >
        <span className="font-hindi text-[0.8rem] font-bold text-[#5c470f]">लि</span>
      </div>
      {/* stamp + postmark */}
      <div className="absolute right-[7%] top-[8%] flex h-[24%] w-[13%] items-center justify-center rounded-sm border border-ink/15 bg-white/60">
        <span className="font-hindi text-[0.55rem] text-ink/50">डाक</span>
      </div>
      <span className="absolute right-[13%] top-[14%] h-[22%] w-[13%] rounded-full border border-magenta/30" />
      {/* address lines */}
      <span className="absolute bottom-[16%] left-[8%] h-px w-[38%] bg-ink/20" />
      <span className="absolute bottom-[10%] left-[8%] h-px w-[26%] bg-ink/15" />
    </div>
  );
}

function RxPad() {
  return (
    <div className="relative aspect-[3/3.9] w-full overflow-hidden rounded-md bg-white shadow-[0_24px_46px_-18px_rgba(0,0,0,0.55)]">
      {/* clinic header */}
      <div className="absolute inset-x-0 top-0 flex h-[21%] flex-col justify-center bg-ink px-[9%]">
        <p className="text-[0.52rem] font-bold tracking-wide text-paper">Dr. Anjali Sinha</p>
        <p className="mt-[1%] font-spec text-[0.4rem] font-medium uppercase tracking-[0.16em] text-paper/55">
          MBBS · Reg 40712 · Patna
        </p>
      </div>
      <span className="absolute left-[9%] top-[26%] font-display text-[1.6rem] font-semibold italic leading-none text-magenta">
        ℞
      </span>
      {[46, 57, 68, 79].map((top, i) => (
        <span
          key={top}
          className="absolute left-[9%] h-px bg-ink/12"
          style={{ top: `${top}%`, width: `${74 - i * 9}%` }}
        />
      ))}
      <span className="absolute bottom-[4%] right-[8%] font-spec text-[0.38rem] font-semibold uppercase tracking-[0.2em] text-ink/35">
        100 leaves
      </span>
    </div>
  );
}

function InkFan() {
  const chips = [
    { bg: "var(--color-cyan)", label: "C · 100", rot: -26 },
    { bg: "var(--color-magenta)", label: "M · 100", rot: -9 },
    { bg: "var(--color-yellow)", label: "Y · 100", rot: 8 },
    { bg: "var(--color-ink)", label: "K · 100", rot: 25 },
  ];
  return (
    <div className="relative h-32 w-36">
      {chips.map((c) => (
        <div
          key={c.label}
          className="absolute bottom-0 left-1/2 h-[6.4rem] w-[3.1rem] origin-[50%_115%] overflow-hidden rounded-md bg-white p-[0.22rem] shadow-[0_16px_32px_-14px_rgba(0,0,0,0.6)]"
          style={{ transform: `translateX(-50%) rotate(${c.rot}deg)` }}
        >
          <div className="h-[68%] w-full rounded-[0.25rem]" style={{ background: c.bg }} />
          <p className="mt-[0.3rem] text-center font-spec text-[0.42rem] font-semibold uppercase tracking-[0.08em] text-ink/70">
            {c.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------- Hero --------------------------------- */

export function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 16, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 16, mass: 0.6 });

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
        className="text-outline-paper pointer-events-none absolute -right-4 top-[6%] hidden select-none font-hindi font-bold leading-none md:block"
        style={{ fontSize: "clamp(9rem, 21vw, 19rem)" }}
        aria-hidden
      >
        लिखावट
      </span>

      {/* floating print artifacts */}
      <Artifact sx={sx} sy={sy} depth={-30} rotate={6} className="right-[4.5%] top-[20%] z-[3] w-[clamp(17rem,23.5vw,22.5rem)] xl:right-[6.5%]" bobDuration="8s">
        <AssembledCard name={t.press.cardName} role={t.press.cardRole} />
      </Artifact>
      <Artifact sx={sx} sy={sy} depth={-48} rotate={-11} className="right-[29%] top-[11%] xl:right-[31%]" bobDelay="1.4s" bobDuration="6.5s">
        <InkFan />
      </Artifact>
      <Artifact sx={sx} sy={sy} depth={38} rotate={-8} className="bottom-[15%] right-[10%] z-[2] w-[clamp(12rem,15vw,15rem)]" bobDelay="0.8s" bobDuration="7.5s">
        <WeddingEnvelope />
      </Artifact>
      <Artifact sx={sx} sy={sy} depth={54} rotate={7} className="bottom-[10%] right-[32.5%] w-[10.2rem]" bobDelay="2.2s" bobDuration="6s">
        <RxPad />
      </Artifact>

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
