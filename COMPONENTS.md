# Component Documentation

This document describes the interactive Astro components used throughout the AI Playbook.

## Overview

All interactive components follow these patterns:
- **Built with Astro** (no React/Vue framework)
- **Vanilla JavaScript** for client-side interactivity
- **Companion CSS files** for component styling
- **`is:inline` directive** on script tags to prevent Astro preprocessing issues

---

## Component List

| Component | File | Used on | Purpose |
|---|---|---|---|
| BenchmarkViz | `BenchmarkViz.astro` | `/reference/benchmarks` | Sortable/filterable benchmark table with bar charts |
| Breadcrumb | `Breadcrumb.astro` | Multiple deep-dive pages | Navigation breadcrumb trail |
| ContentAudit | `ContentAudit.astro` | `/community/audit` | Auto-generated page audit table |
| ContentOverride | `ContentOverride.astro` | All pages (via Starlight override) | Metadata row (reading time, tags, pill dropdowns) |
| ContributorsList | `ContributorsList.astro` | `/community/contributors` | Contributor cards with avatars |
| CostCalculator | `CostCalculator.astro` | `/decide/cost-calculator` | Interactive API cost calculator (14 models) |
| DesignArenaLeaderboards | `DesignArenaLeaderboards.astro` | `/reference/benchmarks` | Card grid of Design Arena leaderboard links |
| FeedbackWidget | `FeedbackWidget.astro` | All pages (in footer) | Thumbs up/down feedback on page content |
| FooterOverride | `FooterOverride.astro` | All pages (via Starlight override) | Combines SeeAlso + FeedbackWidget + default footer |
| ModelCompare | `ModelCompare.astro` | `/decide/models/guide` | Model specs table from models.ts (single source of truth) |
| ModelMatrix | `ModelMatrix.astro` | `/decide/models/guide` | Model capability heatmap (9 models x 9 tasks) |
| ModelSelector | `ModelSelector.astro` | `/decide/models/guide` | Interactive model filter by use case, speed, cost |
| PathSelector | `PathSelector.astro` | `/start/quick-start` | Homepage/Quick Start path cards (Beginner, Builder, etc.) |
| ProgressTracker | `ProgressTracker.astro` | `/learn/beginner`, `/learn/interview-prep` | Section checkboxes with localStorage persistence |
| SeeAlso | `SeeAlso.astro` | All pages (auto-injected in footer) | Auto-generated related content links from tags |
| ToolComparison | `ToolComparison.astro` | `/decide/tools/comparison`, `/decide/tools/guide` | Sortable tool comparison tables |
| TrendingWidget | `TrendingWidget.astro` | Homepage, `/research/whats-new` | Latest AI trends and releases card grid |

---

## Detailed Component Docs

### 1. BenchmarkViz

**Location:** `src/components/BenchmarkViz.astro`

**Purpose:** Sortable benchmark table with bar chart visualizations and filtering by category/model family.

**Features:**
- Per-model rows with Company column
- Design Arena Elo displayed correctly (not as percentage)
- 30+ entries across 4 categories, 7 model families
- Sortable columns, category tabs, text search

**Data:** `src/data/benchmarks.ts`

**Usage:**
```mdx
import BenchmarkViz from '../../../components/BenchmarkViz.astro';
<BenchmarkViz />
```

---

### 2. Breadcrumb

**Location:** `src/components/Breadcrumb.astro`

**Purpose:** Navigation breadcrumb showing current page position in the hierarchy.

**Usage:**
```mdx
import Breadcrumb from '../../../components/Breadcrumb.astro';
<Breadcrumb />
```

---

### 3. ContentAudit

**Location:** `src/components/ContentAudit.astro`

**Purpose:** Auto-generated table of all content pages with tier, last updated, and next verification due dates. Used for maintenance tracking.

**Data:** Reads from `getCollection('docs')` at build time.

**Usage:**
```mdx
import ContentAudit from '../../../components/ContentAudit.astro';
<ContentAudit />
```

---

### 4. ContentOverride

**Location:** `src/components/ContentOverride.astro`

**Purpose:** Wraps all page content to add a metadata row with:
- Reading time estimate
- Tags inline
- Key Info dropdown (description, tldr, seeAlso from frontmatter)
- On this page dropdown (TOC with active heading tracking)
- Sticky shadow on scroll

