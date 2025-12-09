# Figma Design Map for Mobile Experience
## Starchild Music Frontend

This document provides a design map for creating mobile designs in Figma. 
Using this as a reference I will be designing mobile screens, components, and interactions.

---

## Design System Foundation

### Color Palette
```
Primary Accent: #F4B266 (RGB: 244, 178, 102)
Secondary Accent: #58C6B1 (RGB: 88, 198, 177)
Background: #0A1018 (RGB: 10, 16, 24)
Surface: #0C121B (RGB: 12, 18, 27)
Surface Hover: #121A25 (RGB: 18, 26, 37)
Text Primary: #FFFFFF (RGB: 255, 255, 255)
Text Secondary: #B8C5D1 (RGB: 184, 197, 209)
Text Muted: #6B7A8A (RGB: 107, 122, 138)
Border: rgba(244, 178, 102, 0.12)
```

### Typography Scale (Mobile)
```
Display Large: 32px / 40px line-height / Bold
Display Medium: 28px / 36px line-height / Bold
Heading 1: 24px / 32px line-height / Bold
Heading 2: 20px / 28px line-height / Semibold
Heading 3: 18px / 26px line-height / Semibold
Body Large: 16px / 24px line-height / Regular
Body: 14px / 20px line-height / Regular
Body Small: 12px / 18px line-height / Regular
Caption: 11px / 16px line-height / Regular
```

**Font Family:** Geist Sans (system fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)

### Spacing Scale
```
XS: 4px
SM: 8px
MD: 12px
LG: 16px
XL: 24px
2XL: 32px
3XL: 48px
4XL: 64px
```

### Border Radius
```
Small: 8px
Medium: 12px
Large: 16px
XLarge: 24px
Full: 9999px (for pills/capsules)
```

### Shadows
```
Small: 0 2px 8px rgba(5, 10, 18, 0.3)
Medium: 0 8px 24px rgba(5, 10, 18, 0.45)
Large: 0 16px 48px rgba(5, 10, 18, 0.6)
Glow (Accent): 0 0 12px rgba(244, 178, 102, 0.5)
```

### Touch Targets
```
Minimum: 44x44px (iOS standard)
Large: 48x48px (Android standard)
Primary Actions: 56x56px (play button, etc.)
```

---

## Screen Sizes & Breakpoints

### Mobile (Portrait)
- **Width:** 375px (iPhone standard)
- **Height:** 667px - 932px (varies by device)
- **Safe Area:** Top 44px (status bar), Bottom 34px (home indicator)

### Mobile (Landscape)
- **Width:** 667px - 932px
- **Height:** 375px
- **Safe Area:** Top 0px, Bottom 21px

### Tablet (Portrait)
- **Width:** 768px - 1024px
- **Height:** 1024px - 1366px

### Tablet (Landscape)
- **Width:** 1024px - 1366px
- **Height:** 768px - 1024px

---

## Component Library Structure

### 1. Navigation Components

#### Mobile Bottom Navigation
```
Frame: 375x64px
Background: rgba(8, 13, 20, 0.92) with backdrop blur
Border: Top border, 1px, rgba(244, 178, 102, 0.12)
Items: 4 tabs (Home, Library, Playlists, Profile)
- Icon: 20x20px
- Label: 10px, Semibold
- Active indicator: 3px height, accent gradient
- Touch target: Full tab area (minimum 44px height)
```

#### Mobile Header
```
Frame: 375x56px
Background: rgba(10, 16, 24, 0.88) with backdrop blur
Content:
- Logo: 40x40px, rounded-xl
- Hamburger menu: 44x44px touch target
- Search icon: 44x44px touch target (optional)
- User avatar: 32x32px (if logged in)
```

#### Hamburger Menu (Drawer)
```
Frame: 280x812px (80% of screen width)
Position: Slide in from left
Background: rgba(12, 18, 27, 0.98) with backdrop blur
Items:
- Profile section: 120px height
- Navigation links: 56px height each
- Divider: 1px, rgba(244, 178, 102, 0.12)
- Sign out: Bottom, 56px height
```

---

### 2. Player Components

#### Mini Player (Collapsed)
```
Frame: 375x64px
Position: Fixed bottom, above navigation
Background: rgba(10, 16, 24, 0.94) with backdrop blur
Content:
- Progress bar: 1px height, full width
- Album art: 48x48px, rounded-lg
- Track info: Title (14px), Artist (12px)
- Play/Pause button: 48x48px, rounded-full
- Next button: 44x44px
Padding: 12px horizontal, 8px vertical
```

