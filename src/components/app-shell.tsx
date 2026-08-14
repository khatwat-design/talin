"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import AnnouncementBar from "@/components/announcement-bar";
import WhatsAppButton from "@/components/whatsapp-button";
import MetaPixelLoader from "@/components/meta-pixel-loader";
import TiktokPixelLoader from "@/components/tiktok-pixel-loader";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <MetaPixelLoader />
      <TiktokPixelLoader />
      <AnnouncementBar />
      <Header />
      <main className="w-full text-[var(--foreground)]">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
