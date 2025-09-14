// Extreme Performance Manager - Pushes loading speeds to the absolute limit
class ExtremePerformanceManager {
    private static instance: ExtremePerformanceManager;
    private loadingQueue: Set<string> = new Set();
    private loadedImages: Map<string, HTMLImageElement> = new Map();
    private prefetchQueue: string[] = [];
    private isAggressiveMode = true;

    static getInstance(): ExtremePerformanceManager {
        if (!ExtremePerformanceManager.instance) {
            ExtremePerformanceManager.instance = new ExtremePerformanceManager();
        }
        return ExtremePerformanceManager.instance;
    }

    constructor() {
        this.initializePerformanceOptimizations();
    }

    private initializePerformanceOptimizations() {
        if (typeof window === 'undefined') return;

        // Enable aggressive browser optimizations
        this.enableAggressiveBrowserOptimizations();

        // Start background image preloading
        this.startBackgroundPreloading();

        // Monitor network conditions
        this.monitorNetworkConditions();

        // Optimize for different device types
        this.optimizeForDevice();
    }

    private enableAggressiveBrowserOptimizations() {
        // Force enable image decoding
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => {
                // Preload critical resources during idle time
                this.preloadCriticalResources();
            });
        }

        // Enable experimental features if available
        if ('chrome' in window && 'loadTimes' in (window as any).chrome) {
            this.isAggressiveMode = true;
        }
    }

    private startBackgroundPreloading() {
        // Continuously preload images in the background
        const preloadWorker = () => {
            if (this.prefetchQueue.length > 0) {
                const nextUrl = this.prefetchQueue.shift();
                if (nextUrl) {
                    this.preloadImageSilently(nextUrl);
                }
            }

            // Continue the cycle
            setTimeout(preloadWorker, 50); // Very frequent checks
        };

        preloadWorker();
    }

    private preloadImageSilently(url: string): Promise<void> {
        return new Promise((resolve) => {
            if (this.loadedImages.has(url)) {
                resolve();
                return;
            }

            const img = new Image();
            img.onload = () => {
                this.loadedImages.set(url, img);
                resolve();
            };
            img.onerror = () => resolve(); // Continue even on error

            // Ultra-aggressive loading
            img.loading = 'eager';
            img.decoding = 'sync';
            img.src = url;
        });
    }

    private monitorNetworkConditions() {
        if ('connection' in navigator) {
            const connection = (navigator as any).connection;

            const updateStrategy = () => {
                if (connection.effectiveType === '4g') {
                    this.isAggressiveMode = true;
                } else if (connection.effectiveType === '3g') {
                    this.isAggressiveMode = false;
                } else {
                    this.isAggressiveMode = false;
                }
            };

            updateStrategy();
            connection.addEventListener('change', updateStrategy);
        }
    }

    private optimizeForDevice() {
        const deviceMemory = (navigator as any).deviceMemory || 4;
        const hardwareConcurrency = navigator.hardwareConcurrency || 4;

        // Adjust preloading strategy based on device capabilities
        const maxConcurrentLoads = Math.min(
            Math.floor(deviceMemory * 2),
            hardwareConcurrency,
            8 // Cap at 8 concurrent loads
        );

        this.startConcurrentLoading(maxConcurrentLoads);
    }

    private startConcurrentLoading(maxConcurrent: number) {
        const loadingWorkers = Array.from({ length: maxConcurrent }, () => {
            return this.createLoadingWorker();
        });

        loadingWorkers.forEach(worker => worker());
    }

    private createLoadingWorker() {
        return async () => {
            while (true) {
                if (this.prefetchQueue.length > 0) {
                    const url = this.prefetchQueue.shift();
                    if (url) {
                        await this.preloadImageSilently(url);
                    }
                }

                // Small delay to prevent overwhelming the browser
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        };
    }

    private preloadCriticalResources() {
        const criticalImages = [
            'design.jpg',
            'about.jpg',
            'offset.jpg'
        ];

        criticalImages.forEach(filename => {
            this.addToPrefetchQueue(filename, true);
        });
    }

    // Public methods for components to use
    addToPrefetchQueue(filename: string, highPriority = false) {
        if (highPriority) {
            this.prefetchQueue.unshift(filename);
        } else {
            this.prefetchQueue.push(filename);
        }
    }

    getPreloadedImage(url: string): HTMLImageElement | null {
        return this.loadedImages.get(url) || null;
    }

    isImagePreloaded(url: string): boolean {
        return this.loadedImages.has(url);
    }

    // Ultra-fast image loading with multiple fallback strategies
    async loadImageUltraFast(url: string): Promise<HTMLImageElement> {
        // Check if already preloaded
        if (this.loadedImages.has(url)) {
            return this.loadedImages.get(url)!;
        }

        // Try multiple loading strategies simultaneously
        const strategies = [
            this.loadWithFetch(url),
            this.loadWithImage(url),
            this.loadWithWorker(url)
        ];

        return Promise.race(strategies);
    }

    private async loadWithFetch(url: string): Promise<HTMLImageElement> {
        try {
            const response = await fetch(url, {
                cache: 'force-cache',
                priority: 'high' as any
            });
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);

            const img = new Image();
            return new Promise((resolve, reject) => {
                img.onload = () => {
                    URL.revokeObjectURL(objectUrl);
                    this.loadedImages.set(url, img);
                    resolve(img);
                };
                img.onerror = reject;
                img.src = objectUrl;
            });
        } catch {
            throw new Error('Fetch strategy failed');
        }
    }

    private async loadWithImage(url: string): Promise<HTMLImageElement> {
        const img = new Image();
        img.loading = 'eager';
        img.decoding = 'async';

        return new Promise((resolve, reject) => {
            img.onload = () => {
                this.loadedImages.set(url, img);
                resolve(img);
            };
            img.onerror = reject;
            img.src = url;
        });
    }

    private async loadWithWorker(url: string): Promise<HTMLImageElement> {
        // Simulate worker loading (in real implementation, use Web Workers)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Worker strategy not implemented'));
            }, 100);
        });
    }

    // Preload entire image set for a component
    preloadComponentImages(filenames: string[]) {
        filenames.forEach((filename, index) => {
            this.addToPrefetchQueue(filename, index < 3); // First 3 are high priority
        });
    }

    // Get performance metrics
    getPerformanceMetrics() {
        return {
            preloadedCount: this.loadedImages.size,
            queueLength: this.prefetchQueue.length,
            isAggressiveMode: this.isAggressiveMode,
            memoryUsage: this.loadedImages.size * 0.5 // Rough estimate in MB
        };
    }

    // Clear cache if memory gets too high
    clearCache() {
        this.loadedImages.clear();
        this.prefetchQueue = [];
    }
}

export const extremePerformanceManager = ExtremePerformanceManager.getInstance();

// Initialize on import
if (typeof window !== 'undefined') {
    // Start extreme performance optimizations
    extremePerformanceManager.preloadComponentImages([
        'design.jpg',
        'about.jpg',
        'offset.jpg',
        'manual.jpg',
        'book.png'
    ]);
}
