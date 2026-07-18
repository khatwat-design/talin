export default function AboutSection() {
  return (
    <section className="bg-[var(--color-surface-warm)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">من نحن</p>
            <h2 className="mt-3 text-2xl font-bold text-[var(--color-foreground)] sm:text-3xl" style={{ fontFamily: "var(--font-tajawal)" }}>
              تالين بيوتي
              <span className="mt-1 block text-lg font-normal text-[var(--color-primary)]">لأن شعرك يستحق الأفضل</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
              نؤمن أن كل امرأة تستحق شرراً صحياً وطبيعياً. زيت تالين بيوتي صُمم بعناية فائقة من أجود المكونات الطبيعية المُستخرجة من الطبيعة ليعالج مشاكل الشعر المختلفة.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
              نحن لا نبيع مجرد زيت — نحن نقدم حلاً شاملاً لصحة شعرك، مدعوم بخبرة سنوات وآلاف العملاء الراضين في سوريا والعالم العربي.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-5 text-center shadow-[var(--shadow-soft)]">
              <p className="text-3xl font-bold text-[var(--color-primary)]">+5000</p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">عميلة راضية</p>
            </div>
            <div className="rounded-2xl bg-white p-5 text-center shadow-[var(--shadow-soft)]">
              <p className="text-3xl font-bold text-[var(--color-primary)]">100%</p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">مكونات طبيعية</p>
            </div>
            <div className="rounded-2xl bg-white p-5 text-center shadow-[var(--shadow-soft)]">
              <p className="text-3xl font-bold text-[var(--color-primary)]">+3</p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">سنوات خبرة</p>
            </div>
            <div className="rounded-2xl bg-white p-5 text-center shadow-[var(--shadow-soft)]">
              <p className="text-3xl font-bold text-[var(--color-primary)]">4.9</p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">تقييم العملاء</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
