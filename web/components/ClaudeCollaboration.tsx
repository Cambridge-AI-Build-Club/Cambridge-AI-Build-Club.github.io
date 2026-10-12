// Shared by the production homepage (server) and the playground (client), so the
// label stays a prop - this component must not read content files itself.
export function ClaudeCollaboration({ logo, label }: { logo: string; label: string }) {
  return <a className="lab-collaboration" href="https://claude.com/" target="_blank" rel="noopener noreferrer">
    <span>{label}</span>
    <img src={logo} alt="Claude" width={143} height={31} />
  </a>
}
