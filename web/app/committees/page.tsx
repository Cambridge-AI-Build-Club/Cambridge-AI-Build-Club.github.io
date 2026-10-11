import { PageMeta } from '@/components/PageMeta'
import { Icon } from '@/components/Icon'
import { Shell } from '@/components/Shell'
import { Arrow, JoinSection, PageIntro } from '@/components/SiteSections'
import { Markdown } from '@/lib/markdown'
import { loadPage, loadUi } from '@/lib/content'
import { loadRecruitment } from '@/lib/site'

export default function CommitteesPage() {
  const page = loadPage('committees.md')
  const recruitment = loadRecruitment()
  const ui = loadUi()
  return <><PageMeta title="Join the committee | Cambridge AI Builder Club" description={page.description} path="/committees/" /><Shell path="/committees/">
    <PageIntro title={ui.sections.build_community_too} description={recruitment.summary}><div className="site-chips"><span>{recruitment.seats} open seats</span>{recruitment.tracks.map((track) => <a key={track} href={`#${track.toLowerCase()}-track`}>{track} track <Icon name="arrow-down" hoverName="chevron-down" /></a>)}</div><a className="lab-button" href={recruitment.application} target="_blank" rel="noopener noreferrer">{ui.shared.apply_committee} <Arrow /></a></PageIntro>
    <div className="site-article-wrap site-recruitment-body"><article className="site-prose"><Markdown>{page.body}</Markdown></article><aside className="site-application-note"><h2>{ui.sections.bring_your_ideas}</h2><p>{ui.sections.committee_note}</p><a className="lab-button" href={recruitment.application} target="_blank" rel="noopener noreferrer">{ui.shared.apply_now} <Arrow /></a><p>{ui.sections.rolling_applications}</p></aside></div><JoinSection />
  </Shell></>
}
