# Likhavat Printing Press - Technical Documentation
## Phase 2: Project Architecture & File Structure

---

## Table of Contents
1. Phase 1: Project Overview & Technology Stack ✅
2. **Phase 2: Project Architecture & File Structure** (This Document)
3. Phase 3: Core Components Deep Dive
4. Phase 4: Advanced Features & Business Logic
5. Phase 5: Styling, Performance & Deployment

---

## 1. High-Level Architecture Overview

### 1.1 Application Architecture Pattern

This project follows the **Component-Based Architecture** pattern with **Page-Component Separation**.

```
┌─────────────────────────────────────────────────────────────┐
│                      USER BROWSER                            │
│  URL: likhavatprintingpress.com/portfolio                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                   REACT ROUTER                               │
│  Maps URLs to Pages: /portfolio → Portfolio.tsx             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                    PAGE COMPONENTS                           │
│  Portfolio.tsx, About.tsx, Contact.tsx, etc.                │
│  - Define page structure                                     │
│  - Compose reusable components                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                 REUSABLE COMPONENTS                          │
│  Header, Footer, Cards, Buttons, Forms, etc.                │
│  - Used across multiple pages                                │
│  - Self-contained functionality                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                  STATE MANAGEMENT                            │
│  React useState, useRef, useEffect                           │
│  - Manages user interactions                                 │
│  - Handles form data, animations, UI state                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                   STYLING LAYER                              │
│  Tailwind CSS classes + Custom CSS                          │
│  - Responsive design (mobile, tablet, desktop)               │
│  - Animations and transitions                                │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                   STATIC ASSETS                              │
│  Images, Videos, Fonts stored in public/ and assets/        │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Complete Project Structure

### 2.1 Root Directory Structure

```
likhavat/
├── public/                    # Static files served directly
│   ├── fonts/                 # Custom font files
│   ├── images/                # Static images
│   ├── videos/                # Video files
│   └── sw.js                  # Service worker
│
├── src/                       # Source code (main development folder)
│   ├── assets/                # Application assets
│   ├── components/            # Reusable UI components
│   ├── pages/                 # Page-level components
│   ├── services/              # Utility services
│   ├── utils/                 # Helper functions
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   ├── index.css             # Global styles
│   └── vite-env.d.ts         # TypeScript declarations
│
├── node_modules/              # Installed dependencies (auto-generated)
│
├── dist/                      # Production build output (auto-generated)
│
├── index.html                 # HTML entry point
├── package.json              # Project configuration & dependencies
├── package-lock.json         # Locked dependency versions
├── vite.config.js            # Vite build configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── eslint.config.js          # ESLint configuration
├── postcss.config.js         # PostCSS configuration
└── README.md                 # Project documentation
```

---

## 3. Detailed Directory Breakdown

### 3.1 `/public` Directory - Static Assets

**Purpose:** Files served directly without processing by Vite.

```
public/
├── fonts/
│   └── ProximaNova-Regular.otf     # Custom font
│
├── images/                          # Static images
│   ├── logo.png                     # Company logo
│   ├── hero-bg.png                  # Hero section background
│   ├── hero-img.png                 # Hero section image
│   ├── footer-dip.png               # Footer decoration
│   ├── footer-drink.png             # Footer product image
│   ├── slider-dip.png               # Slider image
│   ├── static-img.png               # Static content image
│   ├── big-img.png                  # Large promotional image
│   ├── Final.png                    # Final design showcase
│   ├── nav-logo.svg                 # Navigation logo
│   ├── arrow.svg                    # Arrow icon
│   ├── circle-text.svg              # Circular text decoration
│   ├── play.svg                     # Play button icon
│   │
│   ├── p1.png → p7.png             # Product showcase images (7 items)
│   │
│   ├── *-drink.webp                # Product images (6 colors)
│   │   ├── black-drink.webp
│   │   ├── blue-drink.webp
│   │   ├── brown-drink.webp
│   │   ├── orange-drink.webp
│   │   ├── red-drink.webp
│   │   └── white-drink.webp
│   │
│   ├── *-elements.webp             # Element overlays (6 colors)
│   │   └── (matching colors)
│   │
│   ├── *-bg.svg                    # Background patterns (7 colors)
│   │   ├── black-bg.svg
│   │   ├── blue-bg.svg
│   │   ├── brown-bg.svg
│   │   ├── orange-bg.svg
│   │   ├── red-bg.svg
│   │   ├── white-bg.svg
│   │   └── video-img.webp
│   │
│   └── social-icons/
│       ├── insta.svg               # Instagram icon
│       ├── tiktok.svg              # TikTok icon
│       └── yt.svg                  # YouTube icon
│
├── videos/                          # Video assets
│   ├── hero-bg.mp4                 # Hero background video
│   ├── pin-video.mp4               # Pinned/featured video
│   ├── splash.mp4                  # Splash screen video
│   └── f1.mp4 → f7.mp4            # Feature videos (7 items)
│
└── sw.js                           # Service worker for caching
```

**Why separate public/ and src/assets/?**
- `public/`: Files accessed by URL (e.g., `/images/logo.png`)
- `src/assets/`: Files imported in code, processed by Vite

---

### 3.2 `/src/assets` Directory - Imported Assets

**Purpose:** Assets imported directly into components and processed by Vite.

```
src/assets/
├── img/                            # Component-specific images
│   ├── about.jpg                   # About us section
│   ├── design.jpg                  # Design process
│   ├── manual.jpg                  # Manual/documentation
│   ├── offset.jpg                  # Offset printing
│   ├── book.png                    # Book printing
│   ├── banner.png                  # Banner design
│   ├── cloth.png                   # Cloth printing
│   ├── letter.png                  # Letter head
│   ├── merchandise.png             # Merchandise items
│   ├── pamplate.png                # Pamphlet template
│   ├── tshirt.png                  # T-shirt design
│   ├── visiting.jpg                # Visiting card
│   ├── delivery.avif               # Delivery process
│   ├── pay.avif                    # Payment process
│   │
│   └── new-img/                    # Recent additions
│       ├── Home b1- option 1.jpg
│       ├── Home b2.jpg
│       ├── section 2 - left.jpg
│       └── section 2 - right.jpg
│
├── video/                          # Video files
│   ├── banner-video.mp4           # Main banner video
│   ├── banner.mp4                 # Alternative banner
│   └── Likhavat_Printing_Press_Video_Creation.mp4
│
├── fonts/                          # Custom font files
│   ├── Julyit.ttf                 # TrueType font
│   ├── Julyit.woff                # Web font (older browsers)
│   └── Julyit.woff2               # Web font (modern, compressed)
│
├── fonts.css                       # Font-face definitions
│
└── 1.jpg → 19.jpg                 # Portfolio images (19 items)
```

**Usage Example:**
```tsx
// Importing from assets
import aboutImg from '../assets/img/about.jpg';
import portfolioImg1 from '../assets/1.jpg';

