/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  sassOptions: {
    prependData: `@import "@/styles/_variable.scss";`,
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
