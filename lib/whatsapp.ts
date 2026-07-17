import { business } from "@/content/business";
import { productById, type ProductId } from "@/content/products";

/** Build a WhatsApp deep link (wa.me) with an optional pre-filled message. */
export function waLink(message?: string): string {
  const base = `https://wa.me/${business.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** tel: link for the business phone. */
export const telLink = `tel:${business.phone}`;

export interface EnquiryDetails {
  name?: string;
  phone?: string;
  product?: string;
  qty?: string;
  message?: string;
}

/** Assemble a clean, readable WhatsApp message from the enquiry form / CTA. */
export function enquiryMessage(d: EnquiryDetails = {}): string {
  const lines = [
    `🖨️ *Print Enquiry — ${business.name}*`,
    "",
    d.name && `👤 Name: ${d.name}`,
    d.phone && `📞 Phone: ${d.phone}`,
    d.product && `📄 Need: ${d.product}`,
    d.qty && `🔢 Quantity: ${d.qty}`,
    d.message && `📝 Note: ${d.message}`,
    "",
    "Please share the rate and a design proof.",
  ].filter(Boolean);
  return lines.join("\n");
}

/** Quick CTA message for a specific context (service page, product, etc.). */
export function quickEnquiry(context?: string): string {
  return context
    ? `Hi ${business.shortName}, I need: ${context}. Please share the rate and turnaround.`
    : `Hi ${business.shortName}, I need something printed. Please share rates and turnaround.`;
}

/** Product-specific rate enquiry that pre-fills the known rate card. */
export function rateEnquiry(id: ProductId): string {
  const p = productById(id);
  const lines = [
    `🖨️ *Rate enquiry — ${p.name}*`,
    "",
    `• Listed: ${p.price.amount} ${p.price.unit}${p.price.note ? ` (${p.price.note})` : ""}`,
    `• Min qty: ${p.moq}`,
    "",
    "Please confirm the *final rate* for my quantity and share a design proof.",
  ];
  return lines.join("\n");
}
