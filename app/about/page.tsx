import type { Metadata } from "next";
import { PageHero } from "@/components/templates/PageHero";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { business } from "@/content/business";

export const metadata: Metadata = pageMeta({
  title: "About Likhavat Printing Press | Boring Road, Patna — Since 2009",
  description:
    "The story of Likhavat Printing Press — an offset, digital and large-format printing unit on Boring Road, Patna, serving doctors, shops, schools and families across Bihar since 2009.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        crumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        h1={`The press behind ${business.address.city}'s paperwork`}
        intro={`लिखावट means handwriting — the mark that makes words unmistakably yours. Since ${business.foundedYear}, that has been the promise at our ${business.address.line1} counter: whatever we print carries its owner's identity.`}
      />
      <About />
      <HowItWorks />
      <WhyUs />
      <Testimonials />
      <Contact />
    </>
  );
}
