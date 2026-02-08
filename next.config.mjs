/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/AI-Doctor-Assistance-82' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/AI-Doctor-Assistance-82/' : '',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './lib/image-loader.js',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
