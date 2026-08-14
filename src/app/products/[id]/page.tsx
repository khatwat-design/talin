"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/products";
import { useCart } from "@/components/cart-context";
import { useProducts } from "@/lib/use-products";
import { trackAddToCart, trackViewContent, trackWhatsAppClick } from "@/lib/pixels";
import { ProductStructuredData } from "@/components/structured-data";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+963980906364";
const whatsappLink = whatsappNumber
  ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("مرحباً، أريد طلب زيت تالين بيوتي")}`
  : "#";

export default function ProductDetailPage() {
  const { addItem } = useCart();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { products, loading } = useProducts();
  const product = products.find((item) => item.id === params?.id);
  const viewContentFired = useRef(false);

  const allImages = useMemo(() => {
    if (!product) return [];
    const extra = product.gallery ?? [];
    return [product.image, ...extra];
  }, [product]);

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [params?.id, product?.id]);

  useEffect(() => {
    if (!product || viewContentFired.current) return;
    trackViewContent({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      quantity: 1,
    });
    viewContentFired.current = true;
  }, [product]);

  if (!product && !loading) {
    return (
      <div className="rounded-3xl border border-[var(--color-border)] bg-white p-8 text-center shadow-[var(--shadow-soft)]">
        <p className="text-lg font-semibold text-[var(--color-foreground)]">المنتج غير متوفر</p>
        <Link
          href="/products"
          className="mt-4 inline-flex items-center justify-center rounded-full border border-[var(--color-border)] px-5 py-2 text-sm font-semibold text-[var(--color-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
        >
          العودة للمنتجات
        </Link>
      </div>
    );
  }

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
    <>
      <ProductStructuredData product={product ?? undefined} />
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)] md:p-8">
          <Link
            href="/products"
            className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-primary)]"
          >
            العودة للمنتجات
          </Link>
          <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-3">
              <div className="relative aspect-[3/4] min-h-[260px] overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] md:aspect-[4/5] md:min-h-[360px]">
                {product && allImages[activeImage] ? (
                  <Image
                    key={allImages[activeImage]}
                    src={allImages[activeImage]}
                    alt={`Talin Beauty — ${product.name} — صورة ${activeImage + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={activeImage === 0}
                  />
                ) : null}
              </div>
              {allImages.length > 1 ? (
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {allImages.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition md:h-[72px] md:w-[72px] ${
                        i === activeImage
                          ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/30"
                          : "border-[var(--color-border)] opacity-80 hover:opacity-100"
                      }`}
                      aria-label={`عرض الصورة ${i + 1}`}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="space-y-4">
              {product?.badge ? (
                <span className="inline-flex rounded-full border border-[var(--color-primary)]/35 bg-[var(--color-gold-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
                  {product.badge}
                </span>
              ) : null}
              <h1 className="text-2xl font-bold text-[var(--color-foreground)] md:text-3xl" style={{ fontFamily: "var(--font-tajawal)" }}>
                {product?.name ?? "جاري التحميل..."}
              </h1>
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                {product?.description ?? "نجهز تفاصيل المنتج الآن."}
              </p>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] p-4">
                <p className="text-xs uppercase tracking-wider text-[var(--color-muted-dim)]">
                  السعر
                </p>
                <p className="mt-1 text-3xl font-bold tabular-nums text-[var(--color-primary)]" style={{ fontFamily: "var(--font-tajawal)" }}>
                  {product ? formatCurrency(product.price) : "--"}
                </p>
              </div>
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full rounded-2xl bg-[var(--color-primary)] px-6 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-gold)] transition hover:brightness-110 disabled:opacity-50"
                disabled={!product}
              >
                اطلبي الآن - الدفع عند الاستلام
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsAppClick}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 px-6 py-3.5 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/20"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                سأريد الاستفسار عبر واتساب
              </a>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]" style={{ fontFamily: "var(--font-tajawal)" }}>
              لماذا تالين بيوتي؟
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--color-muted)]">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                تركيبة فاخرة تركّز على نمو الشعر ولمعانه من الجذور.
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                مكونات طبيعية مختارة بعناية لتناسب الاستخدام اليومي.
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                دفع عند الاستلام — تسوقي براحة دون التزام مسبق.
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-[var(--color-primary)]/25 bg-[var(--color-gold-soft)] p-6">
            <p className="text-sm font-medium text-[var(--color-primary)]">
              ملاحظة التوصيل
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              يمكنكِ تحديد عنوانكِ بدقة في صفحة إتمام الطلب لتسريع التوصيل. الشحن مجاني لجميع أنحاء سوريا.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
