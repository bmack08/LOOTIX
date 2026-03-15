# Standard Task Flows

## New Feature (Complex)
```
Owner → CEO → Researcher (brief → workspace/research/)
  → Dev Lead (decomposition → workspace/tasks/)
  → Frontend Worker + Backend Worker (parallel where possible)
  → QA Worker → Security Auditor → Test Writer → Documentation Writer
  → CEO (delivery to Owner)
```

## New Feature (Simple — single file, clear path)
```
Owner → CEO → Frontend or Backend Worker (direct)
  → QA Worker → Documentation Writer
  → CEO (delivery to Owner)
```

## Bug Fix
```
Owner → CEO → Dev Lead (triage and assign)
  → Frontend or Backend Worker (fix)
  → QA Worker (verify fix + regression check)
  → CEO (delivery to Owner)
```

## New Dependency or Library
```
Owner → CEO → Researcher (library evaluation brief → workspace/research/)
  → Dev Lead (integration plan → workspace/tasks/)
  → Frontend or Backend Worker (implementation)
  → QA Worker → Security Auditor
  → DevOps Engineer (if it affects build/deployment)
  → CEO (delivery to Owner)
```

## Release / Deployment
```
Owner → CEO → QA Worker (full verification pass)
  → Security Auditor (full scan)
  → DevOps Engineer (build, package, deploy)
  → Documentation Writer (changelog, release notes)
  → CEO (delivery to Owner)
```

## Infrastructure / Environment Change
```
Owner → CEO → DevOps Engineer (implementation → workspace/devops/)
  → QA Worker (verify nothing broke)
  → Documentation Writer (update setup docs)
  → CEO (delivery to Owner)
```

## Security Audit (Standalone)
```
Owner → CEO → Security Auditor (full scan → workspace/security-reports/)
  → CEO (triage findings with Owner)
  → Frontend or Backend Worker (fix critical/high items)
  → QA Worker (verify fixes)
  → CEO (delivery to Owner)
```
