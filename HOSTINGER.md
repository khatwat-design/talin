# النشر على Hostinger (Talin Beauty / Next.js)

## لماذا ظهر الخطأ `Couldn't find any pages or app directory`؟

هناك **ملفّان zip مختلفان**:

| الملف | المحتوى | ماذا تفعل على السيرفر |
|--------|---------|------------------------|
| **`talin-hostinger.zip`** | نتيجة **standalone** (مجلد `deploy` بعد `npm run build` محلياً) | **لا تشغّل `npm run build`.** شغّل فقط: `node server.js` |
| **`talin-hostinger-source.zip`** | كود المشروع كاملاً (`src/app`، `package.json`، إلخ) | `npm install` ثم `npm run build` ثم `npm start` |

إذا رفعت **`talin-hostinger.zip`** وفتحت Hostinger على **Build Command = `npm run build`**، سيفشل البناء لأن مجلد **`src/app` غير موجود** داخل تلك الحزمة (وهذا طبيعي لأنها مبنية مسبقاً).

---

## الطريقة 1: الحزمة الجاهزة (`talin-hostinger.zip`) — بدون بناء على السيرفر

1. على جهازك: `npm run build` ثم `node scripts/deploy-hostinger.js` ثم أنشئ الـ zip من مجلد `deploy` (أو استخدم سير عملك الحالي).
2. ارفع المحتوى **داخل** الـ zip إلى مجلد التطبيق.
3. في لوحة Hostinger (Node.js):
   - **Build command:** اتركه **فارغاً** أو عطّل خطوة البناء إن أمكن.
   - **Start command:** `node server.js`
4. أضف متغيرات البيئة (مثل `TELEGRAM_BOT_TOKEN`، …) من `.env.example`.

---

## الطريقة 2: حزمة المصدر (`talin-hostinger-source.zip`) — بناء على السيرفر

1. على جهازك شغّل: `npm run zip:source` (يُنشئ `talin-hostinger-source.zip`).
2. ارفع الـ zip وافك الضغط في مجلد المشروع.
3. في Hostinger:
   - **Build command:** `npm run build`
   - **Start command:** `npm start` (يستدعي `node server.js` من `package.json`)
4. Node يفضّل **18.18+** أو **20 LTS**.

رسائل `npm` مثل *added N packages* و *1 moderate vulnerability* و *npm notice* طبيعية بعد `npm install`؛ لا تعني أن المشروع معطوب. يمكن لاحقاً تشغيل `npm audit` بدون `--force` إن رغبت.

---

## ملخص سريع

- **بناء على السيرفر** → استخدم **`talin-hostinger-source.zip`** + `npm run build`.
- **بدون بناء على السيرفر** → استخدم **`talin-hostinger.zip`** + **`node server.js` فقط**.
