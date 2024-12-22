import createVercelToolbarPlugin from '@vercel/toolbar/plugins/next'
import createNextIntlPlugin from 'next-intl/plugin'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
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
