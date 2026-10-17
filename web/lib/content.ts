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

// Content is immutable for the lifetime of a build process, so every loader is
// memoized at module level: a page render that needs the same file twice (Shell,
// sections, sitemap, generateStaticParams) reads disk once. In `next dev` a server
// restart picks up edits, matching how the site is worked on.
const fileCache = new Map<string, string>()

export function readContentFile(rel: string): string {
  const cached = fileCache.get(rel)
  if (cached !== undefined) return cached
  let text: string
  try {
    // Normalize CRLF so excerpt splitting sees the same content regardless of
    // checkout settings.
    text = fs.readFileSync(path.join(contentRoot, rel), 'utf8').replace(/\r\n/g, '\n')
  } catch (cause) {
    throw new Error(`Failed to read content file: content/${rel}`, { cause })
  }
  fileCache.set(rel, text)
  return text
}

// Build-time shape checks. Loaders assert the keys the templates rely on so a
// content edit that drops or renames a key fails here with the file and key
// named, instead of rendering "undefined" or crashing deep in a component.
export function assertKeys(value: unknown, keys: string[], source: string): asserts value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`content/${source}: expected a mapping at the top level`)
  }
  for (const key of keys) {
    if ((value as Record<string, unknown>)[key] === undefined) {
      throw new Error(`content/${source}: missing required key "${key}"`)
    }
  }
}

export function requireString(value: unknown, key: string, source: string): string {
  if (typeof value !== 'string' || value === '') {
    throw new Error(`content/${source}: "${key}" must be a non-empty string`)
  }
  return value
}

export function requireStringList(value: unknown, key: string, source: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error(`content/${source}: "${key}" must be a list of strings`)
  }
  return value
}

// Memoize a nullary loader for the build process lifetime (see fileCache above).
function memo<T>(load: () => T): () => T {
  let value: T | undefined
  return () => {
    if (value === undefined) value = load()
    return value
  }
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

export const loadConfig = memo((): SiteConfig => {
  const data = parseYaml(readContentFile('site.yml'))
  assertKeys(data, ['title', 'logo'], 'site.yml')
  assertKeys(data.logo, ['mobile', 'desktop'], 'site.yml#logo')
  return data as unknown as SiteConfig
})

// --- data files (data/*) ---

export interface MenuItem {
  name: string
  url: string
  weight: number
  // Header navigation opt-out: entries with `header: false` (Committees,
  // Contact) are valid destinations but stay out of the header menu.
  header?: boolean
}

export interface Menus {
  main: MenuItem[]
  footer: MenuItem[]
}

export const loadMenus = memo((): Menus => {
  const data = parseYaml(readContentFile('data/menus.yml'))
  assertKeys(data, ['main', 'footer'], 'data/menus.yml')
  for (const list of ['main', 'footer'] as const) {
    if (!Array.isArray(data[list])) throw new Error(`content/data/menus.yml: "${list}" must be a list`)
    ;(data[list] as unknown[]).forEach((item, index) =>
      assertKeys(item, ['name', 'url', 'weight'], `data/menus.yml#${list}[${index}]`))
  }
  return data as unknown as Menus
})

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

export const loadProjects = memo((): ProjectEntry[] => {
  const data = parseYaml(readContentFile('data/projects.yml'))
  if (!Array.isArray(data)) throw new Error('content/data/projects.yml: expected a list')
  data.forEach((entry, index) =>
    assertKeys(entry, ['slug', 'title', 'description', 'image'], `data/projects.yml[${index}]`))
  return data as ProjectEntry[]
})

export const loadSignup = memo((): { form: string } => {
  const data = parseYaml(readContentFile('data/signup.yml'))
  assertKeys(data, ['form'], 'data/signup.yml')
  return data as unknown as { form: string }
})

export const loadContact = memo((): {
  email?: string
  phone?: string
  contact_button_link: string
} => {
  const data = parseYaml(readContentFile('data/contact.yml'))
  assertKeys(data, ['contact_button_link'], 'data/contact.yml')
  return data as unknown as { email?: string; phone?: string; contact_button_link: string }
})

export const loadDiscord = memo((): { discord: string } => {
  const data = parseYaml(readContentFile('data/discord.yml'))
  assertKeys(data, ['discord'], 'data/discord.yml')
  return data as unknown as { discord: string }
})

export interface SocialItem {
  name: string
  link: string
  image: string
}

export const loadSocial = memo((): SocialItem[] => {
  const data: unknown = JSON.parse(readContentFile('data/social.json'))
  if (!Array.isArray(data)) throw new Error('content/data/social.json: expected a list')
  data.forEach((item, index) => assertKeys(item, ['name', 'link', 'image'], `data/social.json[${index}]`))
  return data as SocialItem[]
})

export interface FeatureItem {
  // Plural display title ("Demos"), paired to the singular collection title
  // ("Demo"); also supplies the card link label so components never pluralize.
  title: string
  description?: string
  image?: { url: string; width: number; height: number }
}

export const loadFeatures = memo((): FeatureItem[] => {
  const data: unknown = JSON.parse(readContentFile('data/features.json'))
  if (!Array.isArray(data)) throw new Error('content/data/features.json: expected a list')
  data.forEach((item, index) => assertKeys(item, ['title'], `data/features.json[${index}]`))
  return data as FeatureItem[]
})

export const loadSeo = memo((): { copyright_text?: string } => {
  return parseYaml(readContentFile('data/seo.yml'))
})

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
    no_script: string
    current_month: string
    previous_month: string
    next_month: string
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
    today_mark: string
    cancelled_mark: string
    dates_region: string
    selected_event: string
    events_in: string
  }
  activities: { all: string; no_match: string; discover: string; results: string }
  appearance: { to_dark: string; to_light: string }
  recruitment: { open_seats: string }
  not_found: { title: string; body: string; back_home: string }
}

