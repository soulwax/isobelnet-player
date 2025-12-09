# Mobile Experience Improvement Roadmap
## Starchild Music Frontend

**Last Updated:** 2025 9th Dec  
**Version:** 0.5.2  
**Status:** Planning Phase

---

## Executive Summary

This roadmap is for me to plan out the mobile improvements for the frontend of starchild.
I hope I saw further in the future than necessary, and nearer than damaging.

---

## Current State Analysis

### ✅ Strengths
- **Mobile-first components**: MobilePlayer, MobileNavigation, MobileSwipeablePanes
- **Touch interactions**: Haptic feedback, swipe gestures, drag-to-seek
- **Responsive breakpoints**: Mobile (768px), Tablet (1024px), Desktop (1280px)
- **Performance optimizations**: GPU acceleration, reduced motion support
- **Accessibility**: Touch target sizes (44px/48px), reduced motion support

### ⚠️ Areas for Improvement
1. **UI/UX Consistency**: Some components need better mobile optimization
2. **Performance**: Image loading, bundle size, code splitting
3. **Progressive Web App**: Missing PWA features (offline support, install prompt)
4. **Error Handling**: Better mobile-specific error states
5. **Navigation**: Header could be improved for mobile
6. **Typography**: Better scaling for small screens
7. **Spacing**: More consistent mobile spacing patterns

---

## Roadmap Overview

### Phase 1: Critical UX Improvements (Weeks 1-2)
**Priority: High | Impact: High | Effort: Medium**

### Phase 2: Performance & Optimization (Weeks 3-4)
**Priority: High | Impact: High | Effort: High**

### Phase 3: Progressive Web App (Weeks 5-6)
**Priority: Medium | Impact: Medium | Effort: Medium**

### Phase 4: Advanced Features (Weeks 7-8)
**Priority: Low | Impact: Medium | Effort: High**

---

## Phase 1: Critical UX Improvements

### 1.1 Header Mobile Optimization
**Status:** 🔴 Not Started  
**Priority:** High  
**Effort:** 2-3 days

**Issues:**
- Header shows full desktop navigation on mobile (hidden with `md:flex`)
- No hamburger menu for mobile
- User profile dropdown not optimized for mobile
- Logo text hidden on mobile

**Improvements:**
- [ ] Add hamburger menu for mobile navigation
- [ ] Create mobile-friendly user menu (bottom sheet)
- [ ] Show logo text on mobile (smaller size)
- [ ] Add search icon in header for quick access
- [ ] Implement slide-in navigation drawer

**Components to Modify:**
- `src/components/Header.tsx`
- Create `src/components/MobileMenu.tsx` (new)

**Design Notes:**
- Hamburger menu should slide in from left
- User menu should be bottom sheet on mobile
- Search should be accessible from header icon

---

### 1.2 Typography & Spacing Refinement
**Status:** 🔴 Not Started  
**Priority:** High  
**Effort:** 2 days

**Issues:**
- Text sizes not optimized for small screens
- Inconsistent spacing between mobile and desktop
- Some text too small on mobile (< 14px)

**Improvements:**
- [ ] Create mobile typography scale (12px, 14px, 16px, 18px, 20px, 24px)
- [ ] Ensure minimum 14px font size for body text
- [ ] Standardize mobile spacing scale (4px, 8px, 12px, 16px, 24px, 32px)
- [ ] Add line-height adjustments for mobile readability
- [ ] Improve contrast ratios for small text

**Files to Modify:**
- `src/styles/globals.css`
- Add mobile typography utilities

**Design Notes:**
- Use 16px as base font size on mobile (prevents zoom on iOS)
- Line height should be 1.5-1.6 for body text
- Headings should scale proportionally

---

### 1.3 Modal & Dialog Improvements
**Status:** 🔴 Not Started  
**Priority:** High  
**Effort:** 2-3 days

**Issues:**
- Create playlist modal not fully mobile-optimized
- Modals don't respect safe areas (notch/Dynamic Island)
- No swipe-to-dismiss on mobile
- Keyboard handling could be improved

**Improvements:**
- [ ] Convert modals to bottom sheets on mobile
- [ ] Add swipe-to-dismiss gesture
- [ ] Respect safe area insets (iOS notch/Dynamic Island)
- [ ] Improve keyboard handling (scroll to focused input)
- [ ] Add backdrop blur for better focus
- [ ] Animate modals with spring physics

**Components to Modify:**
- `src/app/playlists/page.tsx` (create playlist modal)
- Create `src/components/MobileBottomSheet.tsx` (enhanced)
- `src/components/BottomSheet.tsx` (if exists)

