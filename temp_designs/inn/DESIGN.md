---
name: Kinetic Horizon
colors:
  surface: '#121317'
  surface-dim: '#121317'
  surface-bright: '#38393d'
  surface-container-lowest: '#0d0e12'
  surface-container-low: '#1a1b1f'
  surface-container: '#1e1f23'
  surface-container-high: '#292a2e'
  surface-container-highest: '#343539'
  on-surface: '#e3e2e7'
  on-surface-variant: '#c1c6d7'
  inverse-surface: '#e3e2e7'
  inverse-on-surface: '#2f3034'
  outline: '#8b90a0'
  outline-variant: '#414755'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e69'
  primary-container: '#4b8eff'
  on-primary-container: '#00285c'
  inverse-primary: '#005bc1'
  secondary: '#ffb4aa'
  on-secondary: '#690003'
  secondary-container: '#c5020b'
  on-secondary-container: '#ffd2cc'
  tertiary: '#ffb595'
  on-tertiary: '#571e00'
  tertiary-container: '#ef6719'
  on-tertiary-container: '#4c1a00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4aa'
  on-secondary-fixed: '#410001'
  on-secondary-fixed-variant: '#930005'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb595'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7c2e00'
  background: '#121317'
  on-background: '#e3e2e7'
  surface-variant: '#343539'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: 0.05em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 80px
  section-gap: 160px
---

## Brand & Style

The design system is engineered for a high-fidelity, cinematic digital experience that mirrors the precision of aerospace engineering and the immersive nature of futuristic interfaces. It targets a sophisticated audience that expects performance, innovation, and premium aesthetics.

The visual style is a fusion of **Glassmorphism** and **High-Contrast Modernism**. It leverages deep-space layering to create a sense of infinite depth, utilizing frosted glass textures, translucent surfaces, and vibrant light-emitting nodes. The interface should feel less like a static website and more like a tactical head-up display (HUD) from a premium piece of hardware. Every interaction should feel intentional, smooth, and reactive.

## Colors

The palette is rooted in a "Deep Space" philosophy. The primary base is a near-absolute black to ensure maximum contrast for glowing elements.

- **Primary (Signal Blue):** Used for primary actions, active states, and data "nodes." It represents connectivity and intelligence.
- **Secondary (Pulse Red):** Used for critical alerts, high-energy highlights, and "scanning" trails.
- **Neutral (Obsidian & Slate):** A range of cool-toned dark greys used for surface definitions and subtle borders to prevent the UI from feeling flat.
- **Gradients:** Use linear gradients from Primary to a transparent version of itself for ambient light blobs and holographic scanning lines.

## Typography

Typography in this design system balances utilitarian precision with cinematic scale. 

- **Headlines:** Use **Geist** for its technical, sharp aesthetic. Large display sizes must feature generous letter spacing (tracking) to evoke a premium, architectural feel.
- **Body:** **Inter** provides maximum legibility for dense technical information.
- **Technical Labels:** **JetBrains Mono** is utilized for metadata, timestamps, and coordinates to reinforce the "HUD" and developer-centric aesthetic.
- **Hierarchy:** Maintain high contrast between display headers and body text. Use `label-mono` for small captions above headlines to act as navigation anchors.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** with intentional high-contrast whitespace. Content is treated as "objects floating in space."

- **Desktop:** A 12-column grid with wide margins (80px) to allow components room to breathe. Use large vertical gaps (160px) between major sections to emphasize high-production value.
- **Mobile:** Transition to a 4-column grid with reduced margins. Elements should stack vertically, maintaining the glassmorphism depth.
- **Alignment:** Use asymmetrical layouts for feature sections to create a dynamic, modern flow, but keep data-heavy dashboards strictly aligned to a modular grid.

## Elevation & Depth

This design system avoids traditional drop shadows in favor of **Luminous Depth**.

- **Glassmorphism:** Surfaces use a backdrop-blur (minimum 20px) and a semi-transparent fill (e.g., `rgba(255, 255, 255, 0.04)`).
- **Subtle Borders:** Components are defined by 1px solid borders with a low-opacity gradient, simulating light hitting the edge of a glass pane.
- **Ambient Light:** Use "Light Blobs"—large, blurred radial gradients of blue or red—behind cards to create a sense of glow and focus.
- **Scanning Lines:** Apply a thin, 1px horizontal line that slowly translates vertically across interactive cards to simulate a diagnostic scan.

## Shapes

The shape language is "Soft-Industrial." 

- **Corners:** Use a `0.25rem` (4px) base radius for a sharp, technical look, increasing to `0.75rem` (12px) for large glass cards. This maintains a balance between "military-grade" precision and modern consumer electronics.
- **Interactive States:** Buttons and inputs should feel like physical glass modules. On hover, the border-glow should intensify, and the corner radius should feel more pronounced through light reflection.

## Components

### Buttons
- **Primary:** Solid background with a subtle inner-glow. On hover, apply a magnetic effect where the label subtly follows the cursor within the button bounds.
- **Ghost:** Thin 1px border. Hover triggers a full-border glow using the Primary Signal Blue.

### Cards
- **Holographic Cards:** Feature a blurred background, a thin top-down gradient border, and a "scanning line" animation.
- **Hover State:** Intensify the backdrop-blur and increase the opacity of the ambient light blob behind the card.

### Input Fields
- **Style:** Underlined or fully enclosed glass containers. 
- **Focus:** The bottom border transforms into a glowing Blue-to-Red gradient trail. Use `label-mono` for floating labels.

### Data Visualization
- **Nodes & Trails:** Data points should be glowing circles connected by thin, 0.5px "energy" lines.
- **Progress Bars:** Use a "charging" animation where light pulses from left to right.

### Navigation
- **Top Bar:** Fully transparent glass blur that becomes more opaque upon scrolling. Use high-tracking Geist for nav links.