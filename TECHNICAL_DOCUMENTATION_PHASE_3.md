# Likhavat Printing Press - Technical Documentation
## Phase 3: Core Components Deep Dive

---

## Table of Contents
1. Phase 1: Project Overview & Technology Stack ✅
2. Phase 2: Project Architecture & File Structure ✅
3. **Phase 3: Core Components Deep Dive** (This Document)
4. Phase 4: Advanced Features & Business Logic
5. Phase 5: Styling, Performance & Deployment

---

## Introduction

This phase provides **line-by-line explanations** of all core components in the application. Each component is broken down with:
- Purpose and responsibility
- Complete code walkthrough
- React concepts explained
- State management details
- Props interface
- Usage examples
- Common patterns

**Perfect for:** Beginners wanting to understand how React components work in a real application.

---

## 1. Header Component

### 1.1 Purpose

The Header is the **navigation bar** that appears at the top of every page. It provides:
- Company branding (logo and name)
- Hamburger menu for mobile navigation
- Links to all major pages
- Overlay backdrop for mobile menu

**File Location:** `/src/components/Header.tsx`

---

### 1.2 Complete Code with Explanations

```tsx
// IMPORTS SECTION
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
```

**What each import does:**

1. `React, { useState }` - React library + Hook for state management
2. `FaBars, FaTimes` - Icons from react-icons library (☰ hamburger and ✕ close)
3. `Link` - React Router's navigation component (no page reload)

---

```tsx
const Header = () => {
  // STATE: Controls whether mobile menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false);
```

**State Management:**
- `menuOpen`: Boolean (true/false) tracking menu visibility
- `setMenuOpen`: Function to update `menuOpen`
- `useState(false)`: Initial value is `false` (menu closed)

**How it works:**
```tsx
// When hamburger clicked:
setMenuOpen(true)  // menuOpen becomes true → menu slides in

// When close (X) clicked:
setMenuOpen(false) // menuOpen becomes false → menu slides out
```

---

```tsx
  return (
    <header className="absolute top-0 left-0 w-full z-50">
```

**CSS Classes Explained:**
- `absolute`: Positions header over content (doesn't push content down)
- `top-0 left-0`: Aligns to top-left corner
- `w-full`: 100% width
- `z-50`: High z-index (appears above other content)

**Visual:**
```
┌────────────────────────────────────┐
│  HEADER (absolute, z-50)          │  ← Floats above
├────────────────────────────────────┤
│  Page Content (below header)      │
│                                    │
```

---

```tsx
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-white">
```

**Layout Classes:**
- `max-w-7xl`: Maximum width of 1280px (keeps content centered)
- `mx-auto`: Centers horizontally
- `px-4 py-4`: Padding (4 units horizontal, 4 units vertical)
- `flex`: Flexbox layout
- `justify-between`: Space between items
- `items-center`: Vertical alignment
- `text-white`: White text color

**Layout Structure:**
```
┌─────────────────────────────────────────┐
│  [Space]     LIKHAWAT      [☰]         │
│              Printing Press             │
└─────────────────────────────────────────┘
```

---

```tsx
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h2
            className="text-3xl font-bold pt-10"
            style={{ fontFamily: "IVY Mode, Sans-serif" }}
          >
            LIKHAWAT
          </h2>
          <span className="text-2xl">Printing Press</span>
        </div>
```

**Centering Technique Explained:**
1. `absolute`: Position absolute (relative to parent)
2. `left-1/2`: Move to 50% from left
3. `transform -translate-x-1/2`: Shift back by half its width
4. Result: **Perfectly centered**

**Visual Explanation:**
```
Before transform:
┌─────────────────────────────────────┐
│              │ LIKHAWAT             │
│              ↑ (50% point)          │
└─────────────────────────────────────┘

After -translate-x-1/2:
┌─────────────────────────────────────┐
│          LIKHAWAT                   │
│             ↑ (centered)            │
└─────────────────────────────────────┘
```

**Inline Style:**
```tsx
style={{ fontFamily: "IVY Mode, Sans-serif" }}
```
- Uses custom font "IVY Mode"
- Fallback to Sans-serif if font not loaded

---

```tsx
        <div className="ml-auto text-white text-xl cursor-pointer" 
             onClick={() => setMenuOpen(true)}>
          <FaBars />
        </div>
```

**Event Handler:**
- `onClick={() => setMenuOpen(true)}`: When clicked, open menu
- `ml-auto`: Pushes to right (margin-left: auto)
- `cursor-pointer`: Shows hand cursor on hover
- `<FaBars />`: Renders ☰ icon

**Flow:**
```
User clicks hamburger → onClick fires → setMenuOpen(true) 
→ menuOpen changes to true → React re-renders → Menu slides in
```

---

### 1.3 Mobile Menu Sidebar

```tsx
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white text-black z-50 
                    transform transition-transform duration-300 ease-in-out 
                    ${menuOpen ? "translate-x-0" : "translate-x-full"} 
                    shadow-lg`}
      >
