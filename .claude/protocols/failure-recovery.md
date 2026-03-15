# Failure Recovery Protocol

## Definition of Failure by Stage

**QA Worker failure:**
- Frontend build produces errors (not warnings)
- API endpoints return 500 consistently
- Database integrity check fails (PRAGMA integrity_check returns anything other than "ok")
- Test suite has failures (non-zero exit code)

**Security Auditor failure:**
- CRITICAL or HIGH severity finding that requires code changes before proceeding
- (LOW/MEDIUM findings are logged but don't block the pipeline)

**Test Writer failure:**
- Tests cannot be written because production code lacks testability hooks (missing data-testid, no accessible roles, untestable architecture)
- The test runner itself fails to configure

**Documentation Writer failure:**
- Cannot determine feature behavior from code alone (undocumented, ambiguous, contradictory)

**Frontend/Backend Worker failure:**
- Task cannot be completed as specified (missing dependency, conflicting requirements, blocked by another agent's unfinished work)
- Implementation produces a runtime error that cannot be resolved within the agent's scope

---

## Retry Protocol

**On first failure:**
Attach the exact error output to the task and re-route to the same worker. Include:
- The exact error message and stack trace
- The file and line number
- What the expected behavior was
- What was tried

**On second failure (same issue):**
Escalate to the Dev Lead for re-architecture. The implementation approach is wrong, not just the execution. The Dev Lead produces a revised task decomposition.

**On third failure:**
Stop. Write the blocked issue to `.claude/workspace/decisions/YYYY-MM-DD-{issue}.md`. Do not keep retrying — you are burning context window on a dead end. Surface to Owner.

**Maximum retries per stage: 2** (3 total attempts including original)

---

## Cross-Stage Failure Rules

- If a fix in one stage breaks a previously-passing stage (e.g., security fix breaks QA build), restart the pipeline from QA. Do not skip re-verification.
- If cross-stage failures loop more than **twice**, stop and escalate to Owner. The feature has a design conflict.

---

## Context Preservation on Failure

**Before retrying any failed stage**, write a failure report to the appropriate workspace directory:

```
## Failure Report — [Stage] — [Date]

**Stage:** QA Worker / Security Auditor / etc.
**Attempt:** 1 of 3
**Failed at:** [file:line or step description]
**Exact error:**
[paste the error]

**Files involved:**
- path/to/file.py:line

**What was attempted:**
[description]

**Next step:** Re-routing to [agent] with this error attached.
```

Write this BEFORE retrying, so the failure is logged even if the retry succeeds.

---

## Blocked Item Template

When a task is blocked after 3 attempts, write to `.claude/workspace/decisions/`:

```markdown
# Blocked: [Issue Title]

**Date:** YYYY-MM-DD
**Stage blocked:** [which pipeline stage]
**Attempts made:** 3
**Feature affected:** [feature name]

## Problem
[Clear description of what's failing and why]

## What Was Tried
1. Attempt 1: [description + error]
2. Attempt 2: [description + error]
3. Attempt 3: [description + error]

## Owner Decision Needed
[Specific question or choice the Owner needs to make]

## Options
A. [Option with trade-offs]
B. [Option with trade-offs]
```
