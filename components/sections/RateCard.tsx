"use client";

import { MessageCircle } from "lucide-react";
import { useLang } from "@/components/i18n/LanguageProvider";
import { rateRows, type ProductId } from "@/content/products";
import { waLink, rateEnquiry } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";

/** The press rate card — spec-sheet aesthetic, mono numbers, WhatsApp CTA per row. */
export function RateCard() {
  const { t, lang } = useLang();

  return (
    <section id="rates" className="grain relative overflow-hidden bg-ink text-paper">
      <div className="halftone pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-40 top-10 h-[26rem] w-[26rem] rounded-full bg-cyan/10 blur-[130px]" />
      <div className="container-x section-pad relative z-10">
        <SectionHeading eyebrow={t.rates.eyebrow} heading={t.rates.heading} sub={t.rates.sub} light />

        <Reveal className="mt-10" preset="fade">
          <div className="glass overflow-hidden rounded-3xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[46rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-paper/15 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-paper/50">
                    <th className="px-5 py-4">{t.rates.item}</th>
                    <th className="px-5 py-4">{t.rates.spec}</th>
                    <th className="px-5 py-4">{t.rates.moq}</th>
                    <th className="px-5 py-4">{t.rates.rate}</th>
                    <th className="px-5 py-4">{t.rates.tat}</th>
                    <th className="px-5 py-4" aria-label="Enquire" />
                  </tr>
                </thead>
                <tbody>
                  {rateRows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-paper/[0.07] transition-colors last:border-0 hover:bg-paper/[0.04]"
                    >
                      <td className="px-5 py-3.5">
                        <p className="font-semibold text-paper">{row.name}</p>
                        <p className="font-hindi text-xs text-paper/50">{row.hindiName}</p>
                      </td>
                      <td className="max-w-[14rem] px-5 py-3.5 text-xs leading-relaxed text-paper/60">
                        {row.spec}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 font-spec text-sm text-paper/80">
                        {row.moq}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5">
                        <span className="font-spec text-base font-bold text-yellow">
                          {row.rate.amount}
                        </span>{" "}
                        <span className="text-xs text-paper/55">{row.rate.unit}</span>
                        {row.rate.note && (
                          <p className="mt-0.5 text-[0.68rem] text-paper/45">{row.rate.note}</p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 font-spec text-sm text-paper/80">
                        {row.turnaround}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <a
                          href={waLink(rateEnquiry(row.id as ProductId))}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${t.rates.enquire}: ${row.name}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-3.5 py-1.5 text-xs font-bold text-paper transition-all hover:border-wa hover:bg-wa"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span className="hidden xl:inline">{lang === "hi" ? "रेट लें" : "Rate"}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-paper/45">{t.rates.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
