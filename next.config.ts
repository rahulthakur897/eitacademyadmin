import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  turbopack: {
    //
  },
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