```

**Dynamic Class Logic:**

```tsx
${menuOpen ? "translate-x-0" : "translate-x-full"}
```

**Explained:**
- **Ternary operator** (condition ? ifTrue : ifFalse)
- If `menuOpen` is true → `translate-x-0` (visible)
- If `menuOpen` is false → `translate-x-full` (hidden off-screen)

**Animation Breakdown:**
```
Closed (translate-x-full):
┌──────────────┐
│   Screen     │[Menu off-screen →]
└──────────────┘

Opening (translate-x-0):
┌──────────────┐
│   Screen  [M]│ ← Menu slides in
└──────────────┘

Classes for smooth animation:
- transition-transform: Animate the transform property
- duration-300: 300ms animation
- ease-in-out: Smooth start and end
```

---

```tsx
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <FaTimes
            className="text-2xl cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>
```

**Close Button:**
- `<FaTimes />`: ✕ icon
- `onClick={() => setMenuOpen(false)}`: Closes menu
- `border-b`: Bottom border separator

---

```tsx
        <div className="flex flex-col gap-6 px-6 py-6 text-base uppercase font-medium">
          <Link to="/about-us" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/careers" onClick={() => setMenuOpen(false)}>Careers</Link>
          <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
          <Link to="/visiting-card-designer" onClick={() => setMenuOpen(false)}>
            Card Designer
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          <hr />
        </div>
```

**Navigation Links:**
- `<Link to="/path">`: React Router navigation (no page reload)
- `onClick={() => setMenuOpen(false)}`: Closes menu after click
- `flex-col`: Vertical stack
- `gap-6`: 1.5rem spacing between links

**Why close menu on click?**
User clicks link → Page changes → Menu should hide automatically

---

### 1.4 Backdrop Overlay

```tsx
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
```

**Conditional Rendering:**
```tsx
{menuOpen && <Component />}
```
- If `menuOpen` is true, render the div
- If `menuOpen` is false, render nothing

**Purpose:**
- Dark transparent overlay behind menu
- Clicking overlay closes menu
- `inset-0`: Covers entire screen
- `bg-opacity-40`: 40% black opacity
- `z-40`: Below menu (z-50) but above content

**Visual:**
```
Menu Open:
┌───────────────────────────┐
│ [Dark Overlay (z-40)]     │
│                    [Menu] │ z-50
│                    [☰]    │
└───────────────────────────┘
         ↑ Click here to close
```

---

### 1.5 Complete Header Flow Diagram

```
Initial State:
menuOpen = false → Menu hidden (translate-x-full)

User clicks hamburger:
onClick fires → setMenuOpen(true)
                    ↓
         menuOpen changes to true
                    ↓
         React re-renders Header
                    ↓
    Menu slides in (translate-x-0)
    Backdrop appears (conditional render)

User clicks backdrop or X:
onClick fires → setMenuOpen(false)
                    ↓
         menuOpen changes to false
                    ↓
         React re-renders Header
                    ↓
    Menu slides out (translate-x-full)
    Backdrop disappears
```

---

## 2. Footer Component

### 2.1 Purpose

The Footer appears at the bottom of every page with:
- Navigation links organized in columns
- Newsletter signup form
- Company logo
- Social media icons
- Copyright and legal links

**File Location:** `/src/components/Footer.tsx`

---

### 2.2 Custom Icon Components

```tsx
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
    />
  </svg>
);
```

**TypeScript Props:**
```tsx
{ className }: { className?: string }
```
- `className?`: Optional prop (? means optional)
- Type is `string`
- Used to customize icon size/color

**SVG Explanation:**
- `viewBox="0 0 24 24"`: Coordinate system (24x24 grid)
- `stroke="currentColor"`: Uses parent's text color
- `<path d="...">`: Drawing instructions for arrow

**Usage:**
```tsx
<ArrowRightIcon className="w-5 h-5 text-blue-500" />
```

---

### 2.3 LinkColumn Component

```tsx
interface LinkColumnProps {
  title: string;
  links: string[];
}

