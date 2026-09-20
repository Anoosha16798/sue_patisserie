import type { NextConfig } from "next";

const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStatic
    ? {
        output: "export" as const,
        typescript: { ignoreBuildErrors: true },
      }
    : {}),
  images: {
    unoptimized: isStatic,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
