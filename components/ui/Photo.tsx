/**
 * Responsive image for the static export. Serves a 640px mobile variant via
 * srcset (so phones don't download the full 1400px file) and lazy-loads by
 * default. Assumes a matching `<name>-sm.jpg` exists next to `<name>.jpg`.
 */
export function Photo({
  src,
  alt,
  className,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}) {
  const sm = src.replace(/\.jpg$/, "-sm.jpg");
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={`${sm} 640w, ${src} 1400w`}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
      style={style}
    />
  );
}
