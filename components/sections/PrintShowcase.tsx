"use client";

/**
 * THE SIGNATURE SECTION — a pinned, scroll-driven recreation of four-colour
 * offset printing. As the visitor scrolls, the show-card is manufactured the
 * way a real press does it: design proof on the light table → an ink roller
 * sweeps the sheet four times, wiping each C/M/Y/K plate on in perfect
 * register → velvet lamination sheen + a gold foil stamp → guillotine lines
 * flash, the card lifts into 3D and the cut stack fans out.
 *
 * Desktop: 380vh scroll track with a sticky viewport (framer-motion useScroll).
 * Mobile / reduced-motion: assembled card + the four stages as cards.
 *
 * NOTE: every scroll-linked *opacity* (and other non-transform styles like
 * clip-path) is set imperatively via useSeg/useMotionValueEvent — framer 12
 * compiles useTransform-derived opacity into native scroll-timeline keyframes
 * and mis-handles piecewise ranges. Transforms may use useTransform.
 */

import { useRef, useState, useEffect } from "react";
import {
  m,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  transform,
  type MotionValue,
} from "framer-motion";
import clsx from "clsx";
import { useLang } from "@/components/i18n/LanguageProvider";
import {
  PlateCyan,
  PlateMagenta,
  PlateYellow,
  PlateKey,
  AssembledCard,
} from "@/components/ui/BrandCard";

/* ------------------------------- helpers ------------------------------- */

