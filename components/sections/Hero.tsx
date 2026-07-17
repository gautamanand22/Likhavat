"use client";

import { useEffect, useState } from "react";
import { Phone, ChevronRight, FileCheck, Zap, Truck, ReceiptText } from "lucide-react";
import { useLang } from "@/components/i18n/LanguageProvider";
import { business } from "@/content/business";
import { productById } from "@/content/products";
import { waLink, telLink, enquiryMessage } from "@/lib/whatsapp";

const chipIcons = [FileCheck, Zap, Truck, ReceiptText];

/** Rotating backdrops: the press itself, then the work it turns out. */
const slides = [
  { id: "press", image: "/images/products/press-hero.jpg" },
  { id: "visiting-cards", image: "/images/products/visiting-cards.jpg" },
  { id: "wedding-cards", image: "/images/products/wedding-cards.jpg" },
  { id: "flex-banner", image: "/images/products/flex-banner.jpg" },
  { id: "tshirts", image: "/images/products/tshirt-print.jpg" },
] as const;

export function Hero() {
  const { t } = useLang();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 4500);
    return () => clearInterval(id);
  }, []);

  const slide = slides[i];
  const product = slide.id === "press" ? null : productById(slide.id);
  const nextIdx = (i + 1) % slides.length;

  return (
    <section className="relative h-[100svh] max-h-[54rem] min-h-[38rem] w-full overflow-hidden bg-ink text-paper">
      {/* Full-bleed background — only the current + next image are in the DOM
          so the browser downloads at most two full photos (protects LCP). */}
      <div className="absolute inset-0">
        {slides.map((s, idx) => {
          if (idx !== i && idx !== nextIdx) return null;
          const sm = s.image.replace(/\.jpg$/, "-sm.jpg");
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.id}
              src={s.image}
              srcSet={`${sm} 640w, ${s.image} 1400w`}
              sizes="100vw"
              alt={idx === 0 ? `Offset printing press at ${business.name}, Boring Road, Patna` : ""}
              fetchPriority={idx === 0 ? "high" : "low"}
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ opacity: idx === i ? 1 : 0 }}
            />
          );
        })}
      </div>

      {/* Legibility overlays + halftone texture */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/55" />
      <div className="halftone pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[32rem] w-[32rem] rounded-full bg-magenta/15 blur-[130px]" />

      {/* Content — static (renders instantly in HTML, no JS required for LCP) */}
      <div className="container-x relative z-10 flex h-full flex-col pb-6 pt-24 sm:pb-8">
        <div className="flex max-w-3xl flex-1 flex-col justify-center 2xl:max-w-4xl">
          <div className="mb-5 flex flex-col items-start gap-2.5 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-paper/10 px-3 py-1.5 backdrop-blur-sm">
              <span className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-cyan" />
                <span className="h-2 w-2 rounded-full bg-magenta" />
                <span className="h-2 w-2 rounded-full bg-yellow" />
              </span>
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-paper/90">
                {t.hero.badge}
              </span>
            </span>
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-paper/55 sm:text-[0.68rem] sm:tracking-[0.22em]">
              {t.hero.trustNote}
            </span>
          </div>

          <h1 className="font-display font-semibold leading-[1.05] tracking-[-0.02em] text-[2.15rem] [overflow-wrap:break-word] sm:text-[3.1rem] sm:leading-[1.02] lg:text-[4.1rem]">
            {t.hero.titleA}
            <br />
            <span className="text-gradient-print italic">{t.hero.titleB}</span>
          </h1>

          <p className="font-hindi mt-3 flex items-center gap-2 text-base text-yellow/90 sm:text-lg">
            <span className="h-px w-6 bg-yellow/50" />
            {t.hero.tagline}
          </p>

          <p className="mt-4 hidden max-w-xl text-[0.98rem] leading-relaxed text-paper/75 sm:block">
            {t.hero.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={waLink(enquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-wa px-6 py-3.5 text-base font-bold text-white shadow-[0_14px_40px_-10px_rgba(37,211,102,0.8)] transition-transform hover:-translate-y-0.5"
            >
              {t.hero.enquireNow}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={telLink}
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 bg-paper/[0.06] px-5 py-3.5 text-base font-bold text-paper backdrop-blur-sm transition-colors hover:bg-paper/[0.12]"
            >
              <Phone className="h-5 w-5 text-yellow" />
              {t.hero.callNow}
            </a>
          </div>
        </div>

        {/* Bottom bar: feature strip + product switcher */}
        <div className="mt-7 flex flex-col gap-4 border-t border-paper/12 pt-4 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {t.hero.chips.map((c, idx) => {
              const Icon = chipIcons[idx] ?? Zap;
              return (
                <li key={c} className="inline-flex items-center gap-2 text-sm font-medium text-paper/85">
                  <Icon className="h-4 w-4 text-yellow" />
                  {c}
                  {idx < t.hero.chips.length - 1 && (
                    <span className="ml-3 hidden h-1 w-1 rounded-full bg-paper/30 sm:inline-block" />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden w-[13rem] shrink-0 overflow-hidden text-right sm:block">
              <p className="truncate font-display text-sm font-bold text-paper">
                {product ? product.name : business.name}
              </p>
              <p className="truncate text-xs text-paper/60">
                {product ? (
                  <>
                    {t.hero.fromLabel}{" "}
                    <span className="font-spec font-bold text-yellow">{product.price.amount}</span>{" "}
                    {product.price.unit}
                  </>
                ) : (
                  <span className="font-semibold text-yellow">{business.taglineEn}</span>
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:flex-nowrap">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setI(idx)}
                  aria-label={`Show ${s.id === "press" ? business.name : productById(s.id).name}`}
                  className={`relative h-10 w-14 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 sm:h-11 sm:w-16 ${
                    idx === i ? "border-magenta opacity-100" : "border-paper/15 opacity-55 hover:opacity-90"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image.replace(/\.jpg$/, "-sm.jpg")}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
