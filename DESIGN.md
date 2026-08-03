---
name: Timothy Lock Portfolio
description: Personal portfolio and resume site for a software engineer
colors:
  bg-primary: "#fafafa"
  bg-secondary: "#f5f5f5"
  text-primary: "#171717"
  text-secondary: "#737373"
  border: "#e5e5e5"
  code-bg: "#1e1e1e"
  code-header-bg: "#2d2d2d"
  code-keyword: "#569cd6"
  code-string: "#ce9178"
  code-function: "#dcdcaa"
  code-comment: "#6a9955"
  code-type: "#4ec9b0"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.8125rem"
    lineHeight: 1.8
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  pill: "9999px"
spacing:
  sm: "0.5rem"
  md: "1.5rem"
  lg: "3rem"
  xl: "6rem"
components:
  project-card:
    backgroundColor: "{colors.bg-primary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  project-card-hover:
    backgroundColor: "{colors.bg-primary}"
  skill-tag:
    backgroundColor: "{colors.bg-secondary}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.pill}"
    padding: "0.375rem 0.875rem"
---

# Design System: Timothy Lock Portfolio

## Overview

**Creative North Star: "The Default Template"**

This is the current, as-built state of the site — captured honestly, not aspirationally. The system is a grayscale minimal-SaaS portfolio: near-white background, near-black text, one gray step for secondary content, and no accent color at all (`--accent` is literally the same value as `--text-primary`). Density is generous, motion is a light fade-up on scroll and load, and structure follows the familiar dev-portfolio template shape (fixed blurred nav → hero → timeline → card grid → footer). Nothing here signals a distinct point of view; it reads as the safe default a generic AI-assisted build lands on, and the site owner has explicitly named this as something to move away from in future work.

The one deliberate exception is the hero's animated VS Code-style code window: a dark panel with traffic-light dots and syntax-highlighted, line-by-line "typing" text. It's the single moment of color and personality in an otherwise monochrome page, and it's confirmed as an intentional signature rather than incidental template filler — future revisions should preserve or evolve it rather than delete it outright.

**Key Characteristics:**
- Grayscale-only surface and text palette; zero accent color in the rest of the UI
- One signature color moment: the dark, VS Code–themed code window in the hero
- Inter for all UI text, JetBrains Mono reserved for code/monospace contexts
- Flat surfaces at rest; shadow appears only on hover as feedback, never as ambient decoration
- Fade-up-on-scroll reveal pattern applied uniformly to every section

## Colors

Palette is close to achromatic: a five-step gray/near-black ramp for backgrounds, text, and borders, plus one saturated moment confined to the hero's code window.

### Primary
- **Ink** (`#171717`): primary text color and the de facto "accent" — used for headings, active states, hover borders, and button-equivalent emphasis. Doubling as both text and accent is why the site reads as accent-less.

### Neutral
- **Paper** (`#fafafa`): page background.
- **Fog** (`#f5f5f5`): secondary surface — section backgrounds (Projects), tag/badge fills, skill pills.
- **Slate** (`#737373`): secondary text — subtitles, descriptions, nav links at rest, metadata.
- **Hairline** (`#e5e5e5`): all borders and dividers (nav bottom border, experience timeline rail, project card border).

### Signature: Code Window (hero only)
- **Terminal Black** (`#1e1e1e`): code window body background.
- **Panel Charcoal** (`#2d2d2d`): code window title bar.
- **Syntax Blue** (`#569cd6`): keywords and the blinking cursor.
- **Syntax Amber** (`#ce9178`): string literals.
- **Syntax Gold** (`#dcdcaa`): function names.
- **Syntax Green** (`#6a9955`): comments.
- **Syntax Teal** (`#4ec9b0`): type names.

These six colors are VS Code's Dark+ theme, scoped entirely to `.code-window` — they never leak into buttons, links, or surrounding chrome.

### Named Rules
**The Ink-as-Accent Rule.** There is no accent color distinct from primary text. Emphasis is carried by weight, underline, and border-color shifts on `#171717`, not by a hue.

## Typography

**Display/Body Font:** Inter (with `-apple-system, BlinkMacSystemFont, sans-serif`)
**Mono Font:** JetBrains Mono (with `monospace`)

**Character:** A single geometric-humanist sans carries every weight of the hierarchy (300–700); JetBrains Mono is scoped strictly to code/terminal contexts (the hero code window). No serif or display-only face — hierarchy is built from size, weight, and letter-spacing on one family.

### Hierarchy
- **Display** (600, `clamp(2.5rem, 5vw, 4rem)`, 1.1 line-height, -0.03em): hero title only.
- **Headline** (600, 2rem, -0.02em): section titles ("Experience", "Projects").
- **Title** (600, 1.0625–1.125rem): project card titles, experience company names.
- **Body** (400, 1rem, 1.6 line-height): experience/project descriptions, hero subtitle (max-width 600px).
- **Label** (500–700, 0.625–0.875rem, up to 0.05em tracking): nav links, skill tags, badges, resume link — several of these are uppercase with wide tracking (`current-badge`, `.resume-link`).

