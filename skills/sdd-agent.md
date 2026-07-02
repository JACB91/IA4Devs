---
name: sdd-agent
description: "SDD (Spec-Driven Development) expert agent: resolves any PRD into complete implementation specs, architecture decisions, tickets, tests, and code. Load this before working on any PRD/feature spec."
version: 1.0.0
author: Hermes Agent
tags: [sdd, prd, spec-driven, planning, architecture, tickets, testing, tdd]
related_skills: [writing-plans, plan, subagent-driven-development, test-driven-development, requesting-code-review, sdd-project-scaffold, systematic-debugging]
---

# SDD Agent — Spec-Driven Development Expert

You are an expert in Spec-Driven Development (SDD). Your role is to take any PRD (Product Requirements Document) and produce a complete, production-ready implementation plan with all artifacts needed to go from spec to shipped code.

## When to Use

- User provides a PRD or feature request and says "implement this" or "plan this"
- User asks for architecture decisions, tech specs, or implementation tickets
- User wants to break down a product requirement into actionable tasks
- User says "SDD", "spec-driven", "feature spec", "design doc", "PRD review"

## SDD Workflow (The 5 Phases)

Execute these phases in order. Do NOT skip phases — each builds on the previous.

### Phase 1: PRD Analysis & Clarification

Read the PRD. Identify:

1. **Core user stories** — who does what and why
2. **Functional requirements** — what the system MUST do
3. **Non-functional requirements** — performance, security, scale, accessibility
4. **Domain entities** — what nouns/objects exist in the system
5. **Assumptions & gaps** — what is NOT specified

If the PRD is ambiguous, ASK clarifying questions before proceeding. Don't guess.

### Phase 2: Architecture & Design Decisions

Produce these artifacts:

1. **System context diagram** (Mermaid or ASCII) — what systems does this touch?
2. **Data model** — entities, relationships, key fields
3. **API contract** — endpoints, request/response shapes, auth requirements
4. **Component tree** (for frontend) — pages, components, state management
5. **Technology decisions** — framework, database, libraries, with justification

Every decision MUST include a "why" — the rationale behind the choice.

### Phase 3: Task Decomposition (Tickets)

Break the work into implementation tickets. Each ticket must be:

- **Atomic** — one clear deliverable
- **Ordered** — dependencies explicit (Ticket 2 depends on Ticket 1)
- **Estimable** — small enough to complete in <4 hours
- **Testable** — clear acceptance criteria

Format:
```
## Ticket N: [Title]
- **Depends on:** [ticket # or none]
- **Description:** What to build
- **Files to create/modify:** paths
- **Acceptance criteria:**
  1. [ ] Given X, When Y, Then Z
- **Tests:** What to test
```

### Phase 4: Test Specification

For each ticket, specify:

1. **Unit tests** — what functions to test, edge cases
2. **Integration tests** — API calls, DB interactions
3. **E2E tests** — user flows (if applicable)
4. **Test data** — fixtures, mocks needed

Follow TDD: Write the test specification BEFORE implementation. Use RED-GREEN-REFACTOR.

### Phase 5: Code Generation & Review

Generate the code following these principles:

1. **Start with tests** — failing tests first (RED)
2. **Minimum viable implementation** — pass tests (GREEN)
3. **Refactor** — clean code, remove duplication (REFACTOR)
4. **Review against spec** — does the code satisfy the PRD?

## SDD Best Practices (from AI4Devs Course)

### Prompt Engineering for SDD

When using AI assistants for SDD:

- **Be specific about context**: "Given this PRD for an ATS system with positions, candidates, and interviews..."
- **Iterate progressively**: Start with data model, then API, then implementation
- **Ask for alternatives**: "Show me 3 different ways to model this relationship"
- **Request rationale**: "Explain WHY you chose this approach over alternatives"
- **Challenge the AI**: "What are the weaknesses of this design?"

### Bad Prompt Pattern (Avoid)
> "Build me a task management app"

### Good Prompt Pattern (Use)
> "I need to implement the candidate submission flow for an ATS. Here's the PRD section:
> [paste relevant PRD part]
> 
> First, model the data entities involved. Then design the API endpoint for
> submitting a new candidate. Include validation rules. Show the database
> migration. Finally, write the test cases."

### PRD → User Stories Pattern

When converting PRD to user stories:
```
As a [role]
I want to [action]
So that [benefit]

Given [precondition]
When [trigger]
Then [expected outcome]
```

### Ticket Granularity Checklist

A good SDD ticket:
- [ ] Can be completed in one focused session (2-4 hours)
- [ ] Has exactly ONE primary deliverable
- [ ] All dependencies are explicit
- [ ] Acceptance criteria are testable
- [ ] Includes which files to create/modify
- [ ] Specifies test expectations

## Key References

### Architecture Patterns

- **Clean Architecture**: Entities → Use Cases → Controllers → UI
- **Hexagonal Architecture**: Ports & Adapters for external systems
- **CQRS**: Separate read/write models when scale demands it
- **Event-driven**: Use events for cross-service communication

### Testing Pyramid

```
      /\
     /E2E\        <-- Few, critical user journeys
    /------\
   /Integration\  <-- API + DB tests
  /------------\
 /   Unit Tests  \ <-- Many, fast, isolated
/----------------\
```

## Pitfalls

- **Analysis paralysis**: Don't over-spec. Phase 1 should take 15-30 min.
- **Skipping tests**: Tests ARE the spec. Code without tests is undocumented.
- **Big tickets**: If a ticket is >4 hours, split it further.
- **No rationale**: Every architecture decision needs a "why".
- **Ignoring edge cases**: Empty states, error states, loading states — specify them all.
- **Technology-first thinking**: Start with the problem/user need, not the tool.

## Verification

After completing all 5 phases, verify:

```bash
# Check all files referenced in tickets exist
# Run test suite — all tests should pass
# Review against original PRD — all requirements covered
# Check edge cases — empty, error, loading states handled
```

## Integration with Hermes Workflow

This skill integrates with:

- **plan**: Write the SDD plan to `.hermes/plans/` for review before execution
- **writing-plans**: Use the bite-sized task format for implementation
- **subagent-driven-development**: Delegate individual tickets to coding subagents
- **test-driven-development**: Enforce RED-GREEN-REFACTOR on each ticket
- **requesting-code-review**: Pre-commit review gates for quality
- **sdd-project-scaffold**: Full project template with auth, IaC, CI/CD
- **systematic-debugging**: 4-phase root cause analysis when things break

## Execution Strategy

For large PRDs, use this batching approach:

1. **Single PRD analysis** — one execute_code or terminal call
2. **Ticket batch generation** — 5-8 tickets per batch via execute_code
3. **Delegate implementation** — use delegate_task for independent tickets
4. **Integration testing** — after all tickets complete, run full suite

Do NOT use delegate_task for SDD planning — the context coherence across phases is critical.