<img src={aboutImg} alt="About" />
```

---

### 3.3 `/src/components` Directory - Reusable Components

**Purpose:** UI components used across multiple pages.

```
src/components/
├── Core Layout Components
│   ├── Header.tsx              # Navigation bar (all pages)
│   ├── Footer.tsx              # Footer section (all pages)
│   ├── Layout.tsx              # Layout wrapper (Header + Content + Footer)
│   └── NotFound.tsx            # 404 error page
│
├── Home Page Components
│   ├── HeroBanner.tsx          # Hero section with video
│   ├── AboutUsSection.tsx      # About us preview
│   ├── StatsSection.tsx        # Statistics with CountUp
│   ├── ProcessSection.tsx      # 3-step process
│   └── VisitingCardCTA.tsx     # Call-to-action for designer
│
├── Specialized Components
│   ├── VisitingCardDesigner.tsx      # Main designer (4000+ lines)
│   ├── VisitingCardDesigner_new.tsx  # New version
│   ├── VisitingCardDesigner_clean.tsx # Cleaned version
│   └── VisitingCardDesigner_fixed.tsx # Fixed version
│
├── Service Components
│   └── Service/
│       ├── CatalogDetail.tsx   # Service catalog data
│       └── FlipbookCatalog.tsx # Flipbook component
│
└── Optimization Components
    ├── FastImage.tsx           # Optimized image loading
    ├── LazyImage.tsx           # Lazy-loaded images
    ├── LazyVideo.tsx           # Lazy-loaded videos
    ├── LightningVideo.tsx      # Fast video loading
    ├── SimpleVideo.tsx         # Basic video component
    └── UltraFastImage.tsx      # Ultra-optimized images
