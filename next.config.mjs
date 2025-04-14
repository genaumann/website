import createVercelToolbarPlugin from '@vercel/toolbar/plugins/next'
import createNextIntlPlugin from 'next-intl/plugin'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json']
  },
  outputFileTracingIncludes: {
    '/*': ['./articles/**/*']
  },
  transpilePackages: ['next-mdx-remote'],
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**'
      }
    ]
  }
}

const withMDX = createMDX({})

const withVercelToolbar = createVercelToolbarPlugin()
const withNextIntl = createNextIntlPlugin('./locales/index.ts')

export default withVercelToolbar(withNextIntl(withMDX(nextConfig)))
