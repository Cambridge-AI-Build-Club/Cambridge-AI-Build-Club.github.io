import { PageMeta } from '@/components/PageMeta'
import { Shell } from '@/components/Shell'
import { Arrow, PageIntro } from '@/components/SiteSections'
import { SiteDocument } from '@/components/SiteDocument'
import { loadUi } from '@/lib/content'
import { loadSiteData } from '@/lib/site'

// With multiple root layouts the global 404 renders its own <html>/<body>.
// Branded fallback so a dead link never lands on the framework default page.
export default function NotFound() {
  const ui = loadUi()
  return (
    <SiteDocument>
      <PageMeta title={`${ui.not_found.title} | Cambridge AI Builder Club`} description={ui.not_found.body} path="/404/" />
      <Shell path="/">
        <PageIntro title={ui.not_found.title} description={ui.not_found.body}>
          <a className="lab-button" href={loadSiteData().links.home}>{ui.not_found.back_home} <Arrow /></a>
        </PageIntro>
      </Shell>
    </SiteDocument>
  )
}
