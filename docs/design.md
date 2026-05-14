# Design System: Paperclip Theme

The AI Playbook uses a Paperclip-inspired design system with warm natural tones, serif/sans-serif typography pairing, and clean visual hierarchy.

---

## Color Palette

### Light Theme

| Token | Value | Usage |
|---|---|---|
| `--sl-color-bg` | `#f5f3f0` (linen) | Page background |
| `--sl-color-bg-sidebar` | `#ffffff` | Sidebar background |
| `--sl-color-bg-nav` | `rgba(245,243,240,0.85)` | Header (glassmorphism) |
| `--sl-color-white` | `#1a1a1a` | Text |
| `--sl-color-gray-2` | `#4a4a4a` | Secondary text |
| `--sl-color-gray-5` | `#e0dcd6` | Borders |
| `--sl-color-gray-6` | `#f0ece7` | Subtle backgrounds |
| `--sl-color-accent` | `#3b82f6` | Links, active states |

### Dark Theme

| Token | Value | Usage |
|---|---|---|
| `--sl-color-bg` | `#0f1117` | Page background |
| `--sl-color-bg-sidebar` | `#0b0d12` | Sidebar background |
| `--sl-color-bg-nav` | `rgba(15,17,23,0.85)` | Header (glassmorphism) |
| `--sl-color-white` | `#e4e6f0` | Text |
| `--sl-color-gray-5` | `#252a3a` | Borders |
| `--sl-color-gray-6` | `#181c27` | Subtle backgrounds |

---

## Typography

| Element | Font | Weight |
|---|---|---|
| h1 | Instrument Serif | 400 (regular) |
| h2 | Instrument Serif | 400 (regular) |
| h3 | Inter | 600 (bold) |
| h4 | Inter | 600 (bold, uppercase) |
| Body | Inter | 400 |
| Code | JetBrains Mono | 400 / 500 |
| Sidebar | Inter | 500-650 |

### Heading Sizes

| Level | Desktop | Mobile |
|---|---|---|
| h1 | 2rem | 1.75rem |
| h2 | 1.625rem | 1.5rem |
| h3 | 1rem | 1.25rem |
| h4 | 0.875rem | same |

### Heading Styles

- **h2**: Bottom border separator (`1px solid var(--sl-color-gray-5)`)
- **h3**: Body-size bold (no border, same size as body text)
- **h4**: Tiny uppercase with letter-spacing, subdued color

---

## Layout

| Property | Value |
|---|---|
| Content width | 60rem (centered) |
| Sidebar width | Starlight default |
| Right sidebar | Hidden (replaced by pill dropdowns) |
| Max width (ultrawide) | 1400px |

---

## Components

### Header (Glassmorphism)

```css
header {
  background: var(--sl-color-bg-nav);
  backdrop-filter: blur(8px);
}
```

Semi-transparent background with backdrop blur, theme-aware (matches bg in light/dark).

### Tables

- Full border + rounded corners (10px)
- Vertical dividers on th/td
- Zebra stripes (even rows get gray-6 background)
- Hover highlight (gray-5)
- Compact padding (0.35rem 0.65rem)
- Th: uppercase, small, gray-2
- Horizontal scroll on mobile

### Cards

- 16px border radius
- 1.25rem padding
- Green accent bar on hover (3px left border, scaleY animation)
- Lift effect on hover (translateY(-2px) + shadow)

### Callouts (Starlight asides)

| Type | Background | Border |
|---|---|---|
| Note | `--sl-color-gray-6` | `--sl-color-gray-5` |
| Tip | `rgba(34,197,94,0.08)` | `rgba(34,197,94,0.25)` |
| Caution | `rgba(245,158,11,0.1)` | `rgba(245,158,11,0.3)` |
| Danger | `rgba(239,68,68,0.08)` | `rgba(239,68,68,0.28)` |
| Important | `rgba(59,130,246,0.08)` | `rgba(59,130,246,0.28)` + blue left border |

### Blockquotes

- Green left border (3px)
- Parchment background (`--sl-color-gray-6`)
- Rounded right corners

### Page Metadata Row

Positioned below page title, contains:
- Reading time estimate (book emoji)
- Inline tags (pill-shaped)
- Key Info pill dropdown (description, TLDR, related links)
- On this page pill dropdown (TOC with active heading)

Pill buttons: rounded (99px), theme-aware, chevron rotates on expand.

---

## Sidebar

- **8 sections**: Start Here, Learn, Decide, Reference, Research, Deep Dives, Resources, Community
- **Emoji icons** on section labels (house, books, compass, book, microscope, tools, package, people)
- **Hierarchy**: L1 bold (650), L3 subdued (500, gray-3), L4 left border indent
- **Cheatsheets**: Collapsed by default
- **Deep Dives**: Grouped under subheadings (Core Architecture, Techniques & Methods, Production & Operations)
- **Active page**: Gray-6 background, 600 weight, rounded 6px

---

## Pagination (Prev/Next)

- Compact card styling
- Rounded 8px, 1px border
- Light mode: dark link titles
- Hover: gray-6 background, border highlight

---

## Feedback Widget

- Thumbs up/down buttons at page bottom
- localStorage persistence
- Green accent on active state

---

## Mobile Optimizations

| Breakpoint | Changes |
|---|---|
| <=768px | Touch targets 44x44px, increased line-height, horizontal scroll on tables/code |
| <=640px | Pills hide text labels (icons only) |
| <=480px | Reduced font sizes, compact spacing, chat panel full-screen |
| >=1600px | Center-cropped layout (1400px max-width) |

---

## Version Tag

The `pre-paperclip-theme` git tag (commit `a5ccc74`) captures the state before the Paperclip design upgrade. To revert:

```bash
git checkout pre-paperclip-theme
git push origin pre-paperclip-theme:main -f
```
