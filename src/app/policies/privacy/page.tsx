import Link from "next/link";

export const metadata = {
  title: "سياسة الخصوصية — تالين بيوتي",
  description: "سياسة الخصوصية لمتجر تالين بيوتي",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 py-8">
      <Link href="/" className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-primary)]">
        العودة للرئيسية
      </Link>
      <h1 className="text-2xl font-bold text-[var(--color-foreground)] md:text-3xl" style={{ fontFamily: "var(--font-tajawal)" }}>
        سياسة الخصوصية
      </h1>
      <div className="space-y-6 text-sm leading-7 text-[var(--color-muted)]">
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="mb-2 font-semibold text-[var(--color-foreground)]">1. جمع المعلومات</h2>
          <p>نقوم بجمع المعلومات التي تقدمها طوعاً عند إتمام الطلب، مثل: الاسم، رقم الهاتف، العنوان، والمدينة.</p>
        </section>
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="mb-2 font-semibold text-[var(--color-foreground)]">2. استخدام المعلومات</h2>
          <ul className="list-inside list-disc space-y-1">
            <li>معالجة الطلبات والتوصيل.</li>
            <li>التواصل معك لتأكيد الطلب أو تحسين خدمة العملاء.</li>
            <li>تحسين تجربة التسوق على المتجر.</li>
          </ul>
        </section>
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="mb-2 font-semibold text-[var(--color-foreground)]">3. مشاركة المعلومات</h2>
          <p>لا نقوم ببيع أو مشاركة معلوماتك الشخصية مع أطراف ثالثة، إلا بقدر اللازم لتنفيذ الخدمة (مثل شركة التوصيل).</p>
        </section>
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="mb-2 font-semibold text-[var(--color-foreground)]">4. حماية المعلومات</h2>
          <p>نستخدم إجراءات أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به.</p>
        </section>
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="mb-2 font-semibold text-[var(--color-foreground)]">5. حقوقك</h2>
          <p>لكِ الحق في طلب حذف أو تعديل معلوماتك الشخصية في أي وقت عبر التواصل معنا.</p>
        </section>
      </div>
    </div>
  );
}
