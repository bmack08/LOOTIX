# Agent Registry — Lootix

> **Single source of truth for all agents. CEO reads this before every delegation.**

---

## Meta Agents

| Name | Role | Status | File |
|------|------|--------|------|
| Agent Creator | meta | active | `.claude/agents/meta/agent-creator.md` |
| Agent Updater | meta | active | `.claude/agents/meta/agent-updater.md` |

**Agent Creator** — Creates new agent definitions when capability gaps are identified.
**Agent Updater** — Modifies agent definitions when outputs are poor or project scope changes.

---

## Department Agents

| Name | Department | Role | Status | File |
|------|-----------|------|--------|------|
| Frontend Worker | Engineering / UI | worker | active | `.claude/agents/departments/frontend-worker.md` |
| API Worker | Engineering / Backend | worker | active | `.claude/agents/departments/api-worker.md` |
| QA Worker | Quality Assurance | worker | active | `.claude/agents/departments/qa-worker.md` |
| Security Auditor | Security | worker | active | `.claude/agents/departments/security-auditor.md` |

**Frontend Worker**
- Capabilities: Next.js App Router pages, React components, Tailwind CSS styling, client-side interactivity, product UI, giveaway forms, membership UI, responsive design
- Created: 2026-03-12
- Last Updated: 2026-03-12

**API Worker**
- Capabilities: Next.js API routes, Printify/Printful integration, external API clients, database setup, authentication, Stripe payments, email services, webhook handlers, server-side data fetching
- Created: 2026-03-12
- Last Updated: 2026-03-12

**QA Worker**
- Capabilities: Next.js build verification, API endpoint testing, TypeScript type checking, UI rendering verification, integration smoke tests
- Created: 2026-03-12
- Last Updated: 2026-03-12

**Security Auditor**
- Capabilities: API key exposure scanning, input validation, OWASP top 10 review, environment variable hygiene, auth flow validation, XSS/injection detection
- Created: 2026-03-12
- Last Updated: 2026-03-12

---

## Retired Agents (from TaleForge VTT — not applicable to Lootix)

| Name | Status | Reason |
|------|--------|--------|
| Dev Lead | retired | Overkill for solo project — CEO handles routing |
| Researcher | retired | Handled inline by CEO |
| Backend Worker | retired | Replaced by API Worker (Next.js, not FastAPI) |
| DevOps Engineer | retired | No Docker/CI/CD pipeline yet |
| Test Writer | retired | No test framework configured |
| Documentation Writer | retired | Not needed at current stage |
| Frontend Worker (old) | retired | Rewrote for Next.js (was React+Vite+Canvas) |

---

## Task Routing Quick Reference

| Task Type | Primary Agent | Pipeline |
|-----------|--------------|----------|
| New page or component | Frontend Worker | → QA → Security |
| New API route or integration | API Worker | → QA → Security |
| Printify/Printful work | API Worker | → QA |
| Database setup | API Worker | → Security |
| Auth implementation | API Worker | → Security → QA |
| Stripe/payments | API Worker | → Security → QA |
| UI bug or styling fix | Frontend Worker | → QA |
| Build failure | QA Worker | — |
| Security concern | Security Auditor | — |
| New capability needed | Agent Creator | — |
| Agent underperforming | Agent Updater | — |

---

## Change Log

| Date | Action | Agent | Notes |
|------|--------|-------|-------|
| 2026-03-12 | Created | Frontend Worker | Next.js/React/Tailwind specialist for Lootix |
| 2026-03-12 | Created | API Worker | Next.js API routes + integrations specialist |
| 2026-03-12 | Created | QA Worker | Build verification and endpoint testing |
| 2026-03-12 | Created | Security Auditor | OWASP, secrets, auth review |
| 2026-03-12 | Retired | Dev Lead, Researcher, Backend Worker, DevOps, Test Writer, Docs Writer | TaleForge agents — wrong stack/scope |
