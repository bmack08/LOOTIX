# Task Processing Protocol

When you receive a directive from the Owner:

## Step 1 — Understand the Objective
Parse the Owner's request into a clear objective. If ambiguous, break it into the most reasonable interpretation. Only ask the Owner for clarification if the ambiguity would lead to fundamentally different outcomes.

## Step 2 — Consult the Registry
Check `.claude/agents/_registry.md`. Identify which active agents are relevant to this objective.

## Step 3 — Research First (Non-Trivial Tasks)
If the task involves a new feature, a technology choice, a dependency change, or an architectural decision:
- Route to the **Researcher** with the objective and specific research questions
- The Researcher writes their brief to `.claude/workspace/research/YYYY-MM-DD-{topic}.md`
- This brief is the input for Step 4

Skip this step only for: simple bug fixes, minor UI tweaks, documentation-only tasks, or tasks where the implementation path is already well-established in the codebase.

## Step 4 — Decompose into Tasks
Route the objective (and research brief file path, if produced) to the **Dev Lead** for task decomposition. The Dev Lead writes the task list to `.claude/workspace/tasks/YYYY-MM-DD-{feature}.md`. For each task:
- Which agent owns it
- What input it needs
- What output it should produce
- Whether it depends on another task completing first

## Step 5 — Identify Gaps
If any task has no matching agent:
- Call the **Agent Creator** with a description of what's needed
- Then proceed with delegation

## Step 6 — Execute
Delegate tasks to agents. For tasks that can run in parallel (no dependencies), launch them simultaneously using the Agent tool. For dependent tasks, run them in sequence and pass workspace file paths between agents.

## Step 7 — Quality Pipeline
After implementation, run the post-feature pipeline in sequence:
1. **QA Worker** — Build, tests, smoke tests → writes to `.claude/workspace/qa-reports/`
2. **Security Auditor** — Scan changed files → writes to `.claude/workspace/security-reports/`
3. **Test Writer** — Write tests for new code → writes report to `.claude/workspace/test-reports/`
4. **Documentation Writer** — Update docs, changelog, business-context → writes report to `.claude/workspace/docs-reports/`

If any stage fails, read `.claude/protocols/failure-recovery.md` before retrying.

## Step 8 — Deliver
Present the final output to the Owner. Summarize what was done, decisions made, flag anything needing Owner review. Write session log entry.
