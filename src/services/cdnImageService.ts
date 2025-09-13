// CDN Image Service using Cloudinary
export interface ImageTransform {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'fill' | 'scale' | 'fit' | 'crop';
  gravity?: 'auto' | 'center' | 'face';
  blur?: number;
  progressive?: boolean;
}

class CDNImageService {
  private cloudName = 'demo'; // Replace with your Cloudinary cloud name
  private baseUrl = `https://res.cloudinary.com/${this.cloudName}/image/upload/`;

  // Fallback mapping for local images to optimized CDN versions
  private imageMap: Record<string, string> = {
    // Large images that need optimization
    'offset.jpg': 'likhavat/offset-optimized',
    'manual.jpg': 'likhavat/manual-optimized', 
    'book.png': 'likhavat/book-optimized',
    'merchandise.png': 'likhavat/merchandise-optimized',
    'banner.png': 'likhavat/banner-optimized',
    'pamplate.png': 'likhavat/pamplate-optimized',
    'tshirt.png': 'likhavat/tshirt-optimized',
    'letter.png': 'likhavat/letter-optimized',
    'about.jpg': 'likhavat/about-optimized',
    'design.jpg': 'likhavat/design-optimized'
  };

  generateTransformString(transforms: ImageTransform): string {
    const parts: string[] = [];

    if (transforms.quality) parts.push(`q_${transforms.quality}`);
    if (transforms.format) parts.push(`f_${transforms.format}`);
    if (transforms.width) parts.push(`w_${transforms.width}`);
    if (transforms.height) parts.push(`h_${transforms.height}`);
    if (transforms.crop) parts.push(`c_${transforms.crop}`);
    if (transforms.gravity) parts.push(`g_${transforms.gravity}`);
    if (transforms.blur) parts.push(`e_blur:${transforms.blur}`);
    if (transforms.progressive) parts.push('fl_progressive');

    return parts.join(',');
  }

  getOptimizedUrl(src: string, transforms: ImageTransform = {}): string {
    // Extract filename from src
    const filename = src.split('/').pop()?.split('?')[0] || '';
    
    // Check if we have a CDN mapping for this image
    const cdnPath = this.imageMap[filename];
    
    if (!cdnPath) {
      // If no CDN mapping, return original with basic optimization
      return src;
    }

    // Default optimizations for web delivery
    const defaultTransforms: ImageTransform = {
      quality: 'auto',
      format: 'auto',
      progressive: true,
      ...transforms
    };

    const transformString = this.generateTransformString(defaultTransforms);
    return `${this.baseUrl}${transformString}/${cdnPath}`;
  }

  // Generate responsive srcset for different screen sizes
  getResponsiveSrcSet(src: string, baseTransforms: ImageTransform = {}): string {
    const filename = src.split('/').pop()?.split('?')[0] || '';
    const cdnPath = this.imageMap[filename];
    
    if (!cdnPath) return '';

    const sizes = [400, 800, 1200, 1600, 2000];
    const srcSet = sizes.map(width => {
      const transforms: ImageTransform = { ...baseTransforms, width, quality: 'auto', format: 'auto' };
      const transformString = this.generateTransformString(transforms);
      return `${this.baseUrl}${transformString}/${cdnPath} ${width}w`;
    });

    return srcSet.join(', ');
  }

  // Get placeholder/blur image for lazy loading
  getPlaceholder(src: string, blur: number = 20): string {
    const filename = src.split('/').pop()?.split('?')[0] || '';
    const cdnPath = this.imageMap[filename];
    
    if (!cdnPath) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+';
    }

    const transforms: ImageTransform = {
      width: 50,
      height: 50,
      quality: 10,
      format: 'jpg',
      blur,
      crop: 'fill'
    };

    const transformString = this.generateTransformString(transforms);
    return `${this.baseUrl}${transformString}/${cdnPath}`;
  }
}

export const cdnImageService = new CDNImageService();

// Utility function for easy use in components
export const getOptimizedImageUrl = (src: string, transforms?: ImageTransform) => {
  return cdnImageService.getOptimizedUrl(src, transforms);
};

export const getResponsiveImageSrcSet = (src: string, transforms?: ImageTransform) => {
  return cdnImageService.getResponsiveSrcSet(src, transforms);
};

export const getImagePlaceholder = (src: string, blur?: number) => {
  return cdnImageService.getPlaceholder(src, blur);
};
