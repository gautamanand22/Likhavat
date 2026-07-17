import type { Metadata } from "next";
import { business } from "@/content/business";
import { serviceHubs } from "@/content/services";
import { productById, type ProductId } from "@/content/products";

const baseUrl = business.siteUrl;

/** Bihar cities the press serves/couriers to — entity-rich areaServed. */
const BIHAR_CITIES = [
  "Patna",
  "Danapur",
  "Hajipur",
  "Muzaffarpur",
  "Gaya",
  "Bhagalpur",
  "Darbhanga",
  "Purnia",
  "Ara",
  "Bihar Sharif",
  "Begusarai",
  "Chhapra",
];

/** Build per-page metadata with sane defaults + canonical + OpenGraph. */
export function pageMeta(opts: {
  title: string;
  description: string;
  path?: string; // e.g. "/visiting-card-printing-patna"
  keywords?: string[];
}): Metadata {
  const url = opts.path ? `${baseUrl}${opts.path}` : baseUrl;
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: business.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}

// ---------------------------------------------------------------------------
//  JSON-LD schema builders
// ---------------------------------------------------------------------------

const orgId = `${baseUrl}/#organization`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    additionalType: "https://schema.org/Store",
    "@id": orgId,
    name: business.name,
    alternateName: [business.hindiName, "Likhavat Press", "लिखावट प्रिंटिंग प्रेस"],
    slogan: business.taglineEn,
    description: business.shortDesc,
    foundingDate: String(business.foundedYear),
    url: baseUrl,
    telephone: business.phone,
    email: business.email,
    image: `${baseUrl}/opengraph-image`,
    logo: `${baseUrl}/icon.svg`,
    priceRange: "₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Bank transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.line1,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    hasMap: business.social.googleBusiness || undefined,
    areaServed: [
      ...BIHAR_CITIES.map((name) => ({ "@type": "City", name })),
      { "@type": "State", name: "Bihar" },
      { "@type": "Country", name: "India" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "21:00",
    },
    sameAs: Object.values(business.social).filter(Boolean),
    // Every service hub as an offer — feeds rich results & AI answer engines.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Printing services",
      itemListElement: serviceHubs.map((s) => {
        const lead = productById(s.products[0] as ProductId);
        return {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.label,
            url: `${baseUrl}/${s.slug}`,
            description: s.summary,
          },
          priceCurrency: "INR",
          price: lead.price.amount.replace(/[₹,]/g, ""),
          description: `${lead.price.amount} ${lead.price.unit}${lead.price.note ? ` (${lead.price.note})` : ""} — indicative starting rate`,
          areaServed: { "@type": "State", name: "Bihar" },
        };
      }),
    },
    knowsAbout: [
      "Visiting card printing",
      "Wedding card printing",
      "Flex banner printing",
      "Pamphlet and leaflet printing",
      "Letterhead and prescription pad printing",
      "Bill book printing",
      "T-shirt and bag printing",
      "Sticker and label printing",
      "Brochure and folder printing",
    ],
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${baseUrl}${it.path}`,
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: `${baseUrl}${opts.path}`,
    provider: { "@id": orgId },
    areaServed: [
      { "@type": "City", name: "Patna" },
      { "@type": "State", name: "Bihar" },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.name,
    url: baseUrl,
    inLanguage: ["en-IN", "hi-IN"],
    publisher: { "@id": orgId },
  };
}
