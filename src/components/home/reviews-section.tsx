export default function ReviewsSection() {
  const reviews = [
    { name: "سارة م.", city: "دمشق", rating: 5, text: "بعد شهر واحد من الاستخدام، لاحظت فرقاً كبيراً في كمية الشعر اللي يتساقط. شعر صار أقوى وأكتر لمعان." },
    { name: "نور ح.", city: "حلب", rating: 5, text: "أفضل زيت استخدمته في حياتي! ريحته حلوة ومtexture خفيف على الشعر. أنصح فيهم كل البنات." },
    { name: "ريم ع.", city: "اللاذقية", rating: 5, text: "كنت أعاني من تساقط شديد بعد الولادة، وهذا الزيت غير موقف. صرت أشوف فرق كبير بعد أسبوعين بس." },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mt-3 text-center text-2xl font-bold text-[var(--color-foreground)] sm:text-3xl" style={{ fontFamily: "var(--font-tajawal)" }}>
          ماذا تقول عملاؤنا؟
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] p-5 transition hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-gold)] sm:p-6">
              <div className="mb-3 flex items-center gap-1">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">{r.name[0]}</div>
                <div>
                  <p className="text-xs font-bold text-[var(--color-foreground)]">{r.name}</p>
                  <p className="text-[10px] text-[var(--color-muted)]">{r.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
