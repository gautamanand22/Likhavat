// Performance Optimization Utilities

// Debounce utility for scroll events
export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

// Throttle utility for high-frequency events
export const throttle = (func, limit) => {
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
}

// Intersection Observer utility for scroll animations
export const createIntersectionObserver = (callback, options = {}) => {
    const defaultOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    }

    return new IntersectionObserver(callback, { ...defaultOptions, ...options })
}

// Preload images utility
export const preloadImages = (imageUrls) => {
    return Promise.all(
        imageUrls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image()
                img.onload = resolve
                img.onerror = reject
                img.src = url
            })
        })
    )
}

// GSAP performance settings
export const gsapConfig = {
    autoSleep: 30,
    force3D: true,
    nullTargetWarn: false,
    units: { rotation: "deg" }
}

// ScrollTrigger performance settings
export const scrollTriggerConfig = {
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    ignoreMobileResize: true
}

// Lazy loading utility
export const lazyLoad = (element, callback) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target)
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.1 })

    observer.observe(element)
    return observer
}

// CSS GPU acceleration utility
export const enableGPUAcceleration = (element) => {
    if (element) {
        element.style.transform = 'translateZ(0)'
        element.style.backfaceVisibility = 'hidden'
        element.style.perspective = '1000px'
    }
}

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Optimize animations based on device performance
export const getPerformanceMode = () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const hardwareConcurrency = navigator.hardwareConcurrency || 4

    // Check for low-end devices
    if (hardwareConcurrency <= 2 || (connection && connection.effectiveType === 'slow-2g')) {
        return 'low'
    }

    // Check for high-end devices
    if (hardwareConcurrency >= 8) {
        return 'high'
    }

    return 'medium'
}
