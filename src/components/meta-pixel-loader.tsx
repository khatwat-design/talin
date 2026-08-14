"use client";

import Script from "next/script";
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
 * Meta Pixel — يُحقن الكود الرسمي مضمّناً في الصفحة حتى يكتشفه
 * Meta Pixel Helper / Events Manager من أول تحميل.
 *
 * المعرّف يُقرأ من NEXT_PUBLIC_META_PIXEL_ID (مضمن وقت البناء)
 * مع قيمة افتراضية 771518579044462.
 */
export default function MetaPixelLoader() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || DEFAULT_PIXEL_ID;
  const pathname = usePathname();
  const isFirstPageView = useRef(true);

  // PageView عند كل تنقّل (SPA) — أول مرة تُحتسب من كود التهيئة المضمن.
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

  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
