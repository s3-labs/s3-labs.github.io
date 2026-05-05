import { createRequire } from 'module'

/** @type {import('next').NextConfig} */
const require = createRequire(import.meta.url)
const encodingPath = (() => {
  try {
    return require.resolve('encoding')
  } catch (err) {
    return undefined
  }
})()

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
  },
  webpack: (config) => {
    if (encodingPath) {
      config.resolve = config.resolve || {}
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        encoding: encodingPath,
      }
    }
    return config
  },
}

export default nextConfig
