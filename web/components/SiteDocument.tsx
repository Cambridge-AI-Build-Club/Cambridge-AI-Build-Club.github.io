import type { ReactNode } from 'react'
import '@/styles/claude.css'
import '@/styles/site.css'
import { url } from '@/lib/content'

// Restore the saved surface before first paint: this parser-blocking inline
// script runs before the body renders, so a returning charcoal user never sees
// a light flash. Every navigation is a full page load (plain <a> links), so
// this runs on each page. Kept in sync with SiteFrame's toggle.
const restoreSurface = `try{if(localStorage.getItem('cbc-surface')==='charcoal')document.documentElement.dataset.surface='charcoal'}catch(e){}`

export function SiteDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-surface="paper" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href={url('/images/favicon-32x32.png')} />
        <script dangerouslySetInnerHTML={{ __html: restoreSurface }} />
      </head>
      <body className="builder-site">{children}</body>
    </html>
  )
}
