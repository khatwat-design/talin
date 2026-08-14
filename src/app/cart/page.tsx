"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { formatCurrency, getBundleSubtotal } from "@/lib/products";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/cart-context";
import { trackViewCart } from "@/lib/pixels";

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
          subtotal: getBundleSubtotal(product, items[product.id]),
        })),
    [products, items],
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  // Track cart view once items are loaded
  useEffect(() => {
    if (!cartItems.length) return;
    trackViewCart({
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: subtotal,
    });
  }, [cartItems, subtotal]);

  const handleQuantityChange = (id: string, raw: string) => {
    if (raw === "") {
      return;
    }
    const value = Number(raw);
    if (Number.isNaN(value)) return;
    setItem(id, Math.max(1, Math.floor(value)));
  };

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
                          {formatCurrency(getBundleSubtotal(item, 1))}
                          {item.quantity > 1 && item.bundles?.length ? (
                            <span className="ms-2 text-xs font-normal text-emerald-600">
                              سعر الباقة {formatCurrency(item.subtotal)}
                            </span>
                          ) : null}
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
                        onChange={(event) => handleQuantityChange(item.id, event.target.value)}
                        className="w-16 rounded-xl border border-[var(--color-border)] bg-white px-2 py-2 text-center text-sm text-[var(--color-foreground)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--focus-ring)]"
                      />
                      <button
                        type="button"
                        onClick={() => addItem(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white transition hover:brightness-110"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => setItem(item.id, 0)}
                        className="ms-1 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-muted)] transition hover:border-red-400 hover:text-red-500"
                        aria-label="حذف المنتج"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" />
                        </svg>
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
