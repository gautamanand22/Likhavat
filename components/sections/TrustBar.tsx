"use client";

import { FileCheck, Zap, PenTool, ReceiptText, FolderHeart, Truck } from "lucide-react";
import { useLang } from "@/components/i18n/LanguageProvider";

const icons = [FileCheck, Zap, PenTool, ReceiptText, FolderHeart, Truck];

/** Marquee strip of the six promises the counter runs on. */
export function TrustBar() {
  const { t } = useLang();
  const items = [t.trust.a, t.trust.b, t.trust.c, t.trust.d, t.trust.e, t.trust.f];
  const row = [...items, ...items];

  return (
    <section className="relative overflow-hidden border-y border-ink/10 bg-paper-200 py-3.5">
      <div className="animate-marquee flex w-max items-center gap-10 pr-10">
        {row.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <span key={i} className="inline-flex items-center gap-2.5 whitespace-nowrap text-sm font-semibold text-ink/75">
              <Icon className="h-4 w-4 text-magenta" />
              {item}
              <span className="ml-6 flex gap-1 opacity-60">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
                <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
              </span>
            </span>
          );
        })}
      </div>
    </section>
  );
}
