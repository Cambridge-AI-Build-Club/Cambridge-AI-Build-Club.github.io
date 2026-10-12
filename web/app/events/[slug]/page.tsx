import { ArticlePage } from '@/components/ArticlePage'
import { Arrow } from '@/components/SiteSections'
import { loadCollection, loadUi, url } from '@/lib/content'
import { loadActivities } from '@/lib/site'

export function generateStaticParams() { return loadCollection('events').map((entry) => ({ slug: entry.slug })) }

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = loadCollection('events').find((item) => item.slug === slug)
  if (!entry) throw new Error(`Activity not found: ${slug}`)
  const title = String(entry.title)
  const activity = loadActivities().find((item) => item.title === title)
  const ui = loadUi()
  return <ArticlePage title={title} path={`/events/${slug}/`} body={entry.body} back={{ label: ui.activities.all, href: '/events/' }}>
    {activity?.image && <div className="site-detail-art"><img src={activity.image} width={240} height={160} alt="" /></div>}
    <div className="site-note"><h2>{ui.sections.find_next_session}</h2><p>{ui.sections.find_next_body}</p><a className="lab-text-link" href={url('/calendar/')}>{ui.shared.view_calendar} <Arrow /></a></div>
  </ArticlePage>
}
