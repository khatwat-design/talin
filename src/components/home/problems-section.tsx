"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const problems = [
  {
    title: "تساقط الشعر",
    desc: "بصيلات ضعيفة تحتاج تقوية فورية لوقف التساقط المفرط.",
    image: "/products/talin-hair-oil-01.png",
  },
  {
    title: "الشعر التالف",
    desc: "تقصف وجفاف شديد من التصفيف الحراري والاستخدام اليومي.",
    image: "/products/talin-hair-oil-02.png",
  },
  {
    title: "بطء النمو",
    desc: "شعر لا ينمو بالسرعة المطلوبة ويبدو راكدًا بلا حياة.",
    image: "/products/talin-hair-oil-03.png",
  },
  {
    title: "ضعف اللمعان",
    desc: "شعر باهت ومكتوم يفقد بريقه الطبيعي مع مرور الوقت.",
    image: "/products/talin-hair-oil-04.png",
  },
];

export default function ProblemsSection() {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const goTo = useCallback(
    (index: number) => {
      if (phase !== "idle" || index === current) return;
      setPhase("exit");
      setTimeout(() => {
        setCurrent(index);
        setPhase("enter");
        setTimeout(() => setPhase("idle"), 500);
      }, 400);
    },
    [current, phase],
  );

  const next = useCallback(() => {
    goTo((current + 1) % problems.length);
  }, [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next]);

  const p = problems[current];

  return (
    <section className="bg-[var(--color-surface-warm)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-2xl font-bold text-[var(--color-foreground)] sm:text-3xl"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            هل تعانين من أي مشكلة في شعرك؟
          </h2>
        </div>

        {/* Carousel */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="grid items-center gap-0 md:grid-cols-[1fr_1fr]">
            {/* Image side */}
            <div className="relative aspect-square overflow-hidden md:aspect-auto md:h-[420px]">
              {/* Exit image */}
              {phase === "exit" && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-contain p-8 opacity-100 scale-100 animate-[problemExit_0.4s_ease-in_forwards]"
                />
              )}
              {/* Enter image */}
              <img
                key={`img-${current}-${phase}`}
                src={p.image}
                alt={p.title}
                className={`absolute inset-0 h-full w-full object-contain p-8 ${
                  phase === "enter"
                    ? "animate-[problemEnter_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                    : phase === "idle"
                      ? "opacity-100 scale-100"
                      : "opacity-0"
                }`}
              />
            </div>

            {/* Content side */}
            <div className="flex flex-col justify-center overflow-hidden p-8 text-center sm:p-10 md:p-12 md:text-right">
              <div>
                {/* Exit text */}
                {phase === "exit" && (
                  <div className="animate-[textExit_0.4s_ease-in_forwards]">
                    <h3
                      className="text-2xl font-bold text-[var(--color-foreground)] sm:text-3xl"
                      style={{ fontFamily: "var(--font-tajawal)" }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-4 text-sm leading-[1.9] text-[var(--color-muted)] sm:text-base">
                      {p.desc}
                    </p>
                  </div>
                )}
                {/* Enter text */}
                {phase !== "exit" && (
                  <div
                    className={`${
                      phase === "enter"
                        ? "animate-[textEnter_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                        : "opacity-100 translate-x-0"
                    }`}
                  >
                    <h3
                      className="text-2xl font-bold text-[var(--color-foreground)] sm:text-3xl"
                      style={{ fontFamily: "var(--font-tajawal)" }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-4 text-sm leading-[1.9] text-[var(--color-muted)] sm:text-base">
                      {p.desc}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
