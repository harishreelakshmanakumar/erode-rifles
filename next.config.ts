import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ["21.0.14.71", "127.0.0.1", "localhost"],
  turbopack: {},
};

export default nextConfig;