```

**Component Organization Logic:**
1. **Core**: Used on every page
2. **Home**: Specific to homepage
3. **Specialized**: Complex, standalone features
4. **Service**: Related to service display
5. **Optimization**: Performance-focused utilities

---

### 3.4 `/src/pages` Directory - Page Components

**Purpose:** Top-level components representing full pages/routes.

```
src/pages/
├── About.tsx              # About us page (/about-us)
├── Careers.tsx            # Careers page (/careers)
├── Contact.tsx            # Contact form page (/contact)
├── Portfolio.tsx          # Portfolio grid (/portfolio)
├── VisitingCard.tsx       # Card designer page (/visiting-card-designer)
└── Hero.tsx              # Hero utilities (shared components)
```

**Each Page Component:**
- Imports Layout (Header + Footer)
- Composes multiple smaller components
- Manages page-specific state
- Handles page-level data

**Example Structure:**
```tsx
// About.tsx
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUsPage = () => {
  return (
    <>
      <Header />
      {/* Page Content */}
      <HeroSection />
      <StorySection />
      <TeamSection />
      <TimelineSection />
      <Footer />
    </>
  );
};
```

---

### 3.5 `/src/services` Directory - Utility Services

**Purpose:** Business logic, API calls, and utilities.

```
src/services/
├── cdnImageService.ts         # CDN image optimization
├── quickCDN.ts               # Quick CDN service
├── lightningCDN.ts           # Lightning-fast CDN
├── progressiveLoader.ts      # Progressive image loading
└── extremePerformance.ts     # Performance optimization
```

**What These Services Do:**

1. **cdnImageService.ts** - Image Optimization
```tsx
// Optimizes images for different screen sizes
export const getOptimizedUrl = (src: string, width: number) => {
  return `${CDN_URL}/${src}?w=${width}&q=80&format=webp`;
};

// Usage
<img src={getOptimizedUrl('hero.jpg', 1200)} />
```

2. **progressiveLoader.ts** - Smart Loading
```tsx
// Loads images progressively (placeholder → low-quality → full)
export const loadProgressively = (imageSrc: string) => {
  // 1. Show placeholder
  // 2. Load low-quality version
  // 3. Load full-quality version
};
```

---

### 3.6 `/src/utils` Directory - Helper Functions

**Purpose:** Reusable utility functions.

```
src/utils/
└── ultraPerformanceInit.ts    # Performance initialization
```

**Example Utilities:**
```tsx
// Format price
export const formatPrice = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
};

// Calculate bulk discount
export const calculateDiscount = (quantity: number): number => {
  if (quantity >= 500) return 0.20;  // 20% off
  if (quantity >= 100) return 0.10;  // 10% off
  return 0;
};
```

---

## 4. Application Entry Points

### 4.1 index.html - HTML Entry Point

**Location:** `/index.html`

**Purpose:** The single HTML file for the entire application.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Likhavat Printing Press</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- React app mounts here -->
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**What happens:**
1. Browser loads `index.html`
2. Finds `<div id="root"></div>`
3. Executes `/src/main.tsx`
4. React app renders inside `#root`

