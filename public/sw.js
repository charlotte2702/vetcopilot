// VetCopilot — service worker (cache stratégie réseau d'abord, fallback cache)
const CACHE_NAME = "vetcopilot-v1";
const PRECACHE = [
  "/",
  "/dashboard",
  "/planning",
  "/animals",
  "/diagnostic",
  "/soap",
  "/login",
  "/manifest.json",
  "/icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE).catch(() => {
        // Some routes may not be reachable at install time (dev mode).
        return Promise.resolve();
      }),
    ),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME)
          .map((k) => caches.delete(k)),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  // Bypass non-GET and chrome-extension / dev-only requests
  if (req.method !== "GET" || !req.url.startsWith(self.location.origin)) return;
  // Skip Next.js HMR / RSC streaming endpoints in dev
  if (req.url.includes("/_next/")) return;

  event.respondWith(
    fetch(req)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match("/dashboard"))),
  );
});
