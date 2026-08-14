"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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

export default function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % reviewImages.length);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + reviewImages.length) % reviewImages.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(goNext, 3500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, goNext]);

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
            <div
              key={s.label}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] px-2 py-4 text-center sm:py-5"
            >
              <p
                className="text-lg font-bold text-[var(--color-primary)] sm:text-2xl"
                style={{ fontFamily: "var(--font-tajawal)" }}
              >
                {s.value}
              </p>
              <p className="mt-1 text-[10px] text-[var(--color-muted)] sm:text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Animated review carousel */}
        <div
          className="mx-auto mt-12 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] shadow-[var(--shadow-md)]">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(${index * 100}%)` }}
            >
              {reviewImages.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[3/2] w-full shrink-0"
                  aria-hidden={i !== index}
                >
                  <Image
                    src={src}
                    alt={`رأي عميلة تالين بيوتي ${i + 1}`}
                    fill
                    className="object-contain bg-[#0f0f0f]"
                    sizes="(max-width: 640px) 90vw, 48rem"
                    priority={i === 0}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 backdrop-blur-sm">
              <svg className="h-3.5 w-3.5 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span className="text-[10px] font-bold text-white">5.0</span>
            </div>

            <button
              type="button"
              onClick={goPrev}
              aria-label="الرأي السابق"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="الرأي التالي"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
          </div>

          {/* Dots */}
          <div className="mt-5 flex justify-center gap-2">
            {reviewImages.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`الانتقال إلى الرأي ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-7 bg-[var(--color-primary)]"
                    : "w-2.5 bg-[var(--color-border-strong)] hover:bg-[var(--color-primary)]/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
