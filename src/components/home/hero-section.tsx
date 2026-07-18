"use client";

import Image from "next/image";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+963980906364";
const whatsappLink = whatsappNumber
  ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("مرحباً، أريد طلب زيت تالين بيوتي")}`
  : "#";

export default function HeroSection() {
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
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-bold text-white shadow-[var(--shadow-gold)] transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_-6px_rgba(184,134,11,0.45)]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current transition group-hover:scale-110"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                اطلبي الآن — لتصلك طريقة الاستخدام
              </a>
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
                <p className="text-2xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-tajawal)" }}>$20</p>
                <p className="text-[10px] text-emerald-600 font-semibold">توصيل مجاني</p>
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
