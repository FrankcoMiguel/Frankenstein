# Frankenstein's Lab - Architecture Guide

## 📁 Project Structure

```
src/
├── components/
│   ├── ElectricParticles.tsx      # Canvas-based particle system
│   ├── GlitchText.tsx              # Text glitch effect component
│   ├── VoltageButton.tsx           # Interactive button with spark effects
│   ├── IncubationCapsule.tsx       # Project card component
│   ├── FrankensteinLabHero.tsx    # Main hero component (complete page)
│   ├── AdvancedProjectsGrid.tsx    # Grid with filtering
│   ├── ComponentShowcase.tsx       # Component demonstration
│   ├── FrankensteinThemeProvider.tsx # Theme context provider
│   └── index.ts                    # Barrel exports
│
├── pages/
│   ├── FrankensteinLab.tsx        # Landing page wrapper
│   ├── FrankensteinLabDemo.tsx    # Full demo with showcase
│   └── ...other pages
│
├── patterns/
│   └── frankenstein-patterns.tsx   # Reusable layout patterns
│
├── types/
│   ├── frankenstein.ts            # TypeScript types and interfaces
│   └── ...other types
│
├── utils/
│   └── frankenstein.ts            # Utility functions and helpers
│
├── styles/
│   └── frankenstein.css           # Custom animations (optional)
│
└── index.css                       # Global styles with animations
```

---

## 🎯 Component Hierarchy

```
App
└── FrankensteinLabHero (Main Container)
    ├── ElectricParticles (Background effect)
    ├── Hero Section
    │   ├── GlitchText (Title)
    │   ├── VoltageButton (CTA buttons)
    │   └── Animated scroll indicator
    ├── Projects Section
    │   └── Grid of IncubationCapsule
    │       ├── Project image
    │       ├── Bubble animations
    │       ├── Status indicator
    │       └── Tags
    ├── Stats Section
    │   └── Statistics cards
    └── Footer
        └── Social links with hover effects
```

---

## 🔧 Component Specifications

### ElectricParticles
**Purpose:** Canvas-based animated particles background  
**Dependencies:** None (HTML5 Canvas)  
**Performance:** O(n) where n = particle count (max ~50)  
**Renders:** Full viewport canvas overlay  

**Props:**
- `color?`: string (default: '#39FF14')
- `speed?`: number (default: varies per particle)
- `density?`: number (0-100, default: varies)

### GlitchText
**Purpose:** Creates occasional glitch effects on text  
**Dependencies:** React hooks  
**Performance:** Minimal (CSS animations)  

**Props:**
- `children`: string (text to display)
- `className?`: string (Tailwind classes)
- `intensity?`: number (0-1, default: 0.3)

### VoltageButton
**Purpose:** Interactive button with electrical effects  
**Dependencies:** Framer Motion  
**Performance:** GPU accelerated (uses transform)  

**Props:**
- `children`: ReactNode
- `variant?`: 'primary' | 'secondary' | 'ghost'
- `size?`: 'sm' | 'md' | 'lg'
- `onClick?`: function
- `disabled?`: boolean
- `type?`: 'button' | 'submit' | 'reset'

### IncubationCapsule
**Purpose:** Project showcase card  
**Dependencies:** Framer Motion, Lucide React  
**Performance:** Bubble animations are GPU accelerated  

**Props:**
- `title`: string
- `description`: string
- `tags`: string[]
- `imageUrl?`: string
- `index?`: number (for stagger animation)
- `onClick?`: function

### FrankensteinLabHero
**Purpose:** Complete landing page  
**Dependencies:** All other components  
**Performance:** Optimized with viewport detection  

**Props:**
- `projects?`: ProjectData[] (default: 6 demo projects)
- `onProjectClick?`: (project, index) => void
- `title?`: string (default: 'FRANKENSTEIN LAB')
- `subtitle?`: string
- `showFooter?`: boolean (default: true)
- `showStats?`: boolean (default: true)

---

## 🎨 Styling Architecture

### CSS Strategy
1. **Tailwind CSS**: Utility-first for responsive design
2. **Custom CSS**: Global animations in `index.css`
3. **Inline Styles**: Framer Motion dynamic values
4. **CSS Variables**: Theme colors (`:root`)

### Key Animation Classes
```css
.neon-text           /* Glowing text effect */
.neon-border         /* Glowing border effect */
.glass-dark          /* Glassmorphism overlay */
.circuit-bg          /* Circuit pattern background */
.glow-on-hover       /* Hover glow effect */
.transition-glow     /* Smooth glow transition */
```

### Custom Properties
```css
--neon-green: #39ff14      /* Primary accent color */
--dark-bg: #050505         /* Background color */
--theme-primary: var(--neon-green)  /* Theme customization */
```

---

## 🚀 Performance Optimization Techniques

### 1. **Canvas Rendering**
- Particles use HTML5 Canvas instead of DOM
- Reduces paint operations significantly
- Maintained at ~60 FPS

