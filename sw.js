const CACHE_NAME = 'vibe_codex_bouncer-v1';
const PHASER_URL = 'https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser-arcade-physics.min.js;
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './js/main.js',
  './js/game/Bouncer.js',
  './js/game/Circle.js',
  './js/scenes/MainScene.js',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
  PHASER_URL
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const results = await Promise.allSettled(
        APP_SHELL.map((resource) => cache.add(resource))
      );

      for (const result of results) {
        if (result.status === 'rejected') {
          console.warn('Precache failed for one resource:', result.reason);
        }
      }
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  const isPhaserRequest = event.request.url === PHASER_URL;

  if (!isSameOrigin && !isPhaserRequest) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return networkResponse;
        })
        .catch(async () => {
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }

          throw new Error(`Unable to fulfill request for ${event.request.url}`);
        });
    })
  );
});
