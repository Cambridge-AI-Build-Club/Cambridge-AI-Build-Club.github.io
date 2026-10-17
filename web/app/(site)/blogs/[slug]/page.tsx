import { ArticlePage } from '@/components/ArticlePage'
import { loadCollection, loadUi, requireString } from '@/lib/content'
import { entrySummary, formatPublicationDate } from '@/lib/site'

export function generateStaticParams() {
  return loadCollection('blogs').map((entry) => ({ slug: entry.slug }))
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = loadCollection('blogs').find((item) => item.slug === slug)
  if (!entry) throw new Error(`Story not found: ${slug}`)
  const heading = entry.body.match(/^\s*# ([^\n]+)\n/)
  const title = heading ? heading[1].trim() : requireString(entry.title, 'title', `blogs/${slug}.md`)
  const body = heading ? entry.body.slice(heading[0].length) : entry.body
  return (
    <ArticlePage
      title={title}
      description={entrySummary({ slug, body }, 'blogs')}
      path={`/blogs/${slug}/`}
      publicationDate={formatPublicationDate(entry.date)}
      body={body}
      back={{ label: loadUi().shared.all_stories, href: '/blogs/' }}
    />
  )
}
