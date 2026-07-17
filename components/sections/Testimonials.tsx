"use client";

import { Star, Quote } from "lucide-react";
import { useLang } from "@/components/i18n/LanguageProvider";
import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Motion";

export function Testimonials() {
  const { t } = useLang();

  return (
    <section className="section-pad relative bg-paper-200">
      <div className="container-x">
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          heading={t.testimonials.heading}
          sub={t.testimonials.sub}
          align="center"
        />

        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {testimonials.map((tm) => (
            <RevealItem key={tm.name}>
              <figure className="card-light relative flex h-full flex-col rounded-3xl p-6">
                <Quote className="absolute right-5 top-5 h-8 w-8 text-magenta/15" />
                <div className="flex gap-0.5" aria-label={`${tm.rating} star rating`}>
                  {Array.from({ length: tm.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow text-yellow" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink/85">
                  “{tm.text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/[0.07] pt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-display text-sm font-bold text-paper">
                    {tm.name.replace("Dr. ", "").charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-ink">{tm.name}</p>
                    <p className="truncate text-xs text-muted">
                      {tm.role} · {tm.area}
                    </p>
                  </div>
                  <span className="ml-auto hidden rounded-full bg-paper-200 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wide text-muted sm:block">
                    {tm.product}
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
