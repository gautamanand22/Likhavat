import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getLightningProgressive, getLightningSrcSet, LightningCDNTransform } from '../services/lightningCDN';

interface UltraFastImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    priority?: boolean;
    transforms?: LightningCDNTransform;
    blurDataURL?: string;
    sizes?: string;
}

// Global image cache for instant loading
const imageCache = new Map<string, HTMLImageElement>();
const loadingPromises = new Map<string, Promise<HTMLImageElement>>();

// Preload images for instant display
const preloadImage = (src: string): Promise<HTMLImageElement> => {
    if (imageCache.has(src)) {
        return Promise.resolve(imageCache.get(src)!);
    }

    if (loadingPromises.has(src)) {
        return loadingPromises.get(src)!;
    }

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            imageCache.set(src, img);
            loadingPromises.delete(src);
            resolve(img);
        };
        img.onerror = () => {
            loadingPromises.delete(src);
            reject();
        };
        img.src = src;
    });

    loadingPromises.set(src, promise);
    return promise;
};

const UltraFastImage: React.FC<UltraFastImageProps> = ({
    src,
    alt,
    className = '',
    width,
    height,
    priority = false,
    transforms = {},
    blurDataURL,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}) => {
    const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');
    const [isInView, setIsInView] = useState(priority);
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Get progressive quality URLs for ultra-fast loading
    const progressiveUrls = getLightningProgressive(src, {
        width,
        height,
        ...transforms
    });

    const placeholder = blurDataURL || progressiveUrls.placeholder;

    // Intersection observer with more aggressive settings
    useEffect(() => {
        if (priority) {
            setIsInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.01, // Load even earlier
                rootMargin: '500px' // Massive preload distance
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [priority]);

    // Progressive loading: placeholder → low → medium → high quality
    useEffect(() => {
        if (!isInView) return;

        const loadProgressively = async () => {
            try {
                // Load low quality first for instant display
                await preloadImage(progressiveUrls.low);
                if (imgRef.current) {
                    imgRef.current.src = progressiveUrls.low;
                }

                // Then load medium quality
                setTimeout(async () => {
                    try {
                        await preloadImage(progressiveUrls.medium);
                        if (imgRef.current) {
                            imgRef.current.src = progressiveUrls.medium;
                        }

                        // Finally load high quality
                        setTimeout(async () => {
                            try {
                                await preloadImage(progressiveUrls.high);
                                if (imgRef.current) {
                                    imgRef.current.src = progressiveUrls.high;
                                    setLoadState('loaded');
                                }
                            } catch {
                                setLoadState('error');
                            }
                        }, 200);

                    } catch {
                        setLoadState('error');
                    }
                }, 100);

            } catch {
                setLoadState('error');
            }
        };

        loadProgressively();
    }, [isInView, progressiveUrls]);

    // Generate responsive srcset with lightning CDN
    const generateResponsiveSrcSet = useCallback(() => {
        return getLightningSrcSet(src, transforms);
    }, [src, transforms]);

    const shouldLoad = isInView || priority;

    return (
        <div ref={containerRef} className="relative overflow-hidden">
            {/* Blur placeholder */}
            <div
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${loadState === 'loaded' ? 'opacity-0' : 'opacity-100'
                    }`}
                style={{
                    backgroundImage: `url(${placeholder})`,
                    filter: 'blur(10px)',
                    transform: 'scale(1.1)' // Slightly larger to hide blur edges
                }}
            />

            {/* Main image */}
            <img
                ref={imgRef}
                src={shouldLoad ? placeholder : placeholder}
                srcSet={shouldLoad ? generateResponsiveSrcSet() : undefined}
                sizes={shouldLoad ? sizes : undefined}
                alt={alt}
                className={`${className} relative z-10 transition-all duration-500 ease-out ${loadState === 'loaded'
                        ? 'opacity-100 blur-0 scale-100'
                        : 'opacity-0 blur-sm scale-105'
                    }`}
                width={width}
                height={height}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                onLoad={() => setLoadState('loaded')}
                onError={() => setLoadState('error')}
            />

            {/* Loading indicator for priority images */}
            {priority && loadState === 'loading' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
};

export default UltraFastImage;
