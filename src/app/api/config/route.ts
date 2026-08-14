import { NextResponse } from "next/server";

/**
 * Public config for the client (e.g. Meta Pixel ID).
 * Reads env at request time so Hostinger/runtime env vars work without rebuild.
 */
const DEFAULT_META_PIXEL_ID = "771518579044462";
const DEFAULT_TIKTOK_PIXEL_ID = "";

export function GET() {
  const metaPixelId =
    process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || DEFAULT_META_PIXEL_ID;
  const tiktokPixelId =
    process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID?.trim() || DEFAULT_TIKTOK_PIXEL_ID;
  return NextResponse.json({ metaPixelId, tiktokPixelId });
}
