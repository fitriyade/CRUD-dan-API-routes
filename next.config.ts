import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  /* config options here */
  output: "standalone",
  reactCompiler: true,
};

export default nextConfig;
