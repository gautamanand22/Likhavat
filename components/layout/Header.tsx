"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, X, MessageCircle } from "lucide-react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { useLang } from "@/components/i18n/LanguageProvider";
import { business } from "@/content/business";
import { telLink, waLink, quickEnquiry } from "@/lib/whatsapp";

export function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    { label: t.nav.services, href: "/#services" },
    { label: t.nav.showcase, href: "/#press" },
    { label: t.nav.rates, href: "/#rates" },
    { label: t.nav.work, href: "/#why" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-ink/10 bg-paper/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {/* CMYK hairline — the press sheet colour bar */}
      <div className="cmyk-strip h-[3px] w-full" />
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-[4.75rem]">
        <Logo light={!scrolled} />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                scrolled
                  ? "text-ink/80 hover:bg-ink/[0.05] hover:text-ink"
                  : "text-paper/85 hover:bg-paper/10 hover:text-paper",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle light={!scrolled} />
          <a
            href={telLink}
            className={clsx(
              "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold transition-all hover:border-magenta hover:bg-magenta/10",
              scrolled ? "border-ink/15 text-ink" : "border-paper/25 text-paper",
            )}
          >
            <Phone className="h-4 w-4 text-magenta" />
            <span className="hidden xl:inline">{business.phoneDisplay}</span>
          </a>
          <a
            href={waLink(quickEnquiry())}
            target="_blank"
            rel="noopener noreferrer"
            className="sheen inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-magenta to-[#b02a63] px-5 py-2.5 text-sm font-bold text-paper shadow-[0_8px_24px_-6px_rgba(226,58,127,0.7)] transition-all hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" />
            {t.nav.enquire}
          </a>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle light={!scrolled} />
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={clsx(
              "grid h-10 w-10 place-items-center rounded-full border transition-colors",
              scrolled ? "border-ink/15 text-ink" : "border-paper/25 text-paper",
            )}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu — CSS transitions, always mounted */}
      <div
        className={clsx(
          "fixed inset-0 z-50 transition-opacity duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div
          className={clsx(
            "absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-paper p-6 shadow-2xl transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-8 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3.5 text-lg font-semibold text-ink transition-colors hover:bg-ink/[0.05]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-6">
            <a
              href={waLink(quickEnquiry())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-wa px-5 py-3.5 text-base font-bold text-white"
            >
              <MessageCircle className="h-5 w-5" />
              {t.nav.whatsapp}
            </a>
            <a
              href={telLink}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-base font-bold text-paper"
            >
              <Phone className="h-5 w-5 text-magenta" />
              {business.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
