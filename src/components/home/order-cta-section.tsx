"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-context";
import { useProducts } from "@/lib/use-products";
import { trackAddToCart } from "@/lib/pixels";

const fallbackBundles = [
  { quantity: 1, price: 20, label: "قطعة ١" },
  { quantity: 2, price: 36, label: "قطعتان" },
  { quantity: 3, price: 52, label: "٣ قطع" },
];

export default function OrderCtaSection() {
  const { setItem } = useCart();
  const router = useRouter();
  const { products } = useProducts();

  const product = products[0];
  const bundles = product?.bundles?.length ? product.bundles : fallbackBundles;

  const handleOrder = (quantity: number, price: number) => {
    if (!product) return;
    setItem(product.id, quantity);
    trackAddToCart({
      id: product.id,
      name: product.name,
      price: price / quantity,
      category: product.category,
      quantity,
    });
    router.push("/checkout");
  };

  return (
    <section className="relative overflow-hidden bg-[#0f0f0f] py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(184,134,11,0.8) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-2xl font-bold text-white sm:text-3xl"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            اطلبي الآن
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/40 sm:text-base">
            الدفع عند الاستلام — شحن مجاني لجميع أنحاء سوريا
          </p>

          {/* Bundles — selectable, each adds to cart */}
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {bundles.map((b) => (
              <div
                key={b.quantity}
                className="flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-[var(--color-primary)]/40 hover:bg-white/[0.04]"
              >
                <div>
                  <p className="text-sm font-semibold text-white/80">{b.label}</p>
                  <p className="mt-2 text-2xl font-bold text-[var(--color-primary)]">
                    ${b.price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOrder(b.quantity, b.price)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-4 py-2.5 text-xs font-bold text-white transition hover:brightness-110"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                  </svg>
                  أضيفي إلى السلة
                </button>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] font-semibold text-emerald-600">توصيل مجاني على جميع الباقات — الدفع عند الاستلام</p>
        </div>
      </div>
    </section>
  );
}