**Features:**
- IntersectionObserver for active TOC heading highlighting
- Outside click closes dropdowns
- Sticky sentinel for scroll shadow

**CSS:** `src/components/ContentOverride.css`

**Integration:** Configured in `astro.config.mjs` as `MarkdownContent` component override.

---

### 5. ContributorsList

**Location:** `src/components/ContributorsList.astro`

**Purpose:** Display contributor cards with avatars, GitHub links, and contribution types.

**Data:** `src/data/contributors.ts`

**Usage:**
```mdx
import ContributorsList from '../../../components/ContributorsList.astro';
<ContributorsList />
```

---

### 6. CostCalculator

**Location:** `src/components/CostCalculator.astro`

**Purpose:** Interactive calculator to estimate monthly AI API costs based on usage.

**Sliders:** Daily Requests (1-2000), Avg Input Tokens (100-50,000), Avg Output Tokens (50-10,000)

**Models supported (14):**
- Claude Opus, Claude Sonnet, Claude Haiku
- GPT-5.5, GPT-5.5 Instant
- Gemini 3.1 Pro, Gemini 3.1 Flash, Gemini 3 Mini
- DeepSeek V4, DeepSeek V4 Flash
- Llama 4 Scout, Qwen 3.6
- Grok 3, Grok 3 Mini

**Calculation:** `Monthly cost = requests x 30 x ((input_tokens x input_price/1M) + (output_tokens x output_price/1M))`

**Usage:**
```mdx
import CostCalculator from '../../../components/CostCalculator.astro';
<CostCalculator />
```

**Maintenance:** To add/update models: edit the `pricing` object in the component.

---

### 7. DesignArenaLeaderboards

**Location:** `src/components/DesignArenaLeaderboards.astro`

**Purpose:** Card grid linking to Design Arena (designarena.ai) performance leaderboards across 12 task categories (3D Design, App UI, Creative, etc.).

**Usage:**
```mdx
import DesignArenaLeaderboards from '../../../components/DesignArenaLeaderboards.astro';
<DesignArenaLeaderboards />
```

---

### 8. FeedbackWidget

**Location:** `src/components/FeedbackWidget.astro`

**Purpose:** Thumbs up/down feedback widget at the bottom of pages. Feedback is stored in localStorage.

**Usage:** Injected via FooterOverride.astro automatically.

---

### 9. FooterOverride

**Location:** `src/components/FooterOverride.astro`

**Purpose:** Combines SeeAlso component (auto-generated related content), FeedbackWidget, and the default Starlight footer. Configured in `astro.config.mjs` as `Footer` component override.

---

### 10. ModelCompare

**Location:** `src/components/ModelCompare.astro`

**Purpose:** Single-source-of-truth model specifications table. Reads directly from `src/data/models.ts` to display model names, companies, context windows, pricing, capabilities, and vision/image support.

**Key benefit:** One data file (`models.ts`) feeds both the ModelCompare component and the search index. No duplicate model data.

**Usage:**
```mdx
import ModelCompare from '../../../components/ModelCompare.astro';
<ModelCompare />
```

---

### 11. ModelMatrix

**Location:** `src/components/ModelMatrix.astro`

**Purpose:** Capability heatmap showing 9 models x 9 tasks. Uses color-coded cells (1-5 scale) to show relative strengths.

**Data:** `src/data/capabilities.ts`

**Usage:**
```mdx
import ModelMatrix from '../../../components/ModelMatrix.astro';
<ModelMatrix />
```

---

### 12. ModelSelector

**Location:** `src/components/ModelSelector.astro`

**Purpose:** Interactive filter for LLM models by use case (writing, coding, reasoning, vision, long-context, budget), speed (ultra-fast, fast, medium, slow), and cost tier (budget, mid, premium).

**Features:**
- Real-time filter chip updates
- Result counter
- Clear filters button
- Color-coded speed badges

**Usage:**
```mdx
import ModelSelector from '../../../components/ModelSelector.astro';
<ModelSelector />
```

---

### 13. PathSelector

**Location:** `src/components/PathSelector.astro`

