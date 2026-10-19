import { DesignPlayground, type PlaygroundData } from '@/components/DesignPlayground'
import { loadPage, loadUi, markdownifyStrip, requireString, url } from '@/lib/content'
import { loadActivities, loadHomeCopy, loadRecruitment, loadSiteData, loadVisibleMembers } from '@/lib/site'

export default function PlaygroundPage() {
  const site = loadSiteData()
  const data: PlaygroundData = {
    copy: loadHomeCopy(), copyright: site.copyright, signup: site.signup, discord: site.discord, email: site.email,
    hero: url(requireString(loadPage('index.md').intro_image, 'intro_image', 'pages/index.md')), logo: site.logo,
    claudeLogo: url('/images/brand/claude-official.svg'),
    events: loadActivities(), members: loadVisibleMembers(), recruitment: loadRecruitment(),
    links: { ...site.links, journal: url('/blogs/') },
    ui: loadUi(),
    exploreIntro: markdownifyStrip(loadPage('events.md').body).trim(),
    communityIntro: markdownifyStrip(loadPage('team.md').body).trim(),
  }
  return <DesignPlayground data={data} />
}
