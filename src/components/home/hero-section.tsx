"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-context";
import { useProducts } from "@/lib/use-products";
import { trackAddToCart } from "@/lib/pixels";

export default function HeroSection() {
  const { addItem } = useCart();
  const router = useRouter();
  const { products } = useProducts();
  const product = products[0];

  const handleBuyNow = () => {
    if (!product) return;
    addItem(product.id);
    trackAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      quantity: 1,
    });
    router.push("/checkout");
  };
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#faf8f5] via-[#f5f0e8] to-[#faf8f5]">
      {/* Decorative dots */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #b8860b 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:py-28">
        <div className="flex flex-col-reverse items-center gap-10 lg:flex-row lg:items-center lg:gap-20">

          {/* Text — Right side in RTL */}
          <div className="flex-1 text-center lg:text-right">
            <h1
              className="text-3xl font-bold leading-[1.3] text-[var(--color-foreground)] sm:text-4xl lg:text-[2.8rem] lg:leading-[1.25]"
              style={{ fontFamily: "var(--font-tajawal)" }}
            >
              شعر أنعم وأكثر حيوية
              <span className="mt-1 block text-[var(--color-primary)]">يبدأ من روتين عناية صحيح</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-[1.9] text-[var(--color-muted)] sm:text-lg lg:mx-0">
              زيت تالين الطبيعي ١٠٠% يساعد شعرك يحافظ على مظهره الصحي
              ويمنحه نعومة ولمعة وحيوية مع الاستخدام المنتظم.
            </p>

            <div className="mt-8 lg:justify-start">
              <button
                type="button"
                onClick={handleBuyNow}
                className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-bold text-white shadow-[var(--shadow-gold)] transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_-6px_rgba(184,134,11,0.45)]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 transition group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h15l-1.5 9h-12z" />
                  <path d="M6 6L5 3H2" />
                  <circle cx="9" cy="20" r="1.4" />
                  <circle cx="18" cy="20" r="1.4" />
                </svg>
                اطلبي الآن — الدفع عند الاستلام
              </button>
            </div>
          </div>

          {/* Image — Left side */}
          <div className="relative flex-shrink-0">
            {/* Gold glow behind image */}
            <div className="absolute -inset-4 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />

            <div className="relative">
              {/* Main image container */}
              <div className="relative h-72 w-72 overflow-hidden rounded-[2rem] border-2 border-[var(--color-primary)]/15 bg-white shadow-[0_20px_60px_-15px_rgba(184,134,11,0.2)] sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]">
                <Image
                  src="/products/1.png"
                  alt="زيت تالين بيوتي — زيت طبيعي لنمو الشعر"
                  fill
                  className="object-contain object-center p-4"
                  priority
                  sizes="(max-width: 1024px) 320px, 416px"
                />
              </div>

              {/* Price tag floating */}
              <div className="absolute -bottom-4 -left-4 rounded-2xl border border-[var(--color-border)] bg-white px-5 py-3 shadow-[var(--shadow-md)]">
                <p className="text-[10px] uppercase tracking-wider text-[var(--color-muted-dim)]">السعر</p>
                <div className="mt-1 space-y-0.5">
                  <p className="text-sm font-bold text-[var(--color-foreground)]">قطعة $20 <span className="text-[10px] font-normal text-emerald-600">توصيل مجاني</span></p>
                  <p className="text-sm font-bold text-[var(--color-primary)]">قطعتان $36 <span className="text-[10px] font-normal text-emerald-600">توصيل مجاني</span></p>
                  <p className="text-sm font-bold text-[var(--color-primary)]">٣ قطع $52 <span className="text-[10px] font-normal text-emerald-600">توصيل مجاني</span></p>
                </div>
              </div>

              {/* 100% natural badge floating */}
              <div className="absolute -right-3 top-8 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-2.5 shadow-[var(--shadow-md)]">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50">
                    <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[var(--color-foreground)]">100%</p>
                    <p className="text-[9px] text-[var(--color-muted)]">طبيعي</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