---

### 4.2 main.tsx - React Entry Point

**Location:** `/src/main.tsx`

**Purpose:** Initializes React application.

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Breakdown:**
1. **Import React**: Core React library
2. **Import ReactDOM**: Renders React to DOM
3. **Import App**: Main application component
4. **Import CSS**: Global styles
5. **createRoot()**: Creates React root
6. **render()**: Renders App component
7. **StrictMode**: Enables additional checks in development

---

### 4.3 App.tsx - Application Router

**Location:** `/src/App.tsx`

**Purpose:** Defines routing and page structure.

```tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Layout from "./components/Layout";

// Import all pages
import AboutUsPage from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
// ... more imports

function HomePage() {
  return (
    <>
      <Header />
      <HeroBanner />
      <AboutUsSection />
      <CatalogSection />
      <StatsSection />
      <ProcessSection />
      <VisitingCardCTA />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<Layout><AboutUsPage /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
        <Route path="/careers" element={<Layout><CareersPage /></Layout>} />
        <Route path="/visiting-card-designer" element={<Layout><VisitingCardPage /></Layout>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
```

**Routing Logic:**
- `/` → HomePage (custom layout)
- `/about-us` → AboutUsPage (with Layout wrapper)
- `/contact` → Contact (with Layout wrapper)
- Any other URL → NotFound (404 page)

---

## 5. Component Hierarchy

### 5.1 Homepage Component Tree

```
App
 └── HomePage
      ├── Header
      │    ├── Logo
      │    ├── Navigation Links
      │    │    ├── About Us
      │    │    ├── Careers
      │    │    ├── Portfolio
      │    │    └── Card Designer
      │    └── Burger Menu (mobile)
      │
      ├── HeroBanner
      │    ├── Background Video
      │    ├── Overlay
      │    └── Content (title, subtitle, CTA)
      │
      ├── AboutUsSection
      │    ├── Company Description
      │    ├── Founder Info
      │    └── "Read More" Button
      │
      ├── CatalogSection
      │    ├── FlipbookCatalog (desktop)
      │    │    └── 10 Service Pages
      │    └── CardLayout (mobile)
      │         └── 10 Service Cards
      │
      ├── StatsSection
      │    ├── CountUp Component (Years)
      │    ├── CountUp Component (Projects)
      │    └── CountUp Component (Clients)
      │
      ├── ProcessSection
      │    ├── Step 1: Design
      │    ├── Step 2: Payment
      │    └── Step 3: Delivery
      │
      ├── VisitingCardCTA
      │    ├── Description
      │    └── "Try Designer" Button
      │
      └── Footer
           ├── Newsletter Form
           ├── Link Columns (4 sections)
           ├── Company Logo
           └── Social Media Links
```

---

### 5.2 About Us Page Component Tree

```
App
 └── Layout
      ├── Header
      │
      └── AboutUsPage
           ├── Hero Section
           │    ├── Full-screen Image
           │    └── Overlay Text
           │
           ├── Company Story Section
           │    ├── SectionTitle
           │    ├── Description Paragraphs
           │    └── Quote Block
           │
           ├── Mission & Vision Section
           │    ├── Mission Card (Target Icon)
           │    ├── Vision Card (Eye Icon)
           │    └── Values Card (Award Icon)
           │
           ├── Team Section
           │    ├── SectionTitle
           │    └── Team Grid
           │         ├── Member 1 (Alexandra Chen)
           │         ├── Member 2 (Benjamin Carter)
           │         └── Member 3 (Chloe Davis)
           │
           ├── Timeline Section
           │    ├── SectionTitle
           │    └── Timeline Events
           │         ├── 2018 - The Spark
           │         ├── 2019 - Founded
           │         ├── 2021 - First Collab
           │         └── 2023 - Expansion
           │
           └── CTA Section
                ├── Title
                └── "Contact Us" Button
      │
      └── Footer
```

---

