import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // These parsers rely on Node runtime behavior that should not be rewritten into a route bundle.
  serverExternalPackages: ["mammoth", "pdf-parse", "@napi-rs/canvas"],
};

export default nextConfig;
