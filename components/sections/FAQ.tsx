"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import clsx from "clsx";
import { useLang } from "@/components/i18n/LanguageProvider";
import { homeFaqs } from "@/content/faqs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";

export function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="section-pad bg-paper">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading eyebrow={t.faq.eyebrow} heading={t.faq.heading} sub={t.faq.sub} />

        <Reveal preset="fade" className="space-y-3">
          {homeFaqs.map((f, i) => {
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
                      isOpen
                        ? "rotate-45 border-magenta bg-magenta text-white"
                        : "border-ink/15 text-ink/60",
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
      </div>
    </section>
  );
}