**Design Notes:**
- Bottom sheets should slide up from bottom
- Add drag handle indicator
- Maximum height: 90vh on mobile
- Backdrop should be semi-transparent with blur

---

### 1.4 Search Experience Enhancement
**Status:** 🔴 Not Started  
**Priority:** Medium  
**Effort:** 2 days

**Issues:**
- Search bar could be more discoverable
- Recent searches UI could be improved
- No search suggestions/autocomplete
- Search results pagination could be smoother

**Improvements:**
- [ ] Add search icon to header (quick access)
- [ ] Improve recent searches display (chips with icons)
- [ ] Add search suggestions/autocomplete
- [ ] Implement infinite scroll for search results
- [ ] Add search filters (by type: tracks, artists, albums)
- [ ] Improve empty search state

**Components to Modify:**
- `src/components/MobileSearchBar.tsx`
- `src/app/page.tsx` (search page)
- Create `src/components/SearchSuggestions.tsx` (new)

**Design Notes:**
- Search icon in header should open full-screen search on mobile
- Recent searches as horizontal scrollable chips
- Autocomplete dropdown below search input
- Filters as horizontal tabs

---

### 1.5 Playlist Detail Page Mobile Optimization
**Status:** 🔴 Not Started  
**Priority:** Medium  
**Effort:** 2-3 days

**Issues:**
- Playlist detail page not reviewed for mobile
- Track list could be more touch-friendly
- Playlist actions (edit, share) need mobile optimization

**Improvements:**
- [ ] Review and optimize playlist detail layout
- [ ] Improve track list touch targets
- [ ] Add swipe actions to tracks (play, queue, favorite)
- [ ] Optimize playlist header (cover, title, actions)
- [ ] Add floating action button for play all
- [ ] Improve empty state

**Files to Review:**
- `src/app/playlists/[id]/page.tsx`
- `src/components/EnhancedTrackCard.tsx`

**Design Notes:**
- Playlist header should be sticky on scroll
- Track cards should have larger touch targets
- Swipe actions: left (play), right (queue/favorite)
- Play all button should be prominent

---

## Phase 2: Performance & Optimization

### 2.1 Image Optimization
**Status:** 🔴 Not Started  
**Priority:** High  
**Effort:** 3-4 days

**Issues:**
- Images not using responsive sizes attribute
- No lazy loading strategy for below-fold images
- Album covers could use better quality/size balance
- No placeholder blur effect

**Improvements:**
- [ ] Add proper `sizes` attribute to all Next.js Image components
- [ ] Implement lazy loading for images below fold
- [ ] Add blur placeholder for images
- [ ] Optimize image quality based on device pixel ratio
- [ ] Use WebP format where supported
- [ ] Implement image preloading for critical images

**Components to Modify:**
- All components using `next/image`
- `src/components/TrackCard.tsx`
- `src/components/EnhancedTrackCard.tsx`
- `src/components/MobilePlayer.tsx`
- `src/app/playlists/page.tsx`

**Technical Notes:**
- Use `sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"`
- Quality: 75 for thumbnails, 85-90 for large displays
- Add `loading="lazy"` for non-critical images
- Use `placeholder="blur"` with base64 blur data

---

### 2.2 Code Splitting & Bundle Optimization
**Status:** 🔴 Not Started  
**Priority:** High  
**Effort:** 3-4 days

**Issues:**
- Large initial bundle size
- Visualizer components loaded even when not used
- Some components not code-split
- Heavy dependencies loaded upfront

**Improvements:**
- [ ] Analyze bundle size (use `@next/bundle-analyzer`)
- [ ] Implement route-based code splitting
- [ ] Lazy load visualizer components (already done, verify)
- [ ] Split heavy dependencies (framer-motion, tone.js)
- [ ] Use dynamic imports for non-critical components
- [ ] Optimize tree-shaking

**Files to Modify:**
- `next.config.js` (add bundle analyzer)
- Review all dynamic imports
- `src/components/visualizers/` (ensure lazy loaded)

**Technical Notes:**
- Target: < 200KB initial JS bundle
- Use `next/dynamic` with `ssr: false` for client-only components
- Split vendor chunks for better caching
- Use React.lazy for route components

---

### 2.3 List Virtualization
**Status:** 🔴 Not Started  
**Priority:** Medium  
**Effort:** 4-5 days

**Issues:**
- Long lists (search results, playlists) render all items
- Performance degrades with 100+ items
- Memory usage high with large lists

