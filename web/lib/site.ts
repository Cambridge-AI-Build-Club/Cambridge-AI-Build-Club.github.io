import {
  firstParagraph, loadCollection, loadConfig, loadContact, loadDiscord,
  loadFeatures, loadMenus, loadPage, loadSeo, loadSignup, markdownifyStrip,
  loadUi, requireString, requireStringList, url,
} from '@/lib/content'

// Shared with SiteFrame; keep the shape defined once here.
export interface SiteData {
  title: string
  copyright: string
  logo: { desktop: string; mobile: string }
  signup: string
  discord: string
  email: string
  navigation: { name: string; href: string }[]
  footerMenu: { name: string; href: string }[]
  links: { home: string; about: string; contact: string; committees: string; calendar: string }
}

export function loadHomeCopy() {
  const page = loadPage('index.md')
  const source = 'pages/index.md'
  return {
    headline: requireStringList(page.headline, 'headline', source),
    intro: markdownifyStrip(page.body).trim(),
    welcome_title: requireString(page.welcome_title, 'welcome_title', source),
    welcome_copy: requireString(page.welcome_copy, 'welcome_copy', source),
    join_title: requireString(page.join_title, 'join_title', source),
    join_copy: requireString(page.join_copy, 'join_copy', source),
  }
}

export function loadSiteData(): SiteData {
  const config = loadConfig()
  const menus = loadMenus()
  const toLink = (item: { name: string; url: string }) => ({ name: item.name, href: url(item.url) })
  const byWeight = (a: { weight: number }, b: { weight: number }) => a.weight - b.weight
  return {
    title: config.title,
    copyright: loadSeo().copyright_text ?? `© 2026 ${config.title}`,
    logo: { desktop: url(config.logo.desktop), mobile: url(config.logo.mobile) },
    signup: loadSignup().form,
    discord: loadDiscord().discord,
    email: loadContact().email ?? '',
    navigation: menus.main.filter((item) => item.header !== false).sort(byWeight).map(toLink),
    footerMenu: [...menus.footer].sort(byWeight).map(toLink),
    links: {
      home: url('/'), about: url('/about/'), contact: url('/contact/'),
      committees: url('/committees/'), calendar: url('/calendar/'),
    },
  }
}

export interface Activity {
  title: string
  description: string
  href: string
  image?: string
  // Card link label ("Discover demos"), taken from the paired plural feature
  // title so components never pluralize at runtime.
  linkLabel: string
}

export function loadActivities(): Activity[] {
  const ui = loadUi()
  const byNormalizedTitle = new Map(
    loadFeatures().map((item) => [item.title.toLowerCase().replace(/s$/, ''), item]),
  )
  return loadCollection('events', 'weight').map((entry) => {
    const title = requireString(entry.title, 'title', `events/${entry.slug}.md`)
    const feature = byNormalizedTitle.get(title.toLowerCase().replace(/s$/, ''))
    return {
      title,
      description: markdownifyStrip(firstParagraph(entry.body)).trim(),
      href: url(`/events/${entry.slug}/`),
      image: feature?.image ? url(feature.image.url) : undefined,
      linkLabel: feature ? ui.activities.discover.replace('{title}', feature.title.toLowerCase()) : title,
    }
  })
}

export function loadVisibleMembers() {
  return loadCollection('team', 'weight').filter((entry) => entry.promoted !== false).map((entry) => ({
    name: requireString(entry.title, 'title', `team/${entry.slug}.md`),
    role: typeof entry.jobtitle === 'string' ? entry.jobtitle : '',
    image: typeof entry.image === 'string' ? url(entry.image) : undefined,
    href: url(`/team/${entry.slug}/`), promoted: entry.promoted === true,
  }))
}

export function loadRecruitment() {
  const page = loadPage('committees.md')
  const source = 'pages/committees.md'
  const seats = Number(page.seats)
  if (!Number.isFinite(seats)) throw new Error(`content/${source}: "seats" must be a number`)
  return {
    title: requireString(page.recruitment_title, 'recruitment_title', source),
    summary: requireString(page.recruitment_summary, 'recruitment_summary', source),
    application: requireString(page.application_url, 'application_url', source),
    seats,
    tracks: requireStringList(page.tracks, 'tracks', source),
  }
}

export function formatPublicationDate(value: unknown) {
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

// Short plain-text summary of a collection entry, for meta descriptions.
export function entrySummary(entry: { slug: string; body: string; title?: unknown }, dir: string): string {
  const text = markdownifyStrip(firstParagraph(entry.body)).trim()
  return text || requireString(entry.title, 'title', `${dir}/${entry.slug}.md`)
}
