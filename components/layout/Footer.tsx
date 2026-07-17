"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLang } from "@/components/i18n/LanguageProvider";
import { business } from "@/content/business";
import { serviceHubs } from "@/content/services";
import { telLink, waLink, quickEnquiry } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { CmykDots } from "@/components/ui/CmykDots";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-ink text-paper">
      <div className="halftone pointer-events-none absolute inset-0 opacity-60" />
      <div className="cmyk-strip h-1 w-full" />

      <div className="container-x relative z-10 grid gap-12 py-14 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-8">
        {/* Brand */}
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/65">
            {t.footer.blurb}
          </p>
          <p className="font-hindi mt-4 text-lg text-paper/85">{business.tagline}</p>
          <CmykDots className="mt-5" />
        </div>

        {/* Services */}
        <nav aria-label={t.footer.servicesTitle}>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-paper/50">
            {t.footer.servicesTitle}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {serviceHubs.slice(0, 8).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}`}
                  className="text-sm text-paper/75 transition-colors hover:text-magenta"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company */}
        <nav aria-label={t.footer.companyTitle}>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-paper/50">
            {t.footer.companyTitle}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {serviceHubs.slice(8).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}`}
                  className="text-sm text-paper/75 transition-colors hover:text-magenta"
                >
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/about" className="text-sm text-paper/75 transition-colors hover:text-magenta">
                {t.footer.about}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-paper/75 transition-colors hover:text-magenta">
                {t.footer.contact}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact NAP */}
        <div>
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-paper/50">
            {t.footer.contactTitle}
          </h3>
          <ul className="mt-4 space-y-3.5 text-sm text-paper/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-magenta" />
              <span>{business.address.full}</span>
            </li>
            <li>
              <a href={telLink} className="flex gap-3 transition-colors hover:text-magenta">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-magenta" />
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="flex gap-3 transition-colors hover:text-magenta">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-magenta" />
                {business.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-magenta" />
              <span>{business.hours}</span>
            </li>
          </ul>
          <a
            href={waLink(quickEnquiry())}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-wa px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            {t.nav.whatsapp}
          </a>
        </div>
      </div>

      <div className="relative z-10 border-t border-paper/10">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-5 text-xs text-paper/45 sm:flex-row sm:items-center">
          <p>
            © {year} {business.legalName}, {business.address.city}. {t.footer.rights}
            {business.gstin && <span className="ml-2 font-spec">GSTIN: {business.gstin}</span>}
          </p>
          <p>{t.footer.demoNote}</p>
          <p>
            {t.footer.credit}{" "}
            <a
              href="https://nexacoreconsultancy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-paper/60 transition-colors hover:text-magenta"
            >
              NexaCore Consultancy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
