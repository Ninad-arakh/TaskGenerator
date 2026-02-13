# AI_NOTES.md

## Overview

AI tools were used as accelerators to speed up development, not as blind code generators.
All generated outputs were reviewed, tested, and modified before being included in the project.

This document explains how AI was used, what decisions were validated manually, and how the LLM integration was handled.

---

## Tools Used

- ChatGPT (GPT-4) – architecture discussions, debugging assistance, refinement
- Google Gemini (Gemini 2.5 Flash) – application LLM provider for task generation

---

## What AI Was Used For

### 1. Initial Project Structure
- Suggested backend folder organization
- Suggested separation of concerns between routes, controllers, and services
- Basic React component structuring

### 2. LLM Prompt Drafting
- Drafted initial versions of the task-generation prompt
- Suggested formatting instructions for structured output
- Iterated on grouping format (Frontend / Backend / Database / QA)

### 3. Boilerplate Code
- Express route scaffolding
- Basic CRUD structure
- Status endpoint draft
- Initial reorder and grouping logic outline

### 4. Debugging Support
- Helped identify route mismatches (e.g., incorrect PATCH path)
- Helped reason about state updates after reorder/delete operations
- Suggested improvements for consistent API responses

### 5. Documentation Drafts
- Initial README template
- Outline for AI_NOTES, PROMPTS_USED, and ABOUTME files

---

## What I Reviewed, Modified, or Implemented Manually

### Backend
- Refactored route definitions to avoid redundant logic
- Ensured proper HTTP status codes for error cases
- Added validation for empty or malformed input
- Structured consistent JSON responses
- Implemented health/status endpoint with real dependency checks

### Frontend
- Refined state management to prevent unnecessary re-renders
- Fixed reorder logic to persist correctly after updates
- Added defensive checks before API calls
- Implemented empty and loading states
- Ensured last 5 specs display correctly

### LLM Prompt Engineering
- Reduced vague instructions that caused generic outputs
- Forced structured grouping in markdown
- Adjusted prompt to reduce repetition and hallucinated complexity
- Tested prompts with multiple feature scenarios
- Tuned wording to balance specificity and flexibility

### Deployment
- Configured environment variables correctly
- Verified no API keys were committed
- Tested hosted version end-to-end

---

## LLM Provider

Provider: Google Gemini  
Model: Gemini 2.5 Flash  

### Reason for Selection
- Limited free tier suitable for prototype deployment
- Strong structured output capability
- Reliable JSON and markdown formatting
- Fast enough for interactive task generation
- Lower latency compared to heavier models

---

## Limitations & Trade-offs

- No advanced prompt memory or conversation history
- No fine-tuned model
- Basic validation instead of full schema enforcement
- No automated test suite (manual testing performed)

Given the 48-hour constraint, priority was given to:
- Working functionality
- Clean structure
- Reliable hosting
- Clear documentation

---

## Reflection

AI significantly accelerated boilerplate creation and prompt iteration.
However, ensuring consistent output structure, proper error handling, and deployment reliability required manual debugging and refinement.

All major user flows (generate → edit → reorder → group → export → history → status) were tested manually before submission.
