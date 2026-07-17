import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { PrintShowcase } from "@/components/sections/PrintShowcase";
import { Spotlight } from "@/components/sections/Spotlight";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RateCard } from "@/components/sections/RateCard";
import { WhyUs } from "@/components/sections/WhyUs";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqSchema } from "@/lib/seo";
import { homeFaqs } from "@/content/faqs";

export default function Home() {
  return (
    <>
      {/* Preload the LCP hero image (responsive) so it starts downloading immediately */}
      <link
        rel="preload"
        as="image"
        href="/images/products/press-hero.jpg"
        imageSrcSet="/images/products/press-hero-sm.jpg 640w, /images/products/press-hero.jpg 1400w"
        imageSizes="100vw"
        fetchPriority="high"
      />
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero />
      <TrustBar />
      <Services />
      <PrintShowcase />
      <Spotlight />
      <HowItWorks />
      <RateCard />
      <WhyUs />
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
