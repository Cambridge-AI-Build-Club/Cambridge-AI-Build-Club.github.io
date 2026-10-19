import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import matter from 'gray-matter'

const output = path.resolve('out')
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

test('the exported branded 404 inherits one document and the shared styles', () => {
  const html = fs.readFileSync(path.join(output, '404.html'), 'utf8')
  assert.equal((html.match(/<html\b/g) ?? []).length, 1)
  assert.match(html, /class="lab site"/)
  const styles = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)]
  assert.ok(styles.length > 0, 'The branded 404 must export stylesheet links')
  const css = styles.map(([, href]) => {
    const pathname = decodeURIComponent(new URL(href, 'http://localhost').pathname)
    assert.ok(pathname.startsWith(`${base}/`))
    return fs.readFileSync(path.join(output, pathname.slice(base.length)), 'utf8')
  }).join('\n')
  assert.match(css, /\.lab\s*\{/)
  assert.match(css, /\.site-header\s*\{/)
})

test('Home exports an absolute social image with exactly one deployment base path', () => {
  const html = fs.readFileSync(path.join(output, 'index.html'), 'utf8')
  const image = html.match(/<meta property="og:image" content="([^"]+)"/)
  assert.ok(image, 'Home must provide a social image')
  const { data } = matter(fs.readFileSync('content/pages/index.md', 'utf8'))
  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://cambridge-ai-build-club.github.io'
  assert.equal(image[1], `${origin}${base}/${data.intro_image.replace(/^\/+/, '')}`)
})
