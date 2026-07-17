import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Dark editorial hero for inner pages, with breadcrumb + halftone texture. */
export function PageHero({
  crumb,
  h1,
  intro,
  children,
}: {
  crumb: { label: string; href?: string }[];
  h1: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden bg-ink pb-12 pt-28 text-paper sm:pb-16 sm:pt-36">
      <div className="halftone pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-40 -top-20 h-[26rem] w-[26rem] rounded-full bg-magenta/15 blur-[130px]" />
      <div className="container-x relative z-10">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-paper/55">
          {crumb.map((c, i) => (
            <span key={c.label} className="inline-flex items-center gap-1.5">
              {c.href ? (
                <Link href={c.href} className="transition-colors hover:text-paper">
                  {c.label}
                </Link>
              ) : (
                <span className="text-paper/85">{c.label}</span>
              )}
              {i < crumb.length - 1 && <ChevronRight className="h-3 w-3 text-paper/35" />}
            </span>
          ))}
        </nav>
        <h1 className="max-w-3xl text-balance font-display text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-[3.2rem]">
          {h1}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/70 sm:text-lg">{intro}</p>
        )}
        {children}
      </div>
    </section>
  );
}
