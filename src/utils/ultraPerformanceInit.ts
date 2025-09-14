// EXTREME PERFORMANCE INITIALIZER
// Initialize all ultra-fast loading systems on app start

import { extremePerformanceManager } from '../services/extremePerformance';
import { lightningCDN } from '../services/lightningCDN';

class UltraPerformanceInit {
    private static instance: UltraPerformanceInit;
    private initialized = false;

    public static getInstance(): UltraPerformanceInit {
        if (!UltraPerformanceInit.instance) {
            UltraPerformanceInit.instance = new UltraPerformanceInit();
        }
        return UltraPerformanceInit.instance;
    }

    public async initialize(): Promise<void> {
        if (this.initialized) return;

        console.log('🚀 Initializing EXTREME Performance Mode...');

        try {
            // 1. Register service worker for aggressive caching
            await this.registerServiceWorker();

            // 2. Start extreme performance manager
            extremePerformanceManager.preloadComponentImages([
                'design.jpg',
                'about.jpg',
                'offset.jpg',
                'manual.jpg',
                'book.png'
            ]);

            // 3. Preload critical resources immediately
            await this.preloadCriticalResources();

            // 4. Start background optimization
            this.startBackgroundOptimization();

            // 5. Enable performance monitoring
            this.enablePerformanceMonitoring();

            this.initialized = true;
            console.log('⚡ EXTREME Performance Mode ACTIVATED!');

        } catch (error) {
            console.warn('Performance initialization failed:', error);
            // Continue without performance optimizations
        }
    }

    private async registerServiceWorker(): Promise<void> {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered for ultra-fast caching');

                // Send critical resources to SW for preloading
                if (registration.active) {
                    registration.active.postMessage({
                        type: 'PRELOAD_RESOURCES',
                        resources: this.getCriticalResources()
                    });
                }
            } catch (error) {
                console.log('Service Worker registration failed:', error);
            }
        }
    }

    private async preloadCriticalResources(): Promise<void> {
        const criticalImages = [
            'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=70&auto=format,compress&fm=webp&cs=srgb&dpr=2',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=70&auto=format,compress&fm=webp&cs=srgb&dpr=2',
            'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1000&q=70&auto=format,compress&fm=webp&cs=srgb&dpr=2'
        ];

        // Preload in parallel for maximum speed
        const preloadPromises = criticalImages.map(src => {
            return new Promise<void>((resolve) => {
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = () => resolve(); // Don't fail the entire process
                img.src = src;
            });
        });

        await Promise.allSettled(preloadPromises);
        console.log('Critical images preloaded');
    }

    private startBackgroundOptimization(): void {
        // Start background preloading after initial load
        setTimeout(() => {
            // Preload next page resources using extreme performance manager
            const nextPageResources = [
                'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=800&q=70&auto=format,compress&fm=webp',
                'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=70&auto=format,compress&fm=webp',
                'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=70&auto=format,compress&fm=webp'
            ];

            nextPageResources.forEach(url => {
                extremePerformanceManager.loadImageUltraFast(url).catch(() => {
                    // Silent fail for background loading
                });
            });
        }, 2000);
    }

    private enablePerformanceMonitoring(): void {
        // Monitor resource loading times
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'resource' && entry.name.includes('unsplash')) {
                        console.log(`🏎️ Image loaded in ${entry.duration.toFixed(2)}ms: ${entry.name}`);
                    }
                });
            });

            observer.observe({ entryTypes: ['resource'] });
        }

        // Basic Core Web Vitals monitoring without external dependency
        if ('PerformanceObserver' in window) {
            try {
                // Largest Contentful Paint
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.startTime);
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

                // First Input Delay
                const fidObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry: any) => {
                        if (entry.processingStart) {
                            console.log('FID:', entry.processingStart - entry.startTime);
                        }
                    });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
            } catch (error) {
                // Silent fail for unsupported browsers
            }
        }
    }

    private getCriticalResources(): string[] {
        return [
            'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=60&auto=format,compress&fm=webp',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=60&auto=format,compress&fm=webp',
            'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=60&auto=format,compress&fm=webp',
            'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=400&q=60&auto=format,compress&fm=webp',
            'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=60&auto=format,compress&fm=webp'
        ];
    }

    // Emergency performance boost - call when performance is critical
    public emergencySpeedBoost(): void {
        console.log('🔥 EMERGENCY SPEED BOOST ACTIVATED!');

        // Disable all non-critical animations
        document.documentElement.style.setProperty('--animation-duration', '0s');

        // Preload everything visible immediately
        const visibleImages = document.querySelectorAll('img[data-src]');
        visibleImages.forEach((img: any) => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });

        // Force immediate rendering
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                document.body.style.transform = 'translateZ(0)';
                setTimeout(() => {
                    document.body.style.transform = '';
                }, 100);
            });
        }
    }
}

export const ultraPerformanceInit = UltraPerformanceInit.getInstance();
