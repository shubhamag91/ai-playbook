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

### PathSelector Component
- **Desktop**: Grid with auto-fit, 280px minimum width (2-4 columns)
- **Tablet**: Single column layout
- **Mobile**: Full width with reduced padding, 44px minimum touch target for links
- **Small mobile**: Reduced font sizes and padding

### Breadcrumb Component
- **Desktop**: Horizontal with hover effects
- **Tablet/Mobile**: Same layout with larger touch targets (40px)
- **Font size**: Scales from 0.9rem (desktop) to 0.75rem (small mobile)

### See Also Component
- **Desktop/Tablet**: Grid with auto-fit (250px minimum)
- **Mobile**: Single column, 44px minimum height
- **Links**: Include descriptions for context, become hidden on very small screens

## Global Mobile Optimizations

### Font and Spacing
- Line height increased to 1.6 on mobile for readability
- Paragraph margins: 0.75rem on mobile, 1rem on desktop
- Heading spacing adjusted per breakpoint

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
- 768px (iPad/tablet)
- 1024px+ (Desktop)

## Performance
Mobile optimizations focus on:
- Reduced animation complexity on lower-end devices
- Touch-friendly active states (`scale(0.98)`)
- Optimized font loading (via Astro/Starlight)
- Minimal layout shifts (proper sizing for images, embeds)
