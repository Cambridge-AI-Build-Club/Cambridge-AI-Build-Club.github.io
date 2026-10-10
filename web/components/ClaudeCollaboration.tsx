export function ClaudeCollaboration({ logo }: { logo: string }) {
  return <a className="lab-collaboration" href="https://claude.com/" target="_blank" rel="noopener noreferrer">
    <span>In collaboration with</span>
    <img src={logo} alt="Claude" width={143} height={31} />
  </a>
}
