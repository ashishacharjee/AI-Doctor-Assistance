/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/AI-Doctor-Assistance-82' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/AI-Doctor-Assistance-82/' : '',
}

export default nextConfig
