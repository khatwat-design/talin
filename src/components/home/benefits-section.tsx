export default function BenefitsSection() {
  const benefits = [
    { title: "يساعد الشعر على الظهور بمظهر صحي أكثر", desc: "يعيد بناء خصلات الشعر ويقويها من الجذور" },
    { title: "يمنح نعومة ولمعة طبيعية", desc: "يمنح شعرك بريقاً صحياً ونعومة تلمسها بيديك" },
    { title: "يساعد على تحسين مظهر الجفاف والبهتان", desc: "يعيد الرطوبة والحيوية للشعر الجاف والباهت" },
    { title: "يسهل تسريح الشعر", desc: "يجعل التسريح أسهل وأكثر راحة بدون تشابك" },
    { title: "يدعم روتين العناية اليومي", desc: "يتكامل مع روتينك اليومي لنتائج أفضل وأسرع" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0f0f0f] py-20 sm:py-28">
      {/* Pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(184,134,11,0.8) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Gradient fade at top/bottom */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0f0f]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="mt-3 text-2xl font-bold text-white sm:text-3xl"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            لماذا تختارين تالين
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="group relative flex items-start gap-6 border-b border-white/[0.06] py-7 transition-colors duration-300 hover:bg-white/[0.02] sm:items-center sm:gap-8 sm:py-9"
            >
              {/* Number */}
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-sm font-bold text-[var(--color-primary)] transition-all duration-300 group-hover:border-[var(--color-primary)]/40 group-hover:bg-[var(--color-primary)]/10"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <h3
                  className="text-base font-bold text-white sm:text-lg"
                  style={{ fontFamily: "var(--font-tajawal)" }}
                >
                  {b.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-white/35 transition-colors duration-300 group-hover:text-white/55">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
