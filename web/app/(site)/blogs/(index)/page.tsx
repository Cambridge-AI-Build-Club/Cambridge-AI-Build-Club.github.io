import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { JoinSection, JournalCard, PageIntro } from '@/components/SiteSections'
import { loadCollection, loadPage, loadUi, markdownifyStrip } from '@/lib/content'

export default function BlogsPage() {
  const page = loadPage('blogs.md')
  const blogs = loadCollection('blogs', 'weight')
  const ui = loadUi()
  return <>
    <PageMeta title="Journal | Cambridge AI Builder Club" description={page.description} path="/blogs/" />
    <Shell path="/blogs/">
      <PageIntro title={`${ui.sections.ideas_worth_sharing}.`} description={markdownifyStrip(page.body).trim()} />
      <section className="lab-section" aria-label="Club stories">
        <div className="site-journal-grid">
          {blogs.map((blog) => <JournalCard entry={blog} ui={ui} heading="h2" key={blog.slug} />)}
        </div>
      </section>
      <JoinSection />
    </Shell>
  </>
}
