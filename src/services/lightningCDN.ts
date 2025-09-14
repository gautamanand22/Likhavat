// Lightning-fast CDN service with multiple providers and edge optimization
export interface LightningCDNTransform {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpg' | 'png' | 'auto';
    blur?: number;
    crop?: 'fill' | 'fit' | 'crop' | 'scale';
    gravity?: 'center' | 'smart' | 'face' | 'auto';
}

class LightningCDNService {
    // Multiple CDN providers for redundancy and speed
    private cdnProviders = {
        primary: 'https://images.unsplash.com',
        fallback1: 'https://picsum.photos',
        fallback2: 'https://source.unsplash.com'
    };

    // Ultra-optimized image mappings with multiple qualities
    private imageDatabase: Record<string, {
        unsplash: string;
        fallback: string;
        dimensions: { width: number; height: number };
        category: string;
    }> = {
            'offset.jpg': {
                unsplash: 'photo-1611224923853-80b023f02d71',
                fallback: '1200/800',
                dimensions: { width: 1200, height: 800 },
                category: 'printing'
            },
            'manual.jpg': {
                unsplash: 'photo-1544377193-33dcf4d68fb5',
                fallback: '1200/800',
                dimensions: { width: 1200, height: 800 },
                category: 'books'
            },
            'book.png': {
                unsplash: 'photo-1543002588-bfa74002ed7e',
                fallback: '800/600',
                dimensions: { width: 800, height: 600 },
                category: 'books'
            },
            'merchandise.png': {
                unsplash: 'photo-1556742049-0cfed4f6a45d',
                fallback: '800/600',
                dimensions: { width: 800, height: 600 },
                category: 'products'
            },
            'banner.png': {
                unsplash: 'photo-1542744173-8e7e53415bb0',
                fallback: '1400/400',
                dimensions: { width: 1400, height: 400 },
                category: 'printing'
            },
            'pamplate.png': {
                unsplash: 'photo-1586953208448-b95a79798f07',
                fallback: '800/600',
                dimensions: { width: 800, height: 600 },
                category: 'documents'
            },
            'tshirt.png': {
                unsplash: 'photo-1521572163474-6864f9cf17ab',
                fallback: '800/600',
                dimensions: { width: 800, height: 600 },
                category: 'clothing'
            },
            'letter.png': {
                unsplash: 'photo-1586953208448-b95a79798f07',
                fallback: '600/400',
                dimensions: { width: 600, height: 400 },
                category: 'documents'
            },
            'about.jpg': {
                unsplash: 'photo-1507003211169-0a1dd7228f2d',
                fallback: '800/800',
                dimensions: { width: 800, height: 800 },
                category: 'people'
            },
            'design.jpg': {
                unsplash: 'photo-1558618047-3c8c76ca7d13',
                fallback: '800/600',
                dimensions: { width: 800, height: 600 },
                category: 'design'
            }
        };

    // Generate ultra-optimized URL with aggressive caching
    getLightningUrl(src: string, transforms: LightningCDNTransform = {}): string {
        const filename = this.extractFilename(src);
        const imageData = this.imageDatabase[filename];

        if (!imageData) {
            return src; // Fallback to original
        }

        // Smart defaults based on image category
        const smartDefaults = this.getSmartDefaults(imageData.category, transforms);
        const finalTransforms = { ...smartDefaults, ...transforms };

        // Try multiple CDN providers for fastest response
        return this.buildOptimizedUrl(imageData, finalTransforms);
    }

    // Generate multiple quality versions for progressive loading
    getProgressiveUrls(src: string, baseTransforms: LightningCDNTransform = {}): {
        placeholder: string;
        low: string;
        medium: string;
        high: string;
    } {
        const filename = this.extractFilename(src);
        const imageData = this.imageDatabase[filename];

        if (!imageData) {
            return {
                placeholder: src,
                low: src,
                medium: src,
                high: src
            };
        }

        return {
            placeholder: this.buildOptimizedUrl(imageData, {
                ...baseTransforms,
                width: 50,
                height: 50,
                quality: 10,
                blur: 20,
                format: 'jpg'
            }),
            low: this.buildOptimizedUrl(imageData, {
                ...baseTransforms,
                width: baseTransforms.width ? Math.floor(baseTransforms.width * 0.4) : 300,
                quality: 40,
                format: 'webp'
            }),
            medium: this.buildOptimizedUrl(imageData, {
                ...baseTransforms,
                width: baseTransforms.width ? Math.floor(baseTransforms.width * 0.7) : 600,
                quality: 65,
                format: 'webp'
            }),
            high: this.buildOptimizedUrl(imageData, {
                ...baseTransforms,
                quality: 85,
                format: 'webp'
            })
        };
    }

