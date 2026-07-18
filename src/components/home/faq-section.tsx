"use client";

import { useState } from "react";

const faqs = [
  { q: "كم يستغرق ظهور النتائج؟", a: "تظهر النتائج الأولية خلال 2-3 أسابيع من الاستخدام المنتظم. للحصول على أفضل النتائج، يُنصح بالاستخدام لمدة 3 أشهر متواصلة." },
  { q: "هل آمن على الحوامل والمرضعات؟", a: "نعم، زيت تالين بيوتي مصنوع من مكونات طبيعية 100% وآمن تماماً على الحوامل والمرضعات." },
  { q: "كيف أطلب المنتج؟", a: "يمكنك طلب المنتج مباشرة عبر واتساب أو من خلال صفحة المنتج. الدفع عند الاستلام وشحن مجاني." },
  { q: "كم تكلفة الشحن؟", a: "الشحن مجاني لجميع أنحاء سوريا. لا توجد أي رسوم إضافية." },
  { q: "هل يمكنني الاسترجاع؟", a: "نعم، يمكنك استرجاع المنتج خلال 7 أيام من الاستلام إذا لم تكن راضية عنه." },
  { q: "كيف أستخدم الزيت؟", a: "ضع كمية صغيرة على فروة الرأس ودلكها بلطف لمدة 3-5 دقائق. اتركه طوال الليل ثم اغسله في الصباح بالشامبو." },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="mt-3 text-2xl font-bold text-white sm:text-3xl"
            style={{ fontFamily: "var(--font-tajawal)" }}
          >
            عندك سؤال؟ عندنا جواب
          </h2>
        </div>

        <div className="mt-14 space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/[0.06]">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-6 text-right text-sm font-semibold text-white transition-colors hover:text-[var(--color-primary)] sm:text-base"
              >
                <span>{faq.q}</span>
                <svg
                  className={`h-4 w-4 shrink-0 text-[var(--color-primary)] transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="pb-6 text-sm leading-relaxed text-white/35">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
