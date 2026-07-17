import type { MetadataRoute } from "next";
import { business } from "@/content/business";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: business.shortName,
    description: business.shortDesc,
    start_url: "/",
    display: "browser",
    background_color: "#faf7f0",
    theme_color: "#17131f",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
