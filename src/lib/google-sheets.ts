// تكامل Google Sheets باستخدام Google Apps Script
// لا حاجة لتثبيت أي حزم - فقط استدعاء الـ Web App URL

export type GoogleSheetsOrderPayload = {
  invoiceId: string;
  customer: {
    name: string;
    phone: string;
    city: string;
    address: string;
    paymentMethod?: string;
    notes?: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  summary: {
    totalItems: number;
    subtotal: number;
    deliveryFee: number;
    total: number;
  };
  /** مدينة التوصيل وتكلفة الشحن (0 عند الشحن المجاني) */
  shipping?: { city: string; costSyp: number };
  channel?: string;
};

export async function addOrderToGoogleSheets(
  orderData: GoogleSheetsOrderPayload,
) {
  try {
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    
    if (!scriptUrl) {
      console.log('Google Apps Script URL not configured');
      return { success: false, error: 'Missing script URL' };
    }

    const shippingNote = orderData.shipping
      ? `[التوصيل] ${orderData.shipping.city}`
      : "";
    const combinedNotes = [orderData.customer.notes?.trim(), shippingNote]
      .filter(Boolean)
      .join("\n");

    const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        action: 'addOrder',
        ...(secret ? { secret } : {}),
        data: {
          invoiceId: orderData.invoiceId,
          date: new Date().toLocaleDateString('ar-IQ'),
          customerName: orderData.customer.name,
          phone: orderData.customer.phone,
          city: orderData.customer.city,
          address: orderData.customer.address,
          paymentMethod: orderData.customer.paymentMethod || 'الدفع عند الاستلام',
          itemsCount: orderData.summary.totalItems,
          subtotal: orderData.summary.subtotal,
          deliveryFee: orderData.summary.deliveryFee,
          total: orderData.summary.total,
          selectedCity: orderData.shipping?.city ?? orderData.customer.city,
          shippingCostSyp: orderData.shipping?.costSyp ?? orderData.summary.deliveryFee,
          notes: combinedNotes,
          channel: orderData.channel || 'web',
          items: orderData.items
            .map(
              (item) =>
                `${item.name} (${item.quantity} × ${item.price} = ${item.subtotal})`,
            )
            .join("\n"),
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, result };
  } catch (error) {
    console.error('Error adding order to Google Sheets:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
