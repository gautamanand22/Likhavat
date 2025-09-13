// Progressive loading strategy for better performance
export class ProgressiveLoader {
  private loadQueue: Array<{ url: string; priority: number; loaded: boolean }> = [];
  private isLoading = false;
  private maxConcurrent = 3;
  private currentLoading = 0;

  addToQueue(url: string, priority: number = 0) {
    if (!this.loadQueue.find(item => item.url === url)) {
      this.loadQueue.push({ url, priority, loaded: false });
      this.loadQueue.sort((a, b) => b.priority - a.priority);
      this.processQueue();
    }
  }

  private async processQueue() {
    if (this.isLoading || this.currentLoading >= this.maxConcurrent) return;
    
    const nextItem = this.loadQueue.find(item => !item.loaded);
    if (!nextItem) return;

    this.isLoading = true;
    this.currentLoading++;

    try {
      await this.preloadImage(nextItem.url);
      nextItem.loaded = true;
    } catch (error) {
      console.warn('Failed to preload image:', nextItem.url);
    } finally {
      this.currentLoading--;
      this.isLoading = false;
      // Continue processing queue
      setTimeout(() => this.processQueue(), 100);
    }
  }

  private preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = url;
    });
  }

  preloadCriticalImages(urls: string[]) {
    urls.forEach((url, index) => {
      this.addToQueue(url, 100 - index); // Higher priority for earlier images
    });
  }
}

export const progressiveLoader = new ProgressiveLoader();

// Critical images to preload immediately
export const criticalImages = [
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=800&auto=format,compress&fm=webp',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format,compress&fm=webp',
  'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1000&auto=format,compress&fm=webp'
];

// Initialize preloading when the page loads
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // Preload critical images after initial page load
    setTimeout(() => {
      progressiveLoader.preloadCriticalImages(criticalImages);
    }, 500);
  });
}
