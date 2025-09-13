// EXTREME PERFORMANCE SERVICE WORKER
// Aggressive caching for lightning-fast loading

const CACHE_NAME = 'likhavat-ultra-v3';
const CRITICAL_CACHE = 'likhavat-critical-v3';

// Critical resources for instant loading
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=60&auto=format,compress&fm=webp',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=60&auto=format,compress&fm=webp',
  'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=60&auto=format,compress&fm=webp'
];

// Ultra-aggressive install
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Critical cache with stale-while-revalidate
      caches.open(CRITICAL_CACHE).then(cache => {
        return cache.addAll(CRITICAL_RESOURCES.map(url => 
          new Request(url, { 
            cache: 'force-cache',
            mode: 'cors'
          })
        ));
      }),
      
      // Skip waiting for instant activation
      self.skipWaiting()
    ])
  );
});

// Take control immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      // Clean old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && cacheName !== CRITICAL_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Claim all clients immediately
      self.clients.claim()
    ])
  );
});

// Ultra-fast fetch strategy
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Handle images with extreme optimization
  if (url.hostname.includes('unsplash.com') || url.hostname.includes('images.')) {
    event.respondWith(handleImageRequest(event.request));
    return;
  }
  
  // Handle navigation with instant loading
  if (event.request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(event.request));
    return;
  }
  
  // Default ultra-fast strategy
  event.respondWith(handleDefaultRequest(event.request));
});

// Lightning-fast image handling
async function handleImageRequest(request) {
  try {
    // Try critical cache first for instant response
    const criticalCache = await caches.open(CRITICAL_CACHE);
    const criticalResponse = await criticalCache.match(request);
    if (criticalResponse) {
      // Background update for next time
      updateImageInBackground(request);
      return criticalResponse;
    }
    
    // Try main cache
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      // Background update
      updateImageInBackground(request);
      return cachedResponse;
    }
    
    // Fetch with optimized headers
    const response = await fetch(request, {
      cache: 'force-cache',
      mode: 'cors',
      credentials: 'omit'
    });
    
    // Cache immediately for next request
    if (response.ok) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Fallback to cache or placeholder
    const cache = await caches.open(CACHE_NAME);
    return cache.match(request) || new Response('', { status: 204 });
  }
}

// Instant navigation
async function handleNavigationRequest(request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Background network update
      updateNavigationInBackground(request);
      return cachedResponse;
    }
    
    // Network first for navigation, cache immediately
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Try to serve from cache
    const cache = await caches.open(CACHE_NAME);
    return cache.match('/') || cache.match('/index.html') || 
           new Response('Offline', { status: 503 });
  }
}

// Default ultra-fast strategy
async function handleDefaultRequest(request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const response = await fetch(request);
    if (response.ok && response.status < 400) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    return cache.match(request) || new Response('', { status: 503 });
  }
}

// Background updates for extreme performance
function updateImageInBackground(request) {
  // Non-blocking background update
  setTimeout(async () => {
    try {
      const response = await fetch(request, { 
        cache: 'reload',
        mode: 'cors',
        credentials: 'omit'
      });
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response);
      }
    } catch (error) {
      // Silent fail for background updates
    }
  }, 100);
}

function updateNavigationInBackground(request) {
  setTimeout(async () => {
    try {
      const response = await fetch(request, { cache: 'reload' });
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response);
      }
    } catch (error) {
      // Silent fail
    }
  }, 500);
}

// Preload critical resources in background
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PRELOAD_RESOURCES') {
    const resources = event.data.resources || [];
    preloadResources(resources);
  }
});

async function preloadResources(resources) {
  const cache = await caches.open(CACHE_NAME);
  
  // Preload in batches to avoid overwhelming
  const batchSize = 3;
  for (let i = 0; i < resources.length; i += batchSize) {
    const batch = resources.slice(i, i + batchSize);
    
    await Promise.allSettled(
      batch.map(async resource => {
        try {
          const request = new Request(resource, { 
            cache: 'force-cache',
            mode: 'cors',
            credentials: 'omit'
          });
          const response = await fetch(request);
          if (response.ok) {
            cache.put(request, response);
          }
        } catch (error) {
          // Silent fail for preloading
        }
      })
    );
    
    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}
