'use client'

import { useState } from 'react'
import { Arrow } from '@/components/Icon'
import type { UiCopy } from '@/lib/content'
import type { Activity } from '@/lib/site'

export function ActivityGrid({ activities, ui, filterable = false }: { activities: Activity[]; ui: UiCopy; filterable?: boolean }) {
  const [filter, setFilter] = useState('All')
  const visible = activities.filter((item) => filter === 'All' || item.title === filter)
  return (
    <>
      {filterable && <div className="lab-filters" role="radiogroup" aria-label="Filter activities">
        {['All', ...activities.map((item) => item.title)].map((title) => (
          <button key={title} role="radio" aria-checked={filter === title} onClick={() => setFilter(title)}>
            {title === 'All' ? ui.activities.all : title}
          </button>
        ))}
      </div>}
      {filterable && (
        <p className="site-visually-hidden" role="status">
          {ui.activities.results.replace('{count}', String(visible.length))}
        </p>
      )}
      <div className="lab-activities">
        {visible.map((item) => <a className="lab-activity" key={item.href} href={item.href} aria-label={item.title}>
          <div className="lab-activity-art" aria-hidden="true">
            {item.image && <img src={item.image} alt="" width={240} height={160} loading="lazy" />}
          </div>
          <div className="lab-activity-copy">
            <h3 aria-hidden="true">{item.title}<Arrow /></h3><p aria-hidden="true">{item.description}</p>
            <span className="lab-card-link" aria-hidden="true">{item.linkLabel} <Arrow /></span>
          </div>
        </a>)}
        {!visible.length && <p>{ui.activities.no_match}</p>}
      </div>
    </>
  )
}
