import Link from "next/link";

export const metadata = {
  title: "عن تالين — تالين بيوتي",
  description: "تعرفي على زيت تالين بيوتي — زيت شعر طبيعي 100% لعناية يومية بفخامة ونعومة",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-12 py-8">
      {/* Breadcrumb */}
      <Link href="/" className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-primary)]">
        العودة للرئيسية
      </Link>

      {/* Title */}
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          عن تالين
        </p>
        <h1
          className="mt-3 text-3xl font-bold text-[var(--color-foreground)] sm:text-4xl"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          أكثر من مجرد زيت شعر
        </h1>
      </div>

      {/* Description */}
      <div className="rounded-3xl border border-[var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)] sm:p-10">
        <p className="text-base leading-[2] text-[var(--color-muted)] sm:text-lg">
          تالين زيت شعر طبيعي ١٠٠% صُمم ليكون جزءًا من روتين العناية اليومي
          ويمنح شعرك مظهراً أكثر نعومة وترتيباً وحيوية.
        </p>
      </div>

      {/* Key points */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { icon: "🌿", title: "طبيعي 100%", desc: "مكونات طبيعية خالية من أي مواد كيميائية" },
          { icon: "✨", title: "سهل الاستخدام", desc: "دلكيه على شعرك بسهولة في دقائق معدودة" },
          { icon: "🔄", title: "مناسب للاستخدام المنتظم", desc: "يمكنك استخدامه يومياً دون أي قيود" },
          { icon: "💆", title: "يدخل ضمن روتين العناية", desc: "يتكامل مع روتين العناية بالشعر اليومي" },
        ].map((point) => (
          <div
            key={point.title}
            className="flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5 transition hover:border-[var(--color-primary)]/40 hover:shadow-[var(--shadow-gold)] sm:p-6"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-gold-soft)] text-2xl">
              {point.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-foreground)]" style={{ fontFamily: "var(--font-tajawal)" }}>
                {point.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">
                {point.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-gold)] transition hover:brightness-110"
        >
          تصفحي المنتج
        </Link>
      </div>
    </div>
  );
}
