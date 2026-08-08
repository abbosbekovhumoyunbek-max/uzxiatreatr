# UZXIAtreatr — Visual Style Guide & UI/UX System

## 1. Design Philosophy
The design language for **UZXIAtreatr** is futuristic, academic, and hyper-modern. It avoids traditional clunky university aesthetics in favor of a sleek, high-tech interface reminiscent of premier AI research centers and modern tech academies.

---

## 2. Color System & Design Tokens

### Primary Dark Palette (Default Theme)
- `--bg-primary`: `#080C14` (Deep Space Navy)
- `--bg-secondary`: `#0F172A` (Rich Slate Navy)
- `--bg-card`: `#141E33` (Elevated Surface Card)
- `--bg-glass`: `rgba(15, 23, 42, 0.75)` (Glassmorphism backdrop)

### Primary Accent Colors
- `--accent-cyan`: `#00F0FF` (Electric AI Cyan)
- `--accent-blue`: `#3B82F6` (Academy Blue)
- `--accent-violet`: `#8B5CF6` (Deep Neural Violet)
- `--accent-glow`: `rgba(0, 240, 255, 0.25)` (Glow aura)

### Neutral & Text Colors
- `--text-primary`: `#F8FAFC` (Pure Bright Slate)
- `--text-secondary`: `#94A3B8` (Muted Slate Gray)
- `--text-accent`: `#38BDF8` (Light Sky Highlight)
- `--border-color`: `rgba(255, 255, 255, 0.08)`
- `--border-highlight`: `rgba(0, 240, 255, 0.3)`

---

## 3. Typography System
- **Primary Font**: `Inter`, sans-serif (UI clarity, readability, numeric precision)
- **Display / Heading Font**: `Outfit`, sans-serif (Futuristic titles, high impact headlines)
- **Monospace Font**: `JetBrains Mono` (For code blocks, AI prompt examples, stats)

---

## 4. Components & Micro-Interactions
- **Glassmorphism Cards**: Backdrop blur (`backdrop-filter: blur(12px)`), 1px subtle neon borders, gentle drop shadows.
- **Buttons**:
  - `btn-primary`: Vibrant gradient background (Cyan to Blue), glowing shadow on hover, micro scale bump (`scale(1.02)`).
  - `btn-secondary`: Transparent background, frosted glass border, smooth hover color transition.
- **Interactive Quiz Cards**: Dynamic state changes (Selected, Correct, Incorrect) with subtle feedback animations.
- **Modals & Lightbox**: Backdrop dimming, fade-in and scale-up animation, accessible `Escape` key handlers.

---

## 5. Responsive Breakpoints
- **Mobile Small/Large**: `320px - 639px` (Stacked single column, full width touch targets, off-canvas navigation)
- **Tablet**: `640px - 1023px` (2-column grids, collapsible filters)
- **Desktop**: `1024px - 1439px` (3/4-column grids, sticky sidebars)
- **Wide Desktop**: `1440px+` (Max content container 1280px, rich side margins)