const LinkColumn: React.FC<LinkColumnProps> = ({ title, links }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase mb-4">
      {title}
    </h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
```

**TypeScript Interface:**
```tsx
interface LinkColumnProps {
  title: string;      // Column heading (e.g., "Shop")
  links: string[];    // Array of link names
}
```

**React.FC Type:**
- `React.FC` = React Functional Component
- Provides TypeScript typing for props

**Map Function:**
```tsx
{links.map((link) => ( ... ))}
```
- Loops through each link in array
- Creates `<li>` for each
- `key={link}`: Unique identifier for React

**Example:**
```tsx
<LinkColumn 
  title="Shop" 
  links={['New Products', 'Best Sellers', 'Sale']} 
/>

// Renders:
<div>
  <h3>SHOP</h3>
  <ul>
    <li><a>New Products</a></li>
    <li><a>Best Sellers</a></li>
    <li><a>Sale</a></li>
  </ul>
</div>
```

---

### 2.4 Footer Main Component

```tsx
const Footer: React.FC = () => {
  const shopLinks = ['NEW THIS SEASON', 'ALL PRODUCTS', 'ESSENTIALS'];
  const connectLinks = ['INSTAGRAM', 'FACEBOOK', 'PINTEREST'];
  const legalLinks = ['SHIPPING', 'RETURN'];
  const ourStoryLinks = ['BLOG', 'ABOUT US'];
  const bottomLinks = ['Privacy policy', 'Refund policy', 'Terms of service', 
                       'Shipping policy', 'Contact information'];
```

**Data Arrays:**
- Centralized data management
- Easy to update links
- Can be moved to separate file later

---

### 2.5 Newsletter Form

```tsx
<form
  onSubmit={(e) => e.preventDefault()}
  className="flex items-center border-b border-gray-500 py-2"
>
```

**Event Handler:**
```tsx
onSubmit={(e) => e.preventDefault()}
```
- `e`: Event object
- `preventDefault()`: Stops default form submission
- Why? Prevents page reload (SPA behavior)

**Real implementation would:**
```tsx
const handleSubmit = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  await sendToBackend(email);
  showSuccessMessage();
};
```

---

```tsx
  <input
    type="email"
    placeholder="Email address"
    className="appearance-none bg-transparent border-none w-full text-gray-700 
               mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-gray-400"
    aria-label="Email address"
  />
```

**Accessibility:**
- `aria-label`: Screen reader description
- `type="email"`: Validates email format
- `placeholder`: Hint text

**Styling Classes:**
- `appearance-none`: Removes default browser styling
- `bg-transparent`: No background color
- `border-none`: No border (using parent's border-b)
- `focus:outline-none`: No blue outline when focused

---

### 2.6 Responsive Grid Layout

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
```

**Responsive Breakpoints:**
| Screen Size | Columns | Tailwind Class |
|-------------|---------|----------------|
| Mobile (< 640px) | 1 | `grid-cols-1` |
| Small (640px+) | 2 | `sm:grid-cols-2` |
| Medium (768px+) | 3 | `md:grid-cols-3` |
| Large (1024px+) | 5 | `lg:grid-cols-5` |

**Visual:**
```
Mobile:
┌──────────┐
│  Shop    │
├──────────┤
│  Connect │
└──────────┘

Desktop:
┌────┬────┬────┬────┬────────┐
│Shop│Conn│Lega│Our │Newslet │
└────┴────┴────┴────┴────────┘
```

---

## 3. HeroBanner Component

### 3.1 Purpose

The hero section is the **first thing visitors see** on the homepage:
- Full-screen video background
- Centered text overlay
- Dramatic first impression

**File Location:** `/src/components/HeroBanner.tsx`

---

### 3.2 Complete Code Breakdown

```tsx
import React from "react";
import video from "../assets/video/banner-video (online-video-cutter.com).mp4.mp4";
```

**Import Statement:**
- Webpack/Vite processes video import
- Returns optimized path
- Type-safe in TypeScript

---

```tsx
const HeroBanner = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
```

**Container Classes:**
- `relative`: Positioning context for absolute children
- `w-full`: 100% width
- `h-screen`: 100vh (full viewport height)
- `overflow-hidden`: Hide content outside bounds

**Why h-screen?**
Creates full-screen hero effect on any device:
```
Mobile (667px):     Desktop (1080px):
┌─────────────┐    ┌──────────────────────┐
│             │    │                      │
│    Hero     │    │        Hero          │
│   Section   │    │      Section         │
│             │    │                      │
└─────────────┘    └──────────────────────┘
   100vh              100vh
```

---

```tsx
      <video
        src={video}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      />
```

**Video Attributes:**

1. **src={video}**: Video source (imported file)
2. **className positioning:**
   - `absolute`: Position over section
   - `top-0 left-0`: Align to top-left
   - `w-full h-full`: Fill container
   - `object-cover`: Crop to fill (maintains aspect ratio)
   - `z-0`: Bottom layer

3. **HTML5 video props:**
   - `autoPlay`: Starts automatically
   - `muted`: Required for autoPlay (browser policy)
   - `loop`: Restarts when finished
   - `playsInline`: Prevents fullscreen on iOS

**Layer Stack:**
```
z-20: Text Content (top)
z-10: Dark Overlay (middle)
z-0:  Video Background (bottom)
```

---

```tsx
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
```

**Overlay Purpose:**
- Makes text readable
- Creates professional look
- `inset-0`: Covers entire parent
- `bg-black bg-opacity-30`: 30% black overlay

**Visual Effect:**
```
Without Overlay:         With Overlay:
┌──────────────────┐    ┌──────────────────┐
│ [Bright Video]   │    │ [Darkened Video] │
│ White Text       │    │ White Text       │
│ (hard to read)   │    │ (easy to read)   │
└──────────────────┘    └──────────────────┘
```

---

```tsx
      <div className="relative z-20 h-full flex items-center justify-center 
                      text-white text-center px-4">
        <div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 
                       2xl:text-9xl mb-4"
            style={{ fontWeight: 200, letterSpacing: "-0.01em" }}
          >
            Quality prints <br /> Customize for you
          </h1>
        </div>
      </div>
```

**Responsive Typography:**
| Screen | Text Size | Class |
|--------|-----------|-------|
| Mobile | 2.25rem (36px) | `text-4xl` |
| Small | 3rem (48px) | `sm:text-5xl` |
| Medium | 3.75rem (60px) | `md:text-6xl` |
| Large | 4.5rem (72px) | `lg:text-7xl` |
| XL | 6rem (96px) | `xl:text-8xl` |
| 2XL | 8rem (128px) | `2xl:text-9xl` |

**Typography Styling:**
```tsx
style={{ fontWeight: 200, letterSpacing: "-0.01em" }}
```
- `fontWeight: 200`: Extra light (elegant, modern)
- `letterSpacing: "-0.01em"`: Slightly tighter (improves readability at large sizes)

---

## 4. AboutUsSection Component

### 4.1 Purpose

This component appears on the homepage and provides:
- Brief company introduction
- Call-to-action to full About page
- Founder profile with image

**File Location:** `/src/components/AboutUsSection.tsx`

---

### 4.2 Code Walkthrough

```tsx
import React from 'react';
import FastImage from './FastImage';
import imgABout from '../assets/img/about.jpg';
```

**FastImage Import:**
- Custom optimized image component
- Lazy loads images
- Better performance than `<img>`

---

```tsx
<section className="w-full">
  <div className="text-center border-b border-gray-200 pb-10 pt-16 max-w-4xl mx-auto px-4">
```

**Layout Structure:**
- `text-center`: Center-aligned text
- `border-b`: Bottom border separator
- `max-w-4xl`: Maximum width 896px
- `mx-auto`: Center horizontally
- `px-4`: Horizontal padding

---

```tsx
    <h2 className="text-xl font-semibold tracking-widest mb-4 text-gray-800">
      ABOUT LIKHAWAT
    </h2>
```

**Typography Classes:**
- `text-xl`: 1.25rem (20px)
- `font-semibold`: 600 weight
- `tracking-widest`: Maximum letter spacing (uppercase style)

---

```tsx
    <p className="text-gray-700 text-lg leading-relaxed mb-10">
      Welcome to our printing press business...
    </p>
```

**Readability Classes:**
- `leading-relaxed`: 1.625 line height (better readability)
- `text-lg`: Larger text (18px)

**Why leading-relaxed?**
```
Normal:                  Relaxed:
Welcome to our          Welcome to our
printing business       printing business
where we transform      where we transform
                        ↑ More space = easier to read
```

---

```tsx
    <a href='/about-us' 
       className="mt-10 px-6 py-2 bg-black text-white font-medium text-sm 
                  hover:bg-gray-800 transition" 
       style={{ marginTop: '20px' }}>
      READ MORE
    </a>
```

**Button Styling:**
- `bg-black text-white`: Black button with white text
- `hover:bg-gray-800`: Slightly lighter on hover
- `transition`: Smooth color change

**Why both mt-10 and marginTop: '20px'?**
- Tailwind `mt-10` = 2.5rem (40px)
- Inline `marginTop: '20px'` overrides it
- *Should remove one for consistency*

---

### 4.3 Grid Layout Section

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-0 py-20 lg:py-28">
```

**Responsive Grid:**
- Mobile: 1 column (text stacks above image)
- Large screens (1024px+): 2 columns (text left, image right)

**Visual:**
```
Mobile:                Desktop:
┌──────────────┐      ┌───────────┬───────────┐
│  Text About  │      │   Text    │   Image   │
├──────────────┤      │  About    │           │
│    Image     │      │  Founder  │           │
└──────────────┘      └───────────┴───────────┘
```

---

```tsx
  <div className="px-6 lg:px-16 flex flex-col justify-center">
```

**Column Classes:**
- `flex flex-col`: Vertical flexbox
- `justify-center`: Vertically center content
- `px-6 lg:px-16`: More padding on large screens

---

```tsx
    <FastImage
      src={imgABout}
      alt="Founder"
      className="w-full h-full object-cover object-center"
      width={600}
      height={400}
    />
```

**FastImage Props:**
- `src`: Image source
- `alt`: Accessibility text
- `width/height`: Dimensions for optimization
- `object-cover`: Crop to fill container
- `object-center`: Focus on center of image

---

## 5. StatsSection Component

### 5.1 Purpose

Displays impressive numbers with **animated counting**:
- Years of experience
- Projects delivered
- Happy clients

**File Location:** `/src/components/StatsSection.tsx`

---

### 5.2 Data Structure

```tsx
const stats = [
  { label: "years of experience", end: 23 },
  { label: "Projects Delivered", end: 10, suffix: "k +" },
  { label: "Happy Client", end: 5, suffix: " K" },
];
```

**Array of Objects:**
- `label`: Description
- `end`: Final number
- `suffix`: Optional suffix ("+", "K", etc.)

**Why this structure?**
- Easy to add/remove stats
- Consistent formatting
- Single source of truth

---

### 5.3 Intersection Observer Hook

```tsx
const { ref, inView } = useInView({ triggerOnce: true });
```

**What is useInView?**
- From `react-intersection-observer` library
- Detects when element enters viewport
- `triggerOnce: true`: Only fires once (not on every scroll)

**Flow:**
```
1. User visits page
   ↓
2. Stats section is below fold (not visible)
   ↓
3. User scrolls down
   ↓
4. Stats section enters viewport
   ↓
5. inView changes from false → true
   ↓
6. CountUp animation starts
```

---

```tsx
return (
  <section
    ref={ref}
    className="bg-white pb-24 w-full overflow-hidden px-4 sm:px-6 lg:px-8"
  >
```

**ref={ref}:**
- Connects component to Intersection Observer
- Tracks visibility

---

### 5.4 Creative Stat Display

```tsx
<div className="relative flex-1 min-w-[140px] flex items-center justify-center">
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center px-2">
    <p className="text-sm sm:text-base md:text-lg text-black" 
       style={{ fontWeight: '400' }}>
      {stat.label}
    </p>
  </div>

  <div className="text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] 
                  font-light text-black opacity-5 leading-none text-center">
    {inView && (
      <CountUp end={stat.end} suffix={stat.suffix || ""} duration={2} />
    )}
  </div>
</div>
```

**Layering Technique:**

1. **Background Layer** (huge, faded number):
   ```tsx
   text-[140px] opacity-5
   ```
   - Custom font size: 140px
   - 5% opacity (barely visible)

2. **Foreground Layer** (label text):
   ```tsx
   absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
   ```
   - Centered over number
   - Full opacity

**Visual Result:**
```
      23
   years of        ← Small text
   experience      ← Over huge "23"
```

---

### 5.5 CountUp Animation

```tsx
{inView && (
  <CountUp end={stat.end} suffix={stat.suffix || ""} duration={2} />
)}
```

**Conditional Rendering:**
- Only renders when `inView` is true
- Prevents animation before user sees it

**CountUp Props:**
- `end={23}`: Count from 0 to 23
- `suffix="k +"`: Adds "k +" after number (10k +)
- `duration={2}`: 2-second animation

**Animation Flow:**
```
Second 0: 0
Second 0.5: 6
Second 1: 12
Second 1.5: 18
Second 2: 23 ✓
```

---

### 5.6 Vertical Dividers

```tsx
{index !== stats.length - 1 && (
  <div className="hidden md:block absolute top-1/2 right-0 
                  transform -translate-y-1/2 h-16 w-px bg-gray-300" />
)}
```

**Conditional Divider:**
- `index !== stats.length - 1`: Not the last item
- `hidden md:block`: Hidden on mobile, visible on desktop
- `w-px`: 1px wide
- `h-16`: 4rem tall

**Visual:**
```
Desktop:
┌─────────┬─────────┬─────────┐
│  23     │  10k+   │   5K    │
│  years  │ projects│ clients │
└─────────┴─────────┴─────────┘
           ↑ dividers

Mobile (no dividers):
┌─────────┐
│  23     │
│  years  │
├─────────┤
│  10k+   │
│ projects│
└─────────┘
```

---

## 6. ProcessSection Component

### 6.1 Purpose

Shows the **3-step process** for ordering:
1. Design
2. Payment
3. Delivery

**File Location:** `/src/components/ProcessSection.tsx`

---

### 6.2 Services Data Array

```tsx
const services = [
  {
    title: "Describe Your Design ",
    description: "Tell us your idea and how you envision the product...",
    image: img1,
  },
  {
    title: "Confirm & Pay ",
    description: "Review the final design and matter...",
    image: img2,
  },
  {
    title: "Grab or Get Delivered",
    description: "Pick up your finished product from our shop...",
    image: img3,
  },
];
```

**Data-Driven Component:**
- All step information in one array
- Easy to modify steps
- Scalable (add more steps easily)

---

### 6.3 Staggered Layout Logic

```tsx
{services.map((service, index) => {
  const isTall = index === 0 || index === 2;
  const imageHeight = isTall ? "h-[420px]" : "h-[240px]";
  const verticalOffset = !isTall ? "mt-16" : "";

  return (
    <div key={index} className={`${verticalOffset}`}>
```

**Creative Layout Pattern:**

```tsx
const isTall = index === 0 || index === 2;
```
- Steps 1 and 3: Tall images (420px)
- Step 2: Short image (240px) + push down (mt-16)

**Visual Effect:**
```
┌──────────┐           ┌──────────┐
│  Step 1  │           │  Step 3  │
│  Image   │  ┌─────┐  │  Image   │
│  (tall)  │  │Step2│  │  (tall)  │
│          │  │Image│  │          │
└──────────┘  └─────┘  └──────────┘
                ↑ offset down
```

**Why?**
- Visual interest (not monotonous)
- Guides eye flow
- Professional design

---

```tsx
<FastImage
  src={service.image}
  alt={service.title}
  className={`w-full object-cover mb-4 rounded-sm ${imageHeight}`}
  width={400}
  height={isTall ? 420 : 240}
  priority={index === 0}
/>
```

**Priority Prop:**
- `priority={index === 0}`: First image loads immediately
- Others lazy load
- Improves perceived performance

---

## 7. VisitingCardCTA Component

### 7.1 Purpose

**Call-to-Action** banner encouraging users to try the card designer.

**File Location:** `/src/components/VisitingCardCTA.tsx`

---

### 7.2 Feature Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  <div className="text-center">
    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center 
                    justify-center mx-auto mb-3">
      <span className="text-2xl">🎨</span>
    </div>
    <h3 className="font-semibold text-gray-900">Easy Design</h3>
    <p className="text-sm text-gray-600">User-friendly editor with real-time preview</p>
  </div>
```

**Icon Circle:**
- `rounded-full`: Perfect circle
- `w-16 h-16`: 64x64px
- `flex items-center justify-center`: Center emoji
- `mx-auto`: Center horizontally

**Pattern Repeated:**
- 3 features (Easy Design, Instant Results, Print Ready)
- Consistent structure
- Responsive grid (1 column → 3 columns)

---

### 7.3 Dual CTA Buttons

```tsx
<Link
  to="/visiting-card-designer"
  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg 
             font-semibold hover:bg-blue-700 transition-colors"
>
  Start Designing Now
</Link>
<Link
  to="/contact"
  className="inline-block border border-blue-600 text-blue-600 px-8 py-3 
             rounded-lg font-semibold hover:bg-blue-50 transition-colors"
>
  Get Professional Help
</Link>
```

**Button Styles:**

1. **Primary Button** (filled):
   - `bg-blue-600`: Solid background
   - `hover:bg-blue-700`: Darker on hover

2. **Secondary Button** (outline):
   - `border border-blue-600`: Blue border
   - `text-blue-600`: Blue text
   - `hover:bg-blue-50`: Light background on hover

**Why two buttons?**
- Caters to different user preferences
- Some want DIY (designer)
- Others prefer help (contact)

---

## 8. FastImage Component (Performance Optimization)

### 8.1 Purpose

Custom image component that:
- Lazy loads images
- Shows placeholder while loading
- Optimizes performance
- Provides smooth transitions

**File Location:** `/src/components/FastImage.tsx`

---

### 8.2 TypeScript Interface

```tsx
interface FastImageProps {
    src: string;         // Image source URL
    alt: string;         // Accessibility text
    className?: string;  // Optional CSS classes
    width?: number;      // Optional width
    height?: number;     // Optional height
    priority?: boolean;  // Load immediately (skip lazy load)
}
```

**Optional Props (?):**
- `className?`: Can be omitted
- `priority?`: Defaults to false

---

### 8.3 State Management

```tsx
const [isLoaded, setIsLoaded] = useState(false);
const [isInView, setIsInView] = useState(priority);
const imgRef = useRef<HTMLImageElement>(null);
```

**Three State Variables:**

1. **isLoaded**: Has image finished loading?
2. **isInView**: Is image in viewport?
3. **imgRef**: Reference to DOM element

**Why isInView starts with priority?**
```tsx
useState(priority)
```
- If `priority` is true, start with `isInView = true`
- Skip lazy load, load immediately

---

### 8.4 Intersection Observer Logic

```tsx
useEffect(() => {
  if (priority) return;  // Skip if high priority

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    },
    { threshold: 0.1, rootMargin: '100px' }
  );

  if (imgRef.current) {
    observer.observe(imgRef.current);
  }

  return () => observer.disconnect();
}, [priority]);
```

**Step-by-Step:**

1. **Skip if priority:**
   ```tsx
   if (priority) return;
   ```
   High-priority images load immediately

2. **Create observer:**
   ```tsx
   const observer = new IntersectionObserver(callback, options);
   ```

3. **Options explained:**
   ```tsx
   { threshold: 0.1, rootMargin: '100px' }
   ```
   - `threshold: 0.1`: Trigger when 10% visible
   - `rootMargin: '100px'`: Start loading 100px before entering viewport

4. **Callback:**
   ```tsx
   if (entry.isIntersecting) {
     setIsInView(true);      // Start loading
     observer.disconnect();  // Stop observing
   }
   ```

5. **Cleanup:**
   ```tsx
   return () => observer.disconnect();
   ```
   Remove observer when component unmounts

---

### 8.5 Placeholder Rendering

```tsx
if (!isInView) {
  return (
    <div
      ref={imgRef}
      className={`${className} bg-gray-200 animate-pulse`}
      style={{ width, height }}
    />
  );
}
```

**Before Image Loads:**
- Shows gray placeholder
- `animate-pulse`: Subtle pulsing animation (loading indicator)
- Same dimensions as final image (no layout shift)

**Visual:**
```
Scrolling down page:
┌────────────────┐
│                │
│   [Loading]    │  ← Gray pulsing box
│   [...]        │
└────────────────┘

When enters viewport:
┌────────────────┐
│                │
│   [Image!]     │  ← Real image loads
│                │
└────────────────┘
```

---

### 8.6 Actual Image Rendering

```tsx
return (
  <img
    src={src}
    alt={alt}
    className={`${className} transition-opacity duration-300 
                ${isLoaded ? 'opacity-100' : 'opacity-70'}`}
    width={width}
    height={height}
    onLoad={handleLoad}
    loading={priority ? 'eager' : 'lazy'}
  />
);
```

**Dynamic Opacity:**
```tsx
${isLoaded ? 'opacity-100' : 'opacity-70'}
```
- Loading: 70% opacity (slightly faded)
- Loaded: 100% opacity (full brightness)
- `transition-opacity duration-300`: Smooth 300ms fade-in

**Loading Attribute:**
```tsx
loading={priority ? 'eager' : 'lazy'}
```
- `eager`: Load immediately (priority images)
- `lazy`: Browser native lazy loading (others)

**onLoad Handler:**
```tsx
const handleLoad = () => {
  setIsLoaded(true);
};
```
- Fired when image finishes loading
- Updates state → triggers opacity transition

---

## 9. Service Components

### 9.1 CatalogDetail Component

**Purpose:** Defines service data and renders the catalog section.

**File Location:** `/src/components/Service/CatalogDetail.tsx`

---

```tsx
import img1 from '../../assets/img/offset.jpg';
import img2 from '../../assets/img/visiting.jpg';
// ... more imports

const pages = [
  { src: img1, title: 'Offset Printing', link: '/services' },
  { src: img2, title: 'Visiting Card Printing', link: '/services' },
  { src: img3, title: 'Letter Head Printing', link: '/services' },
  // ... 10 total services
];
```

**Data Structure:**
- Array of service objects
- Each has image, title, and link
- Single source of truth

**Component Structure:**
```tsx
const ServiceSection: React.FC = () => {
  return (
    <section className="py-16 px-4 max-w-screen-xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-light uppercase tracking-wider 
                     text-center mb-12">
        Our Services
      </h2>
      <FlipbookCatalog pages={pages} />
    </section>
  );
};
```

---

### 9.2 FlipbookCatalog Component

**Purpose:** Interactive flipbook on desktop, card grid on mobile.

**File Location:** `/src/components/Service/FlipbookCatalog.tsx`

---

```tsx
type FlipbookCatalogProps = {
  pages: {
    src: string;
    title: string;
    link?: string;
  }[];
};
```

**TypeScript Type:**
- `pages`: Array of page objects
- `link?`: Optional (may be undefined)

---

### 9.3 Desktop Flipbook

```tsx
<div className="hidden md:flex justify-center">
  <HTMLFlipBook
    width={550}
    height={700}
    size="stretch"
    minWidth={280}
    maxWidth={1000}
    minHeight={400}
    maxHeight={1536}
    showCover={true}
    mobileScrollSupport={true}
    drawShadow={true}
    flippingTime={1000}
    useMouseEvents={true}
    // ... more props
  >
```

**HTMLFlipBook Props Explained:**

| Prop | Value | Purpose |
|------|-------|---------|
| `width` | 550 | Base width in pixels |
| `height` | 700 | Base height in pixels |
| `flippingTime` | 1000 | 1-second flip animation |
| `drawShadow` | true | Realistic page shadow |
| `showCover` | true | First page is cover |
| `swipeDistance` | 30 | Pixels to swipe for flip |

**Why hidden md:flex?**
- `hidden`: Hide by default
- `md:flex`: Show on medium+ screens (768px+)
- Desktop-only feature

---

### 9.4 Page Rendering with Overlay

```tsx
{pages.map((page, idx) => (
  <div key={idx} className="relative w-full h-full overflow-hidden">
    <FastImage
      src={page.src}
      alt={`Page ${idx + 1}`}
      className="w-full h-full object-cover"
      priority={idx < 2}
      width={550}
      height={700}
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center 
                    bg-black bg-opacity-30 text-white text-center px-6">
      <h3 className="text-2xl font-semibold drop-shadow mb-10">
        {page.title}
      </h3>
      <a
        href={page.link || '#'}
        className="bg-white text-black px-6 py-2 rounded-full text-sm 
                   font-medium hover:bg-gray-100 transition duration-300"
      >
        Read More
      </a>
    </div>
  </div>
))}
```

**Layering:**
1. Image (`FastImage`)
2. Dark overlay (`bg-black bg-opacity-30`)
3. Text and button (absolute positioned)

**Priority Logic:**
```tsx
priority={idx < 2}
```
- First 2 pages load immediately
- Others lazy load

---

### 9.5 Mobile Card Layout

```tsx
<div className="block md:hidden space-y-6">
  {pages.map((page, idx) => (
    <div key={idx} className="relative w-full rounded-lg overflow-hidden shadow-lg">
      <FastImage
        src={page.src}
        alt={`Page ${idx + 1}`}
        className="w-full h-auto object-cover"
        priority={idx < 2}
        width={400}
        height={300}
      />
      {/* Same overlay as desktop */}
    </div>
  ))}
</div>
```

**Mobile vs Desktop:**
- Desktop: Interactive flipbook
- Mobile: Vertical card stack (simpler UX)

**Why different?**
- Flipbook requires mouse/trackpad (awkward on touch)
- Cards are touch-friendly
- Better mobile UX

---

## 10. Key React Concepts Used

### 10.1 Component Composition

**Pattern:** Building complex UIs from simple components

```tsx
// Complex component built from simple ones
<HomePage>
  <Header />
  <HeroBanner />
  <AboutUsSection />
  <StatsSection />
  <ProcessSection />
  <Footer />
</HomePage>
```

**Benefits:**
- Reusability
- Testability
- Maintainability

---

### 10.2 Props (Component Configuration)

**Passing data to children:**

```tsx
// Parent passes data
<FastImage 
  src={logo} 
  alt="Logo" 
  width={100} 
  priority={true} 
/>

// Child receives props
const FastImage = ({ src, alt, width, priority }) => {
  // Use the props
  return <img src={src} alt={alt} />;
};
```

---

### 10.3 State Management

**Managing component data:**

```tsx
// Declare state
const [menuOpen, setMenuOpen] = useState(false);

// Read state
if (menuOpen) { /* ... */ }

// Update state
setMenuOpen(true);  // React re-renders component
```

**State Flow:**
```
User action → Event handler → setState() 
→ State changes → React re-renders → UI updates
```

---

### 10.4 Conditional Rendering

**Show/hide content based on conditions:**

```tsx
// Ternary operator
{menuOpen ? <Menu /> : null}

// Logical AND
{menuOpen && <Menu />}

// Class names
className={menuOpen ? "visible" : "hidden"}
```

---

### 10.5 List Rendering

**Map over arrays:**

```tsx
const items = ['Apple', 'Banana', 'Cherry'];

items.map((item, index) => (
  <li key={index}>{item}</li>
))

// Renders:
// <li>Apple</li>
// <li>Banana</li>
// <li>Cherry</li>
```

**Key Prop:**
- Helps React identify which items changed
- Should be unique and stable
- Avoid using array index if list can reorder

---

### 10.6 Event Handling

**Responding to user actions:**

```tsx
// Click event
<button onClick={() => alert('Clicked!')}>
  Click Me
</button>

// Form submit
<form onSubmit={(e) => {
  e.preventDefault();  // Stop default behavior
  handleSubmit();
}}>

// Hover event
<div onMouseEnter={() => setHovered(true)}>
```

---

### 10.7 useEffect Hook

**Side effects and lifecycle:**

```tsx
useEffect(() => {
  // Runs after render
  console.log('Component mounted or updated');
  
  // Cleanup function
  return () => {
    console.log('Component unmounting');
  };
}, [dependency]); // Re-run when dependency changes
```

**Common uses:**
- Data fetching
- Subscriptions
- DOM manipulation
- Timers

---

### 10.8 useRef Hook

**Access DOM elements:**

```tsx
const inputRef = useRef(null);

useEffect(() => {
  inputRef.current.focus(); // Focus input on mount
}, []);

return <input ref={inputRef} />;
```

---

## 11. Common Patterns Explained

### 11.1 Data-Driven Components

**Define data separately from UI:**

```tsx
// Data
const stats = [
  { label: 'Years', value: 23 },
  { label: 'Projects', value: 10000 }
];

// UI
stats.map(stat => (
  <div>
    <h3>{stat.value}</h3>
    <p>{stat.label}</p>
  </div>
))
```

**Benefits:**
- Easy to update
- Scalable
- Can load from API later

---

### 11.2 Responsive Design Pattern

**Mobile-first approach:**

```tsx
// Base (mobile) → Add larger styles
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
```

**Breakpoints:**
- `sm:` 640px+
- `md:` 768px+
- `lg:` 1024px+
- `xl:` 1280px+

---

### 11.3 Component Wrapper Pattern

**Consistent layout:**

```tsx
const Layout = ({ children }) => (
  <>
    <Header />
    {children}  {/* Page content goes here */}
    <Footer />
  </>
);

// Usage
<Layout>
  <AboutPage />
</Layout>
```

---

### 11.4 Lazy Loading Pattern

**Load content when needed:**

```tsx
// Placeholder while loading
if (!loaded) {
  return <Skeleton />;
}

// Actual content
return <ActualComponent />;
```

---

## Summary - Phase 3

You've learned:

1. ✅ **Header Component** - Mobile menu with slide-in animation
2. ✅ **Footer Component** - Links, newsletter form, responsive grid
3. ✅ **HeroBanner Component** - Full-screen video with overlay
4. ✅ **AboutUsSection Component** - Company intro with CTA
5. ✅ **StatsSection Component** - Animated counters with Intersection Observer
6. ✅ **ProcessSection Component** - 3-step process with staggered layout
7. ✅ **VisitingCardCTA Component** - Call-to-action with feature grid
8. ✅ **FastImage Component** - Performance-optimized image loading
9. ✅ **Service Components** - Flipbook catalog with responsive fallback
10. ✅ **React Concepts** - State, props, hooks, patterns

**Key Takeaways:**
- Components are building blocks
- Props pass data down
- State manages dynamic data
- Hooks add functionality
- Composition creates complex UIs
- Responsive design is essential
- Performance optimization matters

**Next Phase Preview:**
Phase 4 will explore the **Visiting Card Designer** - the most complex feature:
- 4000+ lines of code
- Drag-and-drop functionality
- Template system
- Real-time preview
- Pricing calculator
- Quote generation
- Element management

---

## Quick Reference - Component Props

| Component | Required Props | Optional Props |
|-----------|---------------|----------------|
| `Header` | None | None |
| `Footer` | None | None |
| `HeroBanner` | None | None |
| `AboutUsSection` | None | None |
| `StatsSection` | None | None |
| `ProcessSection` | None | None |
| `VisitingCardCTA` | None | None |
| `FastImage` | `src`, `alt` | `className`, `width`, `height`, `priority` |
| `FlipbookCatalog` | `pages` | None |
| `LinkColumn` | `title`, `links` | None |

---

**Ready for Phase 4? Dive into the advanced Visiting Card Designer!**
