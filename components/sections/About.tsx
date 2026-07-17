"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/i18n/LanguageProvider";
import { business } from "@/content/business";
import { Reveal } from "@/components/ui/Motion";
import { CountUp } from "@/components/ui/CountUp";
import { Photo } from "@/components/ui/Photo";
import { CmykDots } from "@/components/ui/CmykDots";

export function About() {
  const { t } = useLang();
  const stats = [
    { value: business.stats.yearsExperience, suffix: "+", label: t.about.statsLabels.years },
    { value: business.stats.ordersDelivered, suffix: "+", label: t.about.statsLabels.orders },
    { value: business.stats.productsOffered, suffix: "+", label: t.about.statsLabels.products },
    { value: business.stats.repeatClients, suffix: "+", label: t.about.statsLabels.clients },
  ];

  return (
    <section className="section-pad bg-paper">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        {/* Photo composition */}
        <Reveal preset="left" className="relative">
          <div className="relative overflow-hidden rounded-3xl">
            <Photo
              src="/images/products/press-cmyk.jpg"
              alt={`Ink rollers on the offset press at ${business.name}`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3.4] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          </div>
          <div className="paper-stack absolute -bottom-6 -right-3 hidden w-56 rounded-2xl bg-white p-4 sm:block lg:-right-6">
            <CmykDots size={6} />
            <p className="mt-2 font-display text-lg leading-snug text-ink">
              {business.hindiName}
              <span className="mt-0.5 block text-xs font-sans font-semibold uppercase tracking-[0.2em] text-muted">
                est. {business.foundedYear} · {business.address.city}
              </span>
            </p>
          </div>
        </Reveal>

        {/* Story */}
        <Reveal preset="right">
          <span className="eyebrow">
            <span className="h-px w-6 bg-magenta/60" />
            {t.about.eyebrow}
          </span>
          <h2 className="mt-3 text-balance text-3xl text-ink sm:text-4xl lg:text-[2.9rem]">
            {t.about.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">{t.about.p1}</p>
          <p className="mt-4 text-base leading-relaxed text-muted">{t.about.p2}</p>

          <Link
            href="/about"
            className="group mt-6 inline-flex items-center gap-2 font-bold text-magenta"
          >
            {t.about.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-ink/10 pt-7 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-spec text-3xl font-bold text-ink">
                  <CountUp to={s.value} suffix={s.suffix} />
                </dd>
                <dd className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