/** Scroll-linked value kept on the CPU path (see file note). */
function useSeg(p: MotionValue<number>, input: number[], output: number[]) {
  const mv = useMotionValue(transform(input, output)(p.get()));
  useMotionValueEvent(p, "change", (v) => mv.set(transform(input, output)(v)));
  return mv;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** C/M/Y/K plate windows on the scroll track. */
const WINDOWS: [number, number][] = [
  [0.16, 0.27],
  [0.27, 0.38],
  [0.38, 0.49],
  [0.49, 0.6],
];

const INKS = [
  { ch: "C", name: "CYAN", color: "var(--color-cyan)", cls: "text-cyan" },
  { ch: "M", name: "MAGENTA", color: "var(--color-magenta)", cls: "text-magenta" },
  { ch: "Y", name: "YELLOW", color: "var(--color-yellow)", cls: "text-yellow" },
  { ch: "K", name: "BLACK", color: "#0d0a13", cls: "text-paper" },
] as const;

/* -------------------------- proof-stage dressing -------------------------- */

/** Dashed wireframe matching the show-card layout (design & proof stage). */
function DesignWireframe() {
  const box = "absolute rounded border border-dashed border-paper/40";
  return (
    <div className="absolute inset-0" aria-hidden>
      <div className={clsx(box, "left-[7%] top-[12%] h-[21.5%] w-[13.5%]")} />
      <div className={clsx(box, "right-[7%] top-[13%] h-[13%] w-[27%]")} />
      <div className={clsx(box, "left-[7%] top-[41%] h-[14%] w-[44%]")} />
      <div className={clsx(box, "left-[7%] top-[60.5%] h-[1.4%] w-[21%] border-yellow/50")} />
      <div className={clsx(box, "bottom-[8%] left-[7%] h-[7%] w-[58%]")} />
      <div
        className="absolute right-[-14%] top-[16%] aspect-square w-[42%] rounded-full border border-dashed border-cyan/40"
      />
      {/* margin guides */}
      <span className="absolute inset-y-0 left-[7%] w-px bg-cyan/25" />
      <span className="absolute inset-x-0 top-[41%] h-px bg-cyan/25" />
    </div>
  );
}

/** Printer's crop + registration marks around the sheet. */
function CropMarks({ className }: { className?: string }) {
  const line = "absolute bg-paper/60";
  return (
    <div className={clsx("pointer-events-none absolute -inset-5", className)} aria-hidden>
      {[
        "left-0 top-5 h-px w-4", "left-5 top-0 h-4 w-px",
        "right-0 top-5 h-px w-4", "right-5 top-0 h-4 w-px",
        "bottom-5 left-0 h-px w-4", "bottom-0 left-5 h-4 w-px",
        "bottom-5 right-0 h-px w-4", "bottom-0 right-5 h-4 w-px",
      ].map((c) => (
        <span key={c} className={clsx(line, c)} />
      ))}
      <svg
        viewBox="0 0 20 20"
        className="absolute -top-1 left-1/2 h-4 w-4 -translate-x-1/2 text-paper/60"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <circle cx="10" cy="10" r="5.5" />
        <path d="M10 0v20M0 10h20" />
      </svg>
    </div>
  );
}

/** A process-colour dot that springs off the card when the stack is delivered. */
function PopDot({
  fan,
  vx,
  vy,
  color,
}: {
  fan: MotionValue<number>;
  vx: number;
  vy: number;
  color: string;
}) {
  const x = useTransform(fan, (v) => v * vx * 110);
  const y = useTransform(fan, (v) => v * vy * 85);
  const opacity = useTransform(fan, [0, 0.2, 0.8, 1], [0, 1, 0.9, 0]);
  const scale = useTransform(fan, [0, 1], [0.3, 1]);
  return (
    <m.span
      className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full"
      style={{ x, y, opacity, scale, background: color }}
      aria-hidden
    />
  );
}

const POP_DOTS = [
  { vx: -1, vy: -0.7, color: "var(--color-cyan)" },
  { vx: 1, vy: -0.55, color: "var(--color-magenta)" },
  { vx: -0.85, vy: 0.75, color: "var(--color-yellow)" },
  { vx: 0.9, vy: 0.7, color: "var(--color-cyan)" },
  { vx: 0.12, vy: -1, color: "var(--color-magenta)" },
  { vx: -0.25, vy: 1, color: "var(--color-yellow)" },
];

/* ------------------------------ the section ------------------------------ */

export function PrintShowcase() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const [stage, setStage] = useState(0);
  const [inkIdx, setInkIdx] = useState(-1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPinned(window.innerWidth >= 1024 && !reduce);
    const onResize = () => setPinned(window.innerWidth >= 1024 && !reduce);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [reduce]);

  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // --- plate wipes + ink roller (single imperative pass per scroll tick) ---
  const clipC = useMotionValue("inset(0% 0% 100% 0%)");
  const clipM = useMotionValue("inset(0% 0% 100% 0%)");
  const clipY = useMotionValue("inset(0% 0% 100% 0%)");
  const clipK = useMotionValue("inset(0% 0% 100% 0%)");
  const rollerTop = useMotionValue("-12%");
  const rollerOpacity = useMotionValue(0);
  const clips = [clipC, clipM, clipY, clipK];

  useMotionValueEvent(p, "change", (v) => {
    setStage(v < 0.16 ? 0 : v < 0.62 ? 1 : v < 0.8 ? 2 : 3);

    let active = -1;
    WINDOWS.forEach(([s, e], i) => {
      const local = clamp01((v - s) / (e - s));
      clips[i].set(`inset(0% 0% ${(1 - local) * 100}% 0%)`);
      if (v >= s && v < e) {
        active = i;
        rollerTop.set(`${-12 + local * 116}%`);
      }
    });
    rollerOpacity.set(active >= 0 ? 1 : 0);
    setInkIdx(active);
  });

  // --- stage dressing (all opacity via useSeg — CPU path) ---
  const wireOpacity = useSeg(p, [0.12, 0.19], [1, 0]);
  const sheenX = useTransform(p, [0.64, 0.8], ["-130%", "330%"]);
  const sheenOpacity = useSeg(p, [0.64, 0.66, 0.76, 0.8], [0, 1, 1, 0]);
  const foilOpacity = useSeg(p, [0.68, 0.73], [0, 1]);
  const foilScale = useSeg(p, [0.68, 0.76], [1.9, 1]);
  const cropOpacity = useSeg(p, [0.76, 0.8], [1, 0]);

  // guillotine flash just before the lift
  const gH = useSeg(p, [0.775, 0.812], [0, 1]);
  const gV = useSeg(p, [0.792, 0.83], [0, 1]);
  const gOpacity = useSeg(p, [0.772, 0.784, 0.838, 0.855], [0, 1, 1, 0]);

  // cut, lift, fan, deliver
  const cardRotY = useTransform(p, [0.8, 0.94], [0, -14]);
  const cardRotX = useTransform(p, [0.8, 0.94], [0, 9]);
  const cardScale = useTransform(p, [0.8, 0.94], [1, 1.05]);
  const cardShadow = useTransform(
    p,
    [0.8, 0.95],
    ["0 18px 40px -18px rgba(0,0,0,0.55)", "0 48px 90px -30px rgba(0,0,0,0.65)"],
  );
  const fan1 = useSeg(p, [0.84, 0.95], [0, 1]);
  const fan1X = useTransform(fan1, (v) => v * -36);
  const fan1Y = useTransform(fan1, (v) => v * 22);
  const fan1R = useTransform(fan1, (v) => v * -9);
  const fan2X = useTransform(fan1, (v) => v * 32);
  const fan2Y = useTransform(fan1, (v) => v * 40);
  const fan2R = useTransform(fan1, (v) => v * 7);
  const floorScale = useTransform(fan1, (v) => 1 + v * 0.16);

  const progressScale = useTransform(p, [0, 1], [0, 1]);

  const stages = t.press.stages;
  const caption =
    stage === 0
      ? "PROOF V1 · AWAITING APPROVAL"
      : stage === 1
        ? `PLATE ${Math.max(inkIdx, 0) + 1}/4 · ${INKS[Math.max(inkIdx, 0)].name} DOWN`
        : stage === 2
          ? "VELVET LAMINATION · GOLD FOIL"
          : "TRIMMED · BOXED · READY FOR PICKUP";

  /* ---------------- Static (mobile / reduced-motion) ---------------- */
  if (!pinned) {
    return (
      <section id="press" ref={ref} className="grain relative overflow-hidden bg-ink text-paper">
        <div className="halftone pointer-events-none absolute inset-0" />
        <div className="container-x section-pad relative z-10">
          <span className="eyebrow">
            <span className="h-px w-6 bg-magenta/60" />
            {t.press.eyebrow}
          </span>
          <h2 className="mt-3 max-w-xl text-balance text-3xl text-paper sm:text-4xl">
            {t.press.heading}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/70">{t.press.sub}</p>

          <div className="mt-12 flex justify-center">
            <div className="relative w-[min(30rem,88vw)]">
              <div className="absolute inset-0 -rotate-[7deg] translate-x-[-7%] translate-y-[6%] rounded-[4.5%_/_7%] bg-paper-200 shadow-xl" aria-hidden />
              <div className="absolute inset-0 rotate-[5deg] translate-x-[6%] translate-y-[9%] rounded-[4.5%_/_7%] bg-paper-200/80 shadow-xl" aria-hidden />
              <AssembledCard name={t.press.cardName} role={t.press.cardRole} className="relative" />
            </div>
          </div>

          <ol className="mt-14 grid gap-4 sm:grid-cols-2">
            {stages.map((s, i) => (
              <li key={s.k} className="glass rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <span className="font-spec text-sm font-semibold text-magenta">0{i + 1}</span>
                  {i === 1 && (
                    <span className="flex gap-1.5 font-spec text-xs font-bold">
                      {INKS.map((ink) => (
                        <span key={ink.ch} className={ink.cls}>
                          {ink.ch}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-display text-lg text-paper">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-paper/65">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  /* ---------------- Pinned scroll experience (desktop) ---------------- */
  return (
    <section id="press" ref={ref} className="relative h-[380vh] bg-ink text-paper">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="halftone pointer-events-none absolute inset-0" aria-hidden />
        <div className="pointer-events-none absolute -left-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-magenta/15 blur-[130px]" />
        <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[26rem] w-[26rem] rounded-full bg-cyan/15 blur-[130px]" />

        <div className="container-x relative z-10 grid flex-1 items-center gap-10 lg:grid-cols-[minmax(20rem,1fr)_minmax(0,1.5fr)]">
          {/* Left rail — heading, stages */}
          <div className="max-w-md">
            <span className="eyebrow">
              <span className="h-px w-6 bg-magenta/60" />
              {t.press.eyebrow}
            </span>
            <h2 className="mt-3 text-balance text-3xl text-paper lg:text-[2.6rem]">
              {t.press.heading}
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-paper/65">{t.press.sub}</p>

            <ol className="mt-8 space-y-1.5">
              {stages.map((s, i) => (
                <li
                  key={s.k}
                  className={clsx(
                    "rounded-2xl border p-4 transition-all duration-500",
                    stage === i ? "border-paper/15 bg-paper/[0.06]" : "border-transparent opacity-40",
                  )}
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className={clsx(
                        "font-spec text-xs font-semibold",
                        stage === i ? "text-magenta" : "text-paper/50",
                      )}
                    >
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-lg text-paper">{s.title}</h3>
                    {i === 1 && stage === 1 && (
                      <span className="ml-auto flex gap-1.5 font-spec text-xs font-bold">
                        {INKS.map((ink, j) => (
                          <span
                            key={ink.ch}
                            className={clsx(
                              ink.cls,
                              "transition-opacity duration-300",
                              inkIdx >= j ? "opacity-100" : "opacity-25",
                            )}
                          >
                            {ink.ch}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                  <p
                    className={clsx(
                      "mt-1 overflow-hidden pl-8 text-sm leading-relaxed text-paper/65 transition-all duration-500",
                      stage === i ? "max-h-24 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    {s.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Right — the press bed */}
          <div className="relative flex items-center justify-center py-10">
            {/* machine bed */}
            <div className="absolute inset-x-[-6%] inset-y-[4%] rounded-[2.5rem] bg-gradient-to-b from-paper/[0.05] to-transparent ring-1 ring-paper/[0.07]" aria-hidden>
              <span className="absolute left-6 top-4 font-spec text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-paper/30">
                Likhavat · bed 01
              </span>
              <span className="cmyk-strip absolute right-6 top-5 h-1 w-16 rounded-full opacity-50" />
            </div>

            <div style={{ perspective: "1400px" }} className="relative">
              {/* floor shadow */}
              <m.div
                className="absolute -bottom-12 left-1/2 h-9 w-[86%] -translate-x-1/2 rounded-[100%] bg-black/45 blur-xl"
                style={{ scale: floorScale }}
                aria-hidden
              />

              {/* fanned copies behind (the cut stack) */}
              <m.div
                className="absolute inset-0 rounded-[4.5%_/_7%] bg-paper-200 shadow-xl"
                style={{ x: fan1X, y: fan1Y, rotate: fan1R, opacity: fan1 }}
                aria-hidden
              />
              <m.div
                className="absolute inset-0 rounded-[4.5%_/_7%] bg-paper-200/90 shadow-xl"
                style={{ x: fan2X, y: fan2Y, rotate: fan2R, opacity: fan1 }}
                aria-hidden
              />

              {/* the sheet */}
              <m.div
                className="relative aspect-[86/54] w-[min(34rem,84vw)] rounded-[4.5%_/_7%] bg-[#fffdf8] lg:w-[min(34rem,40vw)]"
                style={{
                  rotateY: cardRotY,
                  rotateX: cardRotX,
                  scale: cardScale,
                  boxShadow: cardShadow,
                  containerType: "inline-size",
                }}
              >
                {/* light-table rulers + crop marks (proof stage) */}
                <m.div style={{ opacity: wireOpacity }} aria-hidden>
                  <div className="ruler-x absolute -top-4 left-0 right-0 h-1.5 opacity-60" />
                  <div className="ruler-y absolute -left-4 bottom-0 top-0 w-1.5 opacity-60" />
                </m.div>
                <m.div style={{ opacity: cropOpacity }}>
                  <CropMarks />
                </m.div>

                {/* digital proof overlay */}
                <m.div
                  style={{ opacity: wireOpacity }}
                  className="absolute inset-0 rounded-[4.5%_/_7%] bg-ink-3/95"
                >
                  <DesignWireframe />
                  <span className="absolute right-[4%] top-[5%] font-spec text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-paper/50">
                    proof v1 · 86×54
                  </span>
                </m.div>

                {/* CMYK plates — wiped on by the roller */}
                <div className="absolute inset-0 overflow-hidden rounded-[4.5%_/_7%]">
                  <m.div className="absolute inset-0" style={{ clipPath: clipY }}>
                    <PlateYellow />
                  </m.div>
                  <m.div className="absolute inset-0" style={{ clipPath: clipC }}>
                    <PlateCyan />
                  </m.div>
                  <m.div className="absolute inset-0" style={{ clipPath: clipM }}>
                    <PlateMagenta />
                  </m.div>
                  <m.div className="absolute inset-0" style={{ clipPath: clipK }}>
                    <PlateKey name={t.press.cardName} role={t.press.cardRole} />
                  </m.div>

                  {/* gold foil stamp */}
                  <m.div
                    className="absolute left-[7%] top-[60.2%] h-[1.6%] w-[21%] rounded-full"
                    style={{
                      opacity: foilOpacity,
                      scaleX: foilScale,
                      transformOrigin: "0% 50%",
                      background:
                        "linear-gradient(105deg,#8a6d1c 0%,#e6c860 30%,#fdf0b0 50%,#d4af37 70%,#8a6d1c 100%)",
                    }}
                    aria-hidden
                  />

                  {/* lamination sheen */}
                  <m.div
                    className="absolute inset-y-[-40%] w-[45%] rotate-[16deg]"
                    style={{
                      x: sheenX,
                      opacity: sheenOpacity,
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
                    }}
                    aria-hidden
                  />
                </div>

                {/* ink roller sweeping the sheet */}
                <m.div
                  className="absolute left-[-3%] w-[106%]"
                  style={{ top: rollerTop, opacity: rollerOpacity }}
                  aria-hidden
                >
                  <div
                    className="h-4 rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                    style={{
                      background: `linear-gradient(180deg, rgba(255,255,255,0.32), ${INKS[Math.max(inkIdx, 0)].color} 42%, rgba(0,0,0,0.45))`,
                    }}
                  />
                </m.div>

                {/* guillotine flash */}
                <m.div style={{ opacity: gOpacity }} aria-hidden>
                  <m.span className="absolute left-[-5%] right-[-5%] top-[1.5%] h-px origin-left bg-paper/80" style={{ scaleX: gH }} />
                  <m.span className="absolute bottom-[1.5%] left-[-5%] right-[-5%] h-px origin-right bg-paper/80" style={{ scaleX: gH }} />
                  <m.span className="absolute bottom-[-7%] left-[1.5%] top-[-7%] w-px origin-top bg-paper/80" style={{ scaleY: gV }} />
                  <m.span className="absolute bottom-[-7%] right-[1.5%] top-[-7%] w-px origin-bottom bg-paper/80" style={{ scaleY: gV }} />
                </m.div>
              </m.div>

              {/* delivery dot pop */}
              {POP_DOTS.map((d, i) => (
                <PopDot key={i} fan={fan1} vx={d.vx} vy={d.vy} color={d.color} />
              ))}

              {/* machine-room caption */}
              <p className="pointer-events-none absolute -bottom-[4.2rem] left-1/2 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap font-spec text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-paper/40" aria-hidden>
                <span
                  className={clsx(
                    "h-1.5 w-1.5 rounded-full",
                    stage === 3 ? "bg-wa" : "bg-magenta",
                  )}
                />
                {caption}
              </p>
            </div>
          </div>
        </div>

        {/* bottom progress rail */}
        <div className="relative z-10 pb-6">
          <div className="container-x flex items-center gap-4">
            <span className="font-spec text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-paper/45">
              {t.press.scrollHint}
            </span>
            <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-paper/10">
              <m.div
                className="cmyk-strip absolute inset-y-0 left-0 w-full origin-left"
                style={{ scaleX: progressScale }}
              />
            </div>
            <span className="font-spec text-[0.65rem] font-semibold tracking-[0.2em] text-paper/45">
              0{stage + 1} / 04
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
