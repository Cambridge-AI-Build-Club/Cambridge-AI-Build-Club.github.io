import { PageMeta } from '@/components/PageMeta'
import { Icon } from '@/components/Icon'
import { Shell } from '@/components/Shell'
import { Arrow, JoinSection, PageIntro, Recruitment } from '@/components/SiteSections'
import { Markdown } from '@/lib/markdown'
import { loadCollection, loadUi, url } from '@/lib/content'

export function generateStaticParams() { return loadCollection('team').map((entry) => ({ slug: entry.slug })) }

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const entry = loadCollection('team').find((item) => item.slug === slug)
  if (!entry) throw new Error(`Member not found: ${slug}`)
  const title = String(entry.title)
  const ui = loadUi()
  return <><PageMeta title={`${title} | Cambridge AI Builder Club`} path={`/team/${slug}/`} /><Shell path={`/team/${slug}/`}>
    <PageIntro title={title} description={String(entry.jobtitle ?? '')} />
    <div className="site-article-wrap"><a className="site-back" href={url('/team/')}><Icon name="arrow-left" hoverName="chevron-left" />{ui.shared.community}</a><div className="site-profile">{entry.image ? <img src={url(String(entry.image))} alt={title} width={440} height={440} /> : null}<article className="site-prose"><Markdown>{entry.body}</Markdown>{entry.linkedinurl ? <a className="lab-text-link" href={String(entry.linkedinurl)} target="_blank" rel="noopener noreferrer">{ui.shared.linkedin} <Arrow /></a> : null}</article></div></div>
    {entry.promoted !== false && <Recruitment />}<JoinSection />
  </Shell></>
}
