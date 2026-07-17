"use client";

import { MessageSquareText, FileCheck2, Printer, PackageCheck } from "lucide-react";
import { useLang } from "@/components/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Motion";

const icons = [MessageSquareText, FileCheck2, Printer, PackageCheck];

export function HowItWorks() {
  const { t } = useLang();

  return (
    <section className="section-pad bg-paper">
      <div className="container-x">
        <SectionHeading
          eyebrow={t.how.eyebrow}
          heading={t.how.heading}
          sub={t.how.sub}
          align="center"
        />

        <RevealGroup className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {/* connecting rule (desktop) */}
          <div className="cmyk-strip absolute left-[12%] right-[12%] top-9 hidden h-px opacity-30 lg:block" aria-hidden />
          {/* Index keys — translated-title keys would remount items hidden
              inside the already-fired RevealGroup on language toggle. */}
          {t.how.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <RevealItem key={i}>
                <div className="relative flex h-full flex-col items-center rounded-3xl bg-white p-6 text-center shadow-[var(--shadow-card)] ring-1 ring-ink/[0.06]">
                  <div className="relative">
                    <span className="grid h-[4.5rem] w-[4.5rem] place-items-center rounded-2xl bg-ink text-paper shadow-lg">
                      <Icon className="h-7 w-7 text-yellow" />
                    </span>
                    <span className="absolute -right-2.5 -top-2.5 grid h-7 w-7 place-items-center rounded-full bg-magenta font-spec text-xs font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
