// ============================================================================
//  PRODUCT CATALOGUE — everything the press prints, with indicative rates.
//  Rates are demo market values for Patna (2025-26) — confirm before launch.
//  `image` files live in /public/images/products/ as <name>.jpg + <name>-sm.jpg.
// ============================================================================

export type ProductCategory =
  | "stationery"
  | "marketing"
  | "events"
  | "medical"
  | "merchandise"
  | "large-format";

export interface Product {
  id: string;
  name: string;
  hindiName: string;
  category: ProductCategory;
  image: string;
  /** One-line pitch shown on cards */
  blurb: string;
  /** Spec bullets (paper, finish, options) */
  specs: string[];
  /** Minimum order quantity, human-readable */
  moq: string;
  /** Typical turnaround */
  turnaround: string;
  /** Starting rate — display-ready */
  price: { amount: string; unit: string; note?: string };
  /** Slug of the service hub page this product links to */
  service: string;
  featured?: boolean;
  popular?: boolean;
}

export const products = [
  {
    id: "visiting-cards",
    name: "Visiting Cards",
    hindiName: "विज़िटिंग कार्ड",
    category: "stationery",
    image: "/images/products/visiting-cards.jpg",
    blurb: "300gsm art card, matt/gloss/velvet lamination, spot UV & foil options.",
    specs: [
      "300–350gsm imported art card",
      "Matt · gloss · velvet lamination",
      "Spot UV, gold foil, rounded corners",
      "Non-tearable synthetic cards available",
    ],
    moq: "100 cards",
    turnaround: "Same day – 24 hrs",
    price: { amount: "₹0.40", unit: "per card", note: "1000+ qty, both sides" },
    service: "visiting-card-printing-patna",
    featured: true,
    popular: true,
  },
  {
    id: "wedding-cards",
    name: "Wedding Cards",
    hindiName: "शादी कार्ड",
    category: "events",
    image: "/images/products/wedding-cards.jpg",
    blurb: "Designer invites with foil, laser-cut jackets, boxes & Hindi calligraphy.",
    specs: [
      "Metallic & textured card stocks",
      "Gold/rose-gold foil stamping",
      "Laser-cut jackets, tassels, wax seals",
      "Matching money envelopes & boxes",
    ],
    moq: "100 cards",
    turnaround: "4–7 days",
    price: { amount: "₹12", unit: "per card", note: "simple; designer ₹40+" },
    service: "wedding-card-printing-patna",
    featured: true,
    popular: true,
  },
  {
    id: "flex-banner",
    name: "Flex Banners & Hoardings",
    hindiName: "फ्लेक्स बैनर",
    category: "large-format",
    image: "/images/products/flex-banner.jpg",
    blurb: "Star flex, backlit & vinyl up to 10ft wide — eyelets and framing included.",
    specs: [
      "Normal & star flex (280–340gsm)",
      "Backlit flex for glow signboards",
      "Self-adhesive vinyl & one-way vision",
      "Free eyelets · pipe pockets · framing",
    ],
    moq: "No minimum",
    turnaround: "Same day",
    price: { amount: "₹12", unit: "per sq ft", note: "frontlit flex; star ₹20+" },
    service: "flex-banner-printing-patna",
    featured: true,
    popular: true,
  },
  {
    id: "pamphlets",
    name: "Pamphlets & Leaflets",
    hindiName: "पम्पलेट",
    category: "marketing",
    image: "/images/products/pamphlets.jpg",
    blurb: "Offset-printed A4/A5 leaflets for shops, coaching, events & elections.",
    specs: [
      "90–130gsm art paper, full colour",
      "A4 · A5 · A6 · custom sizes",
      "Single or both-side printing",
      "Folding & bundling included",
    ],
    moq: "1,000 pcs",
    turnaround: "24–48 hrs",
    price: { amount: "₹1", unit: "per piece", note: "A5, both sides, 5000+" },
    service: "pamphlet-printing-patna",
    featured: true,
    popular: true,
  },
  {
    id: "letterheads",
    name: "Letterheads",
    hindiName: "लेटरहेड",
    category: "stationery",
    image: "/images/products/letterhead.jpg",
    blurb: "Crisp 100gsm letterheads for doctors, firms, schools & offices.",
    specs: [
      "85–100gsm maplitho / bond paper",
      "A4 & A5, single or multi colour",
      "Doctor, advocate & firm layouts ready",
      "Pads or loose sheets",
    ],
    moq: "500 sheets",
    turnaround: "24–48 hrs",
    price: { amount: "₹2.50", unit: "per sheet", note: "A4 colour, 1000+" },
    service: "letterhead-printing-patna",
    featured: true,
  },
  {
    id: "prescription-pads",
    name: "Prescription Pads",
    hindiName: "प्रिस्क्रिप्शन पैड",
    category: "medical",
    image: "/images/products/prescription.jpg",
    blurb: "Rx pads with clinic branding, timings & registration details.",
    specs: [
      "100 leaves per pad, numbered optional",
      "58–70gsm paper, 1–2 colours",
      "Clinic logo, timings, Rx layout setup free",
      "Carbonless duplicate pads available",
    ],
    moq: "10 pads",
    turnaround: "2–3 days",
    price: { amount: "₹60", unit: "per pad", note: "100 leaves, 20+ pads" },
    service: "prescription-pad-printing-patna",
    featured: true,
  },
  {
    id: "bill-books",
    name: "Bill Books & Invoices",
    hindiName: "बिल बुक",
    category: "stationery",
    image: "/images/products/bill-books.jpg",
    blurb: "Carbonless duplicate/triplicate GST bill books with numbering.",
    specs: [
      "Carbonless (NCR) 2 or 3 copies",
      "Serial numbering & perforation",
      "GST-format layouts ready",
      "Hard binding, 50/100 sets per book",
    ],
    moq: "5 books",
    turnaround: "3–4 days",
    price: { amount: "₹250", unit: "per book", note: "NCR 50×2 sets, 10+ books" },
    service: "bill-book-printing-patna",
  },
  {
    id: "brochures",
    name: "Brochures & Catalogues",
    hindiName: "ब्रोशर",
    category: "marketing",
    image: "/images/products/brochures.jpg",
    blurb: "Tri-fold brochures and multi-page catalogues on premium art paper.",
    specs: [
      "170–300gsm art paper / card",
      "Bi-fold · tri-fold · gate fold",
      "Centre-pin or perfect binding",
      "Matt/gloss lamination options",
    ],
    moq: "500 pcs",
    turnaround: "3–5 days",
    price: { amount: "₹5", unit: "per piece", note: "A4 tri-fold, 1000+" },
    service: "brochure-folder-printing-patna",
    featured: true,
  },
  {
    id: "folders",
    name: "Presentation Folders",
    hindiName: "फोल्डर",
    category: "stationery",
    image: "/images/products/brochures.jpg",
    blurb: "Laminated document folders with pockets — hospitals, schools, firms.",
    specs: [
      "300gsm art card, laminated",
      "Single or double pocket + card slit",
      "A4 & FS sizes, custom dies",
      "Spot UV / foil branding options",
    ],
    moq: "300 pcs",
    turnaround: "4–5 days",
    price: { amount: "₹22", unit: "per folder", note: "A4 laminated, 500+" },
    service: "brochure-folder-printing-patna",
  },
  {
    id: "paper-bags",
    name: "Paper & Non-Woven Bags",
    hindiName: "प्रिंटेड बैग",
    category: "merchandise",
    image: "/images/products/paper-bags.jpg",
    blurb: "Branded carry bags for boutiques, sweets shops, clinics & events.",
    specs: [
      "Kraft, art-paper & non-woven fabric",
      "Rope, ribbon or D-cut handles",
      "Standard & custom sizes",
      "Full-colour branding both sides",
    ],
    moq: "500 bags",
    turnaround: "4–6 days",
    price: { amount: "₹5", unit: "per bag", note: "non-woven D-cut, 1000+" },
    service: "bag-printing-patna",
    featured: true,
  },
  {
    id: "tshirts",
    name: "T-Shirt Printing",
    hindiName: "टी-शर्ट प्रिंटिंग",
    category: "merchandise",
    image: "/images/products/tshirt-print.jpg",
    blurb: "DTF & sublimation tees for events, staff uniforms, rallies & colleges.",
    specs: [
      "DTF · sublimation · vinyl print",
      "Round-neck, collar & dry-fit tees",
      "Single piece to bulk orders",
      "Front/back/sleeve, full colour",
    ],
    moq: "1 piece",
    turnaround: "1–3 days",
    price: { amount: "₹199", unit: "per tee", note: "with t-shirt, bulk rates lower" },
    service: "tshirt-printing-patna",
    featured: true,
    popular: true,
  },
  {
    id: "stickers",
    name: "Stickers & Labels",
    hindiName: "स्टीकर",
    category: "marketing",
    image: "/images/products/stickers.jpg",
    blurb: "Product labels, die-cut stickers, dome stickers & packaging seals.",
    specs: [
      "Paper · vinyl · transparent media",
      "Any die-cut shape",
      "Gloss/matt finish, waterproof options",
      "Sheets or rolls",
    ],
    moq: "500 pcs",
    turnaround: "2–3 days",
    price: { amount: "₹1", unit: "per sticker", note: "50mm vinyl, 1000+" },
    service: "sticker-label-printing-patna",
  },
  {
    id: "envelopes",
    name: "Envelopes",
    hindiName: "लिफ़ाफ़े",
    category: "stationery",
    image: "/images/products/letterhead.jpg",
    blurb: "Office envelopes, shagun lifafas and document pouches with branding.",
    specs: [
      "9×4, A4 & custom sizes",
      "80–120gsm maplitho / art paper",
      "Window & full-print options",
      "Matching letterhead sets",
    ],
    moq: "500 pcs",
    turnaround: "3–4 days",
    price: { amount: "₹2", unit: "per envelope", note: "9×4 printed, 1000+" },
    service: "letterhead-printing-patna",
  },
  {
    id: "calendars-posters",
    name: "Calendars & Posters",
    hindiName: "कैलेंडर व पोस्टर",
    category: "marketing",
    image: "/images/products/calendar-poster.jpg",
    blurb: "New-year wall calendars, table calendars and A3/A2 posters.",
    specs: [
      "Wall & table calendars, wiro-bound",
      "130–300gsm art paper",
      "A3 · A2 · custom poster sizes",
      "Bulk corporate branding",
    ],
    moq: "100 pcs",
    turnaround: "5–7 days",
    price: { amount: "₹35", unit: "per calendar", note: "wall, 6 leaves, 200+" },
    service: "pamphlet-printing-patna",
  },
] as const satisfies readonly Product[];

export type ProductId = (typeof products)[number]["id"];

/** Widened view of the catalogue (optional fields become accessible). */
const catalogue: readonly Product[] = products;

export function productById(id: ProductId): Product {
  const p = catalogue.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown product: ${id}`);
  return p;
}

/** Products shown in the hero rotator & featured rails. */
export const featuredProducts = catalogue.filter((p) => p.featured);

/** Compact rows for the rate card section. */
export const rateRows = catalogue.map((p) => ({
  id: p.id,
  name: p.name,
  hindiName: p.hindiName,
  spec: p.specs[0],
  moq: p.moq,
  rate: p.price,
  turnaround: p.turnaround,
  service: p.service,
}));