### 2. **Viewport Detection**
- Animations only trigger when elements are visible
- Uses Framer Motion's `whileInView`
- Reduces CPU/GPU load on load

### 3. **GPU Acceleration**
- All animations use `transform` and `opacity`
- Avoids expensive properties (width, height, position)
- Better performance on mobile devices

### 4. **Image Optimization**
- Uses `object-fit: cover` for consistent sizing
- Lazy loading ready (can be added via Intersection Observer)
- Responsive image sizes with srcset

### 5. **Debouncing & Throttling**
- Available in `FrankensteinUtils.performance`
- Ready for scroll and resize events
- Prevents animation jank

### 6. **Motion Preferences**
- Respects `prefers-reduced-motion`
- Accessible for users with motion sensitivity
- Graceful degradation on older browsers

---

## 🔌 Integration Patterns

### Pattern 1: Direct Component Use
```tsx
<FrankensteinLabHero projects={data} />
```

### Pattern 2: Custom Layout
```tsx
<div>
  <ElectricParticles />
  <MyCustomHero />
  <AdvancedProjectsGrid projects={data} />
</div>
```

### Pattern 3: With Theme Provider
```tsx
<FrankensteinThemeProvider initialTheme="cyber">
  <App />
</FrankensteinThemeProvider>
```

### Pattern 4: Using Patterns
```tsx
import { FrankensteinPatterns } from './patterns';

<FrankensteinPatterns.TimelinePortfolio projects={data} />
```

---

## 🧪 Component Testing Checklist

- [ ] Renders without errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] Animations perform smoothly (60 FPS)
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Hover effects are responsive
- [ ] Images load correctly
- [ ] Text is readable on all backgrounds
- [ ] No console errors/warnings
- [ ] Respects `prefers-reduced-motion`

---

## 🌐 Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Canvas | ✓ | ✓ | ✓ | ✓ |
| CSS Grid | ✓ | ✓ | ✓ | ✓ |
| Flexbox | ✓ | ✓ | ✓ | ✓ |
| CSS Variables | ✓ | ✓ | ✓ | ✓ |
| Transform | ✓ | ✓ | ✓ | ✓ |
| Backdrop Filter | ✓ | ✓ | ✓ (12.1+) | ✓ |

---

## 📦 Bundle Size Impact

- **Framer Motion**: ~45KB (gzipped)
- **Lucide React**: ~15KB (gzipped)
- **Component Code**: ~20KB (gzipped)
- **Total Addition**: ~80KB (gzipped)

---

## 🔄 Data Flow

```
App State
    ↓
FrankensteinLabHero Props (projects, onProjectClick)
    ↓
├─ ElectricParticles (self-contained)
├─ Hero Section (static UI + animations)
├─ Projects Grid
│   └─ IncubationCapsule[] (receives project data)
│       └─ onClick → onProjectClick callback
├─ Stats Section (static or configurable)
└─ Footer (social links, static)
```

---

## 🎯 Future Enhancement Ideas

1. **Dark/Light Theme Toggle**
   - Already prepared with `FrankensteinThemeProvider`
   - Add light theme to `colorThemes`

2. **Filtering System**
   - Use `AdvancedProjectsGrid` component
   - Add category/tag filtering

3. **Search Functionality**
   - Filter projects by title/description
   - Real-time search with debouncing

4. **3D Effects (Optional)**
   - Integration with Three.js/React Three Fiber
   - 3D particle system (advanced version)

5. **Animation Presets**
   - Multiple animation style options
   - User preference selection

6. **Content Management**
   - CMS integration (Strapi, Contentful, etc.)
   - Dynamic project loading from API

7. **Analytics**
   - Track component interactions
   - Monitor performance metrics

---

## 📝 Code Style Guidelines

### Naming Conventions
- Components: PascalCase (e.g., `IncubationCapsule`)
- Functions: camelCase (e.g., `generateBubbles`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_PARTICLES`)
- CSS Classes: kebab-case (e.g., `.neon-glow`)

### Component Structure
```tsx
// 1. Imports
// 2. Type/Interface definitions
// 3. Component function
// 4. Hooks (useState, useEffect, etc.)
// 5. Event handlers
// 6. Render JSX
// 7. Export
```

### Documentation
- JSDoc comments for exported components
- Inline comments for complex logic
- Type hints for all props

---

## 🔗 Related Documentation

- [Quick Start Guide](./QUICKSTART.md)
- [Complete README](./FRANKENSTEIN_LAB_README.md)
- [Component Types](./src/types/frankenstein.ts)
- [Utility Functions](./src/utils/frankenstein.ts)

---

## 🚀 Deployment Checklist

- [ ] All components tested
- [ ] Images optimized
- [ ] CSS is minified
- [ ] JavaScript is bundled
- [ ] TypeScript has no errors
- [ ] ESLint passes
- [ ] Performance is optimized
- [ ] Accessibility is verified
- [ ] Mobile experience tested
- [ ] Browser compatibility checked

---

**Made with ⚡ and precision engineering**
