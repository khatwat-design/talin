"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { formatCurrency } from "@/lib/products";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/cart-context";

export default function CartPage() {
  const { items, addItem, removeItem, setItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => (res.ok ? res.json() : { products: [] }))
      .then((data: { products?: Product[] }) => setProducts(data.products ?? []))
      .catch(() => setProducts([]));
  }, []);

  const cartItems = useMemo(
    () =>
      products
        .filter((p) => items[p.id])
        .map((product) => ({
          ...product,
          quantity: items[product.id],
          subtotal: items[product.id] * product.price,
        })),
    [products, items],
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="py-4 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <section className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)] md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-[var(--color-foreground)]" style={{ fontFamily: "var(--font-tajawal)" }}>
                سلة التسوق
              </h1>
              <Link
                href="/"
                className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-primary)]"
              >
                العودة للتسوق
              </Link>
            </div>

            <div className="space-y-4">
              {cartItems.length ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] p-4 transition hover:border-[var(--color-primary)] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
                        <Image
                          src={item.image}
                          alt={`Talin Beauty — ${item.name}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-[var(--color-foreground)]" style={{ fontFamily: "var(--font-tajawal)" }}>{item.name}</h3>
                        <p className="mt-1 line-clamp-2 text-xs text-[var(--color-muted)]">
                          {item.description}
                        </p>
                        <p className="mt-2 text-sm font-bold text-[var(--color-primary)]">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:justify-end">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-sm font-semibold text-[var(--color-muted)] transition hover:border-red-400 hover:text-red-500"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(event) => {
                          const value = Number(event.target.value);
                          if (Number.isNaN(value)) return;
                          setItem(item.id, Math.max(1, value));
                        }}
                        className="w-16 rounded-xl border border-[var(--color-border)] bg-white px-2 py-2 text-center text-sm text-[var(--color-foreground)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--focus-ring)]"
                      />
                      <button
                        type="button"
                        onClick={() => addItem(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white transition hover:brightness-110"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right sm:min-w-[100px]">
                      <p className="text-sm font-bold text-[var(--color-foreground)]">
                        {formatCurrency(item.subtotal)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-[var(--color-border)] p-10 text-center">
                  <div className="mb-4 text-[var(--color-muted-dim)]">
                    <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-sm text-[var(--color-muted)]">
                    سلتك فارغة حالياً. تصفحي المنتجات وأضيفي ما يناسبكِ.
                  </p>
                  <Link
                    href="/"
                    className="mt-6 inline-block rounded-full bg-[var(--color-primary)] px-8 py-2.5 text-sm font-bold text-white shadow-[var(--shadow-gold)] transition hover:brightness-110"
                  >
                    تسوقي الآن
                  </Link>
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)] md:p-8">
              <h2 className="text-xl font-bold text-[var(--color-foreground)]" style={{ fontFamily: "var(--font-tajawal)" }}>
                ملخص الطلب
              </h2>
              <div className="mt-6 flex items-center justify-between text-base font-bold text-[var(--color-foreground)]">
                <span>الإجمالي</span>
                <span className="text-[var(--color-primary)]">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <Link
                href="/checkout"
                className={`mt-6 block w-full rounded-full py-3.5 text-center text-sm font-bold transition ${
                  cartItems.length
                    ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-gold)] hover:brightness-110"
                    : "pointer-events-none cursor-not-allowed bg-[var(--color-border)] text-[var(--color-muted-dim)]"
                }`}
              >
                {cartItems.length ? "إتمام الطلب" : "السلة فارغة"}
              </Link>
            </div>

            <div className="rounded-3xl border border-[var(--color-primary)]/30 bg-[var(--color-gold-soft)] p-6">
              <h3 className="text-lg font-semibold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-tajawal)" }}>
                معلومات التوصيل
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                الدفع عند الاستلام فقط. سنتواصل معكِ لتأكيد العنوان والموعد. الشحن مجاني.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
