import type { NextConfig } from "next";

/**
 * iGEM wikis are served from a team subpath (e.g. https://2025.igem.wiki/aura/).
 * Set NEXT_PUBLIC_BASE_PATH="/aura" at build time so all asset + route URLs resolve
 * correctly once deployed. Locally it defaults to "" so `next dev` works at /.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: {
    // Required for static export – iGEM has no image optimization server.
    unoptimized: true,
  },
};

export default nextConfig;
