import Image from "next/image";

export default function WhoIsItForSection() {
  const groups = [
    {
      image: "/products/who-hair-loss.jpg",
      title: "النساء اللواتي يعانين من تساقط الشعر",
      desc: "لأولئك اللواتي فقدن ثقتهن بسبب التساقط المفرط",
    },
    {
      image: "/products/who-heat-style.jpg",
      title: "المُصفّفات شعرهن يومياً بالحرارة",
      desc: "للمُصفّفات اللواتي يُستخدمن السيشوار والمكواة بشكل يومي",
    },
    {
      image: "/products/who-dry-hair.jpg",
      title: "صاحبات الشعر الجاف والمتقصف",
      desc: "لأولئك اللواتي يعانين من جفاف شديد وتقصف الأطراف",
    },
    {
      image: "/products/who-pregnant.jpg",
      title: "الحوامل والمرضعات",
      desc: "مكونات طبيعية آمنة تماماً أثناء الحمل والرضاعة",
    },
  ];

  return (
    <section className="bg-[var(--color-surface-warm)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          className="mt-3 text-center text-2xl font-bold text-[var(--color-foreground)] sm:text-3xl"
          style={{ fontFamily: "var(--font-tajawal)" }}
        >
          هذا الزيت لكِ إذا كنتِ...
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {groups.map((g) => (
            <div
              key={g.title}
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition-all duration-300 hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-gold)]"
            >
              <div className="relative h-48 overflow-hidden sm:h-56">
                <Image
                  src={g.image}
                  alt={g.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="p-5 sm:p-6">
                <h3
                  className="text-base font-bold text-[var(--color-foreground)] sm:text-lg"
                  style={{ fontFamily: "var(--font-tajawal)" }}
                >
                  {g.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                  {g.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
