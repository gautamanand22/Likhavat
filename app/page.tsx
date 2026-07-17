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
      {/* Hero is pure CSS/type — the headline itself is the LCP, no image race */}
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
