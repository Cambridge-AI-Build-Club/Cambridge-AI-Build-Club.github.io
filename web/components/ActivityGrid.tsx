'use client'

import { useState } from 'react'
import { Arrow } from '@/components/Icon'
import type { UiCopy } from '@/lib/content'

interface Activity { title: string; description: string; href: string; image?: string }

export function ActivityGrid({ activities, ui, filterable = false }: { activities: Activity[]; ui: UiCopy; filterable?: boolean }) {
  const [filter, setFilter] = useState('All')
  const visible = activities.filter((item) => filter === 'All' || item.title === filter)
  return (
    <>
      {filterable && <div className="lab-filters" role="group" aria-label="Filter activities">
        {['All', ...activities.map((item) => item.title)].map((title) => <button key={title} aria-pressed={filter === title} onClick={() => setFilter(title)}>{title === 'All' ? ui.activities.all : title}</button>)}
      </div>}
      <div className="lab-activities" aria-live={filterable ? 'polite' : undefined}>
        {visible.map((item) => <a className="lab-activity" key={item.href} href={item.href}>
          <div className="lab-activity-art" aria-hidden="true">
            {item.image && <img src={item.image} alt="" width={240} height={160} loading="lazy" />}
          </div>
          <div className="lab-activity-copy">
            <h3>{item.title}<Arrow /></h3><p>{item.description}</p>
            <span className="lab-card-link">Discover {item.title.toLowerCase()}s <Arrow /></span>
          </div>
        </a>)}
        {!visible.length && <p>{ui.activities.no_match}</p>}
      </div>
    </>
  )
}
