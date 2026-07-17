"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { X, Phone, Timer, FileCheck } from "lucide-react";
import { useLang } from "@/components/i18n/LanguageProvider";
import { business } from "@/content/business";
import { telLink, waLink, quickEnquiry } from "@/lib/whatsapp";

const KEY = "likhavat-popup-seen";

export function EnquiryPopup() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;
    const timer = setTimeout(() => setOpen(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(KEY, "1");
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[60] flex items-end justify-center p-4 transition-opacity duration-300 sm:items-center",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-ink/55 backdrop-blur-sm" onClick={close} />
      <div
        className={clsx(
          "relative w-full max-w-md overflow-hidden rounded-3xl bg-paper shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0",
        )}
      >
        <button
          aria-label="Close"
          onClick={close}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-paper/15 text-paper transition-colors hover:bg-paper/25"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grain relative overflow-hidden bg-ink px-7 pb-7 pt-9 text-paper">
          <div className="cmyk-strip absolute inset-x-0 top-0 h-1.5 opacity-90" />
          <span className="eyebrow text-magenta">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-wa" />
            Live · {business.hours.split("·")[0]?.trim()}
          </span>
          <h3 className="mt-3 font-display text-2xl text-paper">{t.popup.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-paper/75">{t.popup.body}</p>

          <div className="mt-5 flex flex-col gap-2.5">
            <a
              href={waLink(quickEnquiry())}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-wa px-5 py-3.5 text-base font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              {t.popup.cta}
            </a>
            <a
              href={telLink}
              onClick={close}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/25 px-5 py-3 text-sm font-bold text-paper transition-colors hover:bg-paper/10"
            >
              <Phone className="h-4 w-4 text-magenta" />
              {business.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="flex items-center justify-around gap-2 px-5 py-4 text-center">
          <Feature icon={<Timer className="h-4 w-4" />} label={t.popup.chipA} />
          <span className="h-8 w-px bg-ink/10" />
          <Feature icon={<FileCheck className="h-4 w-4" />} label={t.popup.chipB} />
          <span className="h-8 w-px bg-ink/10" />
          <button onClick={close} className="text-xs font-semibold text-muted hover:text-ink">
            {t.popup.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
      <span className="text-magenta">{icon}</span>
      {label}
    </div>
  );
}
