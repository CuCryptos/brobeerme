import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "brobeerme.local",
      },
      {
        protocol: "https",
        hostname: "brobeerme.com",
      },
      {
        protocol: "https",
        hostname: "www.brobeerme.com",
      },
    ],
  },
};

export default nextConfig;
