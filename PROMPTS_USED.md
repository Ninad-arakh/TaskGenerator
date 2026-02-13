# PROMPTS_USED.md

## 1. Main Task Generation Prompt

``` 
You are a senior product manager and senior software engineer.

Given:
- A product goal
- Target users
- Constraints

Generate:

1. User stories in format:
   "As a [user], I want [feature], so that [benefit]"

2. Engineering tasks grouped under:
   - Frontend
   - Backend
   - Database
   - QA

Requirements:
- Be specific and implementation-oriented
- Avoid vague tasks like "implement feature"
- Avoid repeating the goal verbatim
- Output clean markdown format
- Do not include explanations outside the sections
```

---

## 2. Prompt Refinement Iteration

After initial testing, I refined the prompt to reduce generic outputs.
```
Additional instructions added:
- Include edge cases in QA section
- Mention API routes explicitly in Backend section
- Suggest database schema adjustments when relevant
- Avoid unrealistic overengineering
```
---

## 3. Risk/Unknowns Section (Optional Enhancement)


In later iterations, I experimented with adding:
```
Add a section:
"Risks / Unknowns"
- Identify unclear assumptions
- Highlight potential scalability concerns
- Mention external dependency risks
```
This improved the planning quality significantly.

---

## Prompt Testing Process
I manually tested prompts with:
- Simple feature (todo app)
- Complex feature (multi-tenant SaaS tool)
- Constrained feature (internal reporting dashboard with time limits)

I adjusted instructions when outputs became:
- Too generic
- Too verbose
- Too architectural
- Not grouped properly

---

