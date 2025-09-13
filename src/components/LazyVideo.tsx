import React, { useState, useRef, useEffect } from 'react';

interface LazyVideoProps {
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
}

const LazyVideo: React.FC<LazyVideoProps> = ({
    src,
    poster,
    className = '',
    autoPlay = false,
    muted = true,
    loop = false,
    controls = false,
    priority = false,
    width,
    height
}) => {
    const [isInView, setIsInView] = useState(priority);
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [priority]);

    const handleLoadedData = () => {
        setIsLoaded(true);
    };

    if (!isInView) {
        return (
            <div
                ref={containerRef}
                className={`${className} bg-gray-200 flex items-center justify-center`}
                style={{ width, height }}
            >
                {poster && (
                    <img
                        src={poster}
                        alt="Video poster"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                )}
            </div>
        );
    }

    return (
        <video
            ref={videoRef}
            className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-70'
                }`}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            controls={controls}
            poster={poster}
            width={width}
            height={height}
            onLoadedData={handleLoadedData}
            preload="metadata"
        >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default LazyVideo;
