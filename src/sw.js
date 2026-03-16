/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

// Precache all build assets from Vite/Workbox manifest.
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// Keep SPA routes working when offline.
registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html')));

// Cache static assets aggressively.
registerRoute(
  ({ request }) => ['style', 'script', 'worker', 'image', 'font'].includes(request.destination),
  new CacheFirst({ cacheName: 'wsl-static-v1' })
);

// Network-first for local HTML/documents with offline fallback cache.
registerRoute(
  ({ url, request }) => url.origin === self.location.origin && request.method === 'GET',
  new NetworkFirst({ cacheName: 'wsl-pages-v1' })
);
