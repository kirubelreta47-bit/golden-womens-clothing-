/**
 * ============================================================================
 * Golden Women's Clothing Store - WhatsApp & Branch Configuration
 * ============================================================================
 * 
 * Central configuration file for WhatsApp-based ordering and store operations.
 * 
 * TO CHANGE THE BUSINESS WHATSAPP NUMBER:
 * 1. Update `WHATSAPP_PHONE_NUMBER` below with your active business WhatsApp number.
 * 2. Use international format WITHOUT the plus sign (+) or spaces (e.g. '251911234567').
 * 3. Update `WHATSAPP_PHONE_DISPLAY` for customer-facing display text.
 */

// CLEARLY MARKED PLACEHOLDER: Update this with your actual business WhatsApp phone number
export const WHATSAPP_PHONE_NUMBER = '251900000000';

// Customer-facing formatted phone display
export const WHATSAPP_PHONE_DISPLAY = '+251 900 000 000';

// Business Details
export const STORE_NAME = "Golden Women's Clothing";

// Physical Branches
export const STORE_BRANCHES = [
  {
    id: 'branch-1',
    name: 'Addis Ababa – Branch 1',
    city: 'Addis Ababa',
    address: 'Bole Medhanialem, Edna Mall Area',
    phone: '+251 91 123 4567',
  },
  {
    id: 'branch-2',
    name: 'Addis Ababa – Branch 2',
    city: 'Addis Ababa',
    address: 'Kazanchis, ECA Commercial Center',
    phone: '+251 91 234 5678',
  },
  {
    id: 'branch-3',
    name: 'Mekelle – Branch 3',
    city: 'Mekelle',
    address: 'Kedamay Weyane, Central Avenue',
    phone: '+251 94 456 7890',
  },
] as const;

export type BranchName = (typeof STORE_BRANCHES)[number]['name'];

// Order Fulfilment Types
export const ORDER_TYPES = [
  {
    id: 'pickup',
    label: 'Store Pickup',
    description: 'Pick up your order in person from your selected branch',
  },
  {
    id: 'delivery',
    label: 'Delivery',
    description: 'Direct courier delivery to your residential or office address',
  },
] as const;

export type OrderType = 'Store Pickup' | 'Delivery';

/**
 * Builds the WhatsApp click-to-chat URL with properly encoded message
 */
export function createWhatsAppChatUrl(message: string, phoneNumber: string = WHATSAPP_PHONE_NUMBER): string {
  // Strip any accidental non-digits just in case
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

