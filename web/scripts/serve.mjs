// Serves a static build directory at the root, the way GitHub Pages serves the
// org site (https://cambridge-ai-build-club.github.io/). Used for local preview
// and visual comparison against the Jekyll build.
//
//   node scripts/serve.mjs ../_site 4101
//   node scripts/serve.mjs out 4102
import { createServer } from 'node:http'
import { statSync, readFileSync, existsSync } from 'node:fs'
import { dirname, join, normalize, extname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const webDir = dirname(dirname(fileURLToPath(import.meta.url)))
const root = resolve(webDir, process.argv[2] ?? 'out')
const port = Number(process.argv[3] ?? 4102)
const prefix = '/'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
}

function resolveFile(urlPath) {
  if (!urlPath.startsWith(prefix)) return null
  let rel = urlPath.slice(prefix.length)
  if (rel === '' || rel === '/') rel = '/index.html'
  const candidates = [rel, rel + '.html', join(rel, 'index.html')]
  for (const c of candidates) {
    // Strip leading separators (normalize() turns "/x" into "\x" on Windows,
    // which resolve() would treat as absolute), then confine to the root.
    const full = resolve(root, normalize(c).replace(/^[/\\]+/, ''))
    // Path traversal guard: anything escaping the served root is a miss.
    if (full !== root && !full.startsWith(root + sep)) continue
    if (existsSync(full) && statSync(full).isFile()) return full
  }
  return null
}

createServer((req, res) => {
  let path
  try {
    const requestUrl = (req.url ?? '/').replace(/^\/+/, '/')
    path = decodeURIComponent(new URL(requestUrl, 'http://x').pathname)
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain' })
    res.end('Invalid URL')
    return
  }
  const file = resolveFile(path)
  if (!file) {
    // Mirror GitHub Pages: unknown URLs render the exported branded 404 page.
    const fallback = resolveFile('/404.html')
    if (fallback) {
      res.writeHead(404, { 'Content-Type': MIME['.html'] })
      res.end(readFileSync(fallback))
      return
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not found: ' + path)
    return
  }
  res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' })
  res.end(readFileSync(file))
}).listen(port, () => {
  console.log(`serving ${root} at http://localhost:${port}/`)
})
