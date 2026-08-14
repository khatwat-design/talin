import Link from "next/link";
import { trackWhatsAppClick } from "@/lib/pixels";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+963980906364";
const whatsappLink = whatsappNumber
  ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`
  : "#";
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/shmasglowoff";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">

        {/* Top row: brand + social on mobile */}
        <div className="text-center sm:text-left">
          <h3
            className="text-base font-bold tracking-widest text-[var(--color-primary)]"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            تالين بيوتي
          </h3>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-muted)] sm:mx-0">
            زيت طبيعي فاخر متخصص في علاج مشاكل الشعر والتالف. منتج واحد مميز يجمع بين أقوى المكونات الطبيعية لتعزيز نمو الشعر وتقويته.
          </p>
        </div>

        {/* Links row */}
        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[var(--color-border)] pt-8 sm:grid-cols-3">
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted-dim)]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              الروابط
            </h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/" className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-primary)]">الرئيسية</Link></li>
              <li><Link href="/about" className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-primary)]">من نحن</Link></li>
              <li><Link href="/products" className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-primary)]">المنتجات</Link></li>
              <li><Link href="/cart" className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-primary)]">سلة التسوق</Link></li>
            </ul>
          </div>

          <div>
            <h4
              className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted-dim)]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              تواصل معنا
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppClick} className="flex items-center gap-2 text-sm text-[var(--color-muted)] transition hover:text-[#25D366]">
                  واتساب
                </a>
              </li>
              <li>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--color-muted)] transition hover:text-[var(--color-primary)]">
                  إنستغرام
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h4
              className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted-dim)]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              سياسات الموقع
            </h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/policies/returns" className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-primary)]">سياسة الاسترجاع</Link></li>
              <li><Link href="/policies/privacy" className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-primary)]">سياسة الخصوصية</Link></li>
              <li><Link href="/policies/terms" className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-primary)]">شروط الاستخدام</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-[var(--color-border)] pt-6 text-center">
          <p className="text-[11px] text-[var(--color-muted-dim)]">
            © {new Date().getFullYear()} تالين بيوتي. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
