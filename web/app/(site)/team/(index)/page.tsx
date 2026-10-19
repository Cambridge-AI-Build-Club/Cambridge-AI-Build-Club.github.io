import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { Arrow, JoinSection, MemberCards, PageIntro, Recruitment, Welcome } from '@/components/SiteSections'
import { loadPage, loadUi, markdownifyStrip } from '@/lib/content'
import { loadSiteData } from '@/lib/site'

export default function TeamPage() {
  const page = loadPage('team.md')
  const ui = loadUi()
  return <>
    <PageMeta title="Community | Cambridge AI Builder Club" description={page.description} path="/team/" />
    <Shell path="/team/">
      <PageIntro title={ui.sections.good_community} description={markdownifyStrip(page.body).trim()}>
        <a className="lab-button" href={loadSiteData().discord} target="_blank" rel="noopener noreferrer">{ui.shared.join_discord} <Arrow /></a>
      </PageIntro>
      <Welcome />
      <section className="lab-section" aria-labelledby="members-heading">
        <div className="lab-section-head">
          <div><h2 id="members-heading">{ui.shared.meet_team_leads}<span className="accent">.</span></h2></div>
        </div>
        <MemberCards />
      </section>
      <Recruitment />
      <JoinSection />
    </Shell>
  </>
}
