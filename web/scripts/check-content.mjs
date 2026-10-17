// Verifies that every image reference in the content and the app resolves,
// case-sensitively, to a file under web/public/images/. Production serves on
// case-sensitive Linux, so a mismatched reference must fail here instead of
// 404ing in production. Unreferenced files are deliberately kept - this check
// only fails on broken references, never on unused assets.
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const web = join(dirname(fileURLToPath(import.meta.url)), '..')
const imagesDir = join(web, 'public', 'images')

const files = new Set()
;(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) walk(path)
    else files.add(relative(imagesDir, path).replaceAll('\\', '/'))
  }
})(imagesDir)

const sources = []
for (const dir of ['content', 'app', 'components', 'lib', 'styles']) {
  ;(function walk(current) {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const path = join(current, entry.name)
      if (entry.isDirectory()) walk(path)
      else if (/\.(md|tsx|ts|yml|json|css)$/.test(entry.name)) sources.push(path)
    }
  })(join(web, dir))
}

const reference = /\/?images\/[^\s"'()<>[\]{}]+/g
const missing = []
let checked = 0
for (const source of sources) {
  const text = readFileSync(source, 'utf8')
  for (const raw of text.match(reference) ?? []) {
    const match = raw.replace(/[.,;:!?]+$/, '')
    const rel = decodeURIComponent(match.replace(/^\/+/, '').replace(/^images\//, '')).replace(/[?#].*$/, '')
    checked++
    if (!files.has(rel)) missing.push(`${relative(web, source)}: ${match}`)
  }
}

const unique = [...new Set(missing)]
if (unique.length) {
  console.error('[check-content] image references not found under public/images/:')
  for (const item of unique) console.error('  ' + item)
  process.exit(1)
}
console.log(`[check-content] ${checked} image references resolve under public/images/ (${files.size} files)`)
