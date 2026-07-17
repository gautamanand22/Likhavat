"use client";

import clsx from "clsx";
import { useLang } from "@/components/i18n/LanguageProvider";

export function LanguageToggle({ light = false }: { light?: boolean }) {
  const { t, toggle, lang } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label={lang === "en" ? "हिंदी में देखें" : "Switch to English"}
      className={clsx(
        "rounded-full border px-3 py-1.5 text-xs font-bold transition-colors",
        lang === "en" && "font-hindi",
        light
          ? "border-paper/25 text-paper hover:bg-paper/10"
          : "border-ink/15 text-ink hover:bg-ink/[0.05]",
      )}
    >
      {t.nav.langLabel}
    </button>
  );
}
