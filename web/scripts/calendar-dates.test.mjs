import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import ts from 'typescript'

const source = fs.readFileSync(new URL('../lib/calendar-dates.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
}).outputText
const { clubDate, shiftMonth, monthLayout, eventsForMonth, selectedEvent } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`
)
const events = [
  { id: 'later', date: '2026-10-07', time: '10:00', status: 'completed' },
  { id: 'early', date: '2026-10-06', time: '10:00', status: 'completed' },
  { id: 'same-day', date: '2026-10-06', time: '14:00', status: 'scheduled' },
  { id: 'cancelled', date: '2026-10-08', time: '10:00', status: 'cancelled' },
  { id: 'next-month', date: '2026-11-01', time: '10:00', status: 'scheduled' },
]

test('current Cambridge date follows London midnight and summer time', () => {
  assert.equal(clubDate(new Date('2026-09-30T23:30:00Z')), '2026-10-01')
  assert.equal(clubDate(new Date('2026-12-31T23:30:00Z')), '2026-12-31')
  assert.equal(clubDate(new Date('2027-01-01T00:00:00Z')), '2027-01-01')
})

test('navigation visits unpopulated months and crosses years in both directions', () => {
  assert.equal(shiftMonth('2026-03', 1), '2026-04')
  assert.equal(shiftMonth('2026-12', 1), '2027-01')
  assert.equal(shiftMonth('2027-01', -1), '2026-12')
  assert.equal(shiftMonth('2026-10', -12), '2025-10')
})

test('Monday-first grid includes leap days and a Sunday month start', () => {
  assert.deepEqual(monthLayout('2026-10'), { label: 'October 2026', firstDay: 3, days: 31 })
  assert.equal(monthLayout('2026-02').firstDay, 6)
  assert.equal(monthLayout('2026-02').days, 28)
  assert.equal(monthLayout('2028-02').days, 29)
})

test('month filtering sorts dates and daily times without mutating input', () => {
  const copy = structuredClone(events)
  assert.deepEqual(eventsForMonth(events, '2026-10').map((event) => event.id), ['early', 'same-day', 'later', 'cancelled'])
  assert.deepEqual(events, copy)
  assert.deepEqual(eventsForMonth(events, '2026-01'), [])
})

test('each event on the same day remains individually selectable', () => {
  assert.equal(selectedEvent(events, 'same-day', '2026-10-10').id, 'same-day')
  assert.equal(selectedEvent(events, 'cancelled', '2026-10-10').id, 'cancelled')
})

test('navigation discards selections outside the visible month', () => {
  const october = eventsForMonth(events, '2026-10')
  assert.equal(selectedEvent(october, 'next-month', '2026-10-10').id, 'early')
  assert.equal(selectedEvent(october, undefined, '2026-10-07').id, 'later')
})

test('empty event data has no selected detail', () => {
  assert.equal(selectedEvent([], 'early', '2026-10-10'), undefined)
})

test('Freshers Fair has both requested daily records with complete details', () => {
  const data = JSON.parse(fs.readFileSync(new URL('../../_data/calendar.json', import.meta.url), 'utf8'))
  const fair = data.filter((event) => event.id.startsWith('freshers-fair-2026-10-'))
  assert.deepEqual(fair.map((event) => event.date), ['2026-10-06', '2026-10-07'])
  for (const event of fair) {
    assert.equal(event.title, "Freshers' Fair")
    assert.equal(event.time, '10 am–4 pm')
    assert.equal(event.location, 'Parker’s Piece')
    assert.equal(event.type, 'publicity')
    assert.equal(event.status, 'completed')
  }
  assert.equal(new Set(data.map((event) => event.id)).size, data.length)
})
