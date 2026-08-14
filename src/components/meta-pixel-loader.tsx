"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    fbq?: (action: string, ...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const DEFAULT_PIXEL_ID = "771518579044462";

/**
 * يتولى إرسال PageView عند كل تنقّل داخلي (SPA) دون إعادة تهيئة.
 * كود التهيئة الرسمي (init + PageView الأول) يُحقن في <head>
 * من layout.tsx حتى يلتقطه Meta Pixel Helper من أول تحميل.
 */
export default function MetaPixelLoader() {
  const pixelId =
    process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || DEFAULT_PIXEL_ID;
  const pathname = usePathname();
  const isFirstPageView = useRef(true);

  // PageView عند كل تنقّل — أول تحميل يُحسب من كود <head>.
  useEffect(() => {
    const fbq = typeof window !== "undefined" ? window.fbq : null;
    if (!fbq) return;
    if (isFirstPageView.current) {
      isFirstPageView.current = false;
      return;
    }
    const timer = setTimeout(() => fbq("track", "PageView"), 0);
    return () => clearTimeout(timer);
  }, [pathname, pixelId]);

  return null;
}
