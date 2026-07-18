const FEATURES = [
  {
    title: "يحفز البصيلات",
    body: "مكونات مختارة لدعم دورة الشعر الطبيعية وليونة فروة الرأس.",
    icon: (
      <svg className="h-7 w-7 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    title: "يوقف التساقط",
    body: "يركّز على تقوية الجذور وتقليل الكسر مع الاستخدام المنتظم.",
    icon: (
      <svg className="h-7 w-7 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-3l3 3 3-3" />
      </svg>
    ),
  },
  {
    title: "مكونات طبيعية آمنة",
    body: "بدون إضافات قاسية — تركيبة لطيفة تناسب معظم أنواع الشعر.",
    icon: (
      <svg className="h-7 w-7 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
] as const;

export function HomeFeatures() {
  return (
    <section className="space-y-8" aria-labelledby="features-heading">
      <div className="text-center">
        <h2
          id="features-heading"
          className="font-display text-xl font-bold text-white md:text-2xl"
        >
          لماذا يثق بنا آلاف العملاء؟
        </h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          ثلاثة أسباب تجعل زيت تالين بيوتي خياراً فاخراً للعناية بالشعر.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {FEATURES.map((f) => (
          <article
            key={f.title}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 text-center shadow-[var(--shadow-soft)] transition hover:border-[var(--color-primary)]/35"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold-soft)]">
              {f.icon}
            </div>
            <h3 className="font-display text-lg font-semibold text-white">{f.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
