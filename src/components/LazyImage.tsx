import React, { useState, useRef, useEffect } from 'react';
import { getOptimizedImageUrl, getResponsiveImageSrcSet, getImagePlaceholder, ImageTransform } from '../services/cdnImageService';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    placeholder?: string;
    width?: number;
    height?: number;
    priority?: boolean;
    useCDN?: boolean;
    transforms?: ImageTransform;
    responsive?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    className = '',
    placeholder,
    width,
    height,
    priority = false,
    useCDN = true,
    transforms = {},
    responsive = true
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    // Generate optimized URLs
    const optimizedSrc = useCDN ? getOptimizedImageUrl(src, { width, height, ...transforms }) : src;
    const responsiveSrcSet = useCDN && responsive ? getResponsiveImageSrcSet(src, transforms) : '';
    const blurPlaceholder = placeholder || (useCDN ? getImagePlaceholder(src) : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+');

    useEffect(() => {
        if (priority) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '200px' } // Increased margin for faster loading
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [priority]);

    const handleLoad = () => {
        setIsLoaded(true);
        setHasError(false);
    };

    const handleError = () => {
        setHasError(true);
        setIsLoaded(false);
        // Fallback to original image if CDN fails
        if (useCDN && imgRef.current) {
            imgRef.current.src = src;
        }
    };

    const shouldLoad = isInView || priority;
    const displaySrc = shouldLoad ? (hasError ? src : optimizedSrc) : blurPlaceholder;

    return (
        <img
            ref={imgRef}
            src={displaySrc}
            srcSet={shouldLoad && responsiveSrcSet ? responsiveSrcSet : undefined}
            sizes={responsive ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined}
            alt={alt}
            className={`${className} transition-all duration-500 ${
                isLoaded ? 'opacity-100 blur-0' : 'opacity-70 blur-sm'
            }`}
            width={width}
            height={height}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
        />
    );
};

export default LazyImage;
