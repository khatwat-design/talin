/**
 * مدن التوصيل داخل سوريا — تالين بيوتي
 * أجور الشحن معطّلة (0): المدن تُستخدم للتحقق والعنوان فقط.
 */

export type SyriaShippingEntry = {
  city: string;
  feeSyp: number;
};

const RAW: SyriaShippingEntry[] = [
  { city: "القامشلي", feeSyp: 10_000 },
  { city: "المزة", feeSyp: 15_000 },
  { city: "البرامكة", feeSyp: 20_000 },
  { city: "عامودا", feeSyp: 20_000 },
  { city: "درباسية", feeSyp: 20_000 },
  { city: "الحسكة", feeSyp: 20_000 },
  { city: "القحطانية", feeSyp: 20_000 },
  { city: "تربسبية", feeSyp: 20_000 },
  { city: "رميل", feeSyp: 20_000 },
  { city: "معبدة", feeSyp: 20_000 },
  { city: "ديريك", feeSyp: 20_000 },
  { city: "المالكية", feeSyp: 20_000 },
  { city: "تل تمر", feeSyp: 20_000 },
  { city: "الحمرا", feeSyp: 25_000 },
  { city: "الشعلان", feeSyp: 25_000 },
  { city: "الروضة", feeSyp: 25_000 },
  { city: "الجسر الأبيض", feeSyp: 25_000 },
  { city: "الصالحية", feeSyp: 25_000 },
  { city: "عرنوس", feeSyp: 25_000 },
  { city: "الشهبندر", feeSyp: 25_000 },
  { city: "حاميش", feeSyp: 30_000 },
  { city: "سوق الحميدية", feeSyp: 30_000 },
  { city: "الحريقة", feeSyp: 30_000 },
  { city: "الشام القديمة", feeSyp: 30_000 },
  { city: "باب توما", feeSyp: 30_000 },
  { city: "باب شرقي", feeSyp: 30_000 },
  { city: "جديدة", feeSyp: 30_000 },
  { city: "مهاجرين", feeSyp: 30_000 },
  { city: "مالكي", feeSyp: 30_000 },
  { city: "شارع بغداد", feeSyp: 30_000 },
  { city: "ركن الدين", feeSyp: 30_000 },
  { city: "برزة", feeSyp: 30_000 },
  { city: "القصور", feeSyp: 30_000 },
  { city: "المجتهد", feeSyp: 30_000 },
  { city: "كفرسوسة", feeSyp: 30_000 },
  { city: "الميدان", feeSyp: 30_000 },
  { city: "حمص", feeSyp: 30_000 },
  { city: "النبك", feeSyp: 30_000 },
  { city: "جبلة", feeSyp: 30_000 },
  { city: "كوباني", feeSyp: 30_000 },
  { city: "قطيفة", feeSyp: 30_000 },
  { city: "المعضمية", feeSyp: 30_000 },
  { city: "القدموس", feeSyp: 30_000 },
  { city: "الرقة", feeSyp: 30_000 },
  { city: "القزاز", feeSyp: 35_000 },
  { city: "العباسيين", feeSyp: 35_000 },
  { city: "الزاهرة", feeSyp: 35_000 },
  { city: "دمر", feeSyp: 35_000 },
  { city: "مشروع دمر", feeSyp: 35_000 },
  { city: "ضاحية قدسيا", feeSyp: 35_000 },
  { city: "اللاذقية", feeSyp: 35_000 },
  { city: "طرطوس", feeSyp: 35_000 },
  { city: "حماة", feeSyp: 35_000 },
  { city: "درعا", feeSyp: 35_000 },
  { city: "السويداء", feeSyp: 35_000 },
  { city: "حلب", feeSyp: 35_000 },
  { city: "صحنايا", feeSyp: 35_000 },
  { city: "مصياف", feeSyp: 35_000 },
  { city: "زبلطاني", feeSyp: 35_000 },
  { city: "جديدة عرطوز", feeSyp: 50_000 },
  { city: "جوبر", feeSyp: 50_000 },
  { city: "داريا", feeSyp: 50_000 },
  { city: "جرمانا", feeSyp: 60_000 },
  { city: "دويلعة", feeSyp: 60_000 },
  { city: "التل", feeSyp: 60_000 },
  { city: "معربا", feeSyp: 60_000 },
  { city: "حرستا", feeSyp: 60_000 },
  { city: "دوما", feeSyp: 60_000 },
  { city: "ببيلا", feeSyp: 60_000 },
  { city: "السيدة زينب", feeSyp: 60_000 },
  { city: "الطبقة", feeSyp: 65_000 },
  { city: "يلدا", feeSyp: 70_000 },
  { city: "المليحة", feeSyp: 70_000 },
  { city: "الكسوة", feeSyp: 70_000 },
  { city: "الصبورة", feeSyp: 70_000 },
  { city: "السبينة", feeSyp: 70_000 },
  { city: "الهامة", feeSyp: 70_000 },
];

function sortArabicCities(a: SyriaShippingEntry, b: SyriaShippingEntry) {
  return a.city.localeCompare(b.city, "ar");
}

/** كل المدن مع أجور الشحن، مرتبة أبجديًا */
export const SYRIA_SHIPPING_OPTIONS: SyriaShippingEntry[] = [...RAW].sort(
  sortArabicCities,
);

const feeByCity = new Map(
  SYRIA_SHIPPING_OPTIONS.map((e) => [e.city, e.feeSyp] as const),
);

/** شحن مجاني: 0 للمدن المعروفة، أو null إن لم تكن المدينة في القائمة */
export function getShippingFeeForCity(city: string): number | null {
  const trimmed = city.trim();
  if (!trimmed) return null;
  return feeByCity.has(trimmed) ? 0 : null;
}
