"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/i18n/LanguageProvider";
import { serviceHubs } from "@/content/services";
import { productById, type ProductId } from "@/content/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Motion";
import { Photo } from "@/components/ui/Photo";

/** The full catalogue grid — every service hub as a photographic card. */
export function Services() {
  const { t, lang } = useLang();

  return (
    <section id="services" className="section-pad relative bg-paper">
      <div className="halftone-dark pointer-events-none absolute inset-0 opacity-50" />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t.services.eyebrow}
            heading={t.services.heading}
            sub={t.services.sub}
          />
        </div>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {serviceHubs.map((s) => {
            const lead = productById(s.products[0] as ProductId);
            return (
              <RevealItem key={s.slug}>
                <Link
                  href={`/${s.slug}`}
                  className="card-light group flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Photo
                      src={s.cardImage}
                      alt={`${s.label} — ${lang === "hi" ? lead.hindiName : "printing in Patna"}`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 font-hindi text-sm font-semibold text-paper/90">
                      {lead.hindiName}
                    </span>
                    <span className="absolute right-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 font-spec text-[0.68rem] font-semibold text-ink backdrop-blur-sm">
                      {lead.price.amount} {lead.price.unit}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg leading-snug text-ink">{s.label}</h3>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/10 text-ink/50 transition-all duration-300 group-hover:border-magenta group-hover:bg-magenta group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.summary}</p>
                    <div className="mt-4 flex items-center gap-4 border-t border-ink/[0.07] pt-3 font-spec text-[0.7rem] font-medium text-muted">
                      <span>
                        {t.services.moqLabel} <strong className="text-ink">{lead.moq}</strong>
                      </span>
                      <span className="h-3 w-px bg-ink/10" />
                      <span>
                        {t.services.tatLabel} <strong className="text-ink">{lead.turnaround}</strong>
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
