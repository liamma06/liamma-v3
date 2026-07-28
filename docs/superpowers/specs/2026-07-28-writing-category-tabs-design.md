# Writing Page Category Tabs

**Date:** 2026-07-28

## Goal

Add category tabs to the writing index page so readers can filter posts by topic.

## Categories

Four tabs: `All`, `Life`, `Projects`, `AI`.

- `All` — shows every post regardless of category (default active tab)
- `Life`, `Projects`, `AI` — shows only posts whose `category` frontmatter matches

## Changes

### 1. Frontmatter

Each post gets an optional `category` field:

```md
---
category: projects   # one of: life | projects | ai
---
```

Posts without a `category` appear only under "All".

### 2. `lib/writing.ts`

- Add `category?: string` to the `NoteMetadata` interface
- Pass `data.category` through in `getAllNotes`

### 3. `app/(sidebar)/writing/page.tsx`

- Add `'use client'` directive
- Import `useState` from React
- Add `useState<string>('all')` for the active tab
- Render four tab buttons above the card grid
- Filter posts before mapping: if active tab is `'all'`, render all; otherwise filter by `note.category === activeTab`
- Tab styling uses existing CSS variables (`var(--foreground)`, `var(--muted)`, `var(--subtle)`, `var(--border)`) — active tab gets `var(--foreground)` color and a bottom border or font-weight bump; inactive tabs use `var(--muted)`

## Out of Scope

- URL/search-param state
- Transition animations between tab switches
- A catch-all category for uncategorized posts (they silently drop from filtered views)
