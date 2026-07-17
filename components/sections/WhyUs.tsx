"use client";

import { Factory, FileCheck, PenTool, Timer, Archive, ReceiptText } from "lucide-react";
import { useLang } from "@/components/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Motion";

const icons = [Factory, FileCheck, PenTool, Timer, Archive, ReceiptText];
const accents = ["text-cyan", "text-magenta", "text-yellow", "text-cyan", "text-magenta", "text-yellow"];

export function WhyUs() {
  const { t } = useLang();

  return (
    <section id="why" className="section-pad relative bg-paper-200">
      <div className="halftone-dark pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-x relative">
        <SectionHeading eyebrow={t.why.eyebrow} heading={t.why.heading} sub={t.why.sub} />

        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <RevealItem key={item.title}>
                <div className="card-light group h-full rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink transition-transform duration-500 group-hover:-rotate-6">
                    <Icon className={`h-5 w-5 ${accents[i]}`} />
                  </span>
                  <h3 className="mt-4 font-display text-xl text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
