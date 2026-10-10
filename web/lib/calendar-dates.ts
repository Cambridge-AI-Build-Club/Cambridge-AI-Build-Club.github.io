import type { CalendarEvent } from './calendar'

export function clubDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now)
  const part = (type: string) => parts.find((value) => value.type === type)!.value
  return `${part('year')}-${part('month')}-${part('day')}`
}

export function shiftMonth(monthKey: string, offset: number): string {
  const [year, month] = monthKey.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1 + offset, 1))
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`
}

export function monthLayout(monthKey: string) {
  const [year, month] = monthKey.split('-').map(Number)
  return {
    label: new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString('en-GB', {
      month: 'long', year: 'numeric', timeZone: 'UTC',
    }),
    firstDay: (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7,
    days: new Date(Date.UTC(year, month, 0)).getUTCDate(),
  }
}

export function eventsForMonth(events: CalendarEvent[], monthKey: string): CalendarEvent[] {
  return events.filter((event) => event.date.startsWith(`${monthKey}-`))
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time) || a.id.localeCompare(b.id))
}

export function selectedEvent(events: CalendarEvent[], selectedId: string | undefined, today: string) {
  const explicit = events.find((event) => event.id === selectedId)
  if (explicit) return explicit
  const nonCancelled = events.filter((event) => event.status !== 'cancelled')
  const candidates = nonCancelled.length ? nonCancelled : events
  return candidates.find((event) => event.date >= today) ?? candidates[candidates.length - 1]
}
