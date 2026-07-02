---
name: prd-to-tickets
description: "Convert PRDs into implementation tickets: user stories, data models, API specs, test plans, and task decomposition. Tactical companion to sdd-agent."
version: 1.0.0
author: Hermes Agent
tags: [prd, tickets, user-stories, backlog, planning, task-decomposition]
related_skills: [sdd-agent, writing-plans]
---

# PRD → Implementation Tickets

Convert any PRD into actionable, ordered implementation tickets with full context.

## When to Use

- User pastes a PRD and asks "break this down" or "create tickets"
- After `sdd-agent` Phase 1 analysis, before Phase 3 decomposition
- User says "backlog", "user stories", "task breakdown", "sprint planning"

## Output Format

For each PRD, produce this structure:

```markdown
# [PRD Title] — Implementation Plan

## 1. Domain Model
- Entity-Relationship diagram (Mermaid)
- Key entities with fields and constraints

## 2. User Stories
- As a [role], I want to [action] so that [benefit]
- Priority: P0 (MVP) / P1 (nice-to-have) / P2 (future)

## 3. API Endpoints
- Method, Path, Request/Response shapes, Auth, Error codes

## 4. Implementation Tickets
- Ordered by dependency
- Ticket N: Title, Depends on, Description, Files, Acceptance Criteria, Tests

## 5. Test Plan
- Unit tests per ticket
- Integration tests
- E2E critical paths

## 6. Definition of Done
- Code merged, tests passing, reviewed, deployed to staging
```

## Ticket Template

```markdown
### Ticket {N}: {Title}

**Priority:** P{0-2}
**Depends on:** Ticket {X} or none
**Estimated effort:** {2-4}h

**Description:**
{What to build, in 2-3 sentences}

**Files to create:**
- `path/to/new/file.ts`

**Files to modify:**
- `path/to/existing.ts` — {what changes}

**Acceptance Criteria:**
- [ ] Given {precondition}, When {action}, Then {expected}
- [ ] Edge case: {describe}
- [ ] Error case: {describe}

**Tests:**
- Unit: {what to test}
- Integration: {what API calls to verify}
```

## Dependency Ordering Rules

1. **Data model first** — everything depends on knowing the schema
2. **Shared utilities** — before any feature that uses them
3. **Core CRUD** — before advanced queries or UI
4. **API before UI** — backend endpoints before frontend pages
5. **Tests WITH implementation** — same ticket, not separate

## Anti-Patterns to Avoid

- ❌ "Create the database" as one ticket — split by entity
- ❌ "Build the UI" as one ticket — split by page/component
- ❌ Tickets without acceptance criteria
- ❌ Tickets without file paths
- ❌ Circular dependencies (Ticket A depends on B, B depends on A)

## Integration

This skill is used by `sdd-agent` during Phase 3 (Task Decomposition).
Load both together for full PRD resolution.