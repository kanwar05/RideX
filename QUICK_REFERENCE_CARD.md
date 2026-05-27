# 🎨 RideX Premium Design System - Quick Reference Card

> Print this page and keep it on your desk! 📋

---

## 🌟 CORE CLASSES (Copy & Paste Ready)

### Glassmorphism Effects

```html
<!-- Light glass -->
<div class="glass-effect">Content</div>

<!-- Dark glass -->
<div class="glass-dark">Content</div>

<!-- Premium glass with shadow -->
<div class="glassmorphism">Content</div>

<!-- Sizes: sm, lg -->
<div class="glass-sm">Small blur</div>
<div class="glass-lg">Large blur</div>
```

### Premium Cards

```html
<!-- Basic card -->
<div class="premium-card">Content</div>

<!-- Card with hover lift -->
<div class="premium-card hover-lift">Content</div>

<!-- Card with glow border -->
<div class="premium-card glow-border">Content</div>
```

### Premium Buttons

```html
<!-- Primary button -->
<button class="btn-premium">Click me</button>

<!-- Secondary button -->
<button class="glass-lg hover-lift">Cancel</button>

<!-- Small button -->
<button class="glass-sm">Action</button>
```

### Premium Inputs

```html
<!-- Use PremiumInput component -->
<PremiumInput label="Email" placeholder="Enter email" icon="{FaEnvelope}" />
```

### Shadows & Glows

```html
<!-- Glow shadows -->
<div class="shadow-glow-sm">Small glow</div>
<div class="shadow-glow-md">Medium glow</div>
<div class="shadow-glow-lg">Large glow</div>

<!-- Soft shadows -->
<div class="soft-shadow">Soft shadow</div>

<!-- Hover glow -->
<div class="hover-shadow">Hover me</div>

<!-- Pulsing glow -->
<div class="pulse-glow">Pulsing</div>
```

---

## ⚡ ANIMATIONS (Easy to Use)

### Hover Effects

```html
<!-- Lift on hover -->
<div class="hover-lift">Hover me</div>

<!-- Scale on hover -->
<div class="hover-scale">Hover me</div>

<!-- Glow on hover -->
<div class="hover-shadow">Hover me</div>
```

### Loading Effects

```html
<!-- Shimmer loading -->
<div class="shimmer h-12 rounded-lg"></div>

<!-- Shimmer pulse -->
<div class="shimmer-pulse">Loading...</div>

<!-- Skeleton loader -->
<SkeletonLoader count="{3}" className="h-12" />
```

### Scroll Animations

```html
<!-- Reveal on scroll -->
<div class="scroll-reveal">Content</div>

<!-- Slide from left -->
<div class="slide-in-left">Content</div>

<!-- Slide from right -->
<div class="slide-in-right">Content</div>
```

### Text & Icons

```html
<!-- Animated gradient text -->
<span class="text-gradient-animated">Gradient</span>

<!-- Spinning icon -->
<i class="ri-loader-4-line icon-spin"></i>

<!-- Bouncing icon -->
<i class="ri-arrow-down-line icon-bounce"></i>
```

---

## 📦 COMPONENTS (Import & Use)

### PremiumNavbar

```jsx
import PremiumNavbar from "@/components/PremiumNavbar";

<PremiumNavbar userType="user" />;
```

### PremiumHeroSection

```jsx
import PremiumHeroSection from "@/components/PremiumHeroSection";

<PremiumHeroSection />;
```

### PremiumCard

```jsx
import { PremiumCard } from "@/components/PremiumComponents";

<PremiumCard>Content</PremiumCard>;
```

### RideCard

```jsx
import { RideCard } from "@/components/PremiumComponents";

<RideCard
  vehicle={vehicle}
  fare={18.5}
  isSelected={selected}
  onClick={handleSelect}
/>;
```

### PremiumInput

```jsx
import { PremiumInput } from "@/components/PremiumComponents";

<PremiumInput label="Email" placeholder="Enter email" icon={FaEnvelope} />;
```

### LoadingSpinner

```jsx
import { LoadingSpinner } from '@/components/PremiumComponents';

<LoadingSpinner size="md" />
<LoadingSpinner fullScreen />
```

### Toast Notification

```jsx
import { Toast } from "@/components/PremiumComponents";

<Toast message="Success!" type="success" onClose={() => {}} />;
```

### Tabs

```jsx
import { Tabs } from "@/components/PremiumComponents";

<Tabs
  tabs={[
    { id: "tab1", label: "Tab 1" },
    { id: "tab2", label: "Tab 2" },
  ]}
  activeTab={active}
  onChange={setActive}
/>;
```

### Timeline

```jsx
import { Timeline } from "@/components/PremiumComponents";

<Timeline events={events} />;
```

### SkeletonLoader

```jsx
import { SkeletonLoader } from "@/components/PremiumComponents";

<SkeletonLoader count={3} className="h-12" />;
```

### EnhancedBookingFlow

```jsx
import EnhancedBookingFlow from "@/components/EnhancedBookingFlow";

<EnhancedBookingFlow onComplete={handleDone} />;
```

---

## 🎯 COMMON PATTERNS

### Booking Card

```jsx
<PremiumCard hover-lift>
  <div className="flex items-center justify-between">
    <img src={vehicle.image} alt="car" />
    <span className="text-2xl font-bold text-primary">${fare}</span>
  </div>
</PremiumCard>
```

### Action Button Row

```jsx
<div className="grid grid-cols-2 gap-4">
  <button className="py-3 rounded-lg glass-lg hover-lift">Cancel</button>
  <button className="py-3 rounded-lg btn-premium">Confirm</button>
</div>
```

### Info Card

