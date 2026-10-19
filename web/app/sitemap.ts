import type { MetadataRoute } from 'next'
import { absoluteUrl, loadCollection } from '@/lib/content'

export const dynamic = 'force-static'

const staticPages = ['/', '/about/', '/projects/', '/contact/', '/events/', '/blogs/', '/team/', '/committees/', '/calendar/']

export default function sitemap(): MetadataRoute.Sitemap {
  // Member pages with promoted: false keep their URLs but are not listed on
  // Community, so they stay out of the sitemap until they become reachable.
  const collectionPages = [
    ...loadCollection('events').map((e) => `/events/${e.slug}/`),
    ...loadCollection('blogs').map((b) => `/blogs/${b.slug}/`),
    ...loadCollection('team').filter((m) => m.promoted !== false).map((m) => `/team/${m.slug}/`),
  ]
  return [...staticPages, ...collectionPages].map((path) => ({
    url: absoluteUrl(path),
  }))
}
