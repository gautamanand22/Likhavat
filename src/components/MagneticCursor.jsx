import React, { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

const MagneticCursor = () => {
    const cursorRef = useRef(null)
    const cursorDotRef = useRef(null)
    const requestRef = useRef()
    const mousePos = useRef({ x: 0, y: 0 })

    // Throttled mouse move handler
    const handleMouseMove = useCallback((e) => {
        mousePos.current = { x: e.clientX, y: e.clientY }

        if (!requestRef.current) {
            requestRef.current = requestAnimationFrame(() => {
                const { x, y } = mousePos.current

                gsap.set(cursorRef.current, {
                    x: x - 20,
                    y: y - 20,
                })

                gsap.set(cursorDotRef.current, {
                    x: x - 4,
                    y: y - 4,
                })

                requestRef.current = null
            })
        }
    }, [])

    // Optimized hover effects
    const handleMouseEnter = useCallback(() => {
        gsap.to(cursorRef.current, {
            scale: 1.5,
            opacity: 0.8,
            duration: 0.2,
            ease: "power2.out"
        })
    }, [])

    const handleMouseLeave = useCallback(() => {
        gsap.to(cursorRef.current, {
            scale: 1,
            opacity: 0.6,
            duration: 0.2,
            ease: "power2.out"
        })
    }, [])

    useEffect(() => {
        // Only enable on desktop with mouse
        if (window.innerWidth <= 768 || 'ontouchstart' in window) {
            return
        }

        const cursor = cursorRef.current
        const cursorDot = cursorDotRef.current

        if (!cursor || !cursorDot) return

        // Set initial position
        gsap.set([cursor, cursorDot], {
            xPercent: -50,
            yPercent: -50,
            force3D: true
        })

        // Add passive event listeners for better performance
        document.addEventListener('mousemove', handleMouseMove, { passive: true })

        // Add hover effects with delegation for better performance
        const handleDelegatedHover = (e) => {
            const target = e.target.closest('button, a, input, textarea, .cursor-hover')
            if (target) {
                if (e.type === 'mouseover') {
                    handleMouseEnter()
                } else if (e.type === 'mouseout') {
                    handleMouseLeave()
                }
            }
        }

        document.addEventListener('mouseover', handleDelegatedHover, { passive: true })
        document.addEventListener('mouseout', handleDelegatedHover, { passive: true })

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseover', handleDelegatedHover)
            document.removeEventListener('mouseout', handleDelegatedHover)

            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current)
            }
        }
    }, [handleMouseMove, handleMouseEnter, handleMouseLeave])

    // Don't render on mobile or touch devices
    if (typeof window !== 'undefined' && (window.innerWidth <= 768 || 'ontouchstart' in window)) {
        return null
    }

    return (
        <div className="hidden md:block pointer-events-none fixed inset-0 z-50">
            <div
                ref={cursorRef}
                className="fixed w-10 h-10 border-2 border-blue-400 rounded-full opacity-60"
                style={{ willChange: 'transform' }}
            ></div>
            <div
                ref={cursorDotRef}
                className="fixed w-2 h-2 bg-blue-400 rounded-full"
                style={{ willChange: 'transform' }}
            ></div>
        </div>
    )
}

export default MagneticCursor
