// Single source of truth for business identity (NAP), used across UI + SEO schema.
// Edit these values to update the entire site.

export const business = {
  name: "Likhavat Printing Press",
  shortName: "Likhavat",
  legalName: "Likhavat Printing Press",
  hindiName: "लिखावट",
  tagline: "हर छपाई में, आपकी पहचान",
  taglineEn: "Your identity, in every print.",
  shortDesc:
    "Full-service printing press on Boring Road, Patna — visiting cards, wedding cards, flex banners, pamphlets, doctors' letterheads & prescription pads, bill books, brochures, folders, bags and t-shirts. Offset + digital printing with free design support, WhatsApp proofs and doorstep delivery across Bihar.",

  // Contact
  phone: "+919308592381",
  phoneDisplay: "+91 93085 92381",
  whatsapp: "919308592381", // wa.me number (no +)
  email: "likhavatprintingpress@gmail.com",

  // Address (NAP — keep identical everywhere & on Google Business Profile).
  // Confirm exact shop landmark / pin before launch.
  address: {
    line1: "Boring Road",
    city: "Patna",
    state: "Bihar",
    pincode: "800001",
    country: "India",
    full: "Boring Road, Patna, Bihar 800001, India",
  },

  // Exact Google Business Profile pin (maps.google.com listing)
  geo: { lat: 25.6185229, lng: 85.1213753 },

  hours: "Open 10 AM – 9 PM · WhatsApp enquiries 24×7",
  foundedYear: 2009,

  // Compliance / trust — fill actual numbers before launch (shown as labels until then)
  gstRegistered: true,
  gstin: "", // e.g. "10XXXXXXXXXXXXZX" — displayed in footer when set

  // Social / citation profiles — fill as the shop creates them (used in sameAs schema)
  social: {
    // Canonical Google Maps listing (CID link, stable across URL formats)
    googleBusiness: "https://maps.google.com/?cid=239208851823602192",
    facebook: "",
    instagram: "",
    youtube: "",
    justdial: "",
    indiamart: "",
  },

  // Headline stats (editable demo values) — shown in hero, About & counters
  stats: {
    yearsExperience: 17,
    ordersDelivered: 25000,
    productsOffered: 40,
    designsProofed: 60000,
    repeatClients: 4000,
  },

  // Production domain (GitHub Pages custom domain on gautamanand22/Likhavat).
  siteUrl: "https://likhavatprintingpress.com",

  // Paste the Google Search Console verification token here after adding the
  // property (Settings → Ownership verification → HTML tag → content="...").
  googleSiteVerification: "",
} as const;

export type Business = typeof business;
