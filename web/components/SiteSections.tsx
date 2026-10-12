import type { ReactNode } from 'react'
import { loadHomeCopy, loadRecruitment, loadSiteData, loadVisibleMembers } from '@/lib/site'
import { loadUi, url } from '@/lib/content'

import { Arrow } from '@/components/Icon'

export { Arrow } from '@/components/Icon'

export function PageIntro({ title, description, children }: { title: string; description?: string; children?: ReactNode }) {
  return <section className="lab-page-intro"><h1>{title}</h1>{description && <p className="lab-intro">{description}</p>}{children}</section>
}

export function Welcome() {
  const data = loadSiteData()
  const copy = loadHomeCopy()
  const ui = loadUi()
  return <section className="lab-welcome" aria-labelledby="welcome-heading">
    <img className="lab-welcome-symbol" src={data.logo.mobile} alt="" width={80} height={80} loading="lazy" />
    <div><h2 id="welcome-heading">{copy.welcome_title}</h2><p>{copy.welcome_copy}</p></div>
    <a className="lab-text-link" href={data.links.about}>{ui.shared.meet_club} <Arrow /></a>
  </section>
}

export function JoinSection() {
  const data = loadSiteData()
  const copy = loadHomeCopy()
  const ui = loadUi()
  return <section className="lab-join" aria-labelledby="join-heading">
    <h2 id="join-heading">{copy.join_title}</h2><p>{copy.join_copy}</p>
    <a className="lab-button" href={data.signup} target="_blank" rel="noopener noreferrer">{ui.shared.join_club} <Arrow /></a>
    <a className="lab-text-link" href={data.discord} target="_blank" rel="noopener noreferrer">{ui.shared.say_hello_discord} <Arrow /></a>
    <span className="lab-join-art" aria-hidden="true" />
  </section>
}

export function Recruitment({ direct = false }: { direct?: boolean }) {
  const data = loadRecruitment()
  const ui = loadUi()
  return <section className="lab-archive site-recruitment" aria-labelledby="recruitment-heading">
    <div><h2 id="recruitment-heading">{data.title}</h2><p>{data.summary}</p>
      <div className="site-chips"><span>{data.seats} open seats</span>{data.tracks.map((track) => <span key={track}>{track}</span>)}</div>
    </div>
    <a className="lab-button" href={direct ? data.application : url('/committees/')} {...(direct ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{direct ? ui.shared.apply_committee : ui.shared.explore_committee_roles}<Arrow /></a>
  </section>
}

export function MemberCards() {
  const members = loadVisibleMembers()
  return <div className="lab-members">{members.map((member) => <a className={`lab-member${member.promoted ? '' : ' site-member-small'}`} href={member.href} key={member.href}>
    {member.image && <img src={member.image} alt={member.name} width={440} height={440} loading="lazy" />}
    <div><h3>{member.name}<Arrow /></h3><p>{member.role}</p></div>
  </a>)}</div>
}

export function CalendarSection() {
  const ui = loadUi()
  return <section className="lab-archive"><div><h2>{ui.sections.make_time_to_build}</h2><p>{ui.sections.make_time_body}</p></div><a className="lab-button lab-button-outline" href={url('/calendar/')}>{ui.shared.open_calendar} <Arrow /></a></section>
}
