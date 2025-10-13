import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    transpilePackages: ['@repo/application', '@repo/core']
}

export default nextConfig
