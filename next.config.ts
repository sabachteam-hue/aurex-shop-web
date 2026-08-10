import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Product images come from whatever host NEXT_PUBLIC_API_BASE_URL points
    // at (staging today, production later), so a static remotePatterns
    // allowlist would break on every backend move. Unoptimized still gets
    // lazy-loading/layout-stability from next/image without the domain
    // allowlist — revisit if/once the backend host is fixed.
    unoptimized: true,
  },
};

export default nextConfig;
