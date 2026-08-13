import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import AppShell from "@/components/app-shell";

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

  return (
    <html lang="ar-SY" dir="rtl">
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
