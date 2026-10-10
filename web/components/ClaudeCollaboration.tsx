export function ClaudeCollaboration({ logo }: { logo: string }) {
  return <div className="lab-manifesto" role="group" aria-label="Claude collaboration">
    <span>In collaboration with</span>
    <a href="https://claude.com/" target="_blank" rel="noopener noreferrer"><img src={logo} alt="Claude" width={143} height={31} /></a>
  </div>
}
