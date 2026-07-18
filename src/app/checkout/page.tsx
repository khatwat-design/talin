"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/products";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/cart-context";
import { trackInitiateCheckout, trackAddPaymentInfo } from "@/lib/pixels";
import { SYRIA_SHIPPING_OPTIONS, getShippingFeeForCity } from "@/lib/shipping-syria";

type CheckoutStatus = "idle" | "loading" | "success" | "error";

const validateSyrianPhone = (phone: string): boolean => {
  const p = phone.replace(/\s/g, "");
  return /^09\d{8}$/.test(p);
};

const formatSyrianPhoneNumber = (phone: string): string => {
  let p = phone.replace(/\s/g, "");
  if (p.startsWith("+963")) p = `0${p.slice(4)}`;
  else if (p.startsWith("00963")) p = `0${p.slice(5)}`;
  else if (p.startsWith("963") && p.length >= 10) p = `0${p.slice(3)}`;
  if (/^9\d{8}$/.test(p)) p = `0${p}`;
  return p;
};

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const router = useRouter();
  const [status, setStatus] = useState<CheckoutStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.ok ? res.json() : { products: [] })
      .then((data: { products?: Product[] }) => setProducts(data.products ?? []))
      .catch(() => setProducts([]));
  }, []);

  const cartItems = useMemo(
    () => products.filter((product) => items[product.id]).map((product) => ({
      ...product, quantity: items[product.id], subtotal: items[product.id] * product.price,
    })),
    [items, products],
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const deliveryFee = useMemo(() => (selectedCity ? getShippingFeeForCity(selectedCity) ?? 0 : 0), [selectedCity]);
  const total = subtotal + deliveryFee;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const firedCheckoutEvent = useRef(false);
  const firedPaymentInfoEvent = useRef(false);

  useEffect(() => {
    if (!cartItems.length || firedCheckoutEvent.current) return;
    trackInitiateCheckout({ items: cartItems.map((item) => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })), total });
    firedCheckoutEvent.current = true;
  }, [cartItems, total]);

  useEffect(() => {
    if (!cartItems.length || firedPaymentInfoEvent.current) return;
    trackAddPaymentInfo({ items: cartItems.map((item) => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })), total });
    firedPaymentInfoEvent.current = true;
  }, [cartItems, total]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    setPhoneError("");
    if (phone.length > 0) {
      const formatted = formatSyrianPhoneNumber(phone);
      e.target.value = formatted;
      if (formatted.length > 0 && !validateSyrianPhone(formatted)) {
        setPhoneError("رقم الهاتف يجب أن يكون بنمط الأرقام السورية: يبدأ بـ 09 و10 أرقام");
      }
    }
  };

  const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cartItems.length) { setStatus("error"); setStatusMessage("السلة فارغة."); return; }
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const phone = formatSyrianPhoneNumber(String(form.get("phone") || ""));
    if (!validateSyrianPhone(phone)) { setPhoneError("رقم الهاتف غير صحيح. استخدم: 09xxxxxxxx"); return; }
    const shippingCost = getShippingFeeForCity(selectedCity);
    if (!selectedCity || shippingCost === null) { setStatus("error"); setStatusMessage("يرجى اختيار المحافظة."); return; }

    setStatus("loading"); setStatusMessage("جارٍ إرسال الطلب...");
    const orderPayload = {
      customer: { name: String(form.get("name") || ""), phone, city: selectedCity, address: String(form.get("address") || ""), notes: String(form.get("notes") || ""), paymentMethod: "cod" },
      items: cartItems.map((item) => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity, subtotal: item.subtotal })),
      summary: { subtotal, deliveryFee: shippingCost, total: subtotal + shippingCost, totalItems },
      shipping: { city: selectedCity, costSyp: shippingCost },
      channel: "talin-web",
    };

    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(orderPayload) });
      let result: { message?: string; invoiceId?: string } | null = null;
      try { result = (await response.json()) as { message?: string; invoiceId?: string }; } catch { result = null; }
      if (!response.ok) { setStatus("error"); setStatusMessage(result?.message || "تعذر إرسال الطلب."); return; }
      setStatus("success"); setStatusMessage(result?.message || "تم استلام طلبك.");
      if (typeof window !== "undefined") {
        window.localStorage.setItem("talin-last-order", JSON.stringify({ total, items: cartItems.map((item) => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })) }));
      }
      clear(); setSelectedCity(""); formElement.reset();
      router.push(`/checkout/success${result?.invoiceId ? `?invoice=${result.invoiceId}` : ""}`);
    } catch { setStatus("error"); setStatusMessage("حدث خطأ، حاول مجدداً."); }
  };

  const inputClass = "w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-muted-dim)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--focus-ring)]";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
      <form onSubmit={handleCheckout} className="rounded-3xl border border-[var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--color-foreground)]" style={{ fontFamily: "var(--font-tajawal)" }}>إتمام الطلب</h1>
          <Link href="/cart" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)]">العودة للسلة</Link>
        </div>
        <p className="mt-2 text-sm text-[var(--color-muted)]">أدخل معلوماتك ليتم تجهيز الطلب والتواصل معك للتأكيد.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-medium text-[var(--color-foreground)]">الاسم الكامل *</label>
            <input name="name" required className={inputClass} placeholder="مثال: أحمد خالد" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-[var(--color-foreground)]">رقم الهاتف *</label>
            <p className="text-[11px] leading-4 text-[var(--color-muted-dim)]">09xxxxxxxx — 10 أرقام</p>
            <input name="phone" required className={`${inputClass} ${phoneError ? "border-red-500 focus:border-red-500" : ""}`} placeholder="09xxxxxxxx" inputMode="tel" autoComplete="tel" onChange={handlePhoneChange} />
            {phoneError && <p className="mt-1 text-xs text-red-500">{phoneError}</p>}
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-medium text-[var(--color-foreground)]">المحافظة / المدينة *</label>
            <select name="city" required value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className={`${inputClass} appearance-none`}>
              <option value="" disabled>اختر المدينة</option>
              {SYRIA_SHIPPING_OPTIONS.map(({ city }) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-[var(--color-foreground)]">طريقة الدفع</label>
            <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] px-4 py-3 text-sm text-[var(--color-muted)]">الدفع عند الاستلام</div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-medium text-[var(--color-foreground)]">المنطقة *</label>
            <input name="address" required className={inputClass} placeholder="الحي، الشارع، أو اسم المنطقة" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-medium text-[var(--color-foreground)]">ملاحظات إضافية (اختياري)</label>
            <textarea name="notes" rows={3} className={inputClass} placeholder="اترك ملاحظات التوصيل إن وجدت" />
          </div>
        </div>
        <button type="submit" className="mt-6 w-full rounded-2xl bg-[var(--color-primary)] px-6 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-gold)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40" disabled={status === "loading"}>
          {status === "loading" ? "جارٍ الإرسال..." : "إرسال الطلب"}
        </button>
        {status !== "idle" ? (
          <div className={`mt-4 rounded-2xl px-4 py-3 text-xs ${status === "success" ? "border border-emerald-300 bg-emerald-50 text-emerald-700" : status === "error" ? "border border-red-300 bg-red-50 text-red-700" : "border border-[var(--color-border)] bg-[var(--color-surface-warm)] text-[var(--color-muted)]"}`}>
            {statusMessage}
          </div>
        ) : null}
      </form>

      <aside className="space-y-6">
        <div className="rounded-3xl border border-[var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
          <h2 className="text-xl font-bold text-[var(--color-foreground)]" style={{ fontFamily: "var(--font-tajawal)" }}>ملخص السلة</h2>
          <div className="mt-6 space-y-4">
            {cartItems.length ? cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-warm)]">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">{item.name}</p>
                    <p className="text-xs text-[var(--color-muted)]">{item.quantity} × {formatCurrency(item.price)}</p>
                  </div>
                </div>
                <p className="font-semibold text-[var(--color-primary)]">{formatCurrency(item.subtotal)}</p>
              </div>
            )) : <p className="text-sm text-[var(--color-muted)]">لم تتم إضافة منتجات بعد.</p>}
          </div>
          <div className="mt-6 space-y-2 border-t border-[var(--color-border)] pt-4 text-sm text-[var(--color-muted)]">
            <div className="flex items-center justify-between"><span>المجموع الفرعي</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex items-center justify-between"><span>رسوم التوصيل</span><span>{deliveryFee > 0 ? formatCurrency(deliveryFee) : "مجاني"}</span></div>
            <div className="flex items-center justify-between text-base font-bold text-[var(--color-foreground)]">
              <span>الإجمالي</span>
              <span className="text-[var(--color-primary)]">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-[var(--color-primary)]/25 bg-[var(--color-gold-soft)] p-6">
          <h3 className="text-lg font-semibold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-tajawal)" }}>ملاحظة التوصيل</h3>
          <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">نوصّل لمعظم المحافظات السورية — مدة التوصيل تُحدَّد عند تأكيد الطلب عبر الهاتف.</p>
        </div>
      </aside>
    </div>
  );
}
