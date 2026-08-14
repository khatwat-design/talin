"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    ttq?: {
      load: (id: string) => void;
      page: () => void;
      track: (event: string, props?: Record<string, unknown>) => void;
    };
  }
}

/**
 * Loads TikTok Pixel using runtime config from /api/config.
 * Fires page() on every route change (client-side navigation included).
 */
export default function TiktokPixelLoader() {
  const [pixelId, setPixelId] = useState<string | null>(null);
  const pathname = usePathname();
  const isFirstPage = useRef(true);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data: { tiktokPixelId?: string }) => {
        const id = data.tiktokPixelId?.trim();
        if (id) setPixelId(id);
      })
      .catch(() => {});
  }, []);

  const handleLoad = () => {
    if (typeof window === "undefined" || !window.ttq || !pixelId) return;
    window.ttq.load(pixelId);
    window.ttq.page();
  };

  useEffect(() => {
    if (typeof window === "undefined" || !window.ttq) return;
    if (isFirstPage.current) {
      isFirstPage.current = false;
      return;
    }
    const ttq = window.ttq;
    const timer = setTimeout(() => ttq.page(), 0);
    return () => clearTimeout(timer);
  }, [pathname, pixelId]);

  if (!pixelId) return null;

  return (
    <Script
      id="tiktok-pixel-sdk"
      src="https://analytics.tiktok.com/i18n/pixel/embed.js"
      strategy="afterInteractive"
      onLoad={handleLoad}
    />
  );
}
