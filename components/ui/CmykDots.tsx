import clsx from "clsx";

/**
 * The four process-colour dots — Likhavat's smallest brand mark.
 * Used as a decorative accent next to eyebrows, footers and dividers.
 */
export function CmykDots({ className, size = 7 }: { className?: string; size?: number }) {
  const s = { width: size, height: size };
  return (
    <span className={clsx("inline-flex items-center gap-1", className)} aria-hidden>
      <span className="rounded-full bg-cyan" style={s} />
      <span className="rounded-full bg-magenta" style={s} />
      <span className="rounded-full bg-yellow" style={s} />
      <span className="rounded-full bg-ink-400" style={s} />
    </span>
  );
}

/** Registration mark (⊕) — the printer's alignment cross, as a subtle motif. */
export function RegMark({ className, size = 14 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <circle cx="10" cy="10" r="6" />
      <path d="M10 0v20M0 10h20" />
    </svg>
  );
}