### 5.3 Visiting Card Designer Component Tree

```
App
 └── Layout
      ├── Header
      │
      └── VisitingCardPage
           └── VisitingCardDesigner
                ├── Product Tabs
                │    ├── Visiting Cards (active)
                │    ├── Letter Pads
                │    ├── T-Shirts
                │    └── Merchandise
                │
                ├── Main Layout (3 columns)
                │    ├── LEFT PANEL: Templates
                │    │    ├── Template Grid (18 templates)
                │    │    └── Template Preview Cards
                │    │
                │    ├── CENTER PANEL: Controls
                │    │    ├── Element Management
                │    │    │    ├── Quick Add Buttons
                │    │    │    └── Element List
                │    │    │
                │    │    ├── Color Pickers
                │    │    │    ├── Background Color
                │    │    │    ├── Text Color
                │    │    │    └── Accent Color
                │    │    │
                │    │    ├── Add Elements Section
                │    │    │    ├── Text Button
                │    │    │    ├── QR Code Button
                │    │    │    ├── Logo Upload
                │    │    │    ├── Image Upload
                │    │    │    └── Shape Button
                │    │    │
                │    │    └── Selected Element Editor
                │    │         ├── Content Input
                │    │         ├── Font Size Slider
                │    │         ├── Position Controls (X, Y)
                │    │         └── Size Controls (W, H)
                │    │
                │    └── RIGHT PANEL: Preview
                │         ├── Dimensions Display
                │         ├── Front/Back Toggle
                │         ├── Live Card Preview
                │         │    ├── Background
                │         │    └── Draggable Elements
                │         │         ├── Name
                │         │         ├── Title
                │         │         ├── Company
                │         │         ├── Phone
                │         │         ├── Email
                │         │         └── Custom Elements
                │         │
                │         ├── Action Buttons
                │         │    ├── Download
                │         │    ├── Print
                │         │    └── Get Quote
                │         │
                │         └── Pricing Section
                │              ├── Quantity Selector
                │              ├── Price Calculator
                │              └── Order Summary
                │
                └── Modal/Overlay (when element selected)
                     ├── Delete Button
                     └── Done Button
      │
      └── Footer
```

---

## 6. Data Flow Architecture

### 6.1 State Management Pattern

**We use React's built-in state management (no Redux).**

```
┌──────────────────────────────────────────────┐
│         Component State (Local)               │
│  useState, useRef, useEffect                  │
│                                               │
│  Example: Card Designer                       │
│  - cardData (name, title, company)           │
│  - cardElements (array of elements)          │
│  - selectedElement (currently editing)       │
└──────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────┐
│           Props Flow (Parent → Child)         │
│                                               │
│  <FlipbookCatalog pages={servicePages} />    │
│                   ↓                           │
│  Child receives: { src, title, link }[]      │
└──────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────┐
│        Event Handlers (Child → Parent)        │
│                                               │
│  Child: onClick={() => onSelect(item)}       │
│           ↓                                   │
│  Parent: handleSelect(item) { ... }          │
└──────────────────────────────────────────────┘
```

---

### 6.2 Example: Card Designer State Flow

**Step-by-step data flow in the Visiting Card Designer:**

```tsx
// 1. INITIAL STATE
const [cardData, setCardData] = useState({
  name: 'John Doe',
  title: 'Manager',
  company: 'Company Ltd'
});

const [cardElements, setCardElements] = useState([
  { id: 'name', type: 'text', content: 'John Doe', position: { x: 24, y: 24 } },
  { id: 'title', type: 'text', content: 'Manager', position: { x: 24, y: 52 } }
]);

// 2. USER TYPES NAME
<input 
  value={cardData.name}
  onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
/>

// 3. STATE UPDATES
// cardData.name changes from 'John Doe' → 'Jane Smith'

// 4. REACT RE-RENDERS
// Only components using cardData.name update

// 5. PREVIEW UPDATES
<div>{cardData.name}</div>
// Shows: 'Jane Smith'

// 6. ELEMENT SYNCING
useEffect(() => {
  // Sync cardData with cardElements
  setCardElements(prev => prev.map(el => 
    el.id === 'name' ? { ...el, content: cardData.name } : el
  ));
}, [cardData.name]);

// 7. FINAL RESULT
// Preview shows updated name in real-time
```