#### Full Player (Expanded)
```
Frame: 375x812px (full screen)
Background: Dynamic gradient based on album art
Content:
- Header: 56px height
  - Close button: 44x44px
  - "Now Playing" label: 12px, uppercase
  - More menu: 44x44px
- Album art: 320x320px max, centered, rounded-3xl
- Track info: Title (24px), Artist (18px)
- Progress bar: Full width, 2px height
- Time display: 12px, tabular numbers
- Controls: 
  - Shuffle: 44x44px
  - Previous: 56x56px
  - Play/Pause: 72x72px (primary)
  - Next: 56x56px
  - Repeat: 44x44px
- Secondary controls: 56px height
  - Volume, Speed, Queue, Equalizer, Favorite
Padding: 24px horizontal
```

#### Player Controls Layout
```
Spacing between controls: 24px
Primary button (Play/Pause): 72x72px
Secondary buttons: 56x56px
Tertiary buttons: 44x44px
```

---

### 3. Content Components

#### Track Card
```
Frame: 375x80px (mobile), auto height
Background: Card surface
Content:
- Album art: 64x64px, rounded-lg
- Track info: 
  - Title: 16px, Semibold
  - Artist: 14px, Regular
- Actions: 
  - Play button: 44x44px
  - More menu: 44x44px
Padding: 16px
Gap: 12px
Touch target: Full card area
```

#### Search Bar
```
Frame: Auto width, 48px height
Background: rgba(18, 26, 38, 0.9)
Border: 1px, rgba(244, 178, 102, 0.15)
Border radius: 12px
Content:
- Search icon: 20x20px
- Input: 14px, placeholder text
- Clear button: 44x44px (when has text)
Padding: 12px horizontal
```

#### Section Header
```
Frame: Auto width, 48px height
Content:
- Title: 20px, Bold
- Subtitle: 12px, Regular (optional)
- Action button: 44x44px (optional)
Spacing: 16px between title and action
```

---

### 4. Modal & Overlay Components

#### Bottom Sheet
```
Frame: 375x[Variable] (max 90vh)
Position: Fixed bottom
Background: rgba(13, 19, 28, 0.98) with backdrop blur
Border: Top border, 1px, rgba(244, 178, 102, 0.16)
Border radius: 24px top corners
Content:
- Drag handle: 4x32px, centered, 16px from top
- Title: 18px, Semibold, 24px from handle
- Content: Scrollable area
- Actions: Bottom, 56px height buttons
Padding: 24px horizontal
Safe area: Bottom padding for home indicator
```

#### Full Screen Modal
```
Frame: 375x812px (full screen)
Background: rgba(0, 0, 0, 0.9) with backdrop blur
Content: Centered, max-width 90%
Border radius: 24px
Padding: 24px
```

#### Action Sheet
```
Frame: Auto width, variable height
Position: Bottom sheet style
Items:
- Each action: 56px height
- Destructive action: Red tint
- Cancel: Top, separated by divider
Border radius: 16px top corners
```

---

### 5. Form Components

#### Input Field
```
Frame: Auto width, 48px height
Background: rgba(18, 26, 38, 0.9)
Border: 1px, rgba(244, 178, 102, 0.15)
Border radius: 12px
Focus state: Border color accent, shadow glow
Text: 14px, Regular
Padding: 12px horizontal
```

#### Button (Primary)
```
Frame: Auto width, 48px height (minimum)
Background: Linear gradient (accent colors)
Text: 14px, Semibold
Border radius: 12px
Touch target: 48x48px minimum
Padding: 12px 24px
Shadow: Medium shadow
```

#### Button (Secondary)
```
Frame: Auto width, 48px height (minimum)
Background: rgba(18, 26, 38, 0.9)
Border: 1px, rgba(244, 178, 102, 0.25)
Text: 14px, Semibold
Border radius: 12px
Touch target: 48x48px minimum
Padding: 12px 24px
```

#### Checkbox
```
Frame: 20x20px
Border: 2px, rgba(244, 178, 102, 0.25)
Border radius: 4px
Checked: Accent background, white checkmark
Touch target: 44x44px (expanded area)
```

---

### 6. List & Grid Components

#### Track List
```
Item height: 80px
Spacing: 8px between items
Scrollable: Vertical
Pull to refresh: Enabled
```

#### Playlist Grid
```
Columns: 2 columns on mobile
Aspect ratio: 1:1 (square)
Spacing: 12px between items
Item: 
- Cover: Full width, rounded-xl
- Title: 16px, Semibold, 1 line truncate
- Description: 12px, Regular, 2 lines truncate
- Meta: 11px, Muted (track count, public/private)
```

---

## Screen Designs

