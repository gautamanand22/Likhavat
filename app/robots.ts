import type { MetadataRoute } from "next";
import { business } from "@/content/business";

export const dynamic = "force-static";

/**
 * Everything is crawlable. AI/answer-engine crawlers are allowed explicitly —
 * being quotable by ChatGPT/Claude/Perplexity/Gemini is a distribution channel
 * for a local business, and several of these bots honour their own UA rules
 * only. A machine-readable business summary lives at /llms.txt.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
  "cohere-ai",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${business.siteUrl}/sitemap.xml`,
    host: business.siteUrl,
  };
}
