import { ArticlePage } from '@/components/ArticlePage'
import { ProjectPreview } from '@/components/ProjectPreview'
import { loadPage, loadProjects, loadUi } from '@/lib/content'

export default function AboutPage() {
  const page = loadPage('about.md')
  const project = loadProjects().find((entry) => entry.slug === 'cbc-world')
  const heading = typeof page.project_heading === 'string' ? page.project_heading : undefined
  return (
    <ArticlePage title={loadUi().sections.curious_minds} description={page.description} path="/about/" body={page.body}>
      {project && <ProjectPreview project={project} compact heading={heading} />}
    </ArticlePage>
  )
}
