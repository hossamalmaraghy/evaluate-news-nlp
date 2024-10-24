// serviceWorker.js

const CACHE_NAME = 'news-evaluation-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/resets.css',
  '/styles/base.css',
  '/styles/footer.css',
  '/styles/form.css',
  '/styles/header.css',
  '/main.js',
];

// Install event: Cache the necessary files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: Serve files from the cache first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // If there's a match in the cache, it return the cached resource
        }
        return fetch(event.request); // Otherwise, fetch from the network
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Delete outdated caches
          }
        })
      );
    })
  );
});