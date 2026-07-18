/**
 * Talin Beauty — Google Apps Script: حفظ الطلبات في Google Sheet
 *
 * الإعداد:
 * 1. أنشئ جدول Google Sheet جديد.
 * 2. Extensions (تمديدات) → Apps Script
 * 3. الصق هذا الملف في Code.gs واحفظه.
 * 4. (اختياري) أمان: Project Settings → Script properties → أضف WEBHOOK_SECRET
 *    وضع نفس القيمة في .env على السيرفر: GOOGLE_APPS_SCRIPT_SECRET=...
 * 5. Deploy → New deployment → Type: Web app
 *    Execute as: Me  |  Who has access: Anyone (أو Anyone with Google account حسب الحاجة)
 * 6. انسخ Web app URL إلى GOOGLE_APPS_SCRIPT_URL في استضافة الموقع.
 */

function doPost(e) {
  try {
    const body = parsePostBody(e);
    if (!body) {
      return jsonResponse({ success: false, error: 'Empty or invalid body' });
    }

    if (!verifyWebhookSecret_(body)) {
      return jsonResponse({ success: false, error: 'Unauthorized' });
    }

    if (body.action !== 'addOrder') {
      return jsonResponse({ success: false, error: 'Invalid action' });
    }

    const data = body.data || {};
    const sheet = getOrdersSheet_();

    const row = [
      data.invoiceId || '',
      data.date || '',
      data.customerName || '',
      data.phone || '',
      data.city || '',
      data.address || '',
      data.paymentMethod || 'الدفع عند الاستلام',
      Number(data.itemsCount) || 0,
      Number(data.subtotal) || 0,
      Number(data.deliveryFee) || 0,
      Number(data.total) || 0,
      data.selectedCity || data.city || '',
      Number(data.shippingCostSyp) || Number(data.deliveryFee) || 0,
      data.notes || '',
      data.channel || 'web',
      data.items || '',
    ];

    sheet.appendRow(row);

    return jsonResponse({ success: true, message: 'تم حفظ الطلب' });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  }
}

function doGet() {
  return jsonResponse({
    ok: true,
    message: 'Talin Beauty Orders — استخدم POST مع action: addOrder',
  });
}

function parsePostBody(e) {
  if (!e || !e.postData || !e.postData.contents) return null;
  try {
    return JSON.parse(e.postData.contents);
  } catch (ignore) {
    return null;
  }
}

function verifyWebhookSecret_(body) {
  var expected = PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET');
  if (!expected) return true;
  return body.secret === expected;
}

function getOrdersSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('الطلبات');
  if (!sheet) sheet = ss.getSheetByName('Orders');
  if (!sheet) {
    sheet = ss.getSheets()[0];
    sheet.setName('الطلبات');
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'رقم الفاتورة',
      'التاريخ',
      'اسم العميل',
      'الهاتف',
      'المدينة',
      'العنوان / المنطقة',
      'طريقة الدفع',
      'عدد القطع',
      'المجموع الفرعي',
      'رسوم الشحن',
      'الإجمالي',
      'مدينة الشحن',
      'تكلفة الشحن',
      'ملاحظات',
      'القناة',
      'تفاصيل المنتجات',
    ]);
    sheet.getRange(1, 1, 1, 16).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function jsonResponse(obj) {
  var out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}
