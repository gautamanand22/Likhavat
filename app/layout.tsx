import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, IBM_Plex_Mono, Mukta } from "next/font/google";
import "./globals.css";
import { business } from "@/content/business";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/lib/seo";
import { MotionProvider } from "@/components/ui/Motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { EnquiryPopup } from "@/components/layout/EnquiryPopup";
import { SmoothScroll } from "@/components/SmoothScroll";

// Variable font — full weight range plus the optical-size axis (Fraunces
// renders with more "ink" character at display sizes).
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["500", "600"],
});

const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  variable: "--font-mukta",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default:
      "Printing Press in Patna | Visiting Cards, Wedding Cards, Flex & More | Likhavat Printing Press, Boring Road",
    template: "%s | Likhavat Printing Press",
  },
  description: business.shortDesc,
  applicationName: business.name,
  keywords: [
    "printing press in patna",
    "printing press boring road patna",
    "visiting card printing patna",
    "wedding card printing patna",
    "flex printing patna",
    "pamphlet printing patna",
    "letterhead printing patna",
    "prescription pad printing patna",
    "bill book printing patna",
    "t-shirt printing patna",
    "paper bag printing patna",
    "offset printing patna",
    "digital printing patna",
  ],
  authors: [{ name: business.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: business.siteUrl,
    siteName: business.name,
    title: "Printing Press in Patna | Visiting Cards, Wedding Cards, Flex & More",
    description: business.shortDesc,
  },
  twitter: {
    card: "summary_large_image",
    title: "Likhavat Printing Press | Boring Road, Patna",
    description: business.shortDesc,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#17131f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} ${mukta.variable}`}
    >
      <body>
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
        <LanguageProvider>
          <MotionProvider>
            <SmoothScroll>
              <Header />
              <main>{children}</main>
              <Footer />
            </SmoothScroll>
            <FloatingWhatsApp />
            <EnquiryPopup />
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