### 1. Home / Search Screen
```
Layout:
- Header: 56px
- Search card: Auto height, 16px margin
- Results section: Scrollable
  - Section header: 48px
  - Track list: Variable height
- Bottom padding: 144px (for player + nav)
```

### 2. Library Screen
```
Layout:
- Header: 56px
- Page title: 32px, 24px margin bottom
- Tabs: 48px height, 16px margin bottom
- Content: Scrollable list
  - Track cards: 80px each, 8px spacing
- Bottom padding: 144px
```

### 3. Playlists Screen
```
Layout:
- Header: 56px
- Page title + Create button: 48px, 24px margin bottom
- Grid: 2 columns, 12px gap
- Bottom padding: 144px
```

### 4. Playlist Detail Screen
```
Layout:
- Sticky header:
  - Cover art: 200x200px (or full width banner)
  - Title: 24px, Bold
  - Meta: 14px, Muted
  - Actions: Play all, Shuffle, More
- Track list: Scrollable
  - Each track: 80px height
- Bottom padding: 144px
```

### 5. Profile Screen
```
Layout:
- Profile header: 200px height
  - Avatar: 80x80px
  - Name: 24px, Bold
  - Bio: 14px, Regular
  - Actions: Follow, Share
- Sections: Scrollable
  - Section header: 48px
  - Content: Grid or list
- Bottom padding: 144px
```

---

## Interaction Patterns

### Swipe Gestures
```
Left swipe on track: 
- Reveal actions (Play, Queue, Favorite)
- Distance: 80px to reveal
- Spring animation

Right swipe on track:
- Reveal secondary actions (Add to playlist, Share)
- Distance: 80px to reveal
- Spring animation

Horizontal swipe on player:
- Seek forward/backward
- Visual feedback: Time overlay
- Haptic feedback on release
```

### Tap Gestures
```
Single tap: Primary action (play track)
Double tap: Quick favorite toggle
Long press: Context menu (action sheet)
```

### Drag Gestures
```
Drag down on player: Collapse to mini player
Drag up on mini player: Expand to full player
Drag on progress bar: Seek
Drag on album art: Seek (horizontal)
```

### Pull to Refresh
```
Trigger: Pull down 80px
Visual: Loading spinner
Haptic: Light feedback on trigger
```

---

## Animation Specifications

### Transitions
```
Duration: 200-300ms
Easing: cubic-bezier(0.4, 0, 0.2, 1) (Material Design)
Spring: stiffness: 400, damping: 35, mass: 0.5
```

