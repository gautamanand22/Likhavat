// ============================================================================
//  SERVICE HUBS — dedicated SEO landing pages (one template renders all).
//  Add a service = add an object here (auto sitemap + schema + internal links).
// ============================================================================

import type { ProductId } from "./products";

export interface ServiceHub {
  slug: string;
  /** Short label for nav / cards */
  label: string;
  /** Icon name mapped in components */
  icon: string;
  /** H1 on the landing page */
  h1: string;
  /** SEO <title> */
  metaTitle: string;
  metaDescription: string;
  /** One-line summary for service cards on the homepage */
  summary: string;
  /** Lead paragraph on the landing page */
  intro: string;
  /** Bullet selling points */
  features: string[];
  /** Featured products from the catalogue */
  products: ProductId[];
  /** Keyword phrases this page targets */
  keywords: string[];
  faq: { q: string; a: string }[];
  featured?: boolean;
  /** Card/hero image */
  cardImage: string;
}

export const serviceHubs: ServiceHub[] = [
  {
    slug: "visiting-card-printing-patna",
    label: "Visiting Cards",
    icon: "IdCard",
    h1: "Visiting Card Printing in Patna — Same-Day, Premium Finishes",
    metaTitle: "Visiting Card Printing Patna | 300gsm Matt/Velvet from 40p | Same Day",
    metaDescription:
      "Premium visiting card printing on Boring Road, Patna — 300gsm art card with matt, gloss or velvet lamination, spot UV and foil from ₹0.40/card. Free design, WhatsApp proof, same-day delivery.",
    summary:
      "300gsm cards with matt, velvet, spot-UV & foil finishes — from ₹0.40/card, same-day.",
    intro:
      "Your card changes hands before you say a word — it should feel like quality. Likhavat prints visiting cards on genuine 300gsm art card with your choice of matt, gloss or velvet lamination, and premium touches like spot UV, gold foiling, rounded corners and non-tearable stock. Share your details on WhatsApp, approve a free design proof, and collect your cards from Boring Road the same day — or get them delivered anywhere in Patna.",
    features: [
      "300–350gsm imported art card — never flimsy stock",
      "Matt, gloss & velvet-touch lamination",
      "Spot UV, gold/silver foil, embossing, rounded corners",
      "Non-tearable synthetic cards for heavy use",
      "Free designer proof on WhatsApp before printing",
      "100-card minimum · same-day printing available",
    ],
    products: ["visiting-cards", "letterheads", "stickers"],
    keywords: [
      "visiting card printing patna",
      "business card printing near me",
      "visiting card printing boring road",
      "same day visiting card patna",
      "velvet lamination visiting card",
    ],
    faq: [
      {
        q: "What is the price of visiting card printing in Patna?",
        a: "Standard both-side colour cards on 300gsm with lamination start around ₹0.40 per card for 1000+ quantity. Premium finishes like velvet lamination with spot UV or foil typically range ₹1.5–₹3 per card. Message us your design for an exact quote.",
      },
      {
        q: "Can I get visiting cards printed the same day?",
        a: "Yes. If your design is approved by early afternoon, standard laminated cards are usually ready the same evening. Premium finishes like foil and spot UV need 1–2 days.",
      },
      {
        q: "I don't have a design. Do you make one?",
        a: "Yes — design is free with printing. Send your name, designation, phone and logo (if any) on WhatsApp and our designer sends a proof for your approval before anything is printed.",
      },
    ],
    featured: true,
    cardImage: "/images/products/visiting-cards.jpg",
  },
  {
    slug: "wedding-card-printing-patna",
    label: "Wedding Cards",
    icon: "Heart",
    h1: "Wedding Card Printing in Patna — Designer Invites & Boxes",
    metaTitle: "Wedding Card Printing Patna | Designer Shaadi Cards from ₹12 | Foil & Laser Cut",
    metaDescription:
      "Designer wedding card printing in Patna — foil stamping, laser-cut jackets, Hindi calligraphy, matching lifafas & boxes from ₹12/card. See samples on Boring Road or get proofs on WhatsApp.",
    summary:
      "Designer shaadi cards — foil, laser-cut, boxed invites & Hindi calligraphy from ₹12.",
    intro:
      "A shaadi card is the first ceremony of the wedding — the moment your family's name reaches every doorstep. Likhavat designs and prints invitation suites that feel as special as the occasion: metallic and handmade card stocks, gold and rose-gold foil, laser-cut jackets, tassels and wax seals, with matching money envelopes, RSVP inserts and sweet boxes. Hindu, Muslim and modern minimal themes are all in our sample library — visit the Boring Road shop to touch the stock, or approve everything over WhatsApp.",
    features: [
      "Simple elegant cards from ₹12 to luxury boxed invites",
      "Gold / rose-gold foil, embossing & laser cutting",
      "Hindi, English & Urdu typesetting with calligraphy",
      "Matching lifafas, RSVP cards, itinerary inserts & boxes",
      "Physical samples at the shop + WhatsApp proofing",
      "100-card minimum · rush 3–4 day printing available",
    ],
    products: ["wedding-cards", "envelopes", "stickers"],
    keywords: [
      "wedding card printing patna",
      "shaadi card printing near me",
      "designer wedding cards patna",
      "marriage card price patna",
      "laser cut wedding invitation bihar",
    ],
    faq: [
      {
        q: "What do wedding cards cost in Patna?",
        a: "Simple elegant cards start around ₹12–₹25 per card, mid-range foil and jacket styles run ₹40–₹90, and luxury laser-cut or boxed invites go from ₹100 upwards. Prices drop with quantity; most families order 300–500 cards.",
      },
      {
        q: "How early should we order wedding cards?",
        a: "Ideally 3–4 weeks before you want them in hand — design and proofing take a few days and printing with foil/laser work takes about a week. Rush orders in 3–4 days are possible for many designs.",
      },
      {
        q: "Do you print the family names and functions in Hindi?",
        a: "Yes — our typesetters compose full Hindi matter (देवनागरी) with correct muhurat details, plus English versions if you want dual-language cards. You approve a proof of every page before printing.",
      },
    ],
    featured: true,
    cardImage: "/images/products/wedding-cards.jpg",
  },
  {
    slug: "flex-banner-printing-patna",
    label: "Flex & Banners",
    icon: "Presentation",
    h1: "Flex Banner Printing in Patna — Same-Day, Any Size",
    metaTitle: "Flex Printing Patna | Banner & Hoarding from ₹12/sqft | Same Day",
    metaDescription:
      "Flex banner printing in Patna from ₹12/sqft — star flex, backlit, vinyl & one-way vision up to 10ft wide. Free eyelets, pipe pockets & framing. Same-day printing near Boring Road.",
    summary:
      "Star flex, backlit & vinyl — shop boards, hoardings and event banners from ₹12/sqft.",
    intro:
      "Shop launch tomorrow? Birthday stage tonight? Flex is the fastest way to be seen, and Likhavat prints it the same day — shop-front boards, event backdrops, political hoardings, glow-sign backlit sheets and self-adhesive vinyl, on machines that run up to 10 feet wide with no joint. Send your matter on WhatsApp; we design, print, add eyelets or pipe pockets, and hand over a banner that's ready to hang.",
    features: [
      "₹12/sqft frontlit flex — full colour, weather-proof inks",
      "Backlit flex for glow signboards & lollipops",
      "Self-adhesive vinyl, one-way vision & sunboard pasting",
      "Seamless prints up to 10 ft width",
      "Free eyelets, rope hems & pipe pockets",
      "Same-day printing · framing & fitting support",
    ],
    products: ["flex-banner", "stickers", "pamphlets"],
    keywords: [
      "flex printing patna",
      "banner printing near me",
      "flex banner price per sqft patna",
      "backlit board printing patna",
      "hoarding printing bihar",
    ],
    faq: [
      {
        q: "What is the flex printing rate per square foot in Patna?",
        a: "Normal frontlit flex prints at about ₹12–₹18/sqft, star flex ₹20–₹30/sqft, backlit flex ₹30–₹45/sqft and self-adhesive vinyl ₹40–₹70/sqft depending on media and finishing. Eyelets and pipe pockets are free.",
      },
      {
        q: "Can you print and deliver a banner today?",
        a: "Yes — flex is our fastest product. Designs approved by evening are usually printed within hours. For urgent event banners, call us and we'll slot the machine.",
      },
      {
        q: "Do you install shop boards and hoardings?",
        a: "We provide framing on iron/aluminium structure and coordinate fitting for shop boards in Patna. For large hoardings we supply print + framing; installation is arranged per site.",
      },
    ],
    featured: true,
    cardImage: "/images/products/flex-banner.jpg",
  },
  {
    slug: "pamphlet-printing-patna",
    label: "Pamphlets & Posters",
    icon: "Newspaper",
    h1: "Pamphlet & Leaflet Printing in Patna — Offset Rates",
    metaTitle: "Pamphlet Printing Patna | Leaflets from ₹1 | Offset Bulk Rates",
    metaDescription:
      "Bulk pamphlet printing in Patna at offset rates — A4/A5 leaflets on 90–130gsm art paper from ₹1/piece, posters & danglers. 24–48 hr turnaround, free bundling, delivery across Bihar.",
    summary:
      "Offset leaflets for shops, coaching & campaigns — from ₹1/piece in bulk.",
    intro:
      "When you need ten thousand hands to hold your offer, offset printing is the only economical answer. Likhavat runs pamphlets and leaflets on 90–130gsm art paper in full colour — for shop openings, coaching admissions, restaurant menus, political campaigns and melas — with rates that fall sharply as quantity rises. Posters, danglers and newspaper-insert sizes are all standard work; folding and bundling are on us.",
    features: [
      "A4 / A5 / A6 and newspaper-insert sizes",
      "90–130gsm gloss art paper, full colour",
      "Offset rates from ₹1/piece at 5000+ qty",
      "Posters (A3/A2), danglers & standees too",
      "Free folding, cutting & 100-piece bundling",
      "24–48 hr turnaround on standard runs",
    ],
    products: ["pamphlets", "calendars-posters", "stickers"],
    keywords: [
      "pamphlet printing patna",
      "leaflet printing price patna",
      "poster printing patna",
      "election pamphlet printing bihar",
      "bulk pamphlet printing near me",
    ],
    faq: [
      {
        q: "What does 5000 pamphlets cost in Patna?",
        a: "A5 both-side colour on 100gsm art paper runs roughly ₹1–₹1.50 per piece at 5000 quantity — about ₹5,000–₹7,500 for the lot. A4 and heavier paper cost more; single-side and single-colour cost less. WhatsApp your size and quantity for an exact quote.",
      },
      {
        q: "How fast can you print bulk pamphlets?",
        a: "Standard runs of 5,000–20,000 pieces are usually ready in 24–48 hours after proof approval. Very large or festival-season orders may need an extra day.",
      },
      {
        q: "Can you also distribute or insert them in newspapers?",
        a: "We print to newspaper-insert size and bundle in 100s so your distribution team or hawker network can move fast. We can connect you with insertion vendors in Patna.",
      },
    ],
    featured: true,
    cardImage: "/images/products/pamphlets.jpg",
  },
  {
    slug: "letterhead-printing-patna",
    label: "Letterheads",
    icon: "FileText",
    h1: "Letterhead Printing in Patna — Doctors, Firms & Offices",
    metaTitle: "Letterhead Printing Patna | Doctor & Office Letterheads from ₹2.5",
    metaDescription:
      "Professional letterhead printing in Patna — 100gsm A4 letterheads for doctors, advocates, firms and schools from ₹2.5/sheet with matching envelopes. Free layout, 24–48 hr delivery.",
    summary:
      "Crisp 100gsm letterheads for doctors, advocates & firms — with matching envelopes.",
    intro:
      "A letterhead is your signature before your signature. Likhavat prints letterheads that carry a practice or firm's authority — clean typography on smooth 85–100gsm stock that takes both pen and laser printer beautifully. We keep ready layouts for doctors (with registration number and timings), advocates, CA firms, schools and government suppliers, and we match them with printed envelopes and visiting cards so your stationery feels like one brand.",
    features: [
      "85–100gsm maplitho/bond — laser-printer safe",
      "Doctor, advocate, CA & firm layouts ready",
      "Single-colour economy to full-colour premium",
      "Matching 9×4 envelopes & visiting cards",
      "Pads or loose sheets, A4 and A5",
      "Free layout & WhatsApp proof, 24–48 hr delivery",
    ],
    products: ["letterheads", "envelopes", "visiting-cards"],
    keywords: [
      "letterhead printing patna",
      "doctor letterhead printing",
      "letterhead design and printing near me",
      "office stationery printing patna",
      "advocate letterhead patna",
    ],
    faq: [
      {
        q: "What is the minimum order for letterheads?",
        a: "500 sheets is the practical minimum for offset quality — at 1000 sheets the rate drops to around ₹2.5/sheet for full-colour A4. For small urgent needs we can digitally print 100 sheets at a slightly higher rate.",
      },
      {
        q: "Will the letterhead work in my clinic's laser printer?",
        a: "Yes — we print on 85–100gsm stock specifically chosen to run through laser and inkjet printers without curling, so you can type prescriptions or letters directly onto it.",
      },
      {
        q: "Can you copy my existing letterhead design?",
        a: "Bring or WhatsApp a photo of your current letterhead — we recompose it cleanly (often better than the original), update any details, and send a proof before printing.",
      },
    ],
    cardImage: "/images/products/letterhead.jpg",
  },
  {
    slug: "prescription-pad-printing-patna",
    label: "Prescription Pads",
    icon: "Stethoscope",
    h1: "Prescription Pad Printing in Patna — For Doctors & Clinics",
    metaTitle: "Prescription Pad Printing Patna | Rx Pads from ₹60 | Doctors' Printer",
    metaDescription:
      "Prescription pad printing for doctors in Patna — 100-leaf Rx pads with clinic branding, timings and registration details from ₹60/pad. Free layout, carbonless duplicates, clinic-door delivery.",
    summary:
      "Rx pads with clinic branding & timings — 100 leaves from ₹60/pad, delivered to the clinic.",
    intro:
      "Half the doctors around Boring Road write on pads we printed — because a prescription pad has to be exactly right: the registration number, the timings, the Rx placement, the paper that takes a fast ballpoint. Likhavat sets up your pad layout free, prints on smooth 58–70gsm stock, and binds firm 100-leaf pads that sit flat on a clinic desk. Carbonless duplicate pads, referral slips, appointment cards and case-paper files complete the set.",
    features: [
      "100-leaf pads, firm binding, lie-flat glue top",
      "Free Rx layout with reg. no., timings & degrees",
      "58–70gsm smooth stock — no ink bleed",
      "Carbonless duplicate pads for records",
      "Appointment cards, referral slips & case files",
      "Repeat orders on one WhatsApp message",
    ],
    products: ["prescription-pads", "letterheads", "visiting-cards"],
    keywords: [
      "prescription pad printing patna",
      "rx pad printing near me",
      "doctor pad printing patna",
      "clinic stationery printing bihar",
      "prescription printing boring road",
    ],
    faq: [
      {
        q: "What does a prescription pad cost?",
        a: "Single-colour 100-leaf pads start around ₹60–₹90 per pad for 20+ pads; two-colour and heavier paper cost slightly more. Most clinics order 20–50 pads a quarter — we keep your design on file for one-message reorders.",
      },
      {
        q: "Can you print my registration number and clinic timings?",
        a: "Yes — that's the whole point of a custom pad. Send a photo of your current pad or your details on WhatsApp; our designer sets the layout with your name, degrees, registration number, clinic address and timings, and you approve a proof first.",
      },
      {
        q: "Do you deliver to clinics?",
        a: "Yes, we deliver to clinics and hospitals across Patna, usually within 2–3 days of proof approval. Outstation courier across Bihar is available.",
      },
    ],
    featured: true,
    cardImage: "/images/products/prescription.jpg",
  },
  {
    slug: "tshirt-printing-patna",
    label: "T-Shirt Printing",
    icon: "Shirt",
    h1: "T-Shirt Printing in Patna — Events, Teams & Uniforms",
    metaTitle: "T-Shirt Printing Patna | Custom Tees from ₹199 | DTF & Sublimation",
    metaDescription:
      "Custom t-shirt printing in Patna from ₹199 with the tee — DTF, sublimation and vinyl for events, staff uniforms, college fests, rallies and gifts. Single piece to bulk, 1–3 day turnaround.",
    summary:
      "DTF & sublimation tees — events, staff, fests and rallies from ₹199 with the tee.",
    intro:
      "One tee for a birthday or five hundred for a rally — Likhavat prints both. We stock round-neck, collar and dry-fit blanks and print with DTF for photo-sharp colour, sublimation for all-over designs, and vinyl for bold single-colour names and numbers. Corporate uniforms with chest logos, college fest merch, political campaign tees and personalised gifts all ship in one to three days.",
    features: [
      "From ₹199 per piece including the t-shirt",
      "DTF, sublimation & vinyl — photo-quality colour",
      "Round-neck, polo/collar & dry-fit fabrics",
      "No minimum — single piece welcome",
      "Bulk rates for events, staff & campaigns",
      "Front, back, sleeve & all-over printing",
    ],
    products: ["tshirts", "paper-bags", "stickers"],
    keywords: [
      "t-shirt printing patna",
      "custom tshirt printing near me",
      "bulk t shirt printing for event patna",
      "staff uniform t shirt printing",
      "college fest tshirt patna",
    ],
    faq: [
      {
        q: "What does one printed t-shirt cost?",
        a: "A single round-neck tee with front print starts around ₹199–₹299 depending on fabric and print size. Bulk orders drop steeply — event runs of 100+ often land near ₹150–₹180 per piece with the tee included.",
      },
      {
        q: "Which print lasts longer — DTF or sublimation?",
        a: "Both outlast cheap screen prints. DTF sits on any fabric colour and survives 40+ washes; sublimation dyes into polyester permanently and never cracks — ideal for sports and dry-fit tees.",
      },
      {
        q: "Can you print 200 tees for an event this week?",
        a: "Yes — bulk DTF runs of 200–500 pieces typically take 2–3 days after design approval. Share your date and we'll confirm the schedule before you pay.",
      },
    ],
    cardImage: "/images/products/tshirt-print.jpg",
  },
  {
    slug: "bag-printing-patna",
    label: "Carry Bags",
    icon: "ShoppingBag",
    h1: "Printed Carry Bag Manufacturing in Patna — Paper & Non-Woven",
    metaTitle: "Paper Bag Printing Patna | Non-Woven & Kraft Bags from ₹5 | Bulk",
    metaDescription:
      "Printed carry bags in Patna — non-woven D-cut from ₹5 and kraft paper bags with rope handles for boutiques, sweet shops, clinics and events. Full-colour branding, 500-bag minimum.",
    summary:
      "Branded kraft & non-woven bags — boutiques, sweets, pharma & events from ₹5/bag.",
    intro:
      "Every bag that leaves your counter is a walking hoarding. Likhavat manufactures and prints carry bags that shops actually reuse — sturdy kraft paper bags with rope handles for boutiques and gift stores, economical non-woven D-cut bags for sweets, medicines and groceries, and laminated premium bags for showrooms. Your brand, both sides, in full colour.",
    features: [
      "Non-woven D-cut from ₹5/bag at 1000+",
      "Kraft & art-paper bags with rope/ribbon handles",
      "Laminated premium showroom bags",
      "Standard sweet-box & boutique sizes ready",
      "Full-colour both-side branding",
      "500-bag minimum · 4–6 day delivery",
    ],
    products: ["paper-bags", "stickers", "visiting-cards"],
    keywords: [
      "paper bag printing patna",
      "non woven bag printing near me",
      "carry bag manufacturer patna",
      "printed shopping bags bihar",
      "kraft bag with logo patna",
    ],
    faq: [
      {
        q: "What is the minimum order for printed bags?",
        a: "500 bags for standard sizes. At 1000+ bags, non-woven D-cut lands around ₹5–₹7 per bag and kraft paper bags around ₹9–₹15 depending on size and handle type.",
      },
      {
        q: "Which bag suits a sweet shop vs a boutique?",
        a: "Sweet shops usually take non-woven D-cut (cheap, strong, food-safe) sized to their box range; boutiques prefer kraft or laminated art-paper bags with rope handles that customers keep. We'll show samples of both.",
      },
      {
        q: "Can you match my brand colour exactly?",
        a: "Yes — we print full-colour on white media so your logo colours reproduce accurately, and we send a printed sample or photo proof for approval on larger runs.",
      },
    ],
    cardImage: "/images/products/paper-bags.jpg",
  },
  {
    slug: "brochure-folder-printing-patna",
    label: "Brochures & Folders",
    icon: "BookOpen",
    h1: "Brochure & Folder Printing in Patna — Premium Marketing Print",
    metaTitle: "Brochure Printing Patna | Catalogues & Folders | Premium Art Paper",
    metaDescription:
      "Brochure, catalogue and presentation folder printing in Patna — tri-folds from ₹5/pc, multi-page catalogues, laminated pocket folders for hospitals, schools, real estate and firms.",
    summary:
      "Tri-folds, catalogues & pocket folders — hospitals, schools, real estate & firms.",
    intro:
      "When a customer sits across the table, what you hand over decides how serious you look. Likhavat prints brochures and catalogues on heavy art paper with lamination that survives a hundred hands — tri-folds for clinics and institutes, multi-page product catalogues with perfect binding, and 300gsm pocket folders that hold reports, prospectuses and proposals. Real-estate projects, hospitals, schools and agencies are our regulars.",
    features: [
      "Bi-fold, tri-fold & gate-fold brochures",
      "170–300gsm art paper, matt/gloss lamination",
      "Multi-page catalogues — pin or perfect bound",
      "Pocket folders with card slit & custom dies",
      "Spot UV and foil for premium covers",
      "Design support from brief to final proof",
    ],
    products: ["brochures", "folders", "letterheads"],
    keywords: [
      "brochure printing patna",
      "catalogue printing near me",
      "presentation folder printing patna",
      "hospital brochure printing",
      "school prospectus printing bihar",
    ],
    faq: [
      {
        q: "What does a tri-fold brochure cost?",
        a: "A4 tri-folds on 170gsm art paper start around ₹5–₹8 per piece at 1000 quantity, including folding. Heavier paper, lamination or smaller runs change the rate — send your specs for an exact quote.",
      },
      {
        q: "Can you design the brochure content too?",
        a: "Yes. Share your text, photos and any reference brochures you like; our designer builds the layout and you approve page-by-page proofs on WhatsApp before printing.",
      },
      {
        q: "Do you print school prospectuses and annual reports?",
        a: "Regularly — multi-page prospectuses with laminated covers, centre-pin or perfect binding, delivered before admission season. Book your slot 1–2 weeks ahead in peak months.",
      },
    ],
    cardImage: "/images/products/brochures.jpg",
  },
  {
    slug: "sticker-label-printing-patna",
    label: "Stickers & Labels",
    icon: "Tag",
    h1: "Sticker & Label Printing in Patna — Any Shape, Any Surface",
    metaTitle: "Sticker Printing Patna | Product Labels & Die-Cut Stickers from ₹1",
    metaDescription:
      "Sticker and label printing in Patna — die-cut vinyl stickers, product labels, packaging seals and dome stickers from ₹1/piece. Waterproof options, sheets or rolls, 2–3 day turnaround.",
    summary:
      "Die-cut vinyl stickers, product labels & packaging seals — from ₹1/piece.",
    intro:
      "From a pickle jar in Kankarbagh to a startup's laptop sticker — a label is the smallest print that works the hardest. Likhavat prints paper and vinyl stickers in any die-cut shape: product labels with ingredients and MRP panels, waterproof bottle labels, tamper seals, barcode labels and glossy brand stickers, supplied as sheets or ready-to-peel rolls.",
    features: [
      "Paper, vinyl & transparent media",
      "Any custom die-cut shape",
      "Waterproof, oil-resistant lamination options",
      "MRP / ingredient / barcode label layouts",
      "Sheets or machine-ready rolls",
      "From ₹1/sticker at 1000+ quantity",
    ],
    products: ["stickers", "paper-bags", "pamphlets"],
    keywords: [
      "sticker printing patna",
      "product label printing near me",
      "vinyl sticker printing patna",
      "food label printing bihar",
      "die cut sticker printing",
    ],
    faq: [
      {
        q: "Do you print waterproof labels for food and cosmetic products?",
        a: "Yes — vinyl media with gloss lamination handles moisture, oil and refrigeration. We print MRP, FSSAI and ingredient panels exactly as your compliance needs.",
      },
      {
        q: "Can I get stickers in a custom shape?",
        a: "Any shape — circles, ovals, or the outline of your logo. Die-cutting is included; you receive peel-ready stickers on sheets or rolls.",
      },
      {
        q: "What is the minimum sticker order?",
        a: "500 pieces for custom die-cut work. Simple square/circle labels at 1000+ pieces land around ₹1–₹2 per sticker depending on size and media.",
      },
    ],
    cardImage: "/images/products/stickers.jpg",
  },
  {
    slug: "bill-book-printing-patna",
    label: "Bill Books",
    icon: "ReceiptText",
    h1: "Bill Book Printing in Patna — GST Invoices & Challans",
    metaTitle: "Bill Book Printing Patna | Carbonless GST Bill Books from ₹250",
    metaDescription:
      "Bill book printing in Patna — carbonless duplicate/triplicate GST bill books with serial numbering and perforation from ₹250/book. Cash memos, challans, receipts. 3–4 day delivery.",
    summary:
      "Carbonless GST bill books with numbering & perforation — from ₹250/book.",
    intro:
      "A bill book has to satisfy three people at once: your customer, your accountant and the GST officer. Likhavat prints carbonless (NCR) bill books in duplicate or triplicate with clean GST-format columns, automatic serial numbering, perforation for tear-off copies and hard binding that survives a busy counter. Cash memos, delivery challans, receipt books, estimate pads and money-receipt books follow the same care.",
    features: [
      "Carbonless 2-copy & 3-copy sets — no loose carbon",
      "GST-format layouts with your details set free",
      "Serial numbering & tear-off perforation",
      "50 or 100 sets per book, hard bound",
      "Cash memos, challans, receipts & estimate pads",
      "From ₹250/book at 10+ books · 3–4 day delivery",
    ],
    products: ["bill-books", "letterheads", "stickers"],
    keywords: [
      "bill book printing patna",
      "gst bill book printing near me",
      "carbonless bill book patna",
      "challan book printing bihar",
      "cash memo printing patna",
    ],
    faq: [
      {
        q: "What does a duplicate bill book cost?",
        a: "50×2 set carbonless (NCR) books start around ₹250–₹350 per book for 10+ books, including numbering and your GST-format layout; ordinary-paper books with carbon cost less. Triplicate and 100-set books cost proportionally more.",
      },
      {
        q: "Can you continue my existing serial numbers?",
        a: "Yes — tell us the last bill number of your current books and we start the new series from the next number, so your accounts stay continuous.",
      },
      {
        q: "Is the GST format correct for filing?",
        a: "We set the standard tax-invoice format — GSTIN, HSN column, CGST/SGST split — used by thousands of Bihar traders. Your CA can approve the proof before we print.",
      },
    ],
    cardImage: "/images/products/bill-books.jpg",
  },
] as const;

export function serviceBySlug(slug: string): ServiceHub | undefined {
  return serviceHubs.find((s) => s.slug === slug);
}

export const featuredServices = serviceHubs.filter((s) => s.featured);
