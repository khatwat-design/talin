"use client";

import { useState, useEffect, useCallback } from "react";

export default function HowToUseSection() {
  const steps = [
    { num: "01", title: "10 نقاط", desc: "ضعي 10 نقاط من الزيت على فروة الرأس قبل الاستحمام بساعتين" },
    { num: "02", title: "تدليك 5 دقائق", desc: "دلكي فروة الرأس بلطف لمدة 5 دقائق بعد وضع الزيت" },
    { num: "03", title: "اغسلي بالشامبو", desc: "اغسلي شعرك بالشامبو بعد مرور ساعتين على التدليك" },
    { num: "04", title: "يوم نعم يوم لا", desc: "كرري الاستخدام كل يومين — يوم استخدام ويوم راحة" },
  ];

  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const advance = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setCurrent((p) => (p + 1) % steps.length);
      setFading(false);
    }, 300);
  }, [steps.length]);

  useEffect(() => {
    const id = setInterval(advance, 4000);
    return () => clearInterval(id);
  }, [advance]);

  const goTo = (i: number) => {
    if (i === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(i);
      setFading(false);
    }, 300);
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
            كيف تستخدمين زيت تالين؟
          </h2>
        </div>

        {/* Mobile — carousel */}
        <div className="mt-14 sm:hidden">
          <div className="relative mx-auto max-w-sm">
            <div
              className={`border border-white/[0.06] p-8 text-center transition-all duration-300 ${
                fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              <span className="inline-block text-4xl font-bold text-[var(--color-primary)]/30">
                {steps[current].num}
              </span>
              <h3
                className="mt-4 text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-tajawal)" }}
              >
                {steps[current].title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/40">
                {steps[current].desc}
              </p>
            </div>

            {/* Dots */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-[var(--color-primary)]"
                      : "w-1.5 bg-white/20"
                  }`}
                  aria-label={`خطوة ${i + 1}`}
                />
              ))}
            </div>

            {/* Step counter */}
            <p className="mt-3 text-center text-xs text-white/25">
              {current + 1} / {steps.length}
            </p>
          </div>
        </div>

        {/* Desktop — grid */}
        <div className="mx-auto mt-14 hidden max-w-4xl grid-cols-4 gap-6 sm:grid">
          {steps.map((s) => (
            <div
              key={s.num}
              className="group relative border border-white/[0.06] p-6 transition-all duration-300 hover:border-[var(--color-primary)]/20 hover:bg-white/[0.02] sm:p-8"
            >
              <span className="text-3xl font-bold text-[var(--color-primary)]/30 transition-colors duration-300 group-hover:text-[var(--color-primary)]/60">
                {s.num}
              </span>
              <h3
                className="mt-4 text-base font-bold text-white"
                style={{ fontFamily: "var(--font-tajawal)" }}
              >
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/35 transition-colors duration-300 group-hover:text-white/55">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