---

### 6.3 Component Communication Patterns

#### Pattern 1: Props Drilling (Parent → Child)

```tsx
// App.tsx (Grandparent)
<HomePage />

// HomePage.tsx (Parent)
<AboutUsSection founderName="Gautam Anand" />

// AboutUsSection.tsx (Child)
const AboutUsSection = ({ founderName }) => {
  return <h3>{founderName}</h3>;
};
```

#### Pattern 2: Callback Functions (Child → Parent)

```tsx
// Parent Component
const [selectedTemplate, setSelectedTemplate] = useState('modern');

<TemplateSelector onSelect={setSelectedTemplate} />

// Child Component
const TemplateSelector = ({ onSelect }) => {
  return (
    <button onClick={() => onSelect('elegant')}>
      Select Elegant
    </button>
  );
};
```

#### Pattern 3: Context (Avoiding Props Drilling)

**Not used in this project, but common in larger apps:**
```tsx
// Create context
const ThemeContext = createContext();

// Provider (top-level)
<ThemeContext.Provider value={{ theme: 'dark' }}>
  <App />
</ThemeContext.Provider>

// Consumer (any level deep)
const { theme } = useContext(ThemeContext);
```

---

## 7. Routing Architecture

### 7.1 Route Configuration

**All routes defined in `/src/App.tsx`:**

| URL Path | Component | Layout | Description |
|----------|-----------|--------|-------------|
| `/` | HomePage | Custom | Main landing page |
| `/about-us` | AboutUsPage | Layout | Company information |
| `/contact` | Contact | Layout | Contact form |
| `/portfolio` | Portfolio | Layout | Work showcase |
| `/careers` | CareersPage | Layout | Job listings |
| `/visiting-card-designer` | VisitingCardPage | Layout | Interactive designer |
| `/*` | NotFound | None | 404 error page |

---

### 7.2 Layout Wrapper Explained

**Why use Layout component?**

```tsx
// WITHOUT Layout (repetitive)
const AboutUsPage = () => (
  <>
    <Header />
    {/* Page content */}
    <Footer />
  </>
);

const ContactPage = () => (
  <>
    <Header />
    {/* Page content */}
    <Footer />
  </>
);

// WITH Layout (DRY - Don't Repeat Yourself)
const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

// Usage
<Layout>
  <AboutUsPage />
</Layout>
```

**Result:** Write Header/Footer once, use everywhere!

---

### 7.3 Navigation Flow

**User Journey Example:**

```
1. User visits: likhavatprintingpress.com
   ↓
2. Loads: index.html
   ↓
3. Executes: main.tsx
   ↓
4. Renders: App.tsx (Router initialized)
   ↓
5. Matches: path="/" → HomePage
   ↓
6. User clicks: "About Us" link
   ↓
7. Router changes: URL to /about-us
   ↓
8. React Router: Unmounts HomePage, Mounts AboutUsPage
   ↓
9. Browser: URL bar shows /about-us
   ↓
10. NO PAGE RELOAD (Single Page Application)
```

---

## 8. File Naming Conventions

### 8.1 Component Files

**Pattern:** PascalCase with `.tsx` extension

```
✅ Correct:
- Header.tsx
- AboutUsSection.tsx
- VisitingCardDesigner.tsx

❌ Incorrect:
- header.tsx
- about_us_section.tsx
- visitingcarddesigner.tsx
```

**Why?**
- Matches component name: `Header.tsx` exports `Header`
- Easy to identify components vs utilities
- TypeScript/JSX requires `.tsx` extension

---

