"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    const handler = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch((err) => {
          console.warn("[VetCopilot] SW registration failed:", err);
        });
    };
    if (document.readyState === "complete") handler();
    else window.addEventListener("load", handler);
    return () => window.removeEventListener("load", handler);
  }, []);
  return null;
}
