import React, { useState, useRef, useEffect, useCallback } from 'react';

interface LightningVideoProps {
    src: string;
    poster?: string;
    className?: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
    priority?: boolean;
    width?: number;
    height?: number;
    preload?: 'none' | 'metadata' | 'auto';
}

// Video optimization service
const optimizeVideoUrl = (src: string, quality: 'low' | 'medium' | 'high' = 'medium') => {
    // For now, return original but in production you'd use video CDN
    const baseUrl = src;

    // Add quality parameters (mock for demonstration)
    const qualityParams = {
        low: 'q_30,w_640',
        medium: 'q_60,w_1280',
        high: 'q_80,w_1920'
    };

    return baseUrl; // In production, add CDN optimization
};

const LightningVideo: React.FC<LightningVideoProps> = ({
    src,
    poster,
    className = '',
    autoPlay = false,
    muted = true,
    loop = false,
    controls = false,
    priority = false,
    width,
    height,
    preload = 'metadata'
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Progressive video loading
    const lowQualityVideoSrc = optimizeVideoUrl(src, 'low');
    const highQualityVideoSrc = optimizeVideoUrl(src, 'high');

    // Intersection observer for video loading
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
                threshold: 0.1,
                rootMargin: '200px' // Start loading before fully in view
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [priority]);

    // Progressive video loading
    useEffect(() => {
        if (!isInView || !videoRef.current) return;

        const video = videoRef.current;
        setLoadingState('loading');

        // Set initial low quality source for fast initial load
        video.src = lowQualityVideoSrc;

        const handleLoadedData = () => {
            setIsLoaded(true);
            setLoadingState('loaded');
        };

        const handleError = () => {
            setLoadingState('error');
        };

        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('error', handleError);

        // Load high quality after initial load
        video.addEventListener('loadeddata', () => {
            setTimeout(() => {
                if (video.src !== highQualityVideoSrc) {
                    video.src = highQualityVideoSrc;
                }
            }, 1000); // Switch to high quality after 1 second
        }, { once: true });

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('error', handleError);
        };
    }, [isInView, lowQualityVideoSrc, highQualityVideoSrc]);

    // Network-aware quality selection
    const getOptimalPreload = useCallback(() => {
        if (typeof navigator !== 'undefined' && 'connection' in navigator) {
            const connection = (navigator as any).connection;
            if (connection?.effectiveType === '4g') return 'auto';
            if (connection?.effectiveType === '3g') return 'metadata';
            return 'none';
        }
        return preload;
    }, [preload]);

    if (!isInView) {
        return (
            <div
                ref={containerRef}
                className={`${className} bg-gray-100 flex items-center justify-center relative overflow-hidden`}
                style={{ width, height }}
            >
                {poster && (
                    <img
                        src={poster}
                        alt="Video poster"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                    />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-white border-opacity-50 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-8 border-r-0 border-t-4 border-b-4 border-l-white border-t-transparent border-b-transparent ml-1"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative overflow-hidden">
            {/* Loading indicator */}
            {loadingState === 'loading' && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* Video element */}
            <video
                ref={videoRef}
                className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                autoPlay={autoPlay}
                muted={muted}
                loop={loop}
                controls={controls}
                poster={poster}
                width={width}
                height={height}
                preload={getOptimalPreload()}
                playsInline
                style={{
                    objectFit: 'cover'
                }}
            >
                Your browser does not support the video tag.
            </video>

            {/* Error fallback */}
            {loadingState === 'error' && poster && (
                <img
                    src={poster}
                    alt="Video unavailable"
                    className={`${className} w-full h-full object-cover`}
                    width={width}
                    height={height}
                />
            )}
        </div>
    );
};

export default LightningVideo;
