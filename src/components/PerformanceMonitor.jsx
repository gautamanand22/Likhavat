import React, { useEffect } from 'react'

const PerformanceMonitor = () => {
    useEffect(() => {
        // Monitor frame rate
        let frames = 0
        let startTime = Date.now()

        const checkFPS = () => {
            frames++
            const now = Date.now()

            if (now - startTime >= 1000) {
                const fps = Math.round((frames * 1000) / (now - startTime))

                // Log performance issues
                if (fps < 30) {
                    console.warn(`Low FPS detected: ${fps}fps`)

                    // Disable heavy animations if performance is poor
                    document.body.classList.add('reduced-motion')
                } else {
                    document.body.classList.remove('reduced-motion')
                }

                frames = 0
                startTime = now
            }

            requestAnimationFrame(checkFPS)
        }

        requestAnimationFrame(checkFPS)

        // Monitor memory usage (if available)
        if (performance.memory) {
            const checkMemory = () => {
                const memoryInfo = performance.memory
                const usedMB = Math.round(memoryInfo.usedJSHeapSize / 1048576)
                const limitMB = Math.round(memoryInfo.jsHeapSizeLimit / 1048576)

                if (usedMB > limitMB * 0.8) {
                    console.warn(`High memory usage: ${usedMB}MB / ${limitMB}MB`)
                }
            }

            const memoryInterval = setInterval(checkMemory, 5000)
            return () => clearInterval(memoryInterval)
        }
    }, [])

    return null // This is a utility component with no UI
}

export default PerformanceMonitor
