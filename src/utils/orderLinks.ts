import { CartItem, Product, ProductColor } from '../types/store';

// Default atelier store contacts
export const STORE_CONTACTS = {
  phoneDisplay: '+251 91 123 4567',
  whatsappNumber: '251911234567', // International format without leading '+'
  telegramHandle: 'GoldenWomensStore',
  instagramHandle: 'golden_womens_clothing_store',
  atelierLocation: 'Bole Medhanialem, Edna Mall Area, Addis Ababa',
  hours: 'Mon – Sat: 9:30 AM – 8:00 PM | Sun: 11:00 AM – 6:00 PM',
};

/**
 * Formats price in local Ethiopian Birr (ETB)
 */
export function formatPrice(amountETB: number): string {
  return `${amountETB.toLocaleString()} ETB`;
}

/**
 * Builds pre-formatted message for a single product direct checkout
 */
export function buildSingleProductMessage(
  product: Product,
  size: string,
  color: ProductColor,
  quantity: number = 1
): string {
  const priceStr = formatPrice(product.priceETB * quantity);
  
  return [
    `✨ *New Order from Golden Boutique Storefront* ✨`,
    ``,
    `• Item: ${product.name}`,
    `• Size: ${size}`,
    `• Color: ${color.name}`,
    `• Quantity: ${quantity}`,
    `• Price: ${priceStr}`,
    `• Item ID: #${product.id}`,
    ``,
    `Hello! I would like to confirm availability and arrange delivery/pickup for this piece.`,
  ].join('\n');
}

/**
 * Builds pre-formatted message for an entire cart / bag
 */
export function buildCartOrderMessage(
  cart: CartItem[],
  deliveryNote: string = ''
): string {
  if (cart.length === 0) return '';

  const totalETB = cart.reduce((sum, item) => sum + item.product.priceETB * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalFormatted = formatPrice(totalETB);

  const itemLines = cart.map((item, index) => {
    const itemPrice = formatPrice(item.product.priceETB * item.quantity);
    return `${index + 1}. ${item.product.name}\n   - Size: ${item.selectedSize} | Color: ${item.selectedColor.name}\n   - Qty: ${item.quantity} | Total: ${itemPrice} (ID: #${item.product.id})`;
  });

  const lines = [
    `✨ *Order Inquiry from Golden Boutique Storefront* ✨`,
    ``,
    `*Selected Atelier Pieces (${totalItems} items):*`,
    ...itemLines,
    ``,
    `*Summary:*`,
    `• Total Pieces: ${totalItems}`,
    `• Estimated Total: ${totalFormatted}`,
  ];

  if (deliveryNote.trim()) {
    lines.push(`• Delivery / Sizing Note: ${deliveryNote.trim()}`);
  }

  lines.push(
    ``,
    `Hello! I would like to place this order, confirm availability, and coordinate delivery/pickup with your atelier.`
  );

  return lines.join('\n');
}

/**
 * Generates WhatsApp click-to-chat URL
 */
export function getWhatsAppUrl(encodedText: string): string {
  return `https://wa.me/${STORE_CONTACTS.whatsappNumber}?text=${encodeURIComponent(encodedText)}`;
}

/**
 * Generates Telegram direct message URL
 */
export function getTelegramUrl(encodedText: string): string {
  return `https://t.me/${STORE_CONTACTS.telegramHandle}?text=${encodeURIComponent(encodedText)}`;
}
