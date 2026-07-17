"use client";

/**
 * THE SIGNATURE SECTION — a pinned, scroll-driven recreation of four-colour
 * offset printing. As the visitor scrolls, a visiting card is built the way a
 * real press builds it: design proof → C, M, Y, K plates sliding into
 * register → lamination sheen + gold foil → guillotine cut and 3D lift.
 *
 * Desktop: 380vh scroll track with a sticky viewport (framer-motion useScroll).
 * Mobile / reduced-motion: static assembled card + the four stages as cards.
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
import { business } from "@/content/business";

// ---------------------------------------------------------------------------
//  The card artwork, split into its colour separations (honest-to-print:
//  each plate carries only the elements printed in that ink).
// ---------------------------------------------------------------------------

function PlateCyan() {
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* bottom brand band, diagonal cut */}
      <div
        className="absolute bottom-0 left-0 h-[26%] w-full bg-cyan/90"
        style={{ clipPath: "polygon(0 38%, 100% 0, 100% 100%, 0 100%)" }}
      />
      {/* micro dots row */}
      <div className="absolute left-[7%] top-[16%] flex gap-[3%]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="block h-[0.35rem] w-[0.35rem] rounded-full bg-cyan/80" />
        ))}
      </div>
    </div>
  );
}

function PlateMagenta() {
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* logo tile */}
      <div className="absolute left-[7%] top-[27%] flex h-[19%] w-[12.2%] items-center justify-center rounded-[0.45rem] bg-magenta pb-[0.5%]">
        <span className="font-hindi text-[max(0.85rem,1.35cqw)] font-bold leading-none text-white">
          लि
        </span>
      </div>
      {/* accent rule under the name */}
      <div className="absolute left-[7%] top-[62%] h-[2.5%] w-[16%] rounded-full bg-magenta/85" />
    </div>
  );
}

function PlateYellow() {
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* corner triangle */}
      <div
        className="absolute right-0 top-0 h-[34%] w-[22%] bg-yellow/90"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      />
      {/* small tick over the cyan band */}
      <div className="absolute bottom-[27%] right-[7%] h-[3%] w-[10%] rounded-full bg-yellow/90" />
    </div>
  );
}

function PlateKey({ t }: { t: { cardName: string; cardRole: string; cardBiz: string } }) {
  return (
    <div className="absolute inset-0 text-ink" aria-hidden>
      <div className="absolute left-[22%] top-[27%]">
        <p className="font-display text-[max(0.95rem,1.75cqw)] font-bold leading-tight">
          {t.cardBiz}
        </p>
        <p className="mt-[0.2em] text-[max(0.5rem,0.95cqw)] font-semibold uppercase tracking-[0.22em] text-ink/70">
          {business.shortName} · Boring Road
        </p>
      </div>
      <div className="absolute left-[7%] top-[54%]">
        <p className="font-display text-[max(0.8rem,1.45cqw)] font-bold">{t.cardName}</p>
        <p className="mt-[0.15em] text-[max(0.5rem,0.9cqw)] font-medium text-ink/60">
          {t.cardRole}
        </p>
      </div>
      {/* contact lines over the cyan band */}
      <div className="absolute bottom-[6%] left-[7%] flex flex-col gap-[0.35em] text-[max(0.48rem,0.85cqw)] font-semibold text-white">
        <span>{business.phoneDisplay}</span>
        <span className="opacity-85">{business.address.line1}, {business.address.city}</span>
      </div>
    </div>
  );
}

/** Dashed wireframe shown in the "design & proof" stage. */
function DesignWireframe() {
  const box = "absolute rounded border border-dashed border-paper/40";
  return (
    <div className="absolute inset-0" aria-hidden>
      <div className={clsx(box, "left-[7%] top-[27%] h-[19%] w-[12.2%]")} />
      <div className={clsx(box, "left-[22%] top-[27%] h-[19%] w-[46%]")} />
      <div className={clsx(box, "left-[7%] top-[54%] h-[14%] w-[30%]")} />
      <div className={clsx(box, "bottom-[6%] left-[7%] h-[14%] w-[40%]")} />
      <div className={clsx(box, "right-0 top-0 h-[34%] w-[22%]")} />
      <div
        className="absolute bottom-0 left-0 h-[26%] w-full border-t border-dashed border-paper/40"
        style={{ clipPath: "polygon(0 38%, 100% 0, 100% 100%, 0 100%)" }}
      />
    </div>
  );
}

