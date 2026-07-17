"use client";

import Link from "next/link";
import {
  CheckCircle2,
  MessageCircle,
  Phone,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import type { ServiceHub } from "@/content/services";
import { serviceHubs } from "@/content/services";
import { productById, type ProductId } from "@/content/products";
import { business } from "@/content/business";
import { waLink, telLink, quickEnquiry, rateEnquiry } from "@/lib/whatsapp";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Photo } from "@/components/ui/Photo";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Motion";
import { PageHero } from "./PageHero";

/** One template renders every service hub as a full landing page. */
export function ServiceLanding({ service }: { service: ServiceHub }) {
  const related = serviceHubs.filter((s) => s.slug !== service.slug).slice(0, 4);
  const items = service.products.map((id) => productById(id));

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.label,
            description: service.metaDescription,
            path: `/${service.slug}`,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: service.label, path: `/${service.slug}` },
          ]),
          faqSchema(service.faq),
        ]}
      />

      <PageHero
        crumb={[{ label: "Home", href: "/" }, { label: service.label }]}
        h1={service.h1}
        intro={service.intro}
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={waLink(quickEnquiry(service.label))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-wa px-6 py-3.5 text-base font-bold text-white shadow-[0_14px_40px_-10px_rgba(37,211,102,0.8)] transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-5 w-5" />
            Get a quote on WhatsApp
          </a>
          <a
            href={telLink}
            className="inline-flex items-center gap-2 rounded-full border border-paper/25 bg-paper/[0.06] px-5 py-3.5 text-base font-bold text-paper backdrop-blur-sm transition-colors hover:bg-paper/[0.12]"
          >
            <Phone className="h-5 w-5 text-yellow" />
            {business.phoneDisplay}
          </a>
        </div>
      </PageHero>

      {/* Features + image */}
      <section className="section-pad bg-paper">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[1.15fr_1fr]">
          <Reveal preset="left">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">What you get</h2>
            <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-[var(--shadow-card)] ring-1 ring-ink/[0.06]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-magenta" />
                  <span className="text-sm font-medium leading-relaxed text-ink/85">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal preset="right" className="relative overflow-hidden rounded-3xl">
            <Photo
              src={service.cardImage}
              alt={`${service.label} at ${business.name}, Patna`}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
            <span className="font-hindi absolute bottom-4 left-5 text-lg font-semibold text-paper">
              {items[0]?.hindiName}
            </span>
          </Reveal>
        </div>
      </section>

      {/* Related products with rates */}
      <section className="grain relative overflow-hidden bg-ink text-paper">
        <div className="halftone pointer-events-none absolute inset-0" />
        <div className="container-x section-pad relative z-10">
          <h2 className="font-display text-2xl sm:text-3xl">Rates for this work</h2>
          <RevealGroup className="mt-8 grid gap-5 md:grid-cols-3">
            {items.map((p) => (
              <RevealItem key={p.id}>
                <div className="glass flex h-full flex-col rounded-3xl p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-lg">{p.name}</h3>
                    <span className="font-hindi text-xs text-paper/50">{p.hindiName}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-paper/65">{p.blurb}</p>
                  <ul className="mt-4 space-y-1.5 text-xs text-paper/70">
                    {p.specs.slice(0, 3).map((s) => (
                      <li key={s} className="flex items-start gap-2">
                        <span className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-cyan" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-paper/10 pt-4">
                    <div>
                      <p className="font-spec text-xl font-bold text-yellow">
                        {p.price.amount}
                        <span className="ml-1 text-xs font-medium text-paper/55">{p.price.unit}</span>
                      </p>
                      <p className="text-[0.68rem] text-paper/45">
                        min {p.moq} · {p.turnaround}
                      </p>
                    </div>
                    <a
                      href={waLink(rateEnquiry(p.id as ProductId))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-3.5 py-2 text-xs font-bold transition-all hover:border-wa hover:bg-wa"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Rate
                    </a>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-paper">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              {service.label} — common questions
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Still unsure? WhatsApp us — a real person from the press replies, usually within the hour.
            </p>
          </Reveal>
          <ServiceFaq faqs={service.faq} />
        </div>
      </section>

      {/* CTA band + related services */}
      <section className="section-pad bg-paper-200">
        <div className="container-x">
          <Reveal
            preset="scale"
            className="grain relative overflow-hidden rounded-3xl bg-ink p-8 text-center text-paper sm:p-12"
          >
            <div className="cmyk-strip absolute inset-x-0 top-0 h-1.5" />
            <h2 className="mx-auto max-w-2xl text-balance font-display text-2xl sm:text-3xl">
              Ready to print? Send your matter now.
            </h2>
            <p className="font-hindi mx-auto mt-3 max-w-xl text-paper/70">
              {business.tagline}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={waLink(quickEnquiry(service.label))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-wa px-6 py-3.5 text-base font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp the press
              </a>
              <a
                href={telLink}
                className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-5 py-3.5 text-base font-bold text-paper transition-colors hover:bg-paper/10"
              >
                <Phone className="h-5 w-5 text-yellow" />
                {business.phoneDisplay}
              </a>
            </div>
          </Reveal>

          <div className="mt-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
              Also printed here
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.slug}`}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-ink/12 bg-white px-4 py-2 text-sm font-semibold text-ink transition-all hover:border-magenta hover:text-magenta"
                >
                  {r.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceFaq({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <Reveal preset="fade" className="space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={clsx(
              "overflow-hidden rounded-2xl border transition-colors duration-300",
              isOpen ? "border-magenta/30 bg-white shadow-[var(--shadow-card)]" : "border-ink/10 bg-white/60",
            )}
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-semibold text-ink">{f.q}</span>
              <span
                className={clsx(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                  isOpen ? "rotate-45 border-magenta bg-magenta text-white" : "border-ink/15 text-ink/60",
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <div
              className={clsx(
                "grid transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </Reveal>
  );
}
