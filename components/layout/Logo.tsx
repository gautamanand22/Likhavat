import Link from "next/link";
import clsx from "clsx";

/**
 * Wordmark: an ink badge carrying "लि" (the first akshar of लिखावट) over the
 * four CMYK process dots, beside the Likhavat name.
 */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="Likhavat Printing Press — home">
      <span
        className={clsx(
          "relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl pb-1 transition-transform duration-300 group-hover:-rotate-3",
          light ? "bg-paper text-ink" : "bg-ink text-paper",
        )}
      >
        <span className="font-hindi text-[1.35rem] font-bold leading-none">लि</span>
        <span className="absolute inset-x-0 bottom-0 flex h-1.5">
          <span className="flex-1 bg-cyan" />
          <span className="flex-1 bg-magenta" />
          <span className="flex-1 bg-yellow" />
          <span className={clsx("flex-1", light ? "bg-ink" : "bg-paper")} />
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={clsx(
            "font-display text-[1.28rem] font-bold tracking-tight",
            light ? "text-paper" : "text-ink",
          )}
        >
          Likhavat
        </span>
        <span
          className={clsx(
            "mt-1 text-[0.55rem] font-bold uppercase tracking-[0.3em]",
            light ? "text-paper/60" : "text-muted",
          )}
        >
          Printing Press
        </span>
      </span>
    </Link>
  );
}
