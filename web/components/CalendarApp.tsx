'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { CalendarEvent } from '@/lib/calendar'
import { clubDate, eventsForMonth, monthLayout, selectedEvent, shiftMonth } from '@/lib/calendar-dates'
import { Icon } from '@/components/Icon'
import type { UiCopy } from '@/lib/content'

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function dateLabel(date: string, short = false) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', short
    ? { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' }
    : { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

export function CalendarApp({ events, ui }: { events: CalendarEvent[]; ui: UiCopy }) {
  const [today, setToday] = useState<string>()
  const [chosenMonth, setChosenMonth] = useState<string>()
  const [selectedId, setSelectedId] = useState<string>()
  // The detail region announces only after an explicit user selection; automatic
  // defaults on month change stay silent (the month label already announces).
  const userPicked = useRef(false)
  const datesRegion = useRef<HTMLDivElement>(null)
  // Keyboard-focusable only while the dates grid can actually scroll.
  const [datesScrollable, setDatesScrollable] = useState(false)

  function statusLabel(event: CalendarEvent) {
    return { archived: ui.calendar.status_completed, completed: ui.calendar.status_completed, scheduled: ui.calendar.status_scheduled, cancelled: ui.calendar.cancelled }[event.status]
  }

  useEffect(() => {
    const updateDate = () => setToday(clubDate())
    updateDate()
    const timer = window.setInterval(updateDate, 60_000)
    document.addEventListener('visibilitychange', updateDate)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', updateDate)
    }
  }, [])

  useEffect(() => {
    const region = datesRegion.current
    if (!region) return
    const measure = () => setDatesScrollable(region.scrollWidth > region.clientWidth)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(region)
    return () => observer.disconnect()
  }, [today])

  const currentMonth = today?.slice(0, 7)
  const monthKey = chosenMonth ?? currentMonth

  const layout = useMemo(() => (monthKey ? monthLayout(monthKey) : undefined), [monthKey])
  const monthEvents = useMemo(() => (monthKey ? eventsForMonth(events, monthKey) : []), [events, monthKey])
  const eventsByDate = useMemo(() => {
    const grouped = new Map<string, CalendarEvent[]>()
    monthEvents.forEach((event) => {
      const dayEvents = grouped.get(event.date) ?? []
      dayEvents.push(event)
      grouped.set(event.date, dayEvents)
    })
    return grouped
  }, [monthEvents])

  if (!today || !monthKey || !layout) {
    return <p className="site-calendar-loading" role="status">{ui.calendar.loading}</p>
  }

  const { label: monthName, firstDay, days } = layout
  const selected = selectedEvent(monthEvents, selectedId, today)
  const slots = Math.ceil((firstDay + days) / 7) * 7

  function changeMonth(next?: string) {
    userPicked.current = false
    setChosenMonth(next)
    setSelectedId(undefined)
  }

  function chooseEvent(id: string) {
    userPicked.current = true
    setSelectedId(id)
  }

  return <>
    <div className="site-month-controls">
      <h2 aria-live="polite" aria-atomic="true">{monthName}</h2>
      <div className="site-month-actions">
        <button className="site-current-month" onClick={() => changeMonth()}>{ui.calendar.current_month}</button>
        <button aria-label={ui.calendar.previous_month} onClick={() => changeMonth(shiftMonth(monthKey, -1))}><Icon name="chevron-left" hoverName="arrow-left" size={20} /></button>
        <button aria-label={ui.calendar.next_month} onClick={() => changeMonth(shiftMonth(monthKey, 1))}><Icon name="chevron-right" hoverName="arrow-right" size={20} /></button>
      </div>
    </div>
    <div className="site-calendar-layout">
      <div className="site-calendar">
        <div
          className="site-calendar-dates"
          role="region"
          aria-label={ui.calendar.dates_region}
          tabIndex={datesScrollable ? 0 : undefined}
          ref={datesRegion}
        >
          <div className="site-weekdays" aria-hidden="true">{weekdays.map((day) => <span key={day}>{day}</span>)}</div>
          <div className="site-calendar-grid" role="group" aria-label={monthName}>
            {Array.from({ length: slots }, (_, index) => {
              const day = index - firstDay + 1
              if (day < 1 || day > days) return <div className="site-calendar-blank" key={`blank-${index}`} aria-hidden="true" />
              const date = `${monthKey}-${String(day).padStart(2, '0')}`
              const dayEvents = eventsByDate.get(date) ?? []
              return <div className="site-calendar-day" key={date} data-today={date === today || undefined}>
                <time className="site-day-number" dateTime={date} aria-current={date === today ? 'date' : undefined} ><span aria-hidden="true">{day}</span><span className="site-visually-hidden">{dateLabel(date)}{date === today && ui.calendar.today_mark}</span></time>
                {dayEvents.map((event) => <button key={event.id} aria-label={`${event.title}, ${dateLabel(date)}${event.status === 'cancelled' ? ui.calendar.cancelled_mark : ''}`} aria-pressed={selected?.id === event.id} onClick={() => chooseEvent(event.id)}>
                  {event.title}{event.status === 'cancelled' && <span className="site-calendar-cancelled">{ui.calendar.cancelled}</span>}
                </button>)}
              </div>
            })}
          </div>
        </div>
        <p className="site-calendar-scroll-hint">{ui.calendar.scroll_days}</p>
      </div>
      <div className="site-calendar-sidebar">
        {selected && <section
          className="site-event-detail"
          aria-label={ui.calendar.selected_event}
          aria-live={userPicked.current ? 'polite' : undefined}
          aria-atomic="true"
        >
          <div className="site-event-meta"><span>{selected.type}</span><span className="site-status">{statusLabel(selected)}</span></div>
          <h3>{selected.title}</h3>
          <dl><dt>{ui.calendar.date}</dt><dd><time dateTime={selected.date}>{dateLabel(selected.date)}</time></dd><dt>{ui.calendar.time}</dt><dd>{selected.time}</dd><dt>{ui.calendar.location}</dt><dd>{selected.location}</dd></dl>
        </section>}
        <section className="site-month-list" aria-labelledby="month-events-heading">
          <h3 id="month-events-heading">{ui.calendar.events_this_month}</h3>
          {monthEvents.length > 3 && <p className="site-event-list-hint">{ui.calendar.scroll_more}</p>}
          {monthEvents.length ? <ul tabIndex={monthEvents.length > 3 ? 0 : undefined} aria-label={ui.calendar.events_in.replace('{month}', monthName)}>{monthEvents.map((event) => <li key={event.id}><button aria-pressed={selected?.id === event.id} onClick={() => chooseEvent(event.id)}>
            <time dateTime={event.date}>{dateLabel(event.date, true)}</time>
            <strong>{event.title}</strong>
            <small>{event.time} · {statusLabel(event)}</small>
          </button></li>)}</ul> : <p className="site-calendar-empty">{ui.calendar.empty_month.replace('{month}', monthName)}</p>}
        </section>

      </div>
    </div>
  </>
}
