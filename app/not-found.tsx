import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-paper">
      <div className="halftone pointer-events-none absolute inset-0" />
      <div className="container-x relative z-10 py-32 text-center">
        <p className="font-spec text-sm font-semibold uppercase tracking-[0.3em] text-magenta">
          404 · out of register
        </p>
        <h1 className="mx-auto mt-4 max-w-2xl text-balance font-display text-4xl sm:text-5xl">
          This page never made it off the press.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-paper/65">
          The sheet you&apos;re looking for was cut, moved or never printed. Head back to the counter.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 font-bold text-ink transition-transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </section>
  );
}
