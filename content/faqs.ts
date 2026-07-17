// Site-wide FAQs shown on the homepage (also emitted as FAQPage JSON-LD).
// Per-service FAQs live inside content/services.ts.

export interface Faq {
  q: string;
  a: string;
}

export const homeFaqs: Faq[] = [
  {
    q: "What file formats do you accept for printing?",
    a: "PDF, CorelDRAW (CDR), AI, PSD or high-resolution JPG/PNG (300 DPI). Just send it on WhatsApp — we check that it's print-ready and tell you if anything needs fixing before the job goes on the machine.",
  },
  {
    q: "I don't have a design. Can you make one?",
    a: "Yes. Basic design and typesetting are free with most orders — send your matter, logo and any reference you like. Detailed creative design carries a small one-time charge. Either way, you approve a proof before we print.",
  },
  {
    q: "Will I see a proof before printing?",
    a: "Always. We send a digital proof (PDF or photo) on WhatsApp for every job — the machine starts only after your approval. For wedding cards we proof every name, date and venue line by line.",
  },
  {
    q: "How fast can you print?",
    a: "Visiting cards, flex banners, posters and t-shirts: same day to 24 hours. Offset stationery like letterheads and bill books: 2–4 days. Wedding cards and bags: 4–10 days depending on finishing. Urgent deadline? Call us — we'll tell you honestly what's possible.",
  },
  {
    q: "What is the minimum order quantity?",
    a: "Digital printing starts from a single piece (t-shirts, posters) or 100 pieces (cards). Offset items get their best rates at 500–1000+ quantity. Every product listing shows its MOQ.",
  },
  {
    q: "Do you deliver outside Patna?",
    a: "Doorstep delivery across Patna, and courier delivery across Bihar — Gaya, Muzaffarpur, Bhagalpur, Darbhanga, Purnia and beyond — as well as anywhere in India.",
  },
  {
    q: "Do you provide GST invoices?",
    a: "Yes, a proper GST invoice with every order — important for companies, hospitals, schools and institutional buyers who need complete documentation.",
  },
  {
    q: "Offset or digital — which is right for my order?",
    a: "Digital suits small quantities and urgent jobs; per-piece cost is a little higher. Offset becomes much cheaper at 500–1000+ quantity with richer, consistent colour. Tell us your quantity and deadline — we'll suggest the right press honestly.",
  },
  {
    q: "Do you give bulk or repeat-order discounts?",
    a: "Yes. Rates fall steeply with quantity, and repeat customers get preferential pricing. Clinics, coaching institutes and businesses can set up annual contracts for their regular stationery.",
  },
  {
    q: "What if there is a printing mistake?",
    a: "If the print doesn't match the proof you approved, or has a quality defect, we reprint it free — no arguments. That's why we insist on proof approval before every job.",
  },
];
