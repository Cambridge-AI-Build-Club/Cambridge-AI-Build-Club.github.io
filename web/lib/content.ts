// Build-time loaders for the site content under web/content/. That directory is the
// single source of truth: site.yml, data/*, pages/ and the collection folders are
// read from disk here (server components only - this module must never be imported
// from client code).
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { parse as parseYaml } from 'yaml'
import { marked } from 'marked'

const contentRoot = path.join(process.cwd(), 'content')

// The GitHub Pages org site serves at the root domain. CI passes
// NEXT_PUBLIC_BASE_PATH from actions/configure-pages (a /repo-name prefix on a
// project-page deploy); locally the empty default matches production.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

// Origin used for canonical URLs (og:url, sitemap, robots). Override with
// NEXT_PUBLIC_SITE_ORIGIN when the site moves to its own domain.
export const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://cambridge-ai-build-club.github.io'

// Absolute canonical URL for a Jekyll-style page path (leading + trailing slash).
export function absoluteUrl(pagePath: string): string {
  return `${siteOrigin}${basePath}${pagePath}`
}

// Replicates Liquid's relative_url: prefixes the base path, keeps trailing slashes
// ("/blogs/" stays "/blogs/", "events" stays without one) and percent-encodes like
// Addressable does (e.g. spaces in SVG filenames become %20).
export function url(p: string): string {
  const stripped = p.replace(/^\/+/, '')
  if (stripped === '') return p === '/' ? `${basePath}/` : basePath || '/'
  return encodeURI(`${basePath}/${stripped}`)
}

function readContentFile(rel: string): string {
  // Normalize CRLF so excerpt splitting sees the same content regardless of
  // checkout settings.
  return fs.readFileSync(path.join(contentRoot, rel), 'utf8').replace(/\r\n/g, '\n')
}

// --- site config (site.yml) ---

export interface LogoConfig {
  mobile: string
  desktop: string
}

export interface SiteConfig {
  title: string
  logo: LogoConfig
}

export function loadConfig(): SiteConfig {
  return parseYaml(readContentFile('site.yml'))
}

// --- data files (data/*) ---

export interface MenuItem {
  name: string
  url: string
  weight: number
}

export function loadMenus(): { main: MenuItem[]; footer: MenuItem[] } {
  return parseYaml(readContentFile('data/menus.yml'))
}

export interface ProjectEntry {
  slug: string
  title: string
  description: string
  image: string
  image_alt: string
  image_width: number
  image_height: number
  live_url: string
  source_url: string
  action_label: string
  features: { title: string; description: string }[]
}

export function loadProjects(): ProjectEntry[] {
  return parseYaml(readContentFile('data/projects.yml'))
}

export function loadSignup(): { form: string } {
  return parseYaml(readContentFile('data/signup.yml'))
}

export function loadContact(): {
  email?: string
  phone?: string
  contact_button_link: string
} {
  return parseYaml(readContentFile('data/contact.yml'))
}

export function loadDiscord(): { discord: string } {
  return parseYaml(readContentFile('data/discord.yml'))
}

export interface SocialItem {
  name: string
  link: string
  image: string
}

export function loadSocial(): SocialItem[] {
  return JSON.parse(readContentFile('data/social.json'))
}

export interface FeatureItem {
  title: string
  description?: string
  image?: { url: string; width: number; height: number }
}

export function loadFeatures(): FeatureItem[] {
  return JSON.parse(readContentFile('data/features.json'))
}

export function loadSeo(): { copyright_text?: string } {
  return parseYaml(readContentFile('data/seo.yml'))
}

// --- interface copy (ui.yml) ---

