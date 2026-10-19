import type { ReactNode } from 'react'
import { SiteDocument } from '@/components/SiteDocument'

// The shared document also supplies styles to the global not-found export.
export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return <SiteDocument>{children}</SiteDocument>
}
