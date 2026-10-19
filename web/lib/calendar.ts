import { readContentFile } from './content'

const STATUSES = ['archived', 'completed', 'scheduled', 'cancelled'] as const

export interface CalendarEvent {
  id: string
  date: string
  time: string
  title: string
  location: string
  type: string
  status: (typeof STATUSES)[number]
}

let cache: CalendarEvent[] | undefined

export function loadCalendar(): CalendarEvent[] {
  if (process.env.NODE_ENV === 'production' && cache) return cache
  const data: unknown = JSON.parse(readContentFile('data/calendar.json'))
  if (!Array.isArray(data)) throw new Error('content/data/calendar.json: expected a list')
  data.forEach((event, index) => {
    const where = `content/data/calendar.json[${index}]`
    if (typeof event !== 'object' || event === null) throw new Error(`${where}: expected a mapping`)
    for (const key of ['id', 'date', 'time', 'title', 'location', 'type', 'status']) {
      if ((event as Record<string, unknown>)[key] === undefined) {
        throw new Error(`${where}: missing required key "${key}"`)
      }
    }
    const { status } = event as { status: unknown }
    if (!STATUSES.includes(status as CalendarEvent['status'])) {
      throw new Error(`${where}: status must be one of ${STATUSES.join(', ')} (got "${String(status)}")`)
    }
  })
  if (process.env.NODE_ENV === 'production') cache = data as CalendarEvent[]
  return data as CalendarEvent[]
}
