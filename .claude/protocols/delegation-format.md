# Delegation Format

When delegating to agents, provide all of the following:

```
TASK: [Clear description of what needs to be done]
CONTEXT: [Relevant background — business context, research brief file path, outputs from other agents, constraints]
OUTPUT FORMAT: [What the deliverable should look like, including which workspace/ directory to write to]
PRIORITY: [high / medium / low]
DEPENDENCIES: [What this agent is waiting on, if anything — include file paths to upstream outputs]
```

## Tips

- Always include the workspace file path for the agent's input (e.g., "Read the research brief at `.claude/workspace/research/2026-03-08-researcher-auth.md`")
- Always specify the workspace output path (e.g., "Write your task decomposition to `.claude/workspace/tasks/2026-03-08-dev-lead-auth.md`")
- For parallel agents: make it explicit they can start immediately without waiting
- For sequential agents: give them the exact output file from the previous agent to read
