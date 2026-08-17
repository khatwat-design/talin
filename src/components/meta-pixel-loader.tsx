"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    fbq?: (action: string, ...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

function firePageView() {
  const fbq = typeof window !== "undefined" ? window.fbq : null;
  if (typeof fbq !== "function") return;
  fbq("track", "PageView");
}

/**
 * يُرسل PageView عند كل تحميل وعند كل تنقّل داخلي (SPA).
 * كود التهيئة (init) محقون في <head> من layout.tsx حتى يراه
 * Meta Pixel Helper من أول تحميل، والـ PageView يُرسل من هنا
 * بانتظار ثانية ليتأكد الـ Helper أنه ملتقِط الأحداث.
 */
export default function MetaPixelLoader() {
  const pathname = usePathname();

  useEffect(() => {
    // تأخير قصير حتى يكتمل تحميل fbevents.js فيلتقط الـ Helper الحدث.
    const timer = setTimeout(firePageView, 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  // إعادة المحاولة إن تأخر تحميل السكربت.
  useEffect(() => {
    const retryTimer = setTimeout(firePageView, 3000);
    return () => clearTimeout(retryTimer);
  }, [pathname]);

  return null;
}
