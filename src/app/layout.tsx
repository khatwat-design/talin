import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import AppShell from "@/components/app-shell";

const DEFAULT_META_PIXEL_ID = "771518579044462";

const cairo = localFont({
  variable: "--font-cairo",
  src: "./fonts/cairo.woff2",
  weight: "100 900",
  display: "swap",
});

const tajawal = localFont({
  variable: "--font-tajawal",
  src: [
    { path: "./fonts/tajawal-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/tajawal-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/tajawal-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/tajawal-800.woff2", weight: "800", style: "normal" },
  ],
  display: "swap",
});

const geistMono = localFont({
  variable: "--font-geist-mono",
  src: "./fonts/geist.woff",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "تالين بيوتي | زيت فاخر لنمو الشعر — Talin Beauty",
  description:
    "تالين بيوتي — زيت نمو شعر طبيعي بتركيبة فاخرة لسوق سوريا: جذور أقوى، لمعان يخطف الأنظار، والدفع عند الاستلام.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title: "تالين بيوتي | زيت فاخر لنمو الشعر — Talin Beauty",
    description:
      "تالين بيوتي — زيت نمو شعر طبيعي بتركيبة فاخرة لسوق سوريا: جذور أقوى، لمعان يخطف الأنظار، والدفع عند الاستلام.",
    type: "website",
    locale: "ar_SY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const metaPixelId =
    process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || DEFAULT_META_PIXEL_ID;

  return (
    <html lang="ar-SY" dir="rtl">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body
        className={`${cairo.variable} ${tajawal.variable} ${geistMono.variable} antialiased`}
      >
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        <CartProvider>
          <AppShell>{children}</AppShell>
        </CartProvider>
      </body>
    </html>
  );
}
