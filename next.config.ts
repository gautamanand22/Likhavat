import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export → `next build` emits a self-contained `out/` folder of static
  // HTML/CSS/JS/images that any static host (Nginx, Cloudflare Pages) serves
  // directly — no Node server needed.
  output: "export",
  // Static export can't use the on-demand Image Optimization server, so serve
  // the images as-is (they are pre-sized at build time).
  images: { unoptimized: true },
};

export default nextConfig;
