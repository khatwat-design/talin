"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatCurrency } from "@/lib/products";
import { trackPurchase, trackWhatsAppClick } from "@/lib/pixels";

type LastOrder = {
  total?: number;
  items?: Array<{ id: string; name?: string; price?: number; quantity?: number }>;
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const invoice = searchParams.get("invoice");
  const firedPurchaseEvent = useRef(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+963980906364";
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem("talin-last-order");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as LastOrder;
      if (parsed?.items?.length) {
        setOrder(parsed);
        if (!firedPurchaseEvent.current) {
          trackPurchase({ items: parsed.items, total: parsed.total, orderId: invoice ?? undefined });
          firedPurchaseEvent.current = true;
          window.localStorage.removeItem("talin-last-order");
        }
      }
    } catch { /* ignore */ }
  }, [invoice]);

  return (
    <div className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-[var(--color-border)] bg-white p-8 text-center shadow-[var(--shadow-soft)] sm:p-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-[var(--color-foreground)]" style={{ fontFamily: "var(--font-tajawal)" }}>
          شكراً لكِ! تم استلام طلبك
        </h1>
        <p className="text-sm text-[var(--color-muted)]">
          سنقوم بالتواصل معكِ قريباً لتأكيد التفاصيل والتوصيل.
        </p>
        {invoice ? (
          <p className="text-xs text-[var(--color-muted)]">
            رقم الطلب: <span className="font-semibold text-[var(--color-primary)]">{invoice}</span>
          </p>
        ) : null}
      </div>

      {order?.items?.length ? (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] p-5 text-start">
          <h2 className="mb-4 text-base font-bold text-[var(--color-foreground)]" style={{ fontFamily: "var(--font-tajawal)" }}>
            ملخص طلبك
          </h2>
          <ul className="space-y-3">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-[var(--color-foreground)]">
                  {item.name}
                  <span className="text-xs text-[var(--color-muted)]"> × {item.quantity}</span>
                </span>
                <span className="font-semibold text-[var(--color-primary)]">
                  {formatCurrency((item.price ?? 0) * (item.quantity ?? 1))}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-4 text-base font-bold text-[var(--color-foreground)]">
            <span>الإجمالي</span>
            <span className="text-[var(--color-primary)]">{formatCurrency(order.total ?? 0)}</span>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        {whatsappNumber ? (
          <a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`مرحباً، أريد الاستفسار عن طلبي${invoice ? ` رقم ${invoice}` : ""}`)}`} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppClick} className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            تواصل عبر واتساب
          </a>
        ) : null}
        <Link href="/products" className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white shadow-[var(--shadow-gold)] transition hover:brightness-110">
          مواصلة التسوق
        </Link>
        <Link href="/" className="rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl rounded-3xl border border-[var(--color-border)] bg-white p-10 text-center shadow-[var(--shadow-soft)]"><p className="text-sm text-[var(--color-muted)]">جارٍ تحميل تفاصيل الطلب...</p></div>}>
      <SuccessContent />
    </Suspense>
  );
}
