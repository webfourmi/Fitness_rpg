/* Fitness RPG — service worker V7.0.18 */

"use strict";

const APP_VERSION = "7.0.18";
const CACHE_PREFIX = "fitness-rpg-";
const STATIC_CACHE = `${CACHE_PREFIX}static-v${APP_VERSION}`;
const IMAGE_CACHE = `${CACHE_PREFIX}images-v1`;

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest?v=7.0.18",
  "./version.json",
  "./app-v5.css?v=7.0.18",
  "./app-sport.css?v=7.0.18",
  "./app-challenges.css?v=7.0.18",
  "./app-config.js?v=7.0.18",
  "./app-data.js?v=7.0.18",
  "./app-program-forge-exercises.js?v=7.0.18",
  "./app-program-forge.js?v=7.0.18",
  "./app-program-champion-arenes.js?v=7.0.18",
  "./app-rewards.js?v=7.0.18",
  "./app-state.js?v=7.0.18",
  "./app-camp.js?v=7.0.18",
  "./app-progress.js?v=7.0.18",
  "./app-render.js?v=7.0.18",
  "./app-navigation.js?v=7.0.18",
  "./app-exercises.js?v=7.0.18",
  "./app-programs.js?v=7.0.18",
  "./app-media.js?v=7.0.18",
  "./app-backup.js?v=7.0.18",
  "./app-stats.js?v=7.0.18",
  "./app-exercise-adaptation.js?v=7.0.18",
  "./app-sport.js?v=7.0.18",
  "./app-weight-planning.js?v=7.0.18",
  "./app-adaptive-coach.js?v=7.0.18",
  "./app-weight-dashboard.js?v=7.0.18",
  "./app.js?v=7.0.18",
  "./app-pwa.js?v=7.0.18",
  "./app-challenge-lessons.js?v=7.0.18",
  "./app-challenges.js?v=7.0.18",
  "./assets/pwa/icon.svg",
  "./assets/pwa/icon-192.png",
  "./assets/pwa/icon-512.png",
  "./assets/pwa/apple-touch-icon.png",
  "./assets/ecran/ecran_accueil.webp",
  "./assets/categories/default.webp",
  "./assets/exercices/homme_default.webp",
  "./assets/exercices/femme_default.webp",
  "./assets/coach/korvan/idle.jpg",
  "./assets/coach/xara/xara_idle.jpg",
  "./assets/coach/violette/violette_idle.jpg",
  "./assets/coach/elmin/elmin_idle.jpg",
  "./assets/coach/bazul/bazul_idle.jpg",
  "./assets/coach/satyne/satyne_idle.jpg",
  "./assets/heros-campement/heros.webp",
  "./assets/heros-campement/heroine.webp",
  "./assets/joueur/joueur_niveau_01.webp",
  "./assets/joueuse/joueuse_niveau_01.webp"
];

const currentCaches = new Set([STATIC_CACHE, IMAGE_CACHE]);

function isCacheableResponse(response) {
  return Boolean(response && response.ok && response.type !== "opaque");
}

// Les scripts et styles privilégient le réseau : une fusion sur main reste
// visible même si un développeur oublie d'incrémenter le numéro de version.
// En l'absence de réseau, la dernière copie locale assure le mode hors ligne.
async function networkFirstAsset(request) {
  try {
    const response = await fetch(request, { cache: "no-cache" });

    if (isCacheableResponse(response)) {
      const cache = await caches.open(STATIC_CACHE);
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    return (await caches.match(request)) || Response.error();
  }
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
    event.respondWith(networkFirstAsset(request));
  }
});
