# Agent Workspace — Persistent Working Memory

## Purpose
This directory is the persistent working memory for the TaleForge agent system. Every agent writes their output here — outputs that exist only in conversation are considered **lost**.

## Directory Map

| Directory | Owner | Contents |
|-----------|-------|----------|
| `research/` | Researcher | Research briefs, library evaluations, competitive analysis |
| `tasks/` | Dev Lead | Task decompositions, implementation specs, acceptance criteria |
| `qa-reports/` | QA Worker | Verification reports, test run results, regression findings |
| `security-reports/` | Security Auditor | Audit findings, vulnerability reports |
| `test-reports/` | Test Writer | Coverage reports, test file inventory, testability issues |
| `docs-reports/` | Documentation Writer | Documentation audit reports |
| `devops/` | DevOps Engineer | Deployment checklists, environment configs, build scripts |
| `decisions/` | CEO | Items blocked on Owner input — reviewed at session start |
| `archive/` | CEO | Files older than 30 days, no longer active |

## File Naming Convention

```
YYYY-MM-DD-{agent}-{topic}.md
```

Examples:
- `2026-03-08-researcher-jwt-auth-evaluation.md`
- `2026-03-08-dev-lead-auth-feature-tasks.md`
- `2026-03-08-qa-auth-verification-report.md`
- `2026-03-08-security-auth-audit.md`

## Cleanup Rule

Files older than 30 days move to `archive/`. Completed features move to archive after Documentation Writer signs off. The CEO does cleanup at session end when workload allows.
