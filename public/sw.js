// VetCopilot — service worker kill-switch
// Replaces any previously installed SW: clears caches, unregisters
// itself, and reloads open windows so they go back to plain network mode.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      } catch {}
      try {
        await self.registration.unregister();
      } catch {}
      try {
        const clients = await self.clients.matchAll({ type: "window" });
        clients.forEach((c) => {
          // Force a fresh load so the page is no longer SW-controlled.
          if ("navigate" in c) c.navigate(c.url);
        });
      } catch {}
    })(),
  );
});

// No fetch handler — let the network handle everything during the brief
// window before the SW unregisters.
