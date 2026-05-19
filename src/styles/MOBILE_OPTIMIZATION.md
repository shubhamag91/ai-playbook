# Mobile Optimization Guidelines

This document outlines the mobile optimization approach for the AI Playbook.

## Touch Targets
All interactive elements (buttons, links, form inputs) have a minimum size of 44x44px on touch devices. This follows WCAG 2.5.5 (Target Size) and iOS/Android guidelines.

## Responsive Breakpoints
- **Desktop**: 768px and above
- **Tablet**: 481px - 768px
- **Mobile**: 320px - 480px
- **Small mobile**: Below 360px (extra tiny devices)

## Component-Specific Optimizations

### Quiz Component
- **Desktop**: Controls in a row (select, toggle, start button), flex-wrap on overflow
- **Mobile (≤480px)**: Controls stack vertically, full-width select and toggle, start button stretches
- **Touch**: Option buttons have 44px min-height, flexible padding
- **Navigation**: Next/Retry/New buttons go full-width on mobile

### BenchmarkViz Component
- **Desktop**: Filters in a row, full table with sortable columns
- **Mobile (≤640px)**: Controls stack vertically, filter groups go full-width, smaller cell padding
- **Table**: Horizontally scrollable with edge shadow indication

### ModelMatrix Component
- **Desktop**: 9×9 heatmap grid, full legend visible
- **Mobile (≤768px)**: Controls stack, column widths shrink, task descriptions hidden
- **Table**: Horizontally scrollable with edge shadow indication

### CostCalculator Component
- **Desktop**: 2-column grid (setup + results), 2-column card grid
- **Mobile (≤860px)**: Single column layout (setup on top, results below)
- **Mobile (≤480px)**: Results cards stack in single column
- **Touch**: Slider thumbs are 16px with hover scale, minimum 44px on form inputs

### ToolComparison Component
- **Desktop**: Tabs + sortable table with 5 categories
- **Mobile (≤768px)**: Tabs flex-wrap, full-width search input, table horizontally scrollable
- **Table**: Horizontally scrollable with edge shadow indication

### PathSelector Component
- **Desktop**: Grid with auto-fit, 280px minimum width (2-4 columns)
- **Tablet (≤768px)**: Single column layout
- **Mobile (≤480px)**: Full width with reduced padding, 44px minimum touch target for links
- **Small mobile (≤359px)**: Reduced font sizes and padding

### ContentOverride (Page Metadata Row)
- **Desktop**: Reading time, tags, Key Info pill, On this page pill in a row
- **Mobile (≤640px)**: Pills show icons only (text labels hidden), compact padding

### FeedbackWidget Component
- **Desktop**: Thumbs up/down buttons side by side with label
- **Mobile (≤640px)**: Buttons expand to full width (flex: 1), 44px min-height, larger tap area
- **Present on every page** via FooterOverride

### Chat Widget
- **Desktop**: 544x544px floating panel
- **Mobile (≤480px)**: Full-screen (width: 100%, height: 100vh, no border-radius)

### See Also Component
- **Desktop/Tablet**: Grid with auto-fit (250px minimum)
- **Mobile**: Single column, 44px minimum height
- **Links**: Include descriptions for context, become hidden on very small screens

## Global Mobile Optimizations

### Font and Spacing
- Line height increased to 1.6 on mobile for readability
- Paragraph margins: 0.75rem on mobile, 1rem on desktop
- Body font size reduces to 0.95rem at ≤480px

### Heading Sizes on Mobile
Content headings (inside `.content :where(hN)`) have a specificity override to ensure mobile breakpoints apply correctly:
- `h2`: 1.5rem at ≤768px
- `h3`: 1.1rem at ≤768px, 1rem at ≤480px
- `h1`: 1.75rem at ≤768px, 1.5rem at ≤480px

### Card Hover Effects
Card hover transforms (`translateY(-2px)`) are gated behind `@media (hover: hover)` so they only fire on devices with a real pointer — not on touch screens where they would "stick" after a tap. A subtle `scale(0.99)` `:active` state provides touch feedback instead.

### Pagination Navigation
- **Desktop**: Previous/Next links shown side by side
- **Mobile (≤768px)**: Links stack vertically, each full-width, 44px minimum height

### Table Scroll Shadows
Horizontally scrollable table wrappers (BenchmarkViz, ModelMatrix, ToolComparison) display gradient fade shadows at left and right edges. The shadows only appear when there's content overflowing the viewport, providing a visual hint that the table can be scrolled. Implemented via CSS `background-attachment: local/scrolled` layered gradients.

### Images and Media
- Max-width: 100% for responsive scaling
- Tables and code blocks: Horizontal scroll with `-webkit-overflow-scrolling: touch`
- Videos: Embedded with responsive aspect ratio

### Form Elements
- Font size: 16px (prevents auto-zoom on iOS)
- Min height: 44px for all interactive elements
- Proper spacing between form fields

## Testing
Test at these viewports:
- 320px (iPhone SE)
- 375px (iPhone 12)
- 480px (Mobile landscape)
- 640px (Pill/FeedbackWidget breakpoint)
- 768px (iPad/tablet)
- 1024px+ (Desktop)

## Performance
Mobile optimizations focus on:
- Reduced animation complexity on lower-end devices (hover gated behind `@media (hover: hover)`)
- Touch-friendly active states (`scale(0.99)` on cards, `scale(0.97)` on chips)
- Optimized font loading (via Astro/Starlight)
- Minimal layout shifts (proper sizing for images, embeds)
