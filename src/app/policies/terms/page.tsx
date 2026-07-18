import Link from "next/link";

export const metadata = {
  title: "شروط الاستخدام — تالين بيوتي",
  description: "شروط استخدام متجر تالين بيوتي",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 py-8">
      <Link href="/" className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-primary)]">
        العودة للرئيسية
      </Link>
      <h1 className="text-2xl font-bold text-[var(--color-foreground)] md:text-3xl" style={{ fontFamily: "var(--font-tajawal)" }}>
        شروط الاستخدام
      </h1>
      <div className="space-y-6 text-sm leading-7 text-[var(--color-muted)]">
        <div className="rounded-2xl border border-[var(--color-primary)]/30 bg-[var(--color-gold-soft)] p-5">
          <p className="font-semibold text-[var(--color-primary)]">تنبيه مهم</p>
          <p className="mt-1">المنتج مخصص للعناية بالشعر وليس بديلاً عن الاستشارة الطبية أو العلاج الطبي. في حالة وجود مشكلة صحية مزمنة، يُنصح بمراجعة الطبيب المختص.</p>
        </div>
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="mb-2 font-semibold text-[var(--color-foreground)]">1. القبول بالشروط</h2>
          <p>باستخدامك لمتجر تالين بيوتي أو إتمامك للطلب، أنت توافق على هذه الشروط والأحكام.</p>
        </section>
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="mb-2 font-semibold text-[var(--color-foreground)]">2. المنتجات</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>جميع المنتجات عبارة عن منتجات عناية بالشعر وليست أدوية.</li>
            <li>الصور توضيحية وقد تختلف بعض الشيء عن المنتج الفعلي.</li>
            <li>الأسعار قابلة للتغيير دون إشعار مسبق.</li>
          </ul>
        </section>
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="mb-2 font-semibold text-[var(--color-foreground)]">3. الطلبات والتوصيل</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>الدفع عند الاستلام فقط.</li>
            <li>يتم تأكيد الطلب عبر التواصل الهاتفي.</li>
            <li>مدة التوصيل تختلف حسب المحافظة.</li>
          </ul>
        </section>
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="mb-2 font-semibold text-[var(--color-foreground)]">4. المسؤولية</h2>
          <p>نحن غير مسؤولين عن أي استخدام غير صحيح للمنتج أو نتائج مختلفة عن المتوقع.</p>
        </section>
      </div>
    </div>
  );
}
