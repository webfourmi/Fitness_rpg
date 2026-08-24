/* Fitness RPG — service worker V6.6 */

"use strict";

const APP_VERSION = "6.6.0";
const CACHE_PREFIX = "fitness-rpg-";
const STATIC_CACHE = `${CACHE_PREFIX}static-v${APP_VERSION}`;
const IMAGE_CACHE = `${CACHE_PREFIX}images-v1`;

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest?v=6.6.0",
  "./app-v5.css?v=6.6.0",
  "./app-sport.css?v=6.6.0",
  "./app-config.js?v=6.6.0",
  "./app-data.js?v=6.6.0",
  "./app-program-champion-arenes.js?v=6.6.0",
  "./app-rewards.js?v=6.6.0",
  "./app-state.js?v=6.6.0",
  "./app-progress.js?v=6.6.0",
  "./app-render.js?v=6.6.0",
  "./app-navigation.js?v=6.6.0",
  "./app-exercises.js?v=6.6.0",
  "./app-programs.js?v=6.6.0",
  "./app-media.js?v=6.6.0",
  "./app-backup.js?v=6.6.0",
  "./app-stats.js?v=6.6.0",
  "./app-sport.js?v=6.6.0",
  "./app.js?v=6.6.0",
  "./app-pwa.js?v=6.6.0",
  "./assets/pwa/icon.svg",
  "./assets/pwa/icon-192.png",
  "./assets/pwa/icon-512.png",
  "./assets/pwa/apple-touch-icon.png",
  "./assets/ecran/ecran_accueil.webp",
  "./assets/categories/default.webp",
  "./assets/exercices/homme_default.webp",
  "./assets/exercices/femme_default.webp",
  "./assets/coach/korvan/idle.jpg",
  "./assets/joueur/joueur_niveau_01.webp",
  "./assets/joueuse/joueuse_niveau_01.webp"
];

const currentCaches = new Set([STATIC_CACHE, IMAGE_CACHE]);

function isCacheableResponse(response) {
  return Boolean(response && response.ok && response.type !== "opaque");
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);

  if (isCacheableResponse(response)) {
    const cache = await caches.open(STATIC_CACHE);
    await cache.put(request, response.clone());
  }

  return response;
}

async function staleWhileRevalidateImage(request, event) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);

  const networkResponse = fetch(request)
    .then(async (response) => {
      if (isCacheableResponse(response)) {
        await cache.put(request, response.clone());
      }

      return response;
    })
    .catch(() => null);

  if (cached) {
    event.waitUntil(networkResponse);
    return cached;
  }

  return (await networkResponse)
    || caches.match("./assets/categories/default.webp");
}

async function networkFirstNavigation(request) {
  try {
    const response = await fetch(request);

    if (isCacheableResponse(response)) {
      const cache = await caches.open(STATIC_CACHE);
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    return (await caches.match(request))
      || (await caches.match("./index.html"))
      || (await caches.match("./"));
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => (
            cacheName.startsWith(CACHE_PREFIX)
            && !currentCaches.has(cacheName)
          ))
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    void self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith("/service-worker.js")) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (request.destination === "image") {
    event.respondWith(staleWhileRevalidateImage(request, event));
    return;
  }

  if (
    request.destination === "script"
    || request.destination === "style"
    || request.destination === "font"
    || url.pathname.endsWith(".webmanifest")
  ) {
    event.respondWith(cacheFirst(request));
  }
});