### 8.2 Page Files

**Pattern:** PascalCase, descriptive names

```
✅ Correct:
- About.tsx (About Us page)
- Contact.tsx (Contact page)
- Portfolio.tsx (Portfolio page)

❌ Incorrect:
- page1.tsx
- aboutUs.tsx
- CONTACT.tsx
```

---

### 8.3 Utility Files

**Pattern:** camelCase with `.ts` extension

```
✅ Correct:
- cdnImageService.ts
- progressiveLoader.ts
- ultraPerformanceInit.ts

❌ Incorrect:
- CDNImageService.ts
- progressive_loader.ts
- ultra-performance-init.ts
```

---

### 8.4 Asset Files

**Pattern:** kebab-case or descriptive names

```
✅ Correct:
- hero-bg.png
- about-section.jpg
- logo-light.svg

❌ Incorrect:
- HeroBG.png
- about_section.jpg
- Logo Light.svg (spaces)
```

---

## 9. Import/Export Patterns

### 9.1 Default Exports (Components)

```tsx
// Header.tsx
const Header = () => {
  return <header>...</header>;
};

export default Header;

// Import in another file
import Header from './components/Header';
```

**Use for:** Main component in a file

---

### 9.2 Named Exports (Utilities)

```tsx
// utils.ts
export const formatPrice = (price) => { ... };
export const calculateDiscount = (qty) => { ... };

// Import in another file
import { formatPrice, calculateDiscount } from './utils';
```

**Use for:** Multiple functions from one file

---

### 9.3 Import Path Types

```tsx
// Relative Imports (within project)
import Header from './components/Header';
import '../styles/global.css';

// Absolute Imports (node_modules)
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Asset Imports
import logo from './assets/logo.png';
import heroVideo from './assets/video/hero.mp4';
```

---

## 10. Build Output Structure

### 10.1 Development Build (`npm run dev`)

**No build files created.** Vite serves directly from source.

```
Source: src/App.tsx
   ↓
Vite Dev Server
   ↓
Browser: http://localhost:3000
```

---

### 10.2 Production Build (`npm run build`)

**Creates optimized files in `/dist` directory:**

```
dist/
├── index.html                      # Optimized HTML
├── assets/
│   ├── index-a3b4c5d6.js         # Main bundle (minified)
│   ├── vendor-x7y8z9a0.js        # React libraries (minified)
│   ├── gsap-b1c2d3e4.js          # GSAP animations (minified)
│   ├── index-f5g6h7i8.css        # Styles (minified)
│   │
│   ├── images/
│   │   ├── logo-hash.png         # Optimized images
│   │   └── hero-hash.webp
│   │
│   └── videos/
│       └── hero-bg-hash.mp4      # Optimized videos
│
└── public/                        # Copied static files
```

**File naming:**
- Hash in filename (e.g., `a3b4c5d6`) = cache busting
- When file changes, hash changes
- Browser downloads new version automatically

---

## 11. Configuration Files Explained

### 11.1 vite.config.js - Build Configuration

**Purpose:** Configures Vite build process.

```javascript
export default defineConfig({
  plugins: [react()],              // Enable React plugin
  base: '/',                       // Base URL for deployment
  
  build: {
    outDir: 'dist',                // Output directory
    minify: 'terser',              // Minification tool
    
    rollupOptions: {
      output: {
        manualChunks: {            // Code splitting
          vendor: ['react', 'react-dom'],
          gsap: ['gsap']
        }
      }
    }
  }
})
```

---

### 11.2 tailwind.config.js - Styling Configuration

