export default function ComparisonSection() {
  const rows = [
    { label: "مكونات طبيعية 100%", talin: true, other: false },
    { label: "يعالج التساقط والنمو", talin: true, other: false },
    { label: "آمن للحوامل والمرضعات", talin: true, other: false },
    { label: "بدون مواد كيميائية", talin: true, other: false },
    { label: "توصيل مجاني", talin: true, other: false },
  ];

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          className="text-center text-2xl font-bold text-[var(--color-foreground)] sm:text-3xl"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          لماذا تالين بيوتي وليس غيرها؟
        </h2>

        <div className="mx-auto mt-12 max-w-3xl">
          {/* Header */}
          <div className="grid grid-cols-[1fr_140px_100px] items-stretch gap-3 sm:grid-cols-[1fr_180px_120px] sm:gap-4">
            <div className="flex items-center rounded-t-2xl border border-b-0 border-[var(--color-border)] bg-[var(--color-surface-warm)] px-5 py-4">
              <p className="text-xs font-semibold text-[var(--color-muted)] sm:text-sm">الميزة</p>
            </div>
            <div className="flex items-center justify-center rounded-t-2xl border border-b-0 border-[var(--color-primary)]/30 bg-[var(--color-primary)] px-4 py-4 text-center shadow-[0_-4px_20px_-4px_rgba(184,134,11,0.3)]">
              <p className="text-xs font-bold text-white sm:text-sm">تالين بيوتي</p>
            </div>
            <div className="flex items-center justify-center rounded-t-2xl border border-b-0 border-[var(--color-border)] bg-[var(--color-surface-warm)] px-3 py-4 text-center">
              <p className="text-xs font-semibold text-[var(--color-muted)] sm:text-sm">أخرى</p>
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-2">
            {rows.map((row, i) => (
              <div
                key={row.label}
                className="grid grid-cols-[1fr_140px_100px] items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-0 py-0 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-[var(--color-primary)]/20 hover:shadow-[0_4px_20px_-4px_rgba(184,134,11,0.12)] sm:grid-cols-[1fr_180px_120px] sm:gap-4"
              >
                <p
                  className="pr-5 pl-3 py-4 text-sm font-semibold text-[var(--color-foreground)] sm:text-base"
                  style={{ fontFamily: "var(--font-tajawal)" }}
                >
                  {row.label}
                </p>

                <div className="flex justify-center py-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)]/10 sm:h-9 sm:w-9">
                    <svg className="h-4 w-4 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <div className="flex justify-center py-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 sm:h-9 sm:w-9">
                    <svg className="h-4 w-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-gold)] transition-all hover:brightness-110"
            >
              اختاري تالين اليوم
              <svg className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