```jsx
<PremiumCard>
  <p className="text-text-muted text-sm mb-2">Label</p>
  <p className="text-2xl font-bold text-primary">Value</p>
</PremiumCard>
```

### Divider

```jsx
<div className="divider-gradient"></div>
```

### Badge

```jsx
<span className="badge-premium">New</span>
```

---

## 🎨 COLOR REFERENCE

### Quick Colors

```
Primary:      #4F46E5
Secondary:    #10B981
Accent:       #F59E0B
Success:      #22C55E
Warning:      #FBBF24
Error:        #EF4444
```

### Text Colors

```
Main:         text-text-main
Muted:        text-text-muted
Primary:      text-primary
Secondary:    text-secondary
Success:      text-green-400
Warning:      text-yellow-400
Error:        text-red-400
```

---

## 📱 RESPONSIVE QUICK TIPS

```jsx
// Text scaling
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  Title
</h1>

// Grid layout
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {items}
</div>

// Responsive spacing
<div className="px-4 sm:px-6 md:px-8 lg:px-12">
  Content
</div>

// Safe areas (notched devices)
<nav className="safe-area-top">Navbar</nav>
<footer className="safe-area-bottom">Footer</footer>
```

---

## ♿ ACCESSIBILITY QUICK TIPS

```jsx
// Focus indicators
<button className="focus-ring">Button</button>
<input className="focus-visible-ring" />

// ARIA labels
<button aria-label="Close menu">×</button>

// Semantic HTML
<nav aria-label="Main navigation">
  {nav items}
</nav>

// Skip link (top of page)
<a href="#main-content" className="sr-only">
  Skip to main content
</a>
```

---

## 🚀 TOP 10 MOST USED CLASSES

1. ✅ `.premium-card` - All cards
2. ✅ `.btn-premium` - Primary buttons
3. ✅ `.hover-lift` - Interactive elements
4. ✅ `.glass-lg` - Secondary panels
5. ✅ `.shadow-glow-md` - Emphasis
6. ✅ `.smooth-transition` - State changes
7. ✅ `.text-gradient-animated` - Headings
8. ✅ `.shimmer` - Loading states
9. ✅ `.focus-ring` - Accessibility
10. ✅ `.safe-area-top` - Mobile headers

---

## 🐛 TROUBLESHOOTING QUICK FIX

| Problem            | Solution                      |
| ------------------ | ----------------------------- |
| Animation janky    | Add `.gpu-accelerated`        |
| No blur effect     | Check backdrop-filter support |
| Focus ring hidden  | Verify contrast, use DevTools |
| Mobile broken      | Check responsive classes      |
| Color looks off    | Use DevTools color picker     |
| Text too small     | Minimum 16px on mobile        |
| Scrollbar ugly     | Add `.custom-scrollbar`       |
| Shadow not visible | Use `.shadow-glow-md` instead |

---

## 📚 FILE LOCATIONS

```
src/
├── components/
│   ├── PremiumNavbar.jsx
│   ├── PremiumHeroSection.jsx
│   ├── PremiumComponents.jsx
│   └── EnhancedBookingFlow.jsx
├── index.css                    ← All utilities here
└── pages/
    ├── Home.jsx                 ← Use EnhancedBookingFlow
    ├── Start.jsx                ← Use PremiumHeroSection
    ├── UserLogin.jsx            ← Use PremiumCard, PremiumInput
    └── ...

Docs/
├── PREMIUM_UI_AUDIT_AND_REDESIGN.md
├── IMPLEMENTATION_GUIDE.md
├── COMPONENT_USAGE_EXAMPLES.md
├── MASTER_IMPLEMENTATION_CHECKLIST.md
└── QUICK_REFERENCE_CARD.md      ← You are here!
```

---

## 💡 PRO TIPS

1. **Combine classes:** `premium-card hover-lift shadow-glow-md`
2. **Mobile first:** Write mobile, then add `sm:`, `md:`, `lg:`
3. **Keep transitions smooth:** All use `cubic-bezier(0.4, 0, 0.2, 1)`
4. **Test on real devices:** Browser doesn't show everything
5. **Use CSS variables:** Easier to maintain colors globally
6. **Check DevTools:** Lighthouse and DevTools are your friends
7. **Performance matters:** 60fps is the target
8. **Accessibility first:** Users with disabilities are users too
9. **Mobile users:** ~60% of traffic comes from mobile
10. **Document your code:** Future you will thank you!

---

## ✨ REMEMBER

- **Glass isn't glass without blur** → check backdrop-filter support
- **Animations aren't animations without 60fps** → use transform/opacity
- **Buttons aren't buttons without focus rings** → add `.focus-ring`
- **Text isn't readable without contrast** → use contrast checker
- **Design isn't complete without mobile** → test on real devices
- **Accessibility isn't optional** → it's a feature

---

## 📞 QUICK HELP

**Need a component?** → Check `COMPONENT_USAGE_EXAMPLES.md`

**How to use CSS utilities?** → Check `IMPLEMENTATION_GUIDE.md`

**What was changed?** → Check `PREMIUM_UI_AUDIT_AND_REDESIGN.md`

**Full checklist?** → Check `MASTER_IMPLEMENTATION_CHECKLIST.md`

---

## 🎯 30-SECOND CHECKLIST

Before pushing code:

- [ ] Tested on mobile (real device if possible)
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Colors have contrast
- [ ] Animations at 60fps (DevTools)
- [ ] No console errors
- [ ] Loading states added
- [ ] Accessibility labels added

---

**Made with ❤️ for RideX**  
**Version:** 1.0.0 | **Date:** May 26, 2026 | **Status:** ✅ Production Ready

---

> Print this card and tape it to your monitor! 📌
