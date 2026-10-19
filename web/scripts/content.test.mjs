import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import test from 'node:test'
import ts from 'typescript'

// Import the real loaders against isolated fixture files. Place compiled modules
// under web/ so their package imports resolve without changing the application.
const originalCwd = process.cwd()
const fixture = fs.mkdtempSync(path.join(originalCwd, '.content-test-'))
const originalEnv = { mode: process.env.NODE_ENV, base: process.env.NEXT_PUBLIC_BASE_PATH }
fs.mkdirSync(path.join(fixture, 'content/data'), { recursive: true })
fs.mkdirSync(path.join(fixture, 'content/events'))
for (const name of ['content', 'calendar']) {
  const source = fs.readFileSync(new URL(`../lib/${name}.ts`, import.meta.url), 'utf8')
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText.replace("from './content'", "from './content.mjs'")
  fs.writeFileSync(path.join(fixture, `${name}.mjs`), output)
}
process.chdir(fixture)

function write(file, value) {
  fs.writeFileSync(path.join(fixture, 'content', file), value)
}

test.after(() => {
  process.chdir(originalCwd)
  for (const [key, value] of [['NODE_ENV', originalEnv.mode], ['NEXT_PUBLIC_BASE_PATH', originalEnv.base]]) {
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
  fs.rmSync(fixture, { recursive: true, force: true })
})

test('development refresh sees text, parsed config, collection edits and new entries', async () => {
  process.env.NODE_ENV = 'development'
  const loaders = await import(pathToFileURL(path.join(fixture, 'content.mjs')) + '?development')
  write('site.yml', 'title: First\nlogo: {mobile: mobile.png, desktop: desktop.png}\n')
  write('events/demo.md', '---\ntitle: Demo\nweight: 1\n---\nOriginal.\n')
  assert.equal(loaders.loadConfig().title, 'First')
  assert.match(loaders.loadCollection('events', 'weight')[0].body, /Original/)
  write('site.yml', 'title: Updated\nlogo: {mobile: mobile.png, desktop: desktop.png}\n')
  write('events/demo.md', '---\ntitle: Demo\nweight: 1\n---\nChanged.\n')
  write('events/workshop.md', '---\ntitle: Workshop\nweight: 2\n---\nNew.\n')
  assert.equal(loaders.loadConfig().title, 'Updated')
  assert.match(loaders.readContentFile('site.yml'), /Updated/)
  const entries = loaders.loadCollection('events', 'weight')
  assert.equal(entries.length, 2)
  assert.match(entries[0].body, /Changed/)
})

test('development refresh sees calendar changes and still rejects invalid statuses', async () => {
  process.env.NODE_ENV = 'development'
  const { loadCalendar } = await import(pathToFileURL(path.join(fixture, 'calendar.mjs')))
  const event = { id: 'one', date: '2026-10-19', time: '12:00', title: 'Demo', location: 'Cambridge', type: 'demo', status: 'scheduled' }
  write('data/calendar.json', JSON.stringify([event]))
  assert.equal(loadCalendar()[0].title, 'Demo')
  write('data/calendar.json', JSON.stringify([{ ...event, title: 'Updated' }]))
  assert.equal(loadCalendar()[0].title, 'Updated')
  write('data/calendar.json', JSON.stringify([{ ...event, status: 'invalid' }]))
  assert.throws(loadCalendar, /status must be one of/)
})

test('production caches are retained and URL helpers respect a project base path', async () => {
  process.env.NODE_ENV = 'production'
  process.env.NEXT_PUBLIC_BASE_PATH = '/club'
  const loaders = await import(pathToFileURL(path.join(fixture, 'content.mjs')) + '?production')
  write('site.yml', 'title: Build\nlogo: {mobile: mobile.png, desktop: desktop.png}\n')
  const config = loaders.loadConfig()
  const entries = loaders.loadCollection('events')
  write('site.yml', 'title: Later\nlogo: {mobile: mobile.png, desktop: desktop.png}\n')
  assert.equal(loaders.loadConfig(), config)
  assert.match(loaders.readContentFile('site.yml'), /Build/)
  assert.equal(loaders.loadCollection('events'), entries)
  assert.equal(loaders.url('images/hero.png'), '/club/images/hero.png')
  assert.equal(loaders.absoluteUrl('/images/hero.png'), 'https://cambridge-ai-build-club.github.io/club/images/hero.png')
})