### Page Transitions
```
Slide in from right: New page
Slide out to left: Back navigation
Duration: 300ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

### Modal Transitions
```
Bottom sheet: Slide up from bottom
Duration: 300ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
Backdrop: Fade in, 200ms
```

### Micro-interactions
```
Button press: Scale to 0.95, 100ms
Card hover: Translate Y -2px, 200ms
Icon animation: Rotate 360deg (loading)
Progress bar: Width animation, linear
```

---

## States & Variants

### Button States
```
Default: Full opacity, normal scale
Hover: Slight scale up (1.02)
Active/Pressed: Scale down (0.95), reduced opacity (0.8)
Disabled: 50% opacity, no interaction
Loading: Spinner icon, disabled state
```

### Input States
```
Default: Border color muted
Focus: Border color accent, glow shadow
Error: Border color red, error message
Success: Border color green (optional)
Disabled: 50% opacity, no interaction
```

### Card States
```
Default: Normal elevation
Hover: Slight elevation increase
Active: Scale down (0.98)
Selected: Accent border, glow
Loading: Shimmer effect
```

---

## Accessibility Guidelines

### Color Contrast
```
Text on background: Minimum 4.5:1 ratio
Large text (18px+): Minimum 3:1 ratio
Interactive elements: Minimum 3:1 ratio
```

### Touch Targets
```
Minimum size: 44x44px
Recommended: 48x48px
Spacing between targets: 8px minimum
```

### Focus States
```
Visible outline: 2px, accent color
Focus ring: 0 0 0 3px rgba(244, 178, 102, 0.4)
Keyboard navigation: All interactive elements
```

### Screen Reader
```
ARIA labels on all interactive elements
Descriptive alt text for images
Semantic HTML structure
Landmark regions (header, nav, main, footer)
```

---

## Responsive Behavior

### Mobile Portrait (375px)
```
- Single column layout
- Full-width cards
- Bottom navigation
- Stacked form elements
```

### Mobile Landscape (667px+)
```
- Reduced vertical spacing
- Compact player controls
- Horizontal space optimization
- Smaller album art in player
```

### Tablet (768px+)
```
- Two-column layouts where appropriate
- Larger touch targets
- More spacing
- Desktop navigation (optional)
```

---

## Design Tokens (Figma Variables)

### Colors
```
--color-accent: #F4B266
--color-accent-strong: #58C6B1
--color-bg: #0A1018
--color-surface: #0C121B
--color-text: #FFFFFF
--color-subtext: #B8C5D1
--color-muted: #6B7A8A
```

### Spacing
```
--spacing-xs: 4
--spacing-sm: 8
--spacing-md: 12
--spacing-lg: 16
--spacing-xl: 24
--spacing-2xl: 32
```

### Typography
```
--font-size-xs: 11
--font-size-sm: 12
--font-size-base: 14
--font-size-lg: 16
--font-size-xl: 18
--font-size-2xl: 20
--font-size-3xl: 24
--font-size-4xl: 32
```

### Border Radius
```
--radius-sm: 8
--radius-md: 12
--radius-lg: 16
--radius-xl: 24
```

### Shadows
```
--shadow-sm: 0 2px 8px rgba(5, 10, 18, 0.3)
--shadow-md: 0 8px 24px rgba(5, 10, 18, 0.45)
--shadow-lg: 0 16px 48px rgba(5, 10, 18, 0.6)
```

---

## Prototyping Guidelines

### Interactions to Prototype
1. **Navigation**
   - Tap tab → Navigate to screen
   - Swipe between panes (player/queue/content)
   - Pull to refresh

2. **Player**
   - Tap mini player → Expand to full player
   - Drag down full player → Collapse to mini
   - Tap play/pause → Toggle playback
   - Drag progress bar → Seek

3. **Tracks**
   - Tap track → Play
   - Swipe left → Reveal actions
   - Long press → Context menu
   - Double tap → Favorite

4. **Modals**
   - Tap button → Open modal
   - Drag down bottom sheet → Dismiss
   - Tap backdrop → Close modal

### Animation Settings
```
Page transitions: Smart animate, 300ms
Component interactions: Smart animate, 200ms
Hover states: Instant
Tap states: 100ms delay, 200ms duration
```

---

## Component Naming Convention

### Format
```
[Type]/[Name]/[State]/[Variant]

Examples:
- Component/Button/Primary/Default
- Component/Button/Primary/Hover
- Component/Button/Primary/Disabled
- Screen/Home/Default
- Screen/Player/Expanded
- Screen/Player/Collapsed
```

### Organization
```
📁 Design System
  📁 Colors
  📁 Typography
  📁 Spacing
  📁 Shadows
📁 Components
  📁 Navigation
  📁 Player
  📁 Content
  📁 Forms
  📁 Modals
📁 Screens
  📁 Home
  📁 Library
  📁 Playlists
  📁 Player
  📁 Profile
📁 Patterns
  📁 Interactions
  📁 Animations
```

---

## Export Specifications

### Icons
```
Format: SVG
Size: 24x24px (1x), 48x48px (2x)
Color: Use currentColor for theme support
Stroke width: 1.5px (default), 2px (bold)
```

### Images
```
Format: PNG (with transparency) or WebP
Sizes: 1x, 2x, 3x
Optimization: Compress for web
```

### Assets
```
App icons: 192x192, 512x512 (PWA)
Favicon: 32x32, 16x16
Splash screens: Various iOS/Android sizes
```

---

## Design Checklist

### Before Handoff
- [ ] All screens designed for mobile (375px width)
- [ ] All components have states (default, hover, active, disabled)
- [ ] Touch targets meet minimum size (44x44px)
- [ ] Color contrast meets WCAG AA
- [ ] Spacing uses design tokens
- [ ] Typography uses design system scale
- [ ] Animations specified with duration and easing
- [ ] Interactions prototyped
- [ ] Safe areas considered (notch, home indicator)
- [ ] Dark mode colors verified
- [ ] Export assets prepared
- [ ] Design tokens documented

### Developer Handoff
- [ ] Figma file shared with developers
- [ ] Design tokens exported (JSON or CSS)
- [ ] Component specifications documented
- [ ] Animation specifications provided
- [ ] Asset exports organized
- [ ] Interaction prototypes linked
- [ ] Responsive breakpoints noted
- [ ] Accessibility considerations documented

---

## Resources & References

### Design Inspiration
- Spotify Mobile App
- Apple Music Mobile App
- YouTube Music Mobile App
- Material Design 3
- iOS Human Interface Guidelines

### Tools
- Figma (Design)
- Principle (Advanced animations)
- Framer (Interactive prototypes)
- Lottie (Complex animations)

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**For Use With:** Starchild Music Frontend Mobile Redesign