**Purpose:** Card grid on the Quick Start page offering role-based paths (Beginner, Builder, Researcher, Reference, Research, Deep Dives). Each card shows a description and links to relevant pages.

**Usage:**
```mdx
import PathSelector from '../../../components/PathSelector.astro';
<PathSelector />
```

---

### 14. ProgressTracker

**Location:** `src/components/ProgressTracker.astro`

**Purpose:** Learning path progress tracker with checkboxes. Progress is persisted in localStorage. Used on Beginner and Interview Prep paths.

**Features:**
- Section-level checkboxes
- localStorage persistence
- Green accent bar styling
- Progress counter

**Usage:**
```mdx
import ProgressTracker from '../../../components/ProgressTracker.astro';
<ProgressTracker sections={[{ id: 'section-1', label: 'Section 1' }]} />
```

---

### 15. SeeAlso

**Location:** `src/components/SeeAlso.astro`

**Purpose:** Auto-generated related content links injected at the bottom of every page. Uses tag-based matching from frontmatter to find related pages.

**How it works:**
- Pages with shared `tags` frontmatter are ranked by overlap count
- Pages with `glossaryLinks` get a link to `/reference/glossary`
- Pages without tags get section-appropriate defaults
- Section anchor links supported via `seeAlso` frontmatter field

**Integration:** Injected via FooterOverride.astro.

---

### 16. ToolComparison

**Location:** `src/components/ToolComparison.astro`

**Purpose:** Sortable, searchable table comparing AI tools across 4 categories (Chat, Coding, Content, APIs). Tab switching, column sorting, and text search.

**Features:**
- Tab switching with active state management
- Search filters by tool name or description
- Sortable columns with numeric/text comparison
- Color-coded speed badges

**Support:** Data includes 15+ tools across all categories.

**Usage:**
```mdx
import ToolComparison from '../../../components/ToolComparison.astro';
<ToolComparison />
```

---

### 17. TrendingWidget

**Location:** `src/components/TrendingWidget.astro`

**Purpose:** Card grid showing the latest AI trends, model releases, and news. Used on the homepage and `/research/whats-new` page.

**Data:** `src/data/trends.ts` (10 entries with links to playbook pages)

**Usage:**
```mdx
import TrendingWidget from '../../../components/TrendingWidget.astro';
<TrendingWidget />
```

---

## Technical Patterns

### Script Tag Setup

All components use `is:inline` directive on script tags:

```astro
<script is:inline>
  document.addEventListener('DOMContentLoaded', function() {
    // ...
  });
</script>
```

**Why `is:inline`?** Astro processes script contents by default, which can cause issues with template literals, complex braces in JSX, and event handler closures. Using `is:inline` tells Astro: "render this script as-is, don't process it."

### Event Handling

All components use `DOMContentLoaded` to ensure DOM elements exist:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('[data-attribute]');
  elements.forEach(el => {
    el.addEventListener('click', handler);
  });
});
```

### CSS Patterns

Each component has a companion CSS file if it uses complex styles. For simple styles, inline `<style>` tags are used in the Astro file.

---

## Creating New Components

1. **Create the Astro file:** `src/components/MyComponent.astro`
2. **Create the CSS file:** `src/components/MyComponent.css` (if needed)
3. **Structure:**
   ```astro
   ---
   import './MyComponent.css';
   const data = [/* ... */];
   ---
   <div class="my-component">
     {data.map(item => (
       <div>{item.name}</div>
     ))}
   </div>
   <script is:inline>
   document.addEventListener('DOMContentLoaded', function() {
     // Event handling here
   });
   </script>
   ```
4. **Use in MDX:**
   ```mdx
   import MyComponent from '../../../components/MyComponent.astro';
   <MyComponent />
   ```

---

## Performance Notes

- All components are lightweight (<5KB per component)
- No external libraries required
- Client-side rendering only (no server-side API calls)
- CSS is scoped to component (no global pollution)

---

## Future Improvements

- [ ] Add TypeScript types for component props
- [ ] Extract shared filter/sort logic into utility functions
- [ ] Add animation transitions between states
- [ ] Add accessibility attributes (aria-*, role=*)
- [ ] Cache calculator results in localStorage
