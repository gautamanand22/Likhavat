"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { dict, type Dict, type Lang } from "@/content/i18n";

interface LangCtx {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const Ctx = createContext<LangCtx | null>(null);
const STORAGE_KEY = "likhavat-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore preference after mount (EN remains the SSR/indexed default).
  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      window.localStorage.getItem(STORAGE_KEY)) as Lang | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "en" || saved === "hi") setLangState(saved);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    } catch {}
  }, []);

  const toggle = useCallback(
    () => setLang(lang === "en" ? "hi" : "en"),
    [lang, setLang],
  );

  return (
    <Ctx.Provider value={{ lang, t: dict[lang], setLang, toggle }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
