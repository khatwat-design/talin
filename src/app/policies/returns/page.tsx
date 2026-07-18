import Link from "next/link";

export const metadata = {
  title: "سياسة الاستبدال والاسترجاع — تالين بيوتي",
  description: "سياسة الاستبدال والاسترجاع لمنتجات تالين بيوتي",
};

export default function ReturnsPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 py-8">
      <Link href="/" className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-primary)]">
        العودة للرئيسية
      </Link>
      <h1 className="text-2xl font-bold text-[var(--color-foreground)] md:text-3xl" style={{ fontFamily: "var(--font-tajawal)" }}>
        سياسة الاستبدال والاسترجاع
      </h1>
      <div className="space-y-6 text-sm leading-7 text-[var(--color-muted)]">
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="mb-2 font-semibold text-[var(--color-foreground)]">1. شروط الاسترجاع</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>يحق للمشتري طلب استرجاع المنتج خلال 7 أيام من تاريخ الاستلام.</li>
            <li>يجب أن يكون المنتج غير مفتوح وغير مستخدم وفي حالته الأصلية.</li>
            <li>في حالة فتح المنتج أو استخدامه، لا يحق الاسترجاع لأسباب تتعلق بالسلامة الصحية.</li>
          </ul>
        </section>
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="mb-2 font-semibold text-[var(--color-foreground)]">2. شروط الاستبدال</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>يمكن استبدال المنتج بآخر بشرط أن يكون غير مفتوح.</li>
            <li>التكلفة الإضافية (إن وُجدت) على المشتري.</li>
          </ul>
        </section>
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="mb-2 font-semibold text-[var(--color-foreground)]">3. حالات عدم القبول</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>المنتجات المفتوحة أو المستخدمة.</li>
            <li>المنتجات المشتراة من جهات أخرى.</li>
            <li>مرور أكثر من 7 أيام على الاستلام.</li>
          </ul>
        </section>
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="mb-2 font-semibold text-[var(--color-foreground)]">4. طريقة التواصل</h2>
          <p>لطلب استرجاع أو استبدال، تواصلي معنا عبر واتساب وسنقوم بمراجعة طلبك.</p>
        </section>
      </div>
    </div>
  );
}