## Layout

Centered single-column content on a 1200px max-width container. Hero is a 2-column grid (content / code-window visual) above 1024px, collapsing to a single centered column below it, with a `.mobile-code-window` swapped in for touch/narrow viewports. Section padding is heavy and consistent: `6rem 8rem` desktop, stepping down to `4rem 2rem` (tablet) and `2rem` (footer, mobile). Project cards use `repeat(auto-fit, minmax(320px, 1fr))` — no fixed breakpoints needed for the grid itself. A tablet-portrait override restores the 2-column hero between 768–1024px in portrait orientation, an explicit fix for a layout gap rather than a general pattern.

## Elevation & Depth

Flat by default. The only persistent shadow is the hero code window's `perspective(1000px) rotateY(-5deg) rotateX(2deg)` tilt plus a soft drop shadow — a one-off treatment for that single component. Project cards are borderless-shadow at rest (just a 1px `--border` outline) and gain a shadow (`0 20px 40px -15px rgba(0,0,0,0.1)`) plus a `-2px` lift only on hover, i.e. depth is a response to interaction, not an ambient resting state.

### Shadow Vocabulary
- **Code window (resting)** (`0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1) inset`): permanent — this is the one component allowed ambient elevation.
- **Project card (hover)** (`0 20px 40px -15px rgba(0,0,0,0.1)`): interaction feedback only.

### Named Rules
**The Flat-at-Rest Rule.** Every surface except the hero code window is shadowless until hovered. Shadow signals interactivity, not decoration.

## Shapes

Rounded corners throughout, no sharp edges and no fully-circular chrome except icon buttons and status dots. Radius scale: 4px (tags/badges' sibling elements), 8px (social icon buttons), 12px (project cards, code window), and full pill (9999px) for skill tags and the current-role badge. Borders are 1px, always `--border` gray, never colored or thick — there is no side-stripe or colored-border usage anywhere in the system.

## Components

### Buttons / Links
- **Nav links:** no button treatment — text links with an animated underline that grows from 0 to 100% width on hover (`::after` pseudo-element).
- **Social icons:** 2.5rem square, `border-radius: 0.5rem`, gray-on-gray at rest, invert to solid ink background with paper-colored icon on hover.
- **Resume link:** treated as a label, not a button — small, bold, uppercase, wide-tracked text.

### Cards
- **Project cards:** 12px radius, 1px `--border` outline, paper background, no shadow at rest. On hover: border becomes transparent, a soft shadow appears, card lifts 2px, and the title underlines.
- **Corner style:** consistently 12px across cards and the code window.

### Tags / Badges
- **Skill tags & project tags:** pill or 4px-radius chips, `--bg-secondary` fill, `--text-secondary` text, no border. `.current-badge` is the pill variant, uppercase with letter-spacing, used for "current role" status.

### Timeline (Experience)
- **Signature component.** Each experience item has a 1px left border rail plus a small circular dot (`9px`, positioned via `::before`) that acts as a timeline marker. Both the rail and dot shift from `--border` gray to `--text-primary` ink on hover — the whole entry's border color is the interactive affordance, not a background change.

### Code Window (hero)
- **Signature component.** Dark (`#1e1e1e`) panel with a `#2d2d2d` header bar holding three colored traffic-light dots (red/yellow/green) and a mono-font filename label. Body renders syntax-highlighted "code" line by line with staggered `animation-delay` per line (0.1s increments) to simulate typing, plus a blinking block cursor. Tilted in 3D (`perspective`/`rotateY`/`rotateX`) at rest, straightens slightly on hover. Swaps to an untilted `.mobile-code-window` variant below 1024px.

### Navigation
- Fixed, full-width, `rgba(250,250,250,0.8)` background with `backdrop-filter: blur(12px)`; border-bottom is transparent until scrolled (`nav.scrolled` toggles it in). Nav links hidden below 1024px (no mobile menu currently implemented — the trigger and links pair is simply removed from view, not offered behind a hamburger).

## Do's and Don'ts

### Do:
- **Do** keep the code window's dark, syntax-highlighted palette isolated to that one component; it's the system's only sanctioned color.
- **Do** use ink (`#171717`) as the sole "accent" — hover states, active states, and emphasis all resolve to darkening toward ink, not introducing a new hue.
- **Do** keep shadows as an interaction response (hover) rather than a resting decoration, except for the code window.
- **Do** use the 12px radius for card-scale components and pill radius for tag-scale components — don't mix radii within the same component tier.

### Don't:
- **Don't** add a second accent color without a deliberate decision — right now "accent" and "ink" are the same token, which is itself worth revisiting rather than patching around.
- **Don't** treat this file's "Default Template" characterization as a target — it names the current gap the site owner wants closed, not a style to preserve.
- **Don't** introduce shadows or elevation on flat surfaces (tags, badges, nav) to "add depth" — depth is reserved for cards-on-hover and the code window.
- **Don't** carry the mobile nav's current behavior (links vanish with no replacement menu) forward without addressing it — it's an incumbent gap, not a considered decision.