**Purpose:** Customizes Tailwind CSS.

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // Scan these files for classes
  ],
  
  theme: {
    extend: {
      colors: {
        primary: { 500: '#0ea5e9' },  // Custom colors
      },
      fontFamily: {
        sans: ['Inter', 'system-ui'],  // Custom fonts
      }
    }
  }
}
```

---

### 11.3 tsconfig.json - TypeScript Configuration

**Purpose:** Configures TypeScript compiler.

```json
{
  "compilerOptions": {
    "target": "ES2020",              // JavaScript version
    "module": "ESNext",              // Module system
    "jsx": "react-jsx",              // JSX transform
    "strict": true,                  // Strict type checking
    "moduleResolution": "bundler"    // How to resolve imports
  }
}
```

---

## 12. Environment-Specific Behavior

### 12.1 Development vs Production

| Feature | Development | Production |
|---------|-------------|------------|
| **File Size** | Large (10 MB) | Small (1.5 MB) |
| **Minification** | None | Full |
| **Source Maps** | Yes | No |
| **Hot Reload** | Yes | N/A |
| **Console Logs** | Visible | Stripped |
| **Error Messages** | Detailed | Minimal |
| **Build Time** | Instant | 30-60 seconds |

---

## 13. Key Architectural Decisions

### 13.1 Why Component-Based Architecture?

**Benefits:**
1. **Reusability:** Write once, use everywhere
2. **Maintainability:** Change one component, updates everywhere
3. **Testability:** Test components in isolation
4. **Scalability:** Add new components without affecting others

**Example:**
```
Header component used on:
- Homepage
- About page
- Contact page
- Portfolio page
- Designer page
- Careers page

Change header once → Updates all 6 pages!
```

---

### 13.2 Why Single Page Application (SPA)?

**Benefits:**
1. **Fast Navigation:** No page reloads
2. **Better UX:** Smooth transitions
3. **Less Server Load:** Only initial HTML load
4. **Mobile-Like Feel:** App-like experience

**Trade-offs:**
- Initial load larger (but subsequent navigation faster)
- SEO requires special handling (solved with proper meta tags)

---

### 13.3 Why Separate Pages and Components?

```
src/
├── pages/           # Route-level components (one per URL)
│   └── About.tsx    # Represents /about-us
│
└── components/      # Reusable UI components
    └── Header.tsx   # Used on multiple pages
```

**Reasoning:**
- Clear separation of concerns
- Easy to find page-specific code
- Reusable components in one place
- Scales well as project grows

---

## 14. Best Practices Followed

### 14.1 Code Organization

✅ **One component per file**
- Easier to find and maintain
- Clear component boundaries

✅ **Logical folder structure**
- Pages for routes
- Components for reusables
- Services for utilities

✅ **Consistent naming**
- PascalCase for components
- camelCase for utilities
- kebab-case for assets

---

### 14.2 Component Design

✅ **Small, focused components**
- Each component has one responsibility
- Easier to understand and test

✅ **Props for configuration**
- Components configurable via props
- Makes components reusable

✅ **Composition over inheritance**
- Build complex UIs by combining simple components
- More flexible than class inheritance

---

## Summary - Phase 2

You've learned:

1. ✅ **High-level architecture** - How the app is structured
2. ✅ **Complete file structure** - Every directory explained
3. ✅ **Component hierarchy** - How components nest
4. ✅ **Data flow patterns** - State management and props
5. ✅ **Routing architecture** - How navigation works
6. ✅ **Build process** - Development vs Production
7. ✅ **Configuration files** - What each config does
8. ✅ **Best practices** - Why decisions were made

**Next Phase Preview:**
Phase 3 will dive deep into individual components with:
- Line-by-line code explanations
- Component props and state
- Event handlers and logic
- Styling decisions
- Real code examples

---

## Quick Reference - File Locations

**Need to edit navigation?** → `src/components/Header.tsx`
**Need to add a page?** → Create in `src/pages/` + add route in `App.tsx`
**Need to add an image?** → `src/assets/img/` or `public/images/`
**Need to style something?** → Use Tailwind classes or `src/index.css`
**Need to optimize images?** → Use services in `src/services/`
**Build for production?** → Run `npm run build` → Check `dist/`

---

**Ready for Phase 3? Deep dive into component implementation awaits!**
