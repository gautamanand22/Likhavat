import { useEffect, useRef, useState } from 'react'

export const useSnapScroll = () => {
    const [currentSection, setCurrentSection] = useState(0)
    const sectionsRef = useRef([])
    const isScrollingRef = useRef(false)

    useEffect(() => {
        const sections = document.querySelectorAll('.snap-start')
        sectionsRef.current = Array.from(sections)

        const handleScroll = () => {
            if (isScrollingRef.current) return

            const scrollPosition = window.scrollY
            const windowHeight = window.innerHeight

            // Find which section is currently in view
            sectionsRef.current.forEach((section, index) => {
                const rect = section.getBoundingClientRect()
                const sectionTop = rect.top + scrollPosition
                const sectionHeight = rect.height

                if (
                    scrollPosition >= sectionTop - windowHeight / 2 &&
                    scrollPosition < sectionTop + sectionHeight - windowHeight / 2
                ) {
                    setCurrentSection(index)
                }
            })
        }

        const throttledScroll = throttle(handleScroll, 100)
        window.addEventListener('scroll', throttledScroll)

        return () => {
            window.removeEventListener('scroll', throttledScroll)
        }
    }, [])

    const scrollToSection = (index) => {
        if (index < 0 || index >= sectionsRef.current.length) return

        isScrollingRef.current = true
        const section = sectionsRef.current[index]

        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })

            // Reset scrolling flag after animation
            setTimeout(() => {
                isScrollingRef.current = false
                setCurrentSection(index)
            }, 1000)
        }
    }

    const scrollToNext = () => {
        const nextIndex = Math.min(currentSection + 1, sectionsRef.current.length - 1)
        scrollToSection(nextIndex)
    }

    const scrollToPrevious = () => {
        const prevIndex = Math.max(currentSection - 1, 0)
        scrollToSection(prevIndex)
    }

    return {
        currentSection,
        totalSections: sectionsRef.current.length,
        scrollToSection,
        scrollToNext,
        scrollToPrevious
    }
}

// Throttle utility function
const throttle = (func, delay) => {
    let timeoutId
    let lastExecTime = 0

    return function (...args) {
        const currentTime = Date.now()

        if (currentTime - lastExecTime > delay) {
            func.apply(this, args)
            lastExecTime = currentTime
        } else {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                func.apply(this, args)
                lastExecTime = Date.now()
            }, delay - (currentTime - lastExecTime))
        }
    }
}

export default useSnapScroll
