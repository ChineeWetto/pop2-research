/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@radix-ui/react-icons',
      'lucide-react',
      'framer-motion',
      'recharts',
    ],
  },
  // Disable standalone output mode on Windows to avoid symlink issues
  output: process.platform === 'win32' ? undefined : 'standalone',
  // Improve production performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if your project has type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if your project has ESLint errors
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }
    return config
  },
}

module.exports = nextConfig 