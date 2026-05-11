# Component Documentation

This document describes the interactive Astro components used throughout the AI Playbook.

## Overview

All interactive components follow these patterns:
- **Built with Astro** (no React/Vue framework)
- **Vanilla JavaScript** for client-side interactivity
- **Companion CSS files** for component styling
- **`is:inline` directive** on script tags to prevent Astro preprocessing issues

---

## Components

### 1. DesignArenaLeaderboards

**Location:** `src/components/DesignArenaLeaderboards.astro`

**Purpose:** Display links to Design Arena model performance leaderboards across 12 different task categories.

**How it works:**
- Renders a responsive card grid (4-6 cards per row on desktop)
- Each card links directly to a Design Arena leaderboard
- Cards include:
  - Icon (emoji)
  - Arena name
  - Brief description
  - "View Rankings →" link

**Data:**
```javascript
const arenas = [
  { name: '3D Design', description: '...', icon: '🎨', slug: '3d-design' },
  // ... 11 more arenas
];
```

**Styling:**
- Grid columns: 180px min-width (responsive)
- Compact padding: 1rem
- Hover effects: slight elevation + border highlight
- Mobile: 160px min-width

**Usage:**
```mdx
import DesignArenaLeaderboards from '../../../components/DesignArenaLeaderboards.astro';

<DesignArenaLeaderboards />
```

**Integration:**
- Used in `/reference/benchmarks.mdx`
- No external dependencies or API calls
- All links are direct URLs to Design Arena (https://www.designarena.ai/leaderboard?arena=X)

**Maintenance:**
- To add/remove arenas: edit the `arenas` array in the component
- To change card size: adjust `minmax()` values and padding in CSS
- To update styling: edit `DesignArenaLeaderboards.css`

---

### 2. ModelSelector

**Location:** `src/components/ModelSelector.astro`

**Purpose:** Interactive filter for LLM models by use case, speed, and cost tier.

**How it works:**
- Renders filter chips for 3 dimensions:
  1. Use Case (writing, coding, reasoning, vision, long-context, budget)
  2. Speed (ultra-fast, fast, medium, slow)
  3. Cost tier (budget <$1, mid $1-10, premium >$10)
- Displays 11 model cards in a responsive grid
- Filters update in real-time as chips are clicked
- Shows count of visible models

**Data:**
```javascript
const models = [
  { id: 'opus', name: 'Claude Opus 4.7', provider: 'Anthropic', context: '400K', inputCost: 15, outputCost: 75, speed: 'slow', costTier: 'premium', useCases: ['reasoning', 'writing', 'analysis', 'coding'], bestFor: 'Complex reasoning, long documents' },
  // ... 10 more models
];
```

**Features:**
- Uses `data-*` attributes for filtering
- Card layout with color-coded speed badges
- "Clear filters" button to reset
- Result counter

**Usage:**
```mdx
import ModelSelector from '../../../components/ModelSelector.astro';

<ModelSelector />
```

**Integration:**
- Used in `/decide/models/guide.mdx`
- Hardcoded model data (no external API)

**Maintenance:**
- To add models: update the `models` array with new entries
- To change filters: modify chip buttons and filter logic
- To update pricing: edit the `pricing` object in the component

---

### 3. ToolComparison

**Location:** `src/components/ToolComparison.astro`

**Purpose:** Sortable, searchable table comparing AI tools across 4 categories.

**How it works:**
- Renders tabs for 4 categories:
  1. Chat (Claude, ChatGPT, Gemini, etc.)
  2. Coding (Cursor, GitHub Copilot, etc.)
  3. Content (Midjourney, Runway, Suno, etc.)
  4. APIs (Anthropic, OpenAI, Google Vertex, etc.)
- Each category has a sortable table with columns:
  - Tool name
  - Cost
  - Speed
  - Best for
- Search/filter functionality
- Column-header sorting with direction toggle
- Speed badges with color coding

**Data Structure:**
```javascript
const toolsByCategory = {
  chat: [
    { name: 'Claude', cost: '$20/mo', costSort: 20, speed: 'Medium', speedSort: 2, bestFor: 'Writing, long documents, analysis' },
    // ...
  ],
  // ... coding, content, apis categories
};
```

**Features:**
- Tab switching with active state management
- Search filters by tool name or "best for" description
- Sortable columns with numeric/text comparison
- Color-coded speed badges

**Usage:**
```mdx
import ToolComparison from '../../../components/ToolComparison.astro';

<ToolComparison />
```

**Integration:**
- Used in `/decide/tools/guide.mdx` (card view guide)
- Used in `/decide/tools/comparison.mdx` (comparison view)

**Maintenance:**
- To add/update tools: edit the `toolsByCategory` object
- To add categories: add new key to object, new tab button, new table wrapper
- To change sort behavior: modify sort logic in the script

---

### 4. CostCalculator

**Location:** `src/components/CostCalculator.astro`

**Purpose:** Dynamic calculator to estimate monthly AI API costs based on usage.

**How it works:**
- Three input sliders:
  1. Daily Requests (1-2000)
  2. Avg Input Tokens per Request (100-50,000)
  3. Avg Output Tokens per Request (50-10,000)
- Calculates and displays monthly cost estimates for 6 models:
  - Claude Sonnet
  - Claude Haiku
  - Claude Opus
  - GPT-4o
  - DeepSeek Flash
  - Gemini 3.1

**Calculation:**
```
Daily cost = (requests × input_tokens × input_price/1M) + (requests × output_tokens × output_price/1M)
Monthly cost = Daily cost × 30
```

**Data:**
```javascript
const pricing = {
  sonnet: { in: 3, out: 15 },
  haiku: { in: 0.80, out: 4 },
  opus: { in: 15, out: 75 },
  gpt: { in: 2, out: 8 },
  gemini: { in: 2, out: 12 },
  deepseek: { in: 0.14, out: 0.28 }
};
```

**Features:**
- Slider inputs with formatted number display
- Real-time cost calculation on input change
- Color-coded cards for each model
- Responsive grid layout

**Usage:**
```mdx
import CostCalculator from '../../../components/CostCalculator.astro';

<CostCalculator />
```

**Integration:**
- Used in `/decide/cost-calculator.mdx`
- Standalone calculator, no external data

**Maintenance:**
- To add models: add to `pricing` object and create new card
- To update pricing: edit the `pricing` values
- To change slider ranges: modify `min`/`max` attributes on input elements
- To adjust calculations: edit `calcCost()` function

---

## Technical Patterns

### Script Tag Setup

All components use `is:inline` directive on script tags:

```astro
<script is:inline>
  // Code here executes directly without Astro preprocessing
  document.addEventListener('DOMContentLoaded', function() {
    // ...
  });
</script>
```

**Why `is:inline`?** Astro processes script contents by default, which can cause issues with:
- Template literals containing special characters
- Complex nested braces in JSX
- Event handler closures

Using `is:inline` tells Astro: "render this script as-is, don't process it."

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

Each component has a companion CSS file with BEM-style naming:

```css
.component-name {
  /* styles */
}

.component-name__element {
  /* element styles */
}

.component-name__element--modifier {
  /* modifier styles */
}
```

Examples:
- `.design-arena-leaderboards__card`
- `.design-arena-leaderboards__card-title`
- `.model-selector__chip`
- `.tool-comparison__table`

---

## Creating New Components

To add a new interactive component:

1. **Create the Astro file:**
   ```
   src/components/MyComponent.astro
   ```

2. **Create the CSS file:**
   ```
   src/components/MyComponent.css
   ```

3. **Structure the component:**
   ```astro
   ---
   import './MyComponent.css';
   
   const data = [/* ... */];
   ---
   
   <div class="my-component">
     {data.map(item => (
       // JSX markup here
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

## Known Limitations & Solutions

### Issue: Iframes blocked by CORS
**Solution:** Use direct links instead of embedded iframes (see DesignArenaLeaderboards)

### Issue: Styles not applying
**Solution:** Make sure CSS file is imported at top of `.astro` file and class names match

### Issue: Event listeners not firing
**Solution:** Use `is:inline` on script tag and `DOMContentLoaded` event

### Issue: Template literals breaking
**Solution:** Use `is:inline` directive or avoid backticks in JSX

---

## Testing Components Locally

```bash
# Start dev server
npm run dev

# Edit component or CSS → browser auto-reloads
# Check browser DevTools for JavaScript errors
# Verify styles in Inspector
```

---

## Performance Notes

- All components are lightweight (< 5KB per component)
- No external libraries required
- Client-side rendering only (no server-side API calls)
- CSS is scoped to component (no global pollution)
- Lazy loading supported for embedded content

---

## Future Improvements

- [ ] Add TypeScript types for component props
- [ ] Extract shared filter/sort logic into utility functions
- [ ] Add animation transitions between states
- [ ] Consider dark mode overrides in CSS variables
- [ ] Add accessibility attributes (aria-*, role=*)
- [ ] Cache calculator results in localStorage
