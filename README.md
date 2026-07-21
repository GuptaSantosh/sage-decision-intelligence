# Sage Decision Intelligence

AI that transforms complex enterprise decisions into confident execution.

## Project Overview

Sage Decision Intelligence helps enterprise leaders validate high-stakes initiatives before execution begins. Users upload project artifacts such as a project charter, BRD/PRD, timeline, and meeting notes; Sage analyzes the combined context and returns evidence-backed **Decision Signals**.

Each signal identifies a risk, gap, dependency, or conflicting assumption, explains its business impact, cites supporting evidence, and recommends a next action. The experience is designed to quickly answer the executive question: **Should this initiative proceed to execution?**

The MVP is deliberately focused on one workflow:

`Upload documents → Analyze initiative → Review executive dashboard → Inspect signals → Export decision output`

## Local Setup

### Prerequisites

- Node.js 20 or newer
- npm
- An OpenAI API key (needed when the analysis API is implemented)

### Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Useful commands

```bash
npm run lint
npm run build
npm run start
```

> The AI analysis flow is not connected yet. When implemented, its server-side API key should be placed in `.env.local` and never exposed to the browser.

## Folder Structure

```text
app/                    Next.js application routes and global styles
  layout.tsx             Root layout and metadata
  page.tsx               Landing page
components/              Reusable UI components
  ui/                    shadcn/ui primitives
docs/                    Product, UX, architecture, specification, and build-plan documents
lib/                     Shared utilities and future parsing, prompt, and OpenAI helpers
public/                  Static assets
types/                   Future shared TypeScript analysis contracts
```

The target feature structure will add focused component groups for upload, dashboard, signals, and common UI; `app/api/analyze/route.ts` will own the server-side analysis endpoint.

## Tech Stack

- Next.js 16 with React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui and Base UI
- OpenAI SDK (server-side analysis)
- `react-dropzone` for multi-file uploads
- `pdf-parse` and `mammoth` for PDF and DOCX text extraction
- `react-markdown` for Markdown output/export support
- ESLint for code quality

## Build Status

- [~] Milestone 0 — Project foundation: Next.js, TypeScript, Tailwind, ESLint, and shadcn/ui foundation are present; app structure and product theme remain to be completed.
- [ ] Milestone 1 — Landing page: branded upload, project form, and multi-file interaction.
- [ ] Milestone 2 — Executive dashboard: mock-data dashboard, health score, decision, signals, exposure, actions, and signal drawer.
- [ ] Milestone 3 — Analysis experience: polished progress states and loading transitions.
- [ ] Milestone 4 — AI backend: file parsing and `POST /api/analyze` with validated structured JSON.
- [ ] Milestone 5 — Frontend integration: connect the upload flow, API, and dashboard state.
- [ ] Milestone 6 — Export: Markdown export; PDF as a stretch goal.
- [ ] Milestone 7 — Polish: responsive refinement, spacing, icons, and restrained motion; dark mode is optional.

## Product Constraints

The MVP does not include authentication, teams, billing, chat, Jira/Slack/email integrations, continuous monitoring, RAG, vector databases, long-term memory, or multi-agent orchestration. It prioritizes a fast, explainable, evidence-backed executive workflow over feature breadth.
