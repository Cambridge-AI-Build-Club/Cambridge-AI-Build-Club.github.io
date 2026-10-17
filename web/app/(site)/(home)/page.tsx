import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { ActivityGrid } from '@/components/ActivityGrid'
import { ClaudeCollaboration } from '@/components/ClaudeCollaboration'
import { Arrow, JoinSection, JournalCard, Recruitment, Welcome } from '@/components/SiteSections'
import { absoluteUrl, loadCollection, loadPage, loadUi, requireString, url } from '@/lib/content'
import { loadActivities, loadHomeCopy, loadSiteData } from '@/lib/site'

export default function HomePage() {
  const page = loadPage('index.md')
  const copy = loadHomeCopy()
  const site = loadSiteData()
  const blogs = loadCollection('blogs', 'weight').slice(0, 3)
  const ui = loadUi()
  const hero = url(requireString(page.intro_image, 'intro_image', 'pages/index.md'))
  return <>
    <PageMeta title={site.title} description={page.description} path="/" image={absoluteUrl(hero)} />
    <Shell path="/">
      <section className="lab-hero">
        <div className="lab-hero-copy">
          <h1>{copy.headline.join(' ')}</h1>
          <p className="lab-intro">{copy.intro}</p>
          <div className="lab-hero-actions">
            <a className="lab-button" href={site.signup} target="_blank" rel="noopener noreferrer">{ui.shared.join_club} <Arrow /></a>
            <a className="lab-text-link" href={url('/events/')}>{ui.shared.see_what_we_do} <Arrow /></a>
          </div>
        </div>
        <div className="lab-hero-visual">
          <img src={hero} alt="" width={1080} height={1080} fetchPriority="high" />
          <ClaudeCollaboration logo={url('/images/brand/claude-official.svg')} label={ui.shared.collaboration} />
        </div>
      </section>
      <section className="lab-section" aria-labelledby="activities-heading">
        <div className="lab-section-head">
          <div><h2 id="activities-heading">{ui.sections.find_starting_point}<span className="accent">.</span></h2></div>
          <a className="lab-text-link" href={url('/events/')}>{ui.shared.explore_club} <Arrow /></a>
        </div>
        <ActivityGrid activities={loadActivities()} ui={ui} />
      </section>
      <Welcome />
      <Recruitment />
      {blogs.length > 0 && (
        <section className="lab-section site-journal-section" aria-labelledby="journal-heading">
          <div className="lab-section-head">
            <div><h2 id="journal-heading">{ui.sections.ideas_worth_sharing}<span className="accent">.</span></h2></div>
            <a className="lab-text-link" href={url('/blogs/')}>{ui.shared.read_journal} <Arrow /></a>
          </div>
          <div className="site-journal-grid">
            {blogs.map((blog) => <JournalCard entry={blog} ui={ui} heading="h3" stripPrefix key={blog.slug} />)}
          </div>
        </section>
      )}
      <JoinSection />
    </Shell>
  </>
}
