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
