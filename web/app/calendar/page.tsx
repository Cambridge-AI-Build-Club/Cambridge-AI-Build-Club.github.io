import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { CalendarApp } from '@/components/CalendarApp'
import { JoinSection, PageIntro } from '@/components/SiteSections'
import { loadCalendar } from '@/lib/calendar'
import { loadPage, loadUi } from '@/lib/content'

export default function CalendarPage() {
  const page = loadPage('calendar.md')
  const ui = loadUi()
  return <><PageMeta title={`${page.title} | Cambridge AI Builder Club`} description={String(page.description)} path="/calendar/" /><Shell path="/calendar/">
    <PageIntro title={ui.sections.club_calendar} description={String(page.description)} />
    <section className="lab-section site-calendar-section" aria-label="Club calendar"><CalendarApp events={loadCalendar()} ui={ui} /></section><JoinSection />
  </Shell></>
}
