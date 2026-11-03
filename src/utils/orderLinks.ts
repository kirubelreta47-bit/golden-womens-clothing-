import { CartItem, CustomerOrderInfo, Product, ProductColor } from '../types/store';
import { WHATSAPP_PHONE_NUMBER, WHATSAPP_PHONE_DISPLAY, createWhatsAppChatUrl } from '../config/whatsapp';

// Default atelier store contacts
export const STORE_CONTACTS = {
  phoneDisplay: WHATSAPP_PHONE_DISPLAY,
  whatsappNumber: WHATSAPP_PHONE_NUMBER,
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
 * Builds the official WhatsApp formatted message for an entire order.
 * Strictly adheres to the store order template.
 */
export function buildWhatsAppOrderMessage(
  cart: CartItem[],
  customerInfo: CustomerOrderInfo
): string {
  if (cart.length === 0) return '';

  const totalETB = cart.reduce((sum, item) => sum + item.product.priceETB * item.quantity, 0);

  const orderItemsFormatted = cart
    .map((item, idx) => {
      const itemTotal = formatPrice(item.product.priceETB * item.quantity);
      return [
        `${idx + 1}. ${item.product.name}`,
        `Size: ${item.selectedSize}`,
        `Color: ${item.selectedColor.name}`,
        `Quantity: ${item.quantity}`,
        `Price: ${itemTotal}`,
      ].join('\n');
    })
    .join('\n\n');

  const lines: string[] = [
    `Hello Golden Women's Clothing! I'd like to place an order.`,
    ``,
    `CUSTOMER DETAILS`,
    `Name: ${customerInfo.name.trim()}`,
    `Phone: ${customerInfo.phone.trim()}`,
    ``,
    `ORDER DETAILS`,
    ``,
    orderItemsFormatted,
    ``,
    `TOTAL: ${formatPrice(totalETB)}`,
    ``,
    `PREFERRED BRANCH:`,
    `${customerInfo.branch}`,
    ``,
    `ORDER TYPE:`,
    `${customerInfo.orderType}`,
  ];

  if (customerInfo.orderType === 'Delivery' && customerInfo.deliveryAddress.trim()) {
    lines.push(`Delivery Address: ${customerInfo.deliveryAddress.trim()}`);
  }

  if (customerInfo.additionalInstructions.trim()) {
    lines.push(`Additional Instructions: ${customerInfo.additionalInstructions.trim()}`);
  }

  lines.push(
    ``,
    `Please confirm product availability and help me complete my order.`
  );

  return lines.join('\n');
}

/**
 * Builds pre-formatted message for a single product direct inquiry
 */
export function buildSingleProductMessage(
  product: Product,
  size: string,
  color: ProductColor,
  quantity: number = 1
): string {
  const priceStr = formatPrice(product.priceETB * quantity);

  return [
    `Hello Golden Women's Clothing! I'd like to ask about this piece:`,
    ``,
    `• Product: ${product.name}`,
    `• Size: ${size}`,
    `• Color: ${color.name}`,
    `• Quantity: ${quantity}`,
    `• Price: ${priceStr}`,
    `• Item ID: #${product.id}`,
    ``,
    `Please confirm product availability and help me complete my order.`,
  ].join('\n');
}

/**
 * Builds pre-formatted message for an entire cart / bag (legacy helper retained for compatibility)
 */
export function buildCartOrderMessage(
  cart: CartItem[],
  deliveryNote: string = ''
): string {
  if (cart.length === 0) return '';

  const totalETB = cart.reduce((sum, item) => sum + item.product.priceETB * item.quantity, 0);

  const itemLines = cart.map((item, index) => {
    const itemPrice = formatPrice(item.product.priceETB * item.quantity);
    return `${index + 1}. ${item.product.name}\nSize: ${item.selectedSize}\nColor: ${item.selectedColor.name}\nQuantity: ${item.quantity}\nPrice: ${itemPrice}`;
  });

  const lines = [
    `Hello Golden Women's Clothing! I'd like to place an order.`,
    ``,
    `ORDER DETAILS`,
    ``,
    ...itemLines,
    ``,
    `TOTAL: ${formatPrice(totalETB)}`,
  ];

  if (deliveryNote.trim()) {
    lines.push(`Delivery Notes: ${deliveryNote.trim()}`);
  }

  lines.push(
    ``,
    `Please confirm product availability and help me complete my order.`
  );

  return lines.join('\n');
}

/**
 * Generates WhatsApp click-to-chat URL
 */
export function getWhatsAppUrl(encodedText: string): string {
  return createWhatsAppChatUrl(encodedText);
}

/**
 * Generates Telegram direct message URL
 */
export function getTelegramUrl(encodedText: string): string {
  return `https://t.me/${STORE_CONTACTS.telegramHandle}?text=${encodeURIComponent(encodedText)}`;
}
