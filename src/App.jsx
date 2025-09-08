import React, { useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'

// Sections - Lazy import for better performance
import HeroSection from './sections/HeroSection'
import StatsSection from './sections/StatsSection'
import ProductsSection from './sections/ProductsSection'
import ParallaxSection from './sections/ParallaxSection'
import BenefitsSection from './sections/BenefitsSection'
import TestimonialsSection from './sections/TestimonialsSection'
import ContactSection from './sections/ContactSection'

// Components
import NavBar from './components/NavBar'
import ScrollProgress from './components/ScrollProgress'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const App = () => {

  const initializeGSAP = useCallback(() => {
    // Ultra-lightweight GSAP configuration for maximum performance
    gsap.config({
      autoSleep: 10,
      force3D: false, // Disable 3D transforms to reduce GPU load
      nullTargetWarn: false,
      units: { rotation: "deg" }
    })

    // Minimal ScrollTrigger configuration
    ScrollTrigger.config({
      autoRefreshEvents: "none", // Disable auto-refresh for performance
      ignoreMobileResize: true
    })

    // DISABLE ALL SCROLL ANIMATIONS TO ELIMINATE LAG
    // Only use simple fade-in on initial load, no scroll-based animations
    const elements = document.querySelectorAll('.animate-on-scroll')

    if (elements.length > 0) {
      // Simple one-time fade in, no scroll triggers
      gsap.fromTo(elements,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "none"
        }
      )
    }

  }, [])

  useEffect(() => {
    // Immediate initialization
    initializeGSAP()

    return () => {
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      ScrollTrigger.clearScrollMemory()
    }
  }, [initializeGSAP])

  return (
    <div className="relative bg-white">
      {/* Lightweight Navigation */}
      <NavBar />

      {/* Main Content - No scroll progress to reduce scroll events */}
      {/* Main Content */}
      <main className="relative">
        <HeroSection />
        <StatsSection />
        <ProductsSection />
        <ParallaxSection />
        <BenefitsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </div>
  )
}

export default App