**Improvements:**
- [ ] Implement virtual scrolling for long lists
- [ ] Use `react-window` or `@tanstack/react-virtual`
- [ ] Virtualize search results
- [ ] Virtualize playlist tracks
- [ ] Virtualize library items
- [ ] Maintain scroll position on navigation

**Components to Modify:**
- `src/app/page.tsx` (search results)
- `src/app/library/page.tsx` (library items)
- `src/app/playlists/[id]/page.tsx` (playlist tracks)
- Create `src/components/VirtualizedList.tsx` (new)

**Technical Notes:**
- Use `@tanstack/react-virtual` (lighter than react-window)
- Estimate item height for better performance
- Maintain scroll position in sessionStorage
- Add loading states for virtualized items

---

### 2.4 Network & Caching Strategy
**Status:** 🔴 Not Started  
**Priority:** Medium  
**Effort:** 2-3 days

**Issues:**
- No offline support
- API calls not cached effectively
- No network status awareness
- Images not cached properly

**Improvements:**
- [ ] Implement service worker for caching
- [ ] Cache API responses (tRPC queries)
- [ ] Add network status detection
- [ ] Show offline indicator
- [ ] Cache images with proper headers
- [ ] Implement stale-while-revalidate strategy

**Files to Modify:**
- Create `public/sw.js` (service worker)
- `next.config.js` (PWA config)
- `src/hooks/useNetworkStatus.ts` (new)
- `src/contexts/NetworkContext.tsx` (new)

**Technical Notes:**
- Use Workbox for service worker
- Cache strategy: NetworkFirst for API, CacheFirst for images
- Cache duration: 1 hour for API, 7 days for images
- Show toast when offline

---

## Phase 3: Progressive Web App

### 3.1 PWA Configuration
**Status:** 🔴 Not Started  
**Priority:** Medium  
**Effort:** 2-3 days

**Issues:**
- No PWA manifest
- No service worker
- No install prompt
- No offline support

**Improvements:**
- [ ] Create `public/manifest.json`
- [ ] Add app icons (all sizes)
- [ ] Implement service worker
- [ ] Add install prompt
- [ ] Configure app shortcuts
- [ ] Add splash screens

**Files to Create:**
- `public/manifest.json`
- `public/sw.js` (service worker)
- `src/components/InstallPrompt.tsx` (new)

**Technical Notes:**
- Manifest: name, short_name, icons, theme_color, background_color
- Icons: 192x192, 512x512 (required), plus iOS sizes
- Service worker: cache static assets and API responses
- Install prompt: Show after user engagement

---

### 3.2 Offline Support
**Status:** 🔴 Not Started  
**Priority:** Medium  
**Effort:** 3-4 days

**Issues:**
- No offline functionality
- No cached content
- Audio playback stops when offline

**Improvements:**
- [ ] Cache recently played tracks
- [ ] Cache search results
- [ ] Cache user library
- [ ] Show offline indicator
- [ ] Queue tracks for when online
- [ ] Cache album art

**Components to Modify:**
- Service worker (cache strategy)
- `src/contexts/AudioPlayerContext.tsx` (offline handling)
- Create `src/components/OfflineIndicator.tsx` (new)

**Technical Notes:**
- Cache last 50 played tracks
- Cache last 20 search queries
- Use IndexedDB for larger data
- Show toast: "You're offline. Playing cached content."

---

## Phase 4: Advanced Features

### 4.1 Gesture Enhancements
**Status:** 🔴 Not Started  
**Priority:** Low  
**Effort:** 3-4 days

**Issues:**
- Could have more intuitive gestures
- No long-press actions
- No double-tap actions

**Improvements:**
- [ ] Add long-press context menu
- [ ] Double-tap to like/favorite
- [ ] Swipe down to refresh (already exists, verify)
- [ ] Pinch to zoom album art
- [ ] Three-finger swipe for queue

**Components to Modify:**
- `src/components/TrackCard.tsx`
- `src/components/EnhancedTrackCard.tsx`
- `src/components/MobilePlayer.tsx`

**Design Notes:**
- Long-press: Show action sheet (play, queue, favorite, add to playlist)
- Double-tap: Quick favorite toggle
- Pinch: Zoom album art in player (with haptic feedback)

---

### 4.2 Haptic Feedback Enhancement
**Status:** 🔴 Not Started  
**Priority:** Low  
**Effort:** 1-2 days

**Issues:**
- Haptic feedback exists but could be more comprehensive
- No haptic patterns for different actions
- Missing haptics on some interactions

**Improvements:**
- [ ] Add haptic feedback to all major actions
- [ ] Create haptic patterns (success, error, warning)
- [ ] Add haptic feedback to gestures
- [ ] Haptic on track change
- [ ] Haptic on queue add/remove

