"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    // Register sw.js (which is now a kill-switch). This ensures users who
    // installed the previous caching SW receive the new one, which then
    // unregisters itself. New users won't get any SW.
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch(() => {
        // Silently ignore — PWA installability still works via manifest.
      });
  }, []);
  return null;
}
