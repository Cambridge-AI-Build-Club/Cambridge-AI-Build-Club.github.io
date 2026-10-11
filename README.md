# Cambridge AI Builder Club

Welcome to the official repository for the **Cambridge AI Builder Club** website.
Our club is dedicated to empowering students at Cambridge to explore, learn, and innovate with artificial intelligence.  

Through **workshops, hackathons, demos, and community events**, we provide hands-on opportunities for students of all backgrounds—whether you’re an experienced developer or completely new to AI.  
Our mission is simple: **make AI a platform for creativity, collaboration, and innovation.**  

---

## Get Involved  

We’d love for you to join our community!  

- **[Sign Up Form](https://www.jotform.com/253555944387168)** – Become a member of the club.  
- **[Join Our Discord](https://discord.gg/geyYtMCcf5)** – Stay connected with updates, events, and opportunities.  
- **[Visit Our Website](https://cambridge-ai-build-club.github.io/)** – Explore upcoming events, blogs, and more.  

---

## What We Do  

- **Workshops** – Learn practical AI skills in hands-on sessions.  
- **Hackathons** – Collaborate, create, and showcase AI projects.  
- **Demos** – Share your projects and inspire others.  
- **Community** – Connect with peers and industry leaders through events and socials.  

---

## Repository Info  

This repo contains the source code for the Cambridge AI Builder Club website.
Contributions are welcome! If you’d like to improve the site or suggest new features, please open an issue or submit a pull request.  

---

## Development

The site is a **Next.js 15 static export** in `web/`, deployed to GitHub Pages through reviewed pull requests. Root Markdown, collections, `_data/` and `images/` remain its content and asset sources.

```bash
cd web
npm ci
npm run dev      # http://localhost:3000/
npm run build    # static export into web/out/
```

- [Contributor and agent guidelines](AGENTS.md): branch naming, review, content editing and validation.
- [Design contract](DESIGN.md): current approved UI/UX rules.
- [Architecture and commands](web/README.md): templates, data loaders, calendar and static hosting.
- [Deployment and recovery](web/CUTOVER.md): Pages releases, legacy recovery and emergency publishing.
- [Documentation index and release evidence](docs/README.md): dated decisions, QA and archived plans.

The original Jekyll sources are retained for recovery; their presentation and calendar require a divergence review before use. Netlify is configured to build the Next.js export.

---

Together, let’s build the future with AI!
