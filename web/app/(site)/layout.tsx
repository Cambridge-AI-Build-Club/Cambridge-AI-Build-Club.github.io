import type { ReactNode } from 'react'
import { SiteDocument } from '@/components/SiteDocument'

// Single root layout for every production route; the playground keeps its own
// root layout in the (playground) group.
export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return <SiteDocument>{children}</SiteDocument>
}
