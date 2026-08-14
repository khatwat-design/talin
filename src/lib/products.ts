export type Bundle = {
  quantity: number;
  price: number;
  label: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  badge?: string;
  category: string;
  image: string;
  /** صور إضافية لصفحة المنتج (غير الصورة الرئيسية) */
  gallery?: string[];
  isVisible?: boolean;
  bundles?: Bundle[];
};

const storeLocale =
  process.env.NEXT_PUBLIC_STORE_LOCALE?.trim() || "ar-SY";
const storeCurrency =
  process.env.NEXT_PUBLIC_STORE_CURRENCY?.trim() || "USD";

/** افتراضياً إظهار السعر؛ عيّن NEXT_PUBLIC_SHOW_PRODUCT_PRICES=false لإخفائه (???). */
const showFormattedPrices =
  process.env.NEXT_PUBLIC_SHOW_PRODUCT_PRICES !== "false";

/**
 * عرض السعر في الواجهة. عيّن NEXT_PUBLIC_SHOW_PRODUCT_PRICES=false لإظهار "???" بدل السعر.
 * الأرقام في JSON ما زالت تُستخدم لحساب الإجمالي وإرسال الطلب.
 */
export const formatCurrency = (amount: number) => {
  if (!showFormattedPrices) {
    return "???";
  }
  const locale = storeCurrency === "USD" ? "en-US" : storeLocale;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: storeCurrency,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * حساب إجمالي سعر كمية معينة وفق الباقات (مثل: 2 قطع = $36، 3 قطع = $52)
 * بدل ضرب سعر القطعة الواحدة بالكمية.
 * يدعم الجمع بين الباقات إذا تجاوزت الكمية أكبر باقة (مثال: 4 = باقة 3 + قطعة).
 */
export const getBundleSubtotal = (product: Product, quantity: number): number => {
  const bundles = product.bundles ?? [];
  if (!bundles.length) {
    return product.price * quantity;
  }
  const exact = bundles.find((b) => b.quantity === quantity);
  if (exact) {
    return exact.price;
  }
  const sorted = [...bundles].sort((a, b) => b.quantity - a.quantity);
  let remaining = quantity;
  let total = 0;
  for (const b of sorted) {
    const times = Math.floor(remaining / b.quantity);
    total += times * b.price;
    remaining -= times * b.quantity;
  }
  return total + remaining * product.price;
};