**Files to Modify:**
- `src/utils/haptics.ts` (enhance)
- All interactive components

**Technical Notes:**
- Use Vibration API
- Patterns: light (tap), medium (action), heavy (error)
- Respect user preferences (reduced motion)

---

### 4.3 Dark Mode & Theme Refinement
**Status:** 🔴 Not Started  
**Priority:** Low  
**Effort:** 2-3 days

**Issues:**
- Dark mode is default but could be refined
- No theme customization
- Colors could be more vibrant on OLED screens

**Improvements:**
- [ ] Optimize colors for OLED screens (true black)
- [ ] Add theme customization (accent colors)
- [ ] Improve contrast ratios
- [ ] Add system theme detection
- [ ] Smooth theme transitions

**Files to Modify:**
- `src/styles/globals.css`
- Create `src/contexts/ThemeContext.tsx` (new)

**Design Notes:**
- Use #000000 for true black on OLED
- Accent colors: Allow user to choose
- System theme: Follow device preference
- Transitions: 300ms ease-in-out

---

## Implementation Guidelines

### Code Quality
- Follow existing code style and patterns
- Use TypeScript for all new code
- Add JSDoc comments for complex functions
- Write unit tests for new utilities
- Test on real devices (iOS and Android)

### Testing Checklist
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on tablet (iPad, Android tablet)
- [ ] Test in landscape orientation
- [ ] Test with slow 3G connection
- [ ] Test offline functionality
- [ ] Test with screen readers
- [ ] Test with reduced motion preference

### Performance Targets
- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 3.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Input Delay (FID):** < 100ms
- **Bundle Size:** < 200KB initial JS

### Accessibility Requirements
- Minimum touch target: 44x44px (iOS), 48x48px (Android)
- Color contrast: WCAG AA minimum
- Keyboard navigation: All interactive elements
- Screen reader: Proper ARIA labels
- Reduced motion: Respect user preference

---

## Success Metrics

### User Experience
- **Task Completion Rate:** > 90%
- **Error Rate:** < 5%
- **User Satisfaction:** > 4.5/5
- **Time to Complete Task:** < 30s for common tasks

### Performance
- **Page Load Time:** < 3s on 3G
- **Time to First Track:** < 2s
- **Scroll FPS:** > 55fps
- **Memory Usage:** < 100MB

### Engagement
- **Daily Active Users:** Track growth
- **Session Duration:** Track improvement
- **Return Rate:** Track improvement
- **Install Rate:** Track PWA installs

---

## Dependencies & Tools

### Required Packages
- `@tanstack/react-virtual` - Virtual scrolling
- `workbox-webpack-plugin` - Service worker
- `next-pwa` - PWA support for Next.js
- `@next/bundle-analyzer` - Bundle analysis

### Development Tools
- Chrome DevTools (Performance, Lighthouse)
- React DevTools Profiler
- WebPageTest
- Real device testing

---

## Notes & Considerations

### Browser Compatibility
- iOS Safari 14+
- Chrome Android 90+
- Samsung Internet 14+
- Firefox Android 88+

### Device Considerations
- Support devices with 2GB+ RAM
- Optimize for screens 320px - 768px width
- Handle notches and safe areas
- Support both portrait and landscape

### Future Considerations
- Native app (React Native)
- Apple Music integration
- Spotify integration
- Social features (sharing, comments)

---

## Appendix: Component Inventory

### Mobile-Specific Components
- ✅ `MobilePlayer.tsx` - Full-screen mobile player
- ✅ `MobileNavigation.tsx` - Bottom navigation
- ✅ `MobileSwipeablePanes.tsx` - Swipeable content panes
- ✅ `MobileContentWrapper.tsx` - Mobile content wrapper
- ✅ `MobileSearchBar.tsx` - Mobile search interface
- ⚠️ `Header.tsx` - Needs mobile optimization
- ⚠️ `BottomSheet.tsx` - Needs enhancement

### Shared Components (Need Mobile Review)
- `TrackCard.tsx`
- `EnhancedTrackCard.tsx`
- `Player.tsx` (desktop)
- `Queue.tsx`
- `Equalizer.tsx`

### Pages (Need Mobile Review)
- ✅ `app/page.tsx` - Search (mostly done)
- ✅ `app/library/page.tsx` - Library (mostly done)
- ✅ `app/playlists/page.tsx` - Playlists (mostly done)
- ⚠️ `app/playlists/[id]/page.tsx` - Playlist detail (needs review)
- ⚠️ `app/[userhash]/page.tsx` - Profile (needs review)

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Next Review:** After Phase 1 completion

