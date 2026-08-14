"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/products";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/cart-context";
import { useProducts } from "@/lib/use-products";
import { trackAddToCart } from "@/lib/pixels";

export default function ProductsPage() {
  const { setItem } = useCart();
  const router = useRouter();
  const { products, loading } = useProducts();

  const handleBuyNow = (product: { id: string; name: string; price: number; category?: string }, quantity = 1) => {
    setItem(product.id, quantity);
    trackAddToCart({ id: product.id, name: product.name, price: product.price, category: product.category, quantity });
    router.push("/checkout");
  };

  return (
    <div className="space-y-10">
      <section className="space-y-4 text-center lg:text-right">
        <p className="text-sm font-medium text-[var(--color-primary)]">Talin Beauty · تالين بيوتي</p>
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] lg:text-4xl" style={{ fontFamily: "var(--font-tajawal)" }}>
          زيت نمو الشعر الفاخر
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-7 text-[var(--color-muted)] lg:mx-0">
          منتج واحد بتركيبة مدروسة — لفروة رأسك وشعرك الذي تستحقينه.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? [0, 1, 2].map((item) => (
          <div key={item} className="rounded-3xl border border-[var(--color-border)] bg-white p-6">
            <div className="h-40 rounded-2xl bg-[var(--color-surface-warm)]" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-32 rounded-full bg-[var(--color-surface-warm)]" />
              <div className="h-3 w-44 rounded-full bg-[var(--color-surface-warm)]" />
            </div>
          </div>
        )) : products.map((product) => (
          <ProductCard key={product.id} product={product} onOrder={handleBuyNow} />
        ))}
        {!loading && products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[var(--color-border)] p-6 text-sm text-[var(--color-muted)]">لا توجد منتجات حالياً.</div>
        ) : null}
      </section>
    </div>
  );
}

function ProductCard({
  product,
  onOrder,
}: {
  product: Product;
  onOrder: (product: Product, quantity: number) => void;
}) {
  const [qty, setQty] = useState(1);
  const bundles = product.bundles?.length
    ? product.bundles
    : [
        { quantity: 1, price: product.price, label: "قطعة ١" },
        { quantity: 2, price: 36, label: "قطعتان" },
        { quantity: 3, price: 52, label: "٣ قطع" },
      ];

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--color-primary)]/25 hover:shadow-[var(--shadow-gold)]">
      <div className="space-y-3">
        {product.badge ? (
          <span className="inline-flex rounded-full border border-[var(--color-primary)]/35 bg-[var(--color-gold-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">{product.badge}</span>
        ) : null}
        <div className="relative h-48 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-warm)]">
          <Image src={product.image} alt={`Talin Beauty — ${product.name}`} fill className="object-contain" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-foreground)]" style={{ fontFamily: "var(--font-tajawal)" }}>{product.name}</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--color-muted)] line-clamp-3">{product.description}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
        <p className="text-lg font-bold tabular-nums text-[var(--color-primary)]" style={{ fontFamily: "var(--font-tajawal)" }}>{formatCurrency(product.price)}</p>
        <Link href={`/products/${product.id}`} className="text-xs font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">عرض التفاصيل</Link>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {bundles.map((b) => (
          <button
            key={b.quantity}
            type="button"
            onClick={() => setQty(b.quantity)}
            className={`flex flex-col items-center rounded-xl border px-2 py-2 text-center transition ${
              qty === b.quantity
                ? "border-[var(--color-primary)] bg-[var(--color-gold-soft)]"
                : "border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/40"
            }`}
          >
            <span className="text-[10px] font-semibold text-[var(--color-foreground)]">{b.label}</span>
            <span className="text-sm font-bold text-[var(--color-primary)]">${b.price}</span>
          </button>
        ))}
      </div>
      <button type="button" onClick={() => onOrder(product, qty)} className="mt-4 w-full rounded-2xl bg-[var(--color-primary)] py-3 text-sm font-bold text-white transition hover:brightness-110">
        اطلبي الآن - الدفع عند الاستلام
      </button>
    </div>
  );
}
