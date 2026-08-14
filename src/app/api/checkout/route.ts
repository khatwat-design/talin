import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { addOrderToGoogleSheets } from "@/lib/google-sheets";
import { getShippingFeeForCity } from "@/lib/shipping-syria";
import { getProductsFromJson } from "@/lib/products-data";
import { getBundleSubtotal } from "@/lib/products";

export const runtime = "nodejs";

type OrderPayload = {
  customer: {
    name: string;
    phone: string;
    city: string;
    address: string;
    notes?: string;
    paymentMethod?: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }>;
  summary: {
    subtotal: number;
    deliveryFee: number;
    total: number;
    totalItems: number;
  };
  /** يُعاد حسابه على الخادم من المدينة */
  shipping?: { city: string; costSyp: number };
  channel?: string;
};

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
const REQUIRED_FIELDS = [
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_CHANNEL_ID",
];

const storeCurrency = process.env.NEXT_PUBLIC_STORE_CURRENCY?.trim() || "USD";

const formatMoney = (amount: number) => {
  if (storeCurrency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return `${new Intl.NumberFormat("ar-SY", { maximumFractionDigits: 0 }).format(amount)} ل.س`;
};

const buildTelegramMessage = (payload: OrderPayload, invoiceId: string) => {
  const itemsText = payload.items
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} — ${item.quantity} × ${formatMoney(
          item.price,
        )} = ${formatMoney(item.subtotal)}`,
    )
    .join("\n");

  const message = [
    `🛍️ طلب جديد من متجر طالين بيوتي 💄`,
    `📋 رقم الفاتورة: ${invoiceId}`,
    `👤 اسم العميل: ${payload.customer.name}`,
    `📱 رقم الهاتف: ${payload.customer.phone}`,
    `📍 المحافظة / المدينة: ${payload.customer.city}`,
    `🏠 العنوان / المنطقة: ${payload.customer.address}`,
    `💳 طريقة الدفع: ${payload.customer.paymentMethod || "الدفع عند الاستلام"}`,
    `📝 ملاحظات: ${payload.customer.notes || "لا توجد ملاحظات"}`,
    "",
    "🛒 تفاصيل الطلب:",
    itemsText,
    "",
    `💰 المجموع الفرعي: ${formatMoney(payload.summary.subtotal)}`,
    `💵 الإجمالي النهائي: ${formatMoney(payload.summary.total)}`,
    `📦 عدد المنتجات: ${payload.summary.totalItems}`,
    "",
    `🔗 القناة: ${payload.channel || "الموقع الإلكتروني"}`,
    `📅 التاريخ: ${new Date().toLocaleDateString('ar-SY')} ${new Date().toLocaleTimeString('ar-SY')}`,
  ].join("\n");

  return message;
};

const sendTelegramMessage = async (payload: OrderPayload, invoiceId: string) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHANNEL_ID) {
    return { ok: false, reason: "missing_telegram_config" };
  }

  const message = buildTelegramMessage(payload, invoiceId);
  
  // استخدام FormData لحل مشكلة الترميز العربي
  const formData = new FormData();
  formData.append('chat_id', TELEGRAM_CHANNEL_ID);
  formData.append('text', message);
  
  const response = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Telegram] sendMessage failed:", response.status, errorText);
    return { ok: false, reason: errorText || "telegram_request_failed" };
  }

  return { ok: true };
};

export async function POST(request: Request) {
  try {
    const missing = REQUIRED_FIELDS.filter((field) => !process.env[field]);
    if (missing.length) {
      return NextResponse.json(
        {
          message: "إعدادات التكامل غير مكتملة.",
          missing,
        },
        { status: 500 },
      );
    }

    const payload = (await request.json()) as OrderPayload;

    if (!payload?.customer?.name || !payload?.items?.length) {
      return NextResponse.json(
        { message: "بيانات الطلب غير مكتملة." },
        { status: 400 },
      );
    }

    const shippingFee = getShippingFeeForCity(payload.customer.city);
    if (shippingFee === null) {
      return NextResponse.json(
        { message: "يرجى اختيار مدينة صالحة من القائمة." },
        { status: 400 },
      );
    }

    const subtotal = getProductsFromJson().reduce((sum, product) => {
      const item = payload.items.find((i) => i.id === product.id);
      return item ? sum + getBundleSubtotal(product, item.quantity) : sum;
    }, 0);
    const deliveryFee = shippingFee;
    const total = subtotal + deliveryFee;

    const normalizedPayload: OrderPayload = {
      ...payload,
      summary: {
        ...payload.summary,
        subtotal,
        deliveryFee,
        total,
      },
      shipping: {
        city: payload.customer.city,
        costSyp: deliveryFee,
      },
    };

    const invoiceId = randomUUID().slice(0, 8).toUpperCase();
    const telegramResult = await sendTelegramMessage(normalizedPayload, invoiceId);

    if (!telegramResult.ok) {
      const reason = typeof telegramResult.reason === "string" ? telegramResult.reason : "";
      console.error("[Checkout] Telegram error:", reason);
      const isForbidden = /chat not found|have no rights|not found|unauthorized|wrong token/i.test(reason);
      const hint = isForbidden
        ? "تأكد أن البوت مضاف للقناة كمسؤول (Admin) ولديه صلاحية نشر الرسائل."
        : "";
      return NextResponse.json(
        {
          message: hint
            ? `تعذر إرسال الطلب عبر تلجرام. ${hint}`
            : "تعذر إرسال الطلب عبر تلجرام حالياً.",
        },
        { status: 502 },
      );
    }

    // إضافة الطلب إلى Google Sheets
    try {
      await addOrderToGoogleSheets({
        ...normalizedPayload,
        invoiceId,
      });
    } catch (error) {
      console.error('Failed to add order to Google Sheets:', error);
    }

    return NextResponse.json({
      message: "تم استلام طلبك بنجاح.",
      invoiceId,
    });
  } catch {
    return NextResponse.json(
      { message: "تعذر معالجة الطلب حالياً." },
      { status: 500 },
    );
  }
}
