"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "./cart-context";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+963980906364";
const waLink = whatsappNumber
  ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("مرحباً، أريد الاستفسار عن زيت تالين بيوتي")}`
  : "";

export default function Header() {
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const count = mounted ? totalItems : 0;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-[var(--color-border)] bg-white/95 shadow-[var(--shadow-soft)] backdrop-blur-md"
          : "border-b border-[var(--color-border)] bg-white"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="group flex shrink-0 items-center">
          <Image
            src="/images/logo.png"
            alt="Talin Beauty — تالين بيوتي"
            width={140}
            height={88}
            className="h-[44px] w-auto object-contain object-center transition-transform group-hover:scale-[1.02] sm:h-[52px]"
            priority
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {waLink ? (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 sm:flex"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              واتساب
            </a>
          ) : null}

          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-foreground)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] sm:h-11 sm:w-11"
            aria-label="السلة"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6L5 3H2" />
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
            </svg>
            {count > 0 ? (
              <span className="absolute -left-1 -top-1 min-w-[1.25rem] rounded-full bg-[var(--color-primary)] px-1 py-0.5 text-center text-[10px] font-bold text-white">
                {count}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            className="flex flex-col gap-1 p-2 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="القائمة"
          >
            <span className={`h-0.5 w-6 bg-[var(--color-foreground)] transition-all ${isMobileMenuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-[var(--color-foreground)] transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-[var(--color-foreground)] transition-all ${isMobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-[var(--color-border)] bg-white md:hidden">
          <nav className="flex flex-col gap-3 px-4 py-4 text-sm font-medium sm:px-6">
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 transition hover:border-[var(--color-primary)]">
              من نحن
            </Link>
            {waLink ? (
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-white font-semibold transition hover:brightness-110">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                تواصل عبر واتساب
              </a>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
