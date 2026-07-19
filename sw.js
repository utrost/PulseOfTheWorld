// Pulse of the World — Service Worker
const CACHE_NAME = 'pulse-v2';
const APP_ROOT = new URL('/pulse/', self.location.origin);
const ASSETS = [
  '/pulse/',
  '/pulse/index.html',
  '/pulse/css/style.css',
  '/pulse/js/pulse.js',
  '/pulse/js/metrics.js',
  '/pulse/data/metrics.json',
  '/pulse/favicon.svg',
  '/pulse/manifest.json',
  '/pulse/icons/icon-192.png',
  '/pulse/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith(self.location.origin)) return;
  if (!event.request.url.startsWith(APP_ROOT.href)) return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
