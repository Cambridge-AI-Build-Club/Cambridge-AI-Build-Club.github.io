import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { ActivityGrid } from '@/components/ActivityGrid'
import { CalendarSection, JoinSection, PageIntro } from '@/components/SiteSections'
import { loadPage, loadUi, markdownifyStrip } from '@/lib/content'
import { loadActivities } from '@/lib/site'

export default function EventsPage() {
  const page = loadPage('events.md')
  const ui = loadUi()
  return <><PageMeta title="Explore | Cambridge AI Builder Club" description={page.description} path="/events/" /><Shell path="/events/">
    <PageIntro title={ui.sections.from_what_if} description={markdownifyStrip(page.body).trim()} />
    <section className="lab-section" aria-labelledby="activities-heading"><div className="lab-section-head"><div><h2 id="activities-heading">{ui.sections.find_starting_point}<span className="accent">.</span></h2></div></div><ActivityGrid activities={loadActivities()} ui={ui} filterable /></section>
    <CalendarSection /><JoinSection />
  </Shell></>
}
