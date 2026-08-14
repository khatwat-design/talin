"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-context";
import { useProducts } from "@/lib/use-products";
import { trackAddToCart } from "@/lib/pixels";
import { FaqStructuredData, OrganizationStructuredData } from "@/components/structured-data";
import HeroSection from "@/components/home/hero-section";
import ProblemsSection from "@/components/home/problems-section";
import BenefitsSection from "@/components/home/benefits-section";
import IngredientsSection from "@/components/home/ingredients-section";
import HowToUseSection from "@/components/home/how-to-use-section";
import WhoIsItForSection from "@/components/home/who-is-it-for-section";
import ComparisonSection from "@/components/home/comparison-section";
import OrderCtaSection from "@/components/home/order-cta-section";
import ReviewsSection from "@/components/home/reviews-section";
import VideoSection from "@/components/home/video-section";
import FaqSection from "@/components/home/faq-section";
import ContactSection from "@/components/home/contact-section";

export default function Home() {
  const { addItem } = useCart();
  const router = useRouter();
  const { products } = useProducts();

  const heroProduct = products[0];

  const handleBuyNow = (product: {
    id: string;
    name: string;
    price: number;
    category?: string;
  }) => {
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
      <FaqStructuredData />
      <OrganizationStructuredData />

      {/* Light sections */}
      <HeroSection />
      <ProblemsSection />

      {/* Dark block — no gaps between them */}
      <BenefitsSection />
      <IngredientsSection />
      <HowToUseSection />

      {/* Light sections */}
      <WhoIsItForSection />
      <ComparisonSection />

      {heroProduct ? (
        <section className="bg-white py-16 sm:py-20" aria-labelledby="featured-product-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
              <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative aspect-[4/3] min-h-[280px] bg-[var(--color-surface-warm)] lg:aspect-auto lg:min-h-[420px]">
                  <Image
                    src={heroProduct.image}
                    alt={`Talin Beauty — ${heroProduct.name} — زيت نمو الشعر`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  {heroProduct.badge ? (
                    <span className="mb-4 inline-flex w-fit rounded-full border border-[var(--color-primary)]/40 bg-[var(--color-gold-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
                      {heroProduct.badge}
                    </span>
                  ) : null}
                  <h2
                    id="featured-product-heading"
                    className="text-2xl font-bold leading-snug text-[var(--color-foreground)] md:text-3xl"
                    style={{ fontFamily: "var(--font-tajawal)" }}
                  >
                    {heroProduct.name}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                    {heroProduct.description}
                  </p>
                  <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] p-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted-dim)]">الأسعار</p>
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm font-semibold text-[var(--color-foreground)]">قطعة ١</span>
                        <span className="text-lg font-bold text-[var(--color-primary)]">$20</span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm font-semibold text-[var(--color-foreground)]">قطعتان</span>
                        <span className="text-lg font-bold text-[var(--color-primary)]">$36</span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm font-semibold text-[var(--color-foreground)]">٣ قطع</span>
                        <span className="text-lg font-bold text-[var(--color-primary)]">$52</span>
                      </div>
                    </div>
                    <p className="mt-3 text-[11px] font-semibold text-emerald-600">توصيل مجاني — الدفع عند الاستلام</p>
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => handleBuyNow(heroProduct)}
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-gold)] transition hover:brightness-110"
                    >
                      اطلبي الآن — الدفع عند الاستلام
                    </button>
                    <Link
                      href={`/products/${heroProduct.id}`}
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-[var(--color-border)] px-6 py-3.5 text-sm font-semibold text-[var(--color-foreground)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    >
                      التفاصيل الكاملة
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Dark */}
      <OrderCtaSection />

      {/* Video promo — after benefits, before reviews */}
      <VideoSection />

      {/* Light */}
      <ReviewsSection />

      {/* Dark */}
      <FaqSection />

      {/* Light */}
      <ContactSection />
    </>
  );
}
