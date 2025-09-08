import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useSmoothScroll = () => {
    const lenisRef = useRef()

    useEffect(() => {
        // Initialize Lenis with optimized settings
        const lenis = new Lenis({
            duration: 0.8, // Reduced for better performance
            easing: (t) => 1 - Math.pow(1 - t, 3), // Simpler easing function
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 0.8, // Reduced sensitivity
            smoothTouch: false,
            touchMultiplier: 1.5,
            infinite: false,
            syncTouch: true, // Better mobile performance
        })

        lenisRef.current = lenis

        // Optimized GSAP integration
        const raf = (time) => {
            lenis.raf(time)
        }

        // Use requestAnimationFrame instead of gsap.ticker for better performance
        const tick = () => {
            raf(performance.now())
            requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)

        // Throttled ScrollTrigger update
        let scrollTimeout
        lenis.on('scroll', () => {
            clearTimeout(scrollTimeout)
            scrollTimeout = setTimeout(() => {
                ScrollTrigger.update()
            }, 16) // ~60fps
        })

        // Debounced resize handler
        let resizeTimeout
        const handleResize = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(() => {
                ScrollTrigger.refresh()
            }, 150)
        }

        window.addEventListener('resize', handleResize, { passive: true })

        return () => {
            clearTimeout(scrollTimeout)
            clearTimeout(resizeTimeout)
            lenis.destroy()
            window.removeEventListener('resize', handleResize)
        }
    }, [])
}

export default useSmoothScroll
