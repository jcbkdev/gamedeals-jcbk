import type { NextConfig } from "next";

const REPO_NAME = "gamedeals-jcbk";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${REPO_NAME}`,
  assetPrefix: `/${REPO_NAME}/`,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
