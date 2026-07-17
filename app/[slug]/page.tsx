import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { serviceHubs, serviceBySlug } from "@/content/services";
import { ServiceLanding } from "@/components/templates/ServiceLanding";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return serviceHubs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return pageMeta({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/${slug}`,
    keywords: service.keywords,
  });
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();
  return <ServiceLanding service={service} />;
}
