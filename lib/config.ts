/**
 * Storefront-wide contact/checkout config, sourced from env so the same
 * build can point at different support channels per deployment. Set these
 * in your .env / hosting dashboard — see .env.example.
 */

/** WhatsApp number in international format, digits only (no +, spaces, or dashes). */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "";

/** Telegram username, without the leading @. */
export const TELEGRAM_USERNAME =
  process.env.NEXT_PUBLIC_TELEGRAM_USERNAME?.trim() || "";

export function buildWhatsAppLink(message: string): string | null {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildTelegramLink(message: string): string | null {
  if (!TELEGRAM_USERNAME) return null;
  return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;
}
