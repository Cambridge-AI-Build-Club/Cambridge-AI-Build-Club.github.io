'use client'

import { useState } from 'react'
import { Arrow } from '@/components/Icon'
import { ActivityFilters } from '@/components/ActivityFilters'
import type { UiCopy } from '@/lib/content'
import type { Activity } from '@/lib/site'

export function ActivityGrid({ activities, ui, filterable = false }: { activities: Activity[]; ui: UiCopy; filterable?: boolean }) {
  const [filter, setFilter] = useState('All')
  const visible = activities.filter((item) => filter === 'All' || item.title === filter)
  return (
    <>
      {filterable && <ActivityFilters titles={activities.map((item) => item.title)} selected={filter} allLabel={ui.activities.all} onSelect={setFilter} />}
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
            <h3>{item.title}<Arrow /></h3><p>{item.description}</p>
            <span className="lab-card-link" aria-hidden="true">{item.linkLabel} <Arrow /></span>
          </div>
        </a>)}
        {!visible.length && <p>{ui.activities.no_match}</p>}
      </div>
    </>
  )
}
