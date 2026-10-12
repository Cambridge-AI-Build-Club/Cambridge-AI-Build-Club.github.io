import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { ActivityGrid } from '@/components/ActivityGrid'
import { ClaudeCollaboration } from '@/components/ClaudeCollaboration'
import { Arrow, JoinSection, Recruitment, Welcome } from '@/components/SiteSections'
import { firstParagraph, loadCollection, loadPage, loadUi, markdownifyStrip, url } from '@/lib/content'
import { formatPublicationDate, loadActivities, loadHomeCopy, loadSiteData } from '@/lib/site'

export default function HomePage() {
  const page = loadPage('index.md')
  const copy = loadHomeCopy()
  const site = loadSiteData()
  const blogs = loadCollection('blogs', 'weight').slice(0, 3)
  const ui = loadUi()
  return <>
    <PageMeta title={site.title} description={page.description} path="/" />
    <Shell path="/">
      <section className="lab-hero">
        <div className="lab-hero-copy">
          <h1>{copy.headline.join(' ')}</h1>
          <p className="lab-intro">{copy.intro}</p>
          <div className="lab-hero-actions"><a className="lab-button" href={site.signup} target="_blank" rel="noopener noreferrer">{ui.shared.join_club} <Arrow /></a><a className="lab-text-link" href={url('/events/')}>{ui.shared.see_what_we_do} <Arrow /></a></div>
        </div>
        <div className="lab-hero-visual">
          <img src={url(String(page.intro_image))} alt="" width={1080} height={1080} fetchPriority="high" />
          <ClaudeCollaboration logo={url('/images/brand/claude-official.svg')} label={ui.shared.collaboration} />
        </div>
      </section>
      <section className="lab-section" aria-labelledby="activities-heading"><div className="lab-section-head"><div><h2 id="activities-heading">{ui.sections.find_starting_point}<span className="accent">.</span></h2></div><a className="lab-text-link" href={url('/events/')}>{ui.shared.explore_club} <Arrow /></a></div><ActivityGrid activities={loadActivities()} ui={ui} /></section>
      <Welcome />
      <Recruitment />
      {blogs.length > 0 && <section className="lab-section site-journal-section" aria-labelledby="journal-heading"><div className="lab-section-head"><div><h2 id="journal-heading">{ui.sections.ideas_worth_sharing}<span className="accent">.</span></h2></div><a className="lab-text-link" href={url('/blogs/')}>{ui.shared.read_journal} <Arrow /></a></div><div className="site-journal-grid">{blogs.map((blog) => <a className="site-journal-card" href={url(`/blogs/${blog.slug}/`)} key={blog.slug}><p className="site-publication-date">{formatPublicationDate(blog.date)}</p><h3>{String(blog.title)} <Arrow /></h3><p>{markdownifyStrip(firstParagraph(blog.body)).replace(/^Building the Future: /, '')}</p><span className="lab-card-link">{ui.shared.read_story} <Arrow /></span></a>)}</div></section>}
      <JoinSection />
    </Shell>
  </>
}
