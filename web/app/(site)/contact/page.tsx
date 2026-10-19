import { ArticlePage } from '@/components/ArticlePage'
import { loadContact, loadPage, loadUi, url } from '@/lib/content'
import { Arrow } from '@/components/SiteSections'

export default function ContactPage() {
  const page = loadPage('contact.md')
  const ui = loadUi()
  return (
    <ArticlePage title={ui.sections.start_conversation} description={page.description} path="/contact/" body={page.body}>
      <div className="site-contact-actions">
        <a className="lab-button" href={`mailto:${loadContact().email}`}>{ui.shared.email_club} <Arrow /></a>
        <a className="lab-text-link" href={url('/committees/')}>{ui.shared.committee_applications} <Arrow /></a>
      </div>
    </ArticlePage>
  )
}
