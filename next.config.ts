import type NextConfig from "next";

const REPO_NAME = "gamedeals-jcbk";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  assetPrefix: "",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
