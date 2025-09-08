// Performance optimization utilities for GSAP and React

export const gsapConfig = {
    // Optimized GSAP configuration
    setup: () => {
        const { gsap } = require('gsap')

        gsap.config({
            autoSleep: 30,
            force3D: true,
            nullTargetWarn: false,
            units: { rotation: "deg", x: "px", y: "px" }
        })

        // Set default ease for better performance
        gsap.defaults({
            ease: "power2.out",
            duration: 0.6
        })
    }
}

export const scrollConfig = {
    // Optimized scroll configuration
    lenis: {
        duration: 0.6,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smooth: true,
        mouseMultiplier: 0.8,
        touchMultiplier: 1.5,
        syncTouch: true,
    },

    // Intersection Observer options
    observer: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }
}

export const animationConfig = {
    // Reduced motion settings
    reducedMotion: {
        duration: 0.01,
        ease: "none"
    },

    // Standard motion settings
    standardMotion: {
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05
    },

    // Fast motion for UI elements
    fastMotion: {
        duration: 0.3,
        ease: "power2.out"
    }
}

export const performanceUtils = {
    // Throttle function for scroll events
    throttle: (func, limit) => {
        let inThrottle
        return function () {
            const args = arguments
            const context = this
            if (!inThrottle) {
                func.apply(context, args)
                inThrottle = true
                setTimeout(() => inThrottle = false, limit)
            }
        }
    },

    // Debounce function for resize events
    debounce: (func, wait) => {
        let timeout
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout)
                func(...args)
            }
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
        }
    },

    // Check if user prefers reduced motion
    prefersReducedMotion: () => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    },

    // Check if device is mobile
    isMobile: () => {
        return window.innerWidth <= 768 || 'ontouchstart' in window
    },

    // Optimize images by checking if they're in viewport
    lazyLoadImages: () => {
        const images = document.querySelectorAll('img[data-src]')
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target
                    img.src = img.dataset.src
                    img.removeAttribute('data-src')
                    observer.unobserve(img)
                }
            })
        })

        images.forEach(img => imageObserver.observe(img))
    }
}

export default {
    gsapConfig,
    scrollConfig,
    animationConfig,
    performanceUtils
}
