// The org site (repository Cambridge-AI-Build-Club.github.io) serves at the root
// domain, so the base path is empty. CI passes NEXT_PUBLIC_BASE_PATH from
// actions/configure-pages, which reports a /repo-name prefix for project pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
}

export default nextConfig
