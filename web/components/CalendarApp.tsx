'use client'

import { useEffect, useState } from 'react'
import type { CalendarEvent } from '@/lib/calendar'
import { clubDate, eventsForMonth, monthLayout, selectedEvent, shiftMonth } from '@/lib/calendar-dates'
import { Icon } from '@/components/Icon'

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function dateLabel(date: string, short = false) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', short
    ? { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' }
    : { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

function statusLabel(event: CalendarEvent) {
  return { archived: 'Completed', completed: 'Completed', scheduled: 'Scheduled', cancelled: 'Cancelled' }[event.status]
}

export function CalendarApp({ events }: { events: CalendarEvent[] }) {
  const [today, setToday] = useState<string>()
  const [chosenMonth, setChosenMonth] = useState<string>()
  const [selectedId, setSelectedId] = useState<string>()

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

  if (!today) return <p className="site-calendar-loading" role="status">Loading calendar…</p>

  const currentMonth = today.slice(0, 7)
  const monthKey = chosenMonth ?? currentMonth
  const { label: monthName, firstDay, days } = monthLayout(monthKey)
  const monthEvents = eventsForMonth(events, monthKey)
  const selected = selectedEvent(monthEvents, selectedId, today)
  const eventsByDate = new Map<string, CalendarEvent[]>()
  monthEvents.forEach((event) => {
    const dayEvents = eventsByDate.get(event.date) ?? []
    dayEvents.push(event)
    eventsByDate.set(event.date, dayEvents)
  })
  const slots = Math.ceil((firstDay + days) / 7) * 7

  function changeMonth(next?: string) {
    setChosenMonth(next)
    setSelectedId(undefined)
  }

  return <>
    <div className="site-month-controls">
      <h2 aria-live="polite" aria-atomic="true">{monthName}</h2>
      <div className="site-month-actions">
        <button className="site-current-month" onClick={() => changeMonth()}>Current month</button>
        <button aria-label="Previous month" onClick={() => changeMonth(shiftMonth(monthKey, -1))}><Icon name="chevron-left" hoverName="arrow-left" size={20} /></button>
        <button aria-label="Next month" onClick={() => changeMonth(shiftMonth(monthKey, 1))}><Icon name="chevron-right" hoverName="arrow-right" size={20} /></button>
      </div>
    </div>
    <div className="site-calendar-layout">
      <div className="site-calendar">
        <div className="site-calendar-dates" role="region" aria-label="Calendar dates" tabIndex={0}>
          <div className="site-weekdays" aria-hidden="true">{weekdays.map((day) => <span key={day}>{day}</span>)}</div>
          <div className="site-calendar-grid" role="group" aria-label={monthName}>
            {Array.from({ length: slots }, (_, index) => {
              const day = index - firstDay + 1
              if (day < 1 || day > days) return <div className="site-calendar-blank" key={`blank-${index}`} aria-hidden="true" />
              const date = `${monthKey}-${String(day).padStart(2, '0')}`
              const dayEvents = eventsByDate.get(date) ?? []
              return <div className="site-calendar-day" key={date} data-today={date === today || undefined}>
                <time className="site-day-number" dateTime={date} aria-current={date === today ? 'date' : undefined} ><span aria-hidden="true">{day}</span><span className="site-calendar-date-label">{dateLabel(date)}{date === today && ", today"}</span></time>
                {dayEvents.map((event) => <button key={event.id} aria-label={`${event.title}, ${dateLabel(date)}${event.status === 'cancelled' ? ', cancelled' : ''}`} aria-pressed={selected?.id === event.id} onClick={() => setSelectedId(event.id)}>
                  {event.title}{event.status === 'cancelled' && <span className="site-calendar-cancelled">Cancelled</span>}
                </button>)}
              </div>
            })}
          </div>
        </div>
        <p className="site-calendar-scroll-hint">Scroll across to see every day.</p>
      </div>
      <div className="site-calendar-sidebar">
        {selected && <section className="site-event-detail" aria-label="Selected event" aria-live="polite" aria-atomic="true">
          <div className="site-event-meta"><span>{selected.type}</span><span className="site-status">{statusLabel(selected)}</span></div>
          <h3>{selected.title}</h3>
          <dl><dt>Date</dt><dd><time dateTime={selected.date}>{dateLabel(selected.date)}</time></dd><dt>Time</dt><dd>{selected.time}</dd><dt>Location</dt><dd>{selected.location}</dd></dl>
        </section>}
        <section className="site-month-list" aria-labelledby="month-events-heading">
          <h3 id="month-events-heading">Events this month</h3>
          {monthEvents.length > 3 && <p className="site-event-list-hint">Scroll for more events.</p>}
          {monthEvents.length ? <ul tabIndex={monthEvents.length > 3 ? 0 : undefined} aria-label={`Events in ${monthName}`}>{monthEvents.map((event) => <li key={event.id}><button aria-pressed={selected?.id === event.id} onClick={() => setSelectedId(event.id)}>
            <time dateTime={event.date}>{dateLabel(event.date, true)}</time>
            <strong>{event.title}</strong>
            <small>{event.time} · {statusLabel(event)}</small>
          </button></li>)}</ul> : <p className="site-calendar-empty">No events scheduled for {monthName}. Check another month or come back for updates.</p>}
        </section>

      </div>
    </div>
  </>
}
