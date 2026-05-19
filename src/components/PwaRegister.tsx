"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    // First, register the kill-switch SW (clears caches + self-unregisters)
    // so users carrying an older caching SW from a previous deploy get cleaned up.
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch(() => {});

    // As an extra safety net, also forcibly unregister any leftover SWs
    // that didn't go through the kill-switch flow.
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => {
        regs.forEach((r) => {
          // Only unregister if scope is ours.
          if (r.scope.includes(window.location.origin)) {
            r.unregister().catch(() => {});
          }
        });
      })
      .catch(() => {});
  }, []);
  return null;
}
