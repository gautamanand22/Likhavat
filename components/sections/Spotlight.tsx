"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import clsx from "clsx";
import { useLang } from "@/components/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Motion";
import { Photo } from "@/components/ui/Photo";

const images = [
  "/images/products/prescription.jpg",
  "/images/products/wedding-cards.jpg",
  "/images/products/print-shop.jpg",
];

/** The three customer worlds the press serves — dark editorial cards. */
export function Spotlight() {
  const { t } = useLang();

  return (
    <section className="grain relative overflow-hidden bg-ink-2 text-paper">
      <div className="halftone pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[24rem] w-[24rem] rounded-full bg-yellow/10 blur-[120px]" />
      <div className="container-x section-pad relative z-10">
        <SectionHeading
          eyebrow={t.spotlight.eyebrow}
          heading={t.spotlight.heading}
          sub={t.spotlight.sub}
          light
        />

        <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.12}>
          {t.spotlight.items.map((item, i) => (
            <RevealItem key={item.key} preset="up">
              <article
                className={clsx(
                  "glass group relative flex h-full flex-col overflow-hidden rounded-3xl transition-transform duration-500 hover:-translate-y-1.5",
                )}
              >
                <div className="relative h-48 overflow-hidden">
                  <Photo
                    src={images[i]}
                    alt={item.title}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/30 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-paper backdrop-blur-sm">
                    <BadgeCheck className="h-3.5 w-3.5 text-yellow" />
                    {item.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 pt-4">
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-magenta">
                    {item.tag}
                  </span>
                  <h3 className="mt-2 font-display text-2xl text-paper">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper/65">{item.desc}</p>

                  <ul className="mt-5 space-y-2">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm text-paper/80">
                        <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-paper/10 pt-4">
                    <div>
                      <p className="font-spec text-lg font-bold text-yellow">{item.priceMain}</p>
                      <p className="text-xs text-paper/50">{item.priceSub}</p>
                    </div>
                    <Link
                      href={item.href}
                      className="group/cta inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-4 py-2 text-sm font-bold text-paper transition-all hover:border-magenta hover:bg-magenta"
                    >
                      {item.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
