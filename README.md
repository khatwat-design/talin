# متجر طالين بيوتي (Talin Beauty)

نسخة متجر إلكتروني مبنية على قالب [kasko](https://github.com/khatwat-design/kasko) — بدون لوحة إدارة. تشغيل المتجر مع ربط تلجرام وGoogle Sheets (وGoogle Analytics اختيارياً).

## التشغيل

يتطلب المشروع **Node.js 18.18 أو أحدث** (مثلاً 18.20 أو 20 LTS).

```bash
npm install
npm run dev
```

يفتح الموقع على `http://localhost:3000`.

## الإعدادات (البيئة)

1. انسخ `.env.example` إلى `.env.local`.
2. عدّل المتغيرات:
   - **TELEGRAM_BOT_TOKEN** و **TELEGRAM_CHANNEL_ID**: لإرسال الطلبات إلى قناة/مجموعة تلجرام.
   - **GOOGLE_APPS_SCRIPT_URL**: رابط Web App من Google Apps Script لحفظ الطلبات في Google Sheet (انظر `scripts/google-apps-script-talin.gs`).
   - **GOOGLE_APPS_SCRIPT_SECRET**: (اختياري) إن فعّلت `WEBHOOK_SECRET` في Apps Script.
   - **NEXT_PUBLIC_GA_ID**: (اختياري) معرف Google Analytics.

## الشعار والمنتجات

- **الشعار**: عدّل `public/images/logo.svg` أو ضع `public/images/logo.png` وغيّر المسار في `header.tsx` و`footer.tsx`.
- **المنتجات**: عدّل `data/products.json` — أضف أو عدّل المنتجات (id, name, description, price, badge, category, image). يمكن وضع الصور في `public/products/` أو استخدام روابط خارجية (مثل Unsplash) مع إضافة النطاق في `next.config.ts` ضمن `images.remotePatterns`.

## البناء والنشر

```bash
npm run build
npm start
```

## ملاحظات

- لا توجد لوحة إدارة في هذا المشروع؛ إدارة المحتوى تتم عبر تعديل `data/products.json` وملفات المشروع.
- الطلبات تُرسل إلى تلجرام وتُسجّل في Google Sheets حسب الإعدادات أعلاه.