/** Printer's crop + registration marks around the sheet. */
function CropMarks({ className }: { className?: string }) {
  const line = "absolute bg-paper/60";
  return (
    <div className={clsx("pointer-events-none absolute -inset-5", className)} aria-hidden>
      {/* corners */}
      {[
        "left-0 top-5 h-px w-4", "left-5 top-0 h-4 w-px",
        "right-0 top-5 h-px w-4", "right-5 top-0 h-4 w-px",
        "bottom-5 left-0 h-px w-4", "bottom-0 left-5 h-4 w-px",
        "bottom-5 right-0 h-px w-4", "bottom-0 right-5 h-4 w-px",
      ].map((c) => (
        <span key={c} className={clsx(line, c)} />
      ))}
      {/* registration circle */}
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

// ---------------------------------------------------------------------------
//  Scroll-driven plate hook: slides a plate from an offset into register.
// ---------------------------------------------------------------------------

/**
 * Scroll-linked value kept on the CPU path. Opacity-only bindings derived
 * with useTransform get compiled into native scroll-timeline animations by
 * framer-motion 12, which mis-handles descending piecewise ranges — setting
 * the value imperatively opts those elements out of that optimization.
 */
function useSeg(p: MotionValue<number>, input: number[], output: number[]) {
  const mv = useMotionValue(transform(input, output)(p.get()));
  useMotionValueEvent(p, "change", (v) => mv.set(transform(input, output)(v)));
  return mv;
}

function usePlate(
  p: MotionValue<number>,
  start: number,
  end: number,
  from: { x: number; y: number; r: number },
) {
  const x = useTransform(p, [start, end], [from.x, 0]);
  const y = useTransform(p, [start, end], [from.y, 0]);
  const rotate = useTransform(p, [start, end], [from.r, 0]);
  const opacity = useSeg(p, [start, start + (end - start) * 0.35], [0, 1]);
  return { x, y, rotate, opacity };
}

const INK_LABELS = [
  { ch: "C", cls: "text-cyan" },
  { ch: "M", cls: "text-magenta" },
  { ch: "Y", cls: "text-yellow" },
  { ch: "K", cls: "text-paper" },
] as const;

// ---------------------------------------------------------------------------

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

  // Plates enter one by one, from different directions — like plates being
  // loaded onto the press cylinders.
  const cyan = usePlate(p, 0.16, 0.27, { x: -160, y: -30, r: -7 });
  const magenta = usePlate(p, 0.27, 0.38, { x: 170, y: -40, r: 6 });
  const yellow = usePlate(p, 0.38, 0.49, { x: -130, y: 60, r: 5 });
  const key = usePlate(p, 0.49, 0.6, { x: 140, y: 50, r: -5 });

  // Design-stage wireframe fades as inks start.
  const wireOpacity = useSeg(p, [0.12, 0.2], [1, 0]);
  // Lamination sheen sweep (x spans far enough to fully exit the sheet).
  const sheenX = useTransform(p, [0.64, 0.8], ["-130%", "330%"]);
  const sheenOpacity = useSeg(p, [0.64, 0.66, 0.76, 0.8], [0, 1, 1, 0]);
  // Gold foil press on the accent rule.
  const foilOpacity = useSeg(p, [0.68, 0.76], [0, 1]);
  // Cut & lift: crop marks vanish, card tilts into 3D and the stack fans out.
  const cropOpacity = useSeg(p, [0.78, 0.84], [1, 0]);
  const cardRotY = useTransform(p, [0.8, 0.94], [0, -14]);
  const cardRotX = useTransform(p, [0.8, 0.94], [0, 9]);
  const cardScale = useTransform(p, [0.8, 0.94], [1, 1.05]);
  const fan1 = useSeg(p, [0.84, 0.95], [0, 1]);
  const cardShadow = useTransform(
    p,
    [0.8, 0.95],
    [
      "0 18px 40px -18px rgba(0,0,0,0.55)",
      "0 48px 90px -30px rgba(0,0,0,0.65)",
    ],
  );
  const fan1X = useTransform(fan1, (v) => v * -34);
  const fan1Y = useTransform(fan1, (v) => v * 20);
  const fan1R = useTransform(fan1, (v) => v * -9);
  const fan2X = useTransform(fan1, (v) => v * 30);
  const fan2Y = useTransform(fan1, (v) => v * 38);
  const fan2R = useTransform(fan1, (v) => v * 7);

  useMotionValueEvent(p, "change", (v) => {
    setStage(v < 0.16 ? 0 : v < 0.62 ? 1 : v < 0.8 ? 2 : 3);
    setInkIdx(v < 0.16 ? -1 : v < 0.27 ? 0 : v < 0.38 ? 1 : v < 0.49 ? 2 : v < 0.62 ? 3 : -1);
  });

  const progressScale = useTransform(p, [0, 1], [0, 1]);

  const stages = t.press.stages;

  // ------- The card scene (shared by pinned + static variants) -------
  const cardScene = (assembled: boolean) => (
    <div style={{ perspective: "1400px" }} className="relative">
      {/* fanned copies behind (cut stack) */}
      {[
        { x: fan1X, y: fan1Y, r: fan1R },
        { x: fan2X, y: fan2Y, r: fan2R },
      ].map((f, i) => (
        <m.div
          key={i}
          className="absolute inset-0 rounded-xl bg-paper-200 shadow-xl"
          style={
            assembled
              ? { x: f.x, y: f.y, rotate: f.r, opacity: fan1 }
              : { x: i === 0 ? -30 : 26, y: i === 0 ? 18 : 34, rotate: i === 0 ? -8 : 6 }
          }
          aria-hidden
        />
      ))}

      {/* the sheet */}
      <m.div
        className="relative aspect-[86/54] w-[min(34rem,84vw)] rounded-xl bg-[#fffdf8] lg:w-[min(34rem,40vw)]"
        style={
          assembled
            ? {
                rotateY: cardRotY,
                rotateX: cardRotX,
                scale: cardScale,
                boxShadow: cardShadow,
                containerType: "inline-size",
              }
            : {
                transform: "rotateY(-12deg) rotateX(7deg)",
                boxShadow: "0 40px 80px -30px rgba(0,0,0,0.6)",
                containerType: "inline-size",
              }
        }
      >
        {assembled && (
          <m.div style={{ opacity: cropOpacity }}>
            <CropMarks />
          </m.div>
        )}

        {/* design wireframe */}
        {assembled && (
          <m.div style={{ opacity: wireOpacity }} className="absolute inset-0 rounded-xl bg-ink-3/95 p-0">
            <DesignWireframe />
            <span className="absolute right-[4%] top-[5%] font-spec text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-paper/50">
              proof v1 · 86×54
            </span>
          </m.div>
        )}

        {/* CMYK plates in register order */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <m.div className="absolute inset-0" style={assembled ? cyan : undefined}>
            <PlateCyan />
          </m.div>
          <m.div className="absolute inset-0" style={assembled ? magenta : undefined}>
            <PlateMagenta />
          </m.div>
          <m.div className="absolute inset-0" style={assembled ? yellow : undefined}>
            <PlateYellow />
          </m.div>
          <m.div className="absolute inset-0" style={assembled ? key : undefined}>
            <PlateKey t={t.press} />
          </m.div>

          {/* gold foil pressed onto the accent rule */}
          <m.div
            className="absolute left-[7%] top-[62%] h-[2.5%] w-[16%] rounded-full"
            style={{
              opacity: assembled ? foilOpacity : 1,
              background:
                "linear-gradient(105deg,#8a6d1c 0%,#e6c860 30%,#fdf0b0 50%,#d4af37 70%,#8a6d1c 100%)",
            }}
            aria-hidden
          />

          {/* lamination sheen */}
          {assembled && (
            <m.div
              className="absolute inset-y-[-40%] w-[45%] rotate-[16deg]"
              style={{
                x: sheenX,
                opacity: sheenOpacity,
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
              }}
              aria-hidden
            />
          )}
        </div>
      </m.div>
    </div>
  );

  // ---------------- Static (mobile / reduced-motion) ----------------
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

          <div className="mt-10 flex justify-center">{cardScene(false)}</div>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2">
            {stages.map((s, i) => (
              <li key={s.k} className="glass rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <span className="font-spec text-sm font-semibold text-magenta">
                    0{i + 1}
                  </span>
                  {i === 1 && (
                    <span className="flex gap-1.5 font-spec text-xs font-bold">
                      {INK_LABELS.map((ink) => (
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

  // ---------------- Pinned scroll experience (desktop) ----------------
  return (
    <section id="press" ref={ref} className="relative h-[380vh] bg-ink text-paper">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="halftone pointer-events-none absolute inset-0" aria-hidden />
        {/* ink glows */}
        <div className="pointer-events-none absolute -left-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-magenta/15 blur-[130px]" />
        <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[26rem] w-[26rem] rounded-full bg-cyan/15 blur-[130px]" />

        <div className="container-x relative z-10 grid flex-1 items-center gap-10 lg:grid-cols-[minmax(20rem,1fr)_minmax(0,1.5fr)]">
          {/* Left rail — heading, stages, progress */}
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
                    stage === i
                      ? "border-paper/15 bg-paper/[0.06]"
                      : "border-transparent opacity-40",
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
                        {INK_LABELS.map((ink, j) => (
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
            {cardScene(true)}
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
          </div>
        </div>
      </div>
    </section>
  );
}
