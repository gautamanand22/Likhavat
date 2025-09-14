import React, { useState, useRef, useEffect } from 'react';

interface FastImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    priority?: boolean;
}

const FastImage: React.FC<FastImageProps> = ({
    src,
    alt,
    className = '',
    width,
    height,
    priority = false
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (priority) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [priority]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    if (!isInView) {
        return (
            <div
                ref={imgRef}
                className={`${className} bg-gray-200 animate-pulse`}
                style={{ width, height }}
            />
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-70'}`}
            width={width}
            height={height}
            onLoad={handleLoad}
            loading={priority ? 'eager' : 'lazy'}
        />
    );
};

export default FastImage;