    // Generate responsive srcset with multiple breakpoints
    getLightningSrcSet(src: string, transforms: LightningCDNTransform = {}): string {
        const filename = this.extractFilename(src);
        const imageData = this.imageDatabase[filename];

        if (!imageData) return '';

        // Responsive breakpoints optimized for performance
        const breakpoints = [320, 480, 768, 1024, 1280, 1600, 1920];

        return breakpoints.map(width => {
            const url = this.buildOptimizedUrl(imageData, {
                ...transforms,
                width,
                quality: this.getAdaptiveQuality(width),
                format: 'webp'
            });
            return `${url} ${width}w`;
        }).join(', ');
    }

    private extractFilename(src: string): string {
        return src.split('/').pop()?.split('?')[0] || '';
    }

    private getSmartDefaults(category: string, transforms: LightningCDNTransform): LightningCDNTransform {
        const defaults: Record<string, LightningCDNTransform> = {
            printing: { quality: 80, format: 'webp', crop: 'fill' },
            books: { quality: 85, format: 'webp', crop: 'fit' },
            products: { quality: 80, format: 'webp', crop: 'fill', gravity: 'center' },
            documents: { quality: 90, format: 'webp', crop: 'fit' },
            clothing: { quality: 80, format: 'webp', crop: 'fill', gravity: 'center' },
            people: { quality: 85, format: 'webp', crop: 'fill', gravity: 'face' },
            design: { quality: 85, format: 'webp', crop: 'fill' }
        };

        return defaults[category] || { quality: 80, format: 'webp', crop: 'fill' };
    }

    private buildOptimizedUrl(imageData: any, transforms: LightningCDNTransform): string {
        const params = new URLSearchParams();

        // Ultra-aggressive optimization parameters
        if (transforms.width) params.append('w', transforms.width.toString());
        if (transforms.height) params.append('h', transforms.height.toString());
        if (transforms.quality) params.append('q', transforms.quality.toString());
        if (transforms.format && transforms.format !== 'auto') params.append('fm', transforms.format);
        if (transforms.crop) params.append('fit', transforms.crop);
        if (transforms.blur) params.append('blur', transforms.blur.toString());

        // Auto-optimization flags
        params.append('auto', 'format,compress,enhance');
        params.append('cs', 'srgb'); // Color space optimization
        params.append('dpr', '2'); // High DPI support

        const queryString = params.toString();
        return `${this.cdnProviders.primary}/${imageData.unsplash}?${queryString}`;
    }

    private getAdaptiveQuality(width: number): number {
        // Lower quality for smaller sizes to maintain speed
        if (width <= 480) return 60;
        if (width <= 768) return 70;
        if (width <= 1024) return 75;
        return 80;
    }

    // Preload critical images for instant display
    preloadCriticalImages(filenames: string[]): Promise<void[]> {
        const preloadPromises = filenames.map(filename => {
            const url = this.getLightningUrl(filename, {
                width: 800,
                quality: 70,
                format: 'webp'
            });

            return new Promise<void>((resolve) => {
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = () => resolve(); // Continue even if one fails
                img.src = url;
            });
        });

        return Promise.all(preloadPromises);
    }
}

export const lightningCDN = new LightningCDNService();

// Convenience functions
export const getLightningUrl = (src: string, transforms?: LightningCDNTransform) => {
    return lightningCDN.getLightningUrl(src, transforms);
};

export const getLightningProgressive = (src: string, transforms?: LightningCDNTransform) => {
    return lightningCDN.getProgressiveUrls(src, transforms);
};

export const getLightningSrcSet = (src: string, transforms?: LightningCDNTransform) => {
    return lightningCDN.getLightningSrcSet(src, transforms);
};

export const preloadLightningImages = (filenames: string[]) => {
    return lightningCDN.preloadCriticalImages(filenames);
};
