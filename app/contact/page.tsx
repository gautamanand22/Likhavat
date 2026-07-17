import type { Metadata } from "next";
import { PageHero } from "@/components/templates/PageHero";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { business } from "@/content/business";

export const metadata: Metadata = pageMeta({
  title: "Contact Likhavat Printing Press | Boring Road, Patna | WhatsApp Quotes",
  description: `Get a printing quotation within the hour — WhatsApp ${business.phoneDisplay}, call, or visit ${business.address.full}. Open ${business.hours}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        crumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        h1="Talk to the press"
        intro="Send your matter on WhatsApp for the fastest quote, call the counter, or walk in — the sample books are always open."
      />
      <Contact />
      <FAQ />
    </>
  );
}
