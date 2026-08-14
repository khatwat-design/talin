"use client";

import { useRef, useState } from "react";

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => {
      videoRef.current?.play().catch(() => {
        /* ignore autoplay failure */
      });
    }, 50);
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
        <h2
          className="text-center text-2xl font-bold text-white sm:text-3xl"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          شاهدي المنتج بعينك
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-white/60">
          شاهدوا زيت تالين بيوتي في عمل حقيقي
        </p>

        <div className="mx-auto mt-10 flex justify-center">
          <div className="relative aspect-[9/16] w-[300px] max-w-[85vw] overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_30px_80px_-20px_rgba(184,134,11,0.35)] sm:w-[320px]">
            <video
              ref={videoRef}
              src="/videos/talin-promo.mp4"
              className="h-full w-full object-cover"
              controls={playing}
              playsInline
              preload="metadata"
            />

            {!playing ? (
              <button
                type="button"
                onClick={handlePlay}
                aria-label="تشغيل الفيديو"
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-[0_0_0_8px_rgba(255,255,255,0.15)] transition-transform duration-300 hover:scale-110">
                  <svg className="ml-1 h-8 w-8 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-xs font-semibold text-white/80">
                  اضغطي للمشاهدة
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
