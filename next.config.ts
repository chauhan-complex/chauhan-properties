import type { NextConfig } from "next";

/**
 * Set EXPORT_STATIC=1 to produce a fully static site in `out/` for GitHub Pages
 * (that is what .github/workflows/deploy.yml does). Without it the project builds
 * as a normal Next.js server app, which is handy for local previewing.
 */
const isStaticExport = process.env.EXPORT_STATIC === "1";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  // Pages resolves /properties/slug/ to /properties/slug/index.html
  trailingSlash: isStaticExport ? true : undefined,
  // Only needed when serving from https://user.github.io/repo instead of a custom domain
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: {
    // Image optimisation needs a server; static hosting does not have one.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
