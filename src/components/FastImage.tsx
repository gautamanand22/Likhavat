import React, { useState, useRef, useEffect } from 'react';
import { getQuickOptimizedUrl, getQuickPlaceholder, getQuickResponsiveSrcSet, QuickCDNTransform } from '../services/quickCDN';

interface FastImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    priority?: boolean;
    transforms?: QuickCDNTransform;
    responsive?: boolean;
}

const FastImage: React.FC<FastImageProps> = ({
    src,
    alt,
    className = '',
    width,
    height,
    priority = false,
    transforms = {},
    responsive = true
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    // Get optimized URLs
    const optimizedSrc = getQuickOptimizedUrl(src, { width, height, quality: 85, format: 'webp', ...transforms });
    const placeholder = getQuickPlaceholder(src);
    const srcSet = responsive ? getQuickResponsiveSrcSet(src) : '';

    useEffect(() => {
        if (priority) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.05, rootMargin: '300px' }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [priority]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        // Fallback to original if optimized version fails
        if (imgRef.current && !hasError) {
            imgRef.current.src = src;
        }
    };

    const shouldLoad = isInView || priority;
    const displaySrc = shouldLoad ? (hasError ? src : optimizedSrc) : placeholder;

    return (
        <div className="relative overflow-hidden">
            <img
                ref={imgRef}
                src={displaySrc}
                srcSet={shouldLoad && srcSet ? srcSet : undefined}
                sizes={responsive ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : undefined}
                alt={alt}
                className={`${className} transition-all duration-700 ease-out ${
                    isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-60 blur-sm scale-105'
                }`}
                width={width}
                height={height}
                onLoad={handleLoad}
                onError={handleError}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
            />
        </div>
    );
};

export default FastImage;
