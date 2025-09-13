# CETMEDS - Premium Medical Solutions Website

An award-winning scroll animation website for CETMEDS, a premium medicine company specializing in eye drops, ear drops, and other medical solutions. Built with React, GSAP, and Tailwind CSS.

## ✨ Features

- **Smooth Scroll Animations**: Powered by GSAP and Lenis for buttery smooth scrolling
- **3D Product Showcase**: Interactive 3D product cards with tilt effects
- **Parallax Scrolling**: Multiple layers of parallax effects for depth
- **Magnetic Cursor**: Custom cursor that responds to interactive elements
- **Scroll Progress**: Visual progress indicator and scroll-to-top functionality
- **Responsive Design**: Optimized for all screen sizes
- **Performance Optimized**: Lazy loading and optimized animations
- **Award-Worthy Animations**: Professional-grade scroll animations

## 🛠️ Technologies Used

- **React 19** - Latest version with modern hooks
- **GSAP 3.13** - Professional animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Lenis** - Smooth scroll library
- **Vite** - Fast build tool
- **PostCSS & Autoprefixer** - CSS processing

## 🎨 Design Features

- **Modern Medical Theme**: Clean, professional design suitable for healthcare
- **Interactive Elements**: Hover effects, 3D transformations, and micro-interactions
- **Color Coded Products**: Each product has its own color scheme
- **Glass Morphism**: Modern glass effects throughout the site
- **Gradient Backgrounds**: Sophisticated gradient combinations

## 📱 Sections

1. **Hero Section**: Dynamic introduction with floating elements
2. **Products Section**: 3D showcase of medical products
3. **Parallax Section**: Trust indicators with parallax effects
4. **Benefits Section**: Why choose CETMEDS with animated stats
5. **Testimonials**: Rotating testimonial carousel
6. **Contact Section**: Interactive contact form with animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Gsap2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

## 🎯 Performance Features

- **Optimized GSAP**: Using context and proper cleanup
- **Lazy Loading**: Images and components load when needed
- **Smooth Scrolling**: Lenis integration for 60fps scrolling
- **Reduced Motion**: Respects user's motion preferences
- **Mobile Optimized**: Touch-friendly interactions

## 🎨 Customization

### Adding New Products
Edit `src/constants/index.js` to add new products to the showcase.

### Modifying Colors
Update the Tailwind config in `tailwind.config.js` for color schemes.

### Animation Timing
Adjust GSAP timelines in individual section components.

## 🧩 Component Structure

```
src/
├── components/
│   ├── NavBar.jsx              # Navigation with scroll effects
│   ├── ScrollProgress.jsx      # Progress indicator
│   ├── MagneticCursor.jsx     # Custom cursor
│   └── Product3DShowcase.jsx  # 3D product cards
├── sections/
│   ├── HeroSection.jsx        # Landing section
│   ├── ProductsSection.jsx    # Product showcase
│   ├── ParallaxSection.jsx    # Trust indicators
│   ├── BenefitsSection.jsx    # Benefits with stats
│   ├── TestimonialsSection.jsx # Customer testimonials
│   └── ContactSection.jsx     # Contact form
├── hooks/
│   └── useSmoothScroll.js     # Smooth scroll hook
├── constants/
│   └── index.js               # App constants
└── App.jsx                    # Main app component
```

## 🔧 Configuration

### GSAP Plugins Used
- ScrollTrigger
- Observer (for scroll detection)

### Lenis Configuration
- Duration: 1.2s
- Easing: Custom easing function
- Touch support: Disabled for consistency

## 📊 SEO Features

- Semantic HTML structure
- Meta tags optimization
- Accessible navigation
- Image alt attributes
- Fast loading times

## 🎭 Animation Highlights

- **Page Load**: Staggered element animations
- **Scroll Triggers**: Elements animate as they enter viewport
- **3D Effects**: CSS transforms with perspective
- **Parallax**: Multiple layer scrolling effects
- **Magnetic Elements**: Cursor-following interactions

## 🌟 Award-Worthy Elements

- **Smooth Performance**: 60fps animations throughout
- **Professional Polish**: Attention to micro-interactions
- **Medical Branding**: Appropriate for healthcare industry
- **Modern Techniques**: Latest web animation standards
- **User Experience**: Intuitive and engaging interactions

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for CETMEDS - Enhancing healthcare through premium medical solutions.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
