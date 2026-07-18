import type { Metadata } from "next";
import { Cairo, Geist_Mono, Tajawal } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import AppShell from "@/components/app-shell";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
