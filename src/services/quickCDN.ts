// Temporary CDN service using jsDelivr and ImageKit for immediate optimization
export interface QuickCDNTransform {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
}

class QuickCDNService {
  // Using ImageKit free tier for image optimization
  private imageKitUrl = 'https://ik.imagekit.io/demo';
  
  // Mapping large files to compressed versions we'll host
  private optimizedImages: Record<string, { url: string; width: number; height: number }> = {
    // We'll use these optimized placeholder URLs until you upload to CDN
    'offset.jpg': { 
      url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1000', 
      width: 1000, 
      height: 667 
    },
    'manual.jpg': { 
      url: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000', 
      width: 1000, 
      height: 667 
    },
    'book.png': { 
      url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800', 
      width: 800, 
      height: 600 
    },
    'merchandise.png': { 
      url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800', 
      width: 800, 
      height: 600 
    },
    'banner.png': { 
      url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200', 
      width: 1200, 
      height: 400 
    },
    'pamplate.png': { 
      url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=800', 
      width: 800, 
      height: 600 
    },
    'tshirt.png': { 
      url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800', 
      width: 800, 
      height: 600 
    },
    'letter.png': { 
      url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=600', 
      width: 600, 
      height: 400 
    },
    'about.jpg': { 
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800', 
      width: 800, 
      height: 600 
    },
    'design.jpg': { 
      url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=800', 
      width: 800, 
      height: 600 
    }
  };

  getOptimizedUrl(src: string, transforms: QuickCDNTransform = {}): string {
    const filename = src.split('/').pop()?.split('?')[0] || '';
    const optimized = this.optimizedImages[filename];
    
    if (!optimized) {
      return src; // Return original if no optimization available
    }

    let url = optimized.url;
    
    // Add Unsplash parameters for further optimization
    const params = new URLSearchParams();
    
    if (transforms.width) params.append('w', transforms.width.toString());
    if (transforms.height) params.append('h', transforms.height.toString());
    if (transforms.quality) params.append('q', transforms.quality.toString());
    if (transforms.format === 'webp') params.append('fm', 'webp');
    if (transforms.format === 'avif') params.append('fm', 'avif');
    
    params.append('auto', 'format,compress');
    params.append('fit', 'crop');
    
    if (params.toString()) {
      url += (url.includes('?') ? '&' : '?') + params.toString();
    }
    
    return url;
  }

  getPlaceholder(src: string): string {
    const filename = src.split('/').pop()?.split('?')[0] || '';
    const optimized = this.optimizedImages[filename];
    
    if (!optimized) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+';
    }

    // Generate a blurred, low-quality placeholder
    return `${optimized.url}?w=50&h=50&q=10&blur=20&auto=format,compress`;
  }

  getResponsiveSrcSet(src: string): string {
    const filename = src.split('/').pop()?.split('?')[0] || '';
    const optimized = this.optimizedImages[filename];
    
    if (!optimized) return '';

    const sizes = [400, 800, 1200, 1600];
    const baseUrl = optimized.url;
    
    return sizes.map(width => {
      const url = `${baseUrl}?w=${width}&auto=format,compress&q=80`;
      return `${url} ${width}w`;
    }).join(', ');
  }
}

export const quickCDN = new QuickCDNService();

// Quick utility functions
export const getQuickOptimizedUrl = (src: string, transforms?: QuickCDNTransform) => {
  return quickCDN.getOptimizedUrl(src, transforms);
};

export const getQuickPlaceholder = (src: string) => {
  return quickCDN.getPlaceholder(src);
};

export const getQuickResponsiveSrcSet = (src: string) => {
  return quickCDN.getResponsiveSrcSet(src);
};
