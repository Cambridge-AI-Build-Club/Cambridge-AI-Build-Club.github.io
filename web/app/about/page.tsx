import { ArticlePage } from '@/components/ArticlePage'
import { ProjectPreview } from '@/components/ProjectPreview'
import { loadPage, loadProjects, loadUi } from '@/lib/content'

export default function AboutPage() {
  const page = loadPage('about.md')
  const project = loadProjects().find((entry) => entry.slug === 'cbc-world')
  return <ArticlePage title={loadUi().sections.curious_minds} description={String(page.description)} path="/about/" body={page.body}>
    {project && <ProjectPreview project={project} compact heading={String(page.project_heading)} />}
  </ArticlePage>
}
