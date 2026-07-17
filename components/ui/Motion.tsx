"use client";

/**
 * Framer-motion primitives used site-wide. LazyMotion + `m` keeps the motion
 * bundle small; animations are viewport-triggered (whileInView, one-shot) and
 * disabled automatically under prefers-reduced-motion via useReducedMotion.
 */
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "framer-motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const presets = {
  up: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
  left: { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0 } },
} satisfies Record<string, Variants>;

export type RevealPreset = keyof typeof presets;

/** One-shot scroll reveal. */
export function Reveal({
  children,
  className,
  preset = "up",
  delay = 0,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  preset?: RevealPreset;
  delay?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <m.div
      className={className}
      variants={presets[preset]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

/** Container that staggers its RevealItem children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  amount = 0.12,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -6% 0px" }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({
  children,
  className,
  preset = "up",
}: {
  children: React.ReactNode;
  className?: string;
  preset?: RevealPreset;
}) {
  return (
    <m.div
      className={className}
      variants={presets[preset]}
      transition={{ duration: 0.65, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
