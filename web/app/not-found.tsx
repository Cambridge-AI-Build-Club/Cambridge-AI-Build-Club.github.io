import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { Arrow, PageIntro } from '@/components/SiteSections'
import { loadUi } from '@/lib/content'
import { loadSiteData } from '@/lib/site'

// The common root layout supplies the document and production styles.
export default function NotFound() {
  const ui = loadUi()
  return (
    <>
      <PageMeta title={`${ui.not_found.title} | Cambridge AI Builder Club`} description={ui.not_found.body} path="/404/" />
      <Shell path="/">
        <PageIntro title={ui.not_found.title} description={ui.not_found.body}>
          <a className="lab-button" href={loadSiteData().links.home}>{ui.not_found.back_home} <Arrow /></a>
        </PageIntro>
      </Shell>
    </>
  )
}