const UI_SECTIONS: Record<string, string[]> = {
  nav: ['menu', 'close'],
  shared: [
    'join_club', 'meet_club', 'explore_club', 'see_what_we_do', 'join_discord',
    'say_hello_discord', 'join_committee', 'explore_committee_roles', 'apply_committee',
    'apply_now', 'open_calendar', 'view_calendar', 'read_journal', 'read_story',
    'meet_team_leads', 'email_club', 'email_us', 'committee_applications', 'calendar',
    'about', 'contact', 'community', 'linkedin', 'all_stories', 'see_our_projects',
    'view_source', 'footer_motto', 'collaboration',
  ],
  sections: [
    'find_starting_point', 'ideas_worth_sharing', 'build_community_too',
    'bring_your_ideas', 'make_time_to_build', 'make_time_body', 'find_next_session',
    'find_next_body', 'start_conversation', 'good_community', 'club_calendar',
    'curious_minds', 'from_what_if', 'committee_note', 'rolling_applications',
  ],
  calendar: [
    'loading', 'no_script', 'current_month', 'previous_month', 'next_month',
    'cancelled', 'status_completed', 'status_scheduled', 'scroll_days',
    'events_this_month', 'scroll_more', 'date', 'time', 'location', 'empty_month',
    'today_mark', 'cancelled_mark', 'dates_region', 'selected_event', 'events_in',
  ],
  activities: ['all', 'no_match', 'discover', 'results'],
  appearance: ['to_dark', 'to_light'],
  recruitment: ['open_seats'],
  not_found: ['title', 'body', 'back_home'],
}

export const loadUi = memo((): UiCopy => {
  const data = parseYaml(readContentFile('ui.yml'))
  assertKeys(data, Object.keys(UI_SECTIONS), 'ui.yml')
  for (const [section, keys] of Object.entries(UI_SECTIONS)) {
    assertKeys(data[section], keys, `ui.yml#${section}`)
  }
  return data as unknown as UiCopy
})

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

// `| markdownify | strip_html` (no truncation - used where the copy is written to fit)
export function markdownifyStrip(md: string): string {
  const html = marked.parse(md, { async: false })
  return html.replace(/<[^>]*>/g, '')
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

const collectionCache = new Map<string, CollectionEntry[]>()

export function loadCollection(dir: string, sortBy?: string): CollectionEntry[] {
  const cacheKey = sortBy ? `${dir}#${sortBy}` : dir
  const cached = collectionCache.get(cacheKey)
  if (cached) return cached
  const full = path.join(contentRoot, dir)
  let files: string[]
  try {
    files = fs.readdirSync(full).filter((f) => f.endsWith('.md'))
  } catch (cause) {
    throw new Error(`Failed to list collection: content/${dir}`, { cause })
  }
  const entries: CollectionEntry[] = files.map((f) => {
    const { data, content } = matter(readContentFile(path.join(dir, f)))
    return { slug: f.replace(/\.md$/, ''), ...data, body: smartQuotes(content) }
  })
  if (sortBy) {
    // Non-numeric weights sort last instead of producing NaN comparisons.
    const weight = (entry: CollectionEntry) => {
      const value = Number(entry[sortBy])
      return Number.isFinite(value) ? value : Infinity
    }
    entries.sort((a, b) => weight(a) - weight(b))
  }
  collectionCache.set(cacheKey, entries)
  return entries
}
