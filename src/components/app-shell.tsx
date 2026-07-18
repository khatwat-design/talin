"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import AnnouncementBar from "@/components/announcement-bar";
import WhatsAppButton from "@/components/whatsapp-button";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
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
