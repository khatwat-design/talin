import Image from "next/image";

export default function ReviewsSection() {
  const reviewImages = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg",
    "/images/7.jpg",
    "/images/8.jpg",
  ];

  const stats = [
    { value: "٩٧٪", label: "نسبة رضا العملاء" },
    { value: "+٥٠٠", label: "عميلة سعيدة" },
    { value: "٧ أيام", label: "ضمان الاسترجاع" },
  ];

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          className="text-center text-2xl font-bold text-[var(--color-foreground)] sm:text-3xl"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          آراء حقيقية من عملائنا
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-[var(--color-muted)]">
          نعرض لكم آراء ورسائل عملائنا الحقيقيين بعد تجربة زيت تالين بيوتي
        </p>

        {/* Stats */}
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3 sm:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] px-2 py-4 text-center sm:py-5">
              <p className="text-lg font-bold text-[var(--color-primary)] sm:text-2xl" style={{ fontFamily: "var(--font-tajawal)" }}>{s.value}</p>
              <p className="mt-1 text-[10px] text-[var(--color-muted)] sm:text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Review screenshots gallery */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {reviewImages.map((src, i) => (
            <div
              key={src}
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-gold)]"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={src}
                  alt={`رأي عميلة تالين بيوتي ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <svg className="h-3.5 w-3.5 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span className="text-[10px] font-bold text-white">5.0</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
