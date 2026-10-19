'use client'

import { useRef } from 'react'

// Shared by Explore and the playground so both expose the same radio behavior.
export function ActivityFilters({ titles, selected, allLabel, onSelect }: {
  titles: string[]
  selected: string
  allLabel: string
  onSelect: (title: string) => void
}) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const options = ['All', ...titles]
  return (
    <div className="lab-filters" role="radiogroup" aria-label="Filter activities">
      {options.map((title, index) => (
        <button
          key={title}
          ref={(button) => { buttons.current[index] = button }}
          role="radio"
          aria-checked={selected === title}
          tabIndex={selected === title ? 0 : -1}
          onClick={() => onSelect(title)}
          onKeyDown={(event) => {
            const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
            if (step === undefined) return
            event.preventDefault()
            const next = (index + step + options.length) % options.length
            onSelect(options[next])
            buttons.current[next]?.focus()
          }}
        >
          {title === 'All' ? allLabel : title}
        </button>
      ))}
    </div>
  )
}