// User-visible interface copy shared by production pages and the playground.
// One key per distinct string; runtime-bound fragments stay in the components.
export interface UiCopy {
  nav: { menu: string; close: string }
  shared: {
    join_club: string
    meet_club: string
    explore_club: string
    see_what_we_do: string
    join_discord: string
    say_hello_discord: string
    join_committee: string
    explore_committee_roles: string
    apply_committee: string
    apply_now: string
    open_calendar: string
    view_calendar: string
    read_journal: string
    read_story: string
    meet_team_leads: string
    email_club: string
    email_us: string
    committee_applications: string
    calendar: string
    about: string
    contact: string
    community: string
    linkedin: string
    all_stories: string
    see_our_projects: string
    view_source: string
    footer_motto: string
    collaboration: string
  }
  sections: {
    find_starting_point: string
    ideas_worth_sharing: string
    build_community_too: string
    bring_your_ideas: string
    make_time_to_build: string
    make_time_body: string
    find_next_session: string
    find_next_body: string
    start_conversation: string
    good_community: string
    club_calendar: string
    curious_minds: string
    from_what_if: string
    committee_note: string
    rolling_applications: string
  }
  calendar: {
    loading: string
    current_month: string
    cancelled: string
    status_completed: string
    status_scheduled: string
    scroll_days: string
    events_this_month: string
    scroll_more: string
    date: string
    time: string
    location: string
    empty_month: string
  }
  activities: { all: string; no_match: string }
}

export function loadUi(): UiCopy {
  return parseYaml(readContentFile('ui.yml'))
}

// --- markdown helpers (Liquid filter parity) ---

// kramdown converts straight quotes, dashes and ellipses in prose (smart_quotes is on
// by default) and marked/react-markdown do not. The subset below covers the patterns
// that appear in this content; applied to bodies at load time so excerpts (which
// truncate the HTML string and are therefore length-sensitive) and page rendering see
// the same text kramdown would produce.
export function smartQuotes(s: string): string {
  return s
    .replace(/(\w)'(?=\w)/g, '$1\u2019') // Queen's -> Queen’s
    .replace(/([ \t])---([ \t])/g, '$1\u2014$2') // word --- word -> —
    .replace(/([ \t])--([ \t])/g, '$1\u2013$2') // word -- word -> –
    .replace(/\.\.\./g, '\u2026') // ... -> …
}

// Jekyll's default excerpt separator: the first paragraph.
export function firstParagraph(body: string): string {
  return body.split('\n\n')[0] ?? ''
}

// Liquid's truncate: the ellipsis counts towards the length.
export function truncate(s: string, length: number): string {
  if (s.length <= length) return s
  return s.slice(0, length - 3) + '...'
}

// `| markdownify | strip_html` (no truncation - used where the copy is written to fit)
export function markdownifyStrip(md: string): string {
  const html = marked.parse(md, { async: false })
  return html.replace(/<[^>]*>/g, '')
}

// `| markdownify | strip_html | truncate: N`
export function markdownifyStripTruncate(md: string, length: number): string {
  return truncate(markdownifyStrip(md), length)
}

// `{{ team.excerpt | truncate: N }}`: Jekyll's excerpt renders to the *HTML* of the
// first paragraph, and the template truncates that HTML string directly - the closing
// </p> gets cut off and browsers auto-close it. Replicated verbatim.
export function excerptHtmlTruncate(body: string, length: number): string {
  const html = marked.parse(firstParagraph(body), { async: false })
  return truncate(html, length)
}

// --- pages (pages/) and collections (events/, blogs/, team/) ---

export interface Page {
  title?: string
  description?: string
  [key: string]: unknown
  body: string
}

export function loadPage(file: string): Page {
  const { data, content } = matter(readContentFile(path.join('pages', file)))
  return { ...data, body: smartQuotes(content) }
}

export interface CollectionEntry extends Record<string, unknown> {
  slug: string
  body: string
}

export function loadCollection(dir: string, sortBy?: string): CollectionEntry[] {
  const full = path.join(contentRoot, dir)
  const entries: CollectionEntry[] = fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(readContentFile(path.join(dir, f)))
      return { slug: f.replace(/\.md$/, ''), ...data, body: smartQuotes(content) }
    })
  if (sortBy) {
    entries.sort(
      (a, b) => Number(a[sortBy] ?? Infinity) - Number(b[sortBy] ?? Infinity),
    )
  }
  return entries
}
