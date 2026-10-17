import { PageMeta } from '@/components/PageMeta'
import { ProjectPreview } from '@/components/ProjectPreview'
import { Shell } from '@/components/Shell'
import { JoinSection, PageIntro } from '@/components/SiteSections'
import { loadPage, loadProjects, markdownifyStrip } from '@/lib/content'

export default function ProjectsPage() {
  const page = loadPage('projects.md')
  const headline = typeof page.headline === 'string' ? page.headline : String(page.title ?? 'Projects')
  return <>
    <PageMeta title={`${page.title} | Cambridge AI Builder Club`} description={page.description} path="/projects/" />
    <Shell path="/projects/">
      <PageIntro title={headline} description={markdownifyStrip(page.body).trim()} />
      <div className="site-projects">
        {loadProjects().map((project) => <ProjectPreview project={project} key={project.slug} />)}
      </div>
      <JoinSection />
    </Shell>
  </>
}
