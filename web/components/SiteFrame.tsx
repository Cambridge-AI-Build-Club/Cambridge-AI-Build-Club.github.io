'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Arrow, Icon } from '@/components/Icon'
import type { UiCopy } from '@/lib/content'
import type { SiteData } from '@/lib/site'

type Surface = 'paper' | 'charcoal'

// The saved surface is applied to <html data-surface> before first paint by the
// inline script in SiteDocument; React state syncs with it on mount.
function currentSurface(): Surface {
  return document.documentElement.dataset.surface === 'charcoal' ? 'charcoal' : 'paper'
}

export function SiteFrame({ data, ui, path, children }: { data: SiteData; ui: UiCopy; path: string; children: ReactNode }) {
  const [surface, setSurface] = useState<Surface>('paper')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)

  useEffect(() => {
    setSurface(currentSurface())
  }, [])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1101px)')
    const dismissOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    dismissOnDesktop()
    desktop.addEventListener('change', dismissOnDesktop)
    return () => desktop.removeEventListener('change', dismissOnDesktop)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    // Close when the pointer lands outside the header or focus leaves it, so
    // keyboard users never tab into content the open menu visually covers
    // (main and footer are additionally inert while the menu is open).
    const outsidePointer = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const focusLeft = (event: FocusEvent) => {
      if (!header.current?.contains(event.relatedTarget as Node | null)) setMenuOpen(false)
    }
    window.addEventListener('keydown', dismiss)
    document.addEventListener('pointerdown', outsidePointer)
    document.addEventListener('focusout', focusLeft)
    return () => {
      window.removeEventListener('keydown', dismiss)
      document.removeEventListener('pointerdown', outsidePointer)
      document.removeEventListener('focusout', focusLeft)
    }
  }, [menuOpen])

  function toggleSurface() {
    const next: Surface = surface === 'paper' ? 'charcoal' : 'paper'
    setSurface(next)
    document.documentElement.dataset.surface = next
    try { localStorage.setItem('cbc-surface', next) } catch { /* The current page still switches themes. */ }
  }

  return (
    <div className="lab site">
      <a className="lab-skip" href="#site-main">Skip to content</a>
      <header className="lab-header site-header" ref={header}>
        <a className="lab-brand" href={data.links.home} aria-label={`${data.title} home`}>
          <picture>
            <source media="(max-width: 760px)" srcSet={data.logo.mobile} />
            <img src={data.logo.desktop} alt="Cambridge AI Builder Club" width={600} height={600} />
          </picture>
        </a>
        <div className="site-header-actions">
          <button
            className="site-theme"
            onClick={toggleSurface}
            aria-pressed={surface === 'charcoal'}
            aria-label={surface === 'charcoal' ? ui.appearance.to_light : ui.appearance.to_dark}
          >
            <Icon name={surface === 'charcoal' ? 'moon' : 'sun'} size={20} />
          </button>
          <button ref={menuButton} className="lab-menu-toggle" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? ui.nav.close : ui.nav.menu} <Icon name={menuOpen ? 'close' : 'menu'} size={20} /></button>
        </div>
        <nav id="site-navigation" className={menuOpen ? 'is-open' : ''} aria-label="Main navigation">
          {data.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} aria-current={path.startsWith(item.href) ? 'page' : undefined}>{item.name}</a>
          ))}
          <a className="lab-button lab-button-small" href={data.signup} target="_blank" rel="noopener noreferrer">{ui.shared.join_club} <Arrow /></a>
        </nav>
      </header>
      <main id="site-main" tabIndex={-1} inert={menuOpen}>{children}</main>
      <footer className="lab-footer site-footer" inert={menuOpen}>
        <div><strong>{data.copyright}</strong><p>{ui.shared.footer_motto}</p></div>
        <nav aria-label="Footer navigation">
          {data.footerMenu.map((item) => <a key={item.href} href={item.href}>{item.name}</a>)}
          <a href={`mailto:${data.email}`}>{ui.shared.email_us} <Arrow /></a>
        </nav>
      </footer>
    </div>
  )
}
