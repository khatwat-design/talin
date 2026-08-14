/**
 * طبقة أحداث التتبع — توحيد Meta Pixel + TikTok Pixel
 */

import {
  trackAddToCart as metaAddToCart,
  trackViewContent as metaViewContent,
  trackInitiateCheckout as metaInitiateCheckout,
  trackAddPaymentInfo as metaAddPaymentInfo,
  trackPurchase as metaPurchase,
  trackViewCart as metaViewCart,
} from "./meta-pixel";

import {
  trackAddToCart as tiktokAddToCart,
  trackViewContent as tiktokViewContent,
  trackInitiateCheckout as tiktokInitiateCheckout,
  trackAddPaymentInfo as tiktokAddPaymentInfo,
  trackPurchase as tiktokPurchase,
  trackViewCart as tiktokViewCart,
} from "./tiktok-pixel";

export type PixelItem = {
  id: string;
  name?: string;
  price?: number;
  quantity?: number;
  category?: string;
};

export type PixelPayload = {
  items: PixelItem[];
  total?: number;
  orderId?: string;
};

export const trackAddToCart = (item: PixelItem) => {
  metaAddToCart(item);
  tiktokAddToCart(item);
};

export const trackViewContent = (item: PixelItem) => {
  metaViewContent(item);
  tiktokViewContent(item);
};

export const trackInitiateCheckout = (payload: PixelPayload) => {
  metaInitiateCheckout(payload);
  tiktokInitiateCheckout(payload);
};

export const trackAddPaymentInfo = (payload: PixelPayload) => {
  metaAddPaymentInfo(payload);
  tiktokAddPaymentInfo(payload);
};

export const trackPurchase = (payload: PixelPayload) => {
  metaPurchase(payload);
  tiktokPurchase(payload);
};

export const trackViewCart = (payload: PixelPayload) => {
  metaViewCart(payload);
  tiktokViewCart(payload);
};

export const trackWhatsAppClick = () => {
  const fbq = typeof window !== "undefined" ? (window as { fbq?: (...args: unknown[]) => void }).fbq : null;
  if (typeof fbq === "function") {
    fbq("trackCustom", "WhatsAppClick");
  }
};
