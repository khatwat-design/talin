export default function IngredientsSection() {
  const ingredients = [
    { name: "زيت الأرغان", benefit: "غني بفيتامين E والأحماض الدهنية المفيدة لتغذية الشعر وترطيبه بعمق" },
    { name: "زيت الجوجوبا", benefit: "يُشبه الزيوت الطبيعية التي تُفرزها فروة الرأس مما يجعله مثالياً لتنظيم إفراز الدهون" },
    { name: "زيت الكيراتين", benefit: "يعيد بناء خصلات الشعر التالفة ويقوّي بنيته من الداخل" },
    { name: "فيتامين E", benefit: "مضاد أكسدة قوي يحمي الشعر من الجذور الحرة ويُحسّن صحة فروة الرأس" },
  ];

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
            className="mt-3 text-2xl font-bold text-white sm:text-3xl"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            مكونات طبيعية مُختارة بعناية
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {ingredients.map((ing) => (
            <div
              key={ing.name}
              className="group relative border border-white/[0.06] p-6 sm:p-8 transition-all duration-300 hover:border-[var(--color-primary)]/20 hover:bg-white/[0.02]"
            >
              <div className="mb-4 h-px w-8 bg-[var(--color-primary)]/50 transition-all duration-300 group-hover:w-12 group-hover:bg-[var(--color-primary)]" />
              <h3
                className="text-base font-bold text-white sm:text-lg"
                style={{ fontFamily: "var(--font-tajawal)" }}
              >
                {ing.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/35 transition-colors duration-300 group-hover:text-white/55">
                {ing.benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
