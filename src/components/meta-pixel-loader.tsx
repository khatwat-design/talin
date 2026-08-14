"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    fbq?: (action: string, ...args: unknown[]) => void;
  }
}

/**
 * Loads Meta Pixel using runtime config from /api/config.
 * This way NEXT_PUBLIC_META_PIXEL_ID set on the server (e.g. Hostinger) works
 * without needing to rebuild the app.
 *
 * Fires PageView on initial load and on every client-side route change.
 */
export default function MetaPixelLoader() {
  const [pixelId, setPixelId] = useState<string | null>(null);
  const pathname = usePathname();
  const isFirstPageView = useRef(true);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data: { metaPixelId?: string }) => {
        const id = data.metaPixelId?.trim();
        if (id) setPixelId(id);
      })
      .catch(() => {});
  }, []);

  const handleLoad = () => {
    if (typeof window === "undefined" || !window.fbq || !pixelId) return;
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
  };

  // Fire PageView on every route change once the SDK is loaded.
  // Skip the very first run because handleLoad already fired PageView.
  useEffect(() => {
    if (typeof window === "undefined" || !window.fbq) return;
    if (isFirstPageView.current) {
      isFirstPageView.current = false;
      return;
    }
    const fbq = window.fbq;
    const timer = setTimeout(() => {
      fbq("track", "PageView");
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname, pixelId]);

  if (!pixelId) return null;

  return (
    <>
      <Script
        id="meta-pixel-sdk"
        src="https://connect.facebook.net/en_US/fbevents.js"
        strategy="afterInteractive"
        onLoad={handleLoad}
      />
      <noscript>
        <img
          height={1}
          width={1}
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
