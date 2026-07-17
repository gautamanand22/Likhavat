"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, ExternalLink, MessageCircle } from "lucide-react";
import { useLang } from "@/components/i18n/LanguageProvider";
import { business } from "@/content/business";
import { waLink, telLink, enquiryMessage } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${business.name}, ${business.address.full}`,
)}`;

const inputCls =
  "w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-magenta focus:outline-none focus:ring-2 focus:ring-magenta/20 transition-shadow";

export function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", phone: "", product: "", qty: "", message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(waLink(enquiryMessage(form)), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="section-pad relative bg-paper-200">
      <div className="halftone-dark pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-x relative">
        <SectionHeading eyebrow={t.contact.eyebrow} heading={t.contact.heading} sub={t.contact.sub} />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Enquiry form → WhatsApp */}
          <Reveal preset="left">
            <form onSubmit={submit} className="card-light rounded-3xl p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">
                    {t.contact.form.name}
                  </span>
                  <input required value={form.name} onChange={set("name")} className={inputCls} name="name" autoComplete="name" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">
                    {t.contact.form.phone}
                  </span>
                  <input
                    required
                    value={form.phone}
                    onChange={set("phone")}
                    className={inputCls}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">
                    {t.contact.form.product}
                  </span>
                  <input
                    required
                    value={form.product}
                    onChange={set("product")}
                    className={inputCls}
                    name="product"
                    placeholder={t.contact.form.productPlaceholder}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">
                    {t.contact.form.qty}
                  </span>
                  <input value={form.qty} onChange={set("qty")} className={inputCls} name="qty" inputMode="numeric" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted">
                    {t.contact.form.message}
                  </span>
                  <textarea value={form.message} onChange={set("message")} className={inputCls} name="message" rows={3} />
                </label>
              </div>
              <button
                type="submit"
                className="sheen mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wa px-6 py-3.5 text-base font-bold text-white shadow-[0_14px_40px_-10px_rgba(37,211,102,0.7)] transition-transform hover:-translate-y-0.5 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                {t.contact.form.submit}
              </button>
              <p className="mt-3 text-xs text-muted">{t.contact.form.note}</p>
            </form>
          </Reveal>

          {/* NAP card + map */}
          <Reveal preset="right" className="flex flex-col gap-5">
            <div className="grain relative overflow-hidden rounded-3xl bg-ink p-6 text-paper sm:p-7">
              <div className="cmyk-strip absolute inset-x-0 top-0 h-1" />
              <h3 className="font-display text-xl">{business.name}</h3>
              <p className="font-hindi mt-1 text-sm text-paper/70">{business.tagline}</p>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-magenta" />
                  <div>
                    <p className="font-semibold">{t.contact.visit}</p>
                    <p className="mt-0.5 text-paper/70">{business.address.full}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-magenta" />
                  <div>
                    <p className="font-semibold">{t.contact.call}</p>
                    <a href={telLink} className="mt-0.5 block font-spec text-paper/70 hover:text-paper">
                      {business.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-magenta" />
                  <div>
                    <p className="font-semibold">{t.contact.email}</p>
                    <a href={`mailto:${business.email}`} className="mt-0.5 block break-all text-paper/70 hover:text-paper">
                      {business.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-magenta" />
                  <div>
                    <p className="font-semibold">{t.contact.hoursLabel}</p>
                    <p className="mt-0.5 text-paper/70">{business.hours}</p>
                  </div>
                </li>
              </ul>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-paper/25 px-4 py-2.5 text-sm font-bold transition-colors hover:bg-paper/10"
              >
                {t.contact.mapCta}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="card-light overflow-hidden rounded-3xl">
              <iframe
                title={`${business.name} on Google Maps`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(business.address.full)}&z=15&output=embed`}
                className="h-56 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
