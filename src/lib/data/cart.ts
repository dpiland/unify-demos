/**
 * Shopping Cart Data - Ridgeline Outfitters
 *
 * Cart interfaces and mock cart data for each user persona.
 * In a real application, this would be managed by state management or API.
 */

import type { Product } from './products';
import { PRODUCTS } from './products';

/**
 * Cart Item Interface
 */
export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: Date;
}

/**
 * Shopping Cart Interface
 */
export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

/**
 * Calculate cart totals
 *
 * @param items - Cart items to calculate totals for
 * @param freeShippingThreshold - Minimum order value for free shipping
 * @returns Cart with calculated totals
 */
export function calculateCart(items: CartItem[], freeShippingThreshold: number = 50): Cart {
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.08;
  const shipping = subtotal >= freeShippingThreshold ? 0 : 10;
  const total = subtotal + tax + shipping;

  return {
    items,
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    shipping: parseFloat(shipping.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
}

/**
 * Mock Cart Data for Each User Persona
 *
 * These carts represent different shopping scenarios:
 * - Riley Dayhiker: 3 items, moderate value trail gear
 * - Jordan Summit: 5 items, high value technical gear
 * - Sam Trailtest: 2 items, testing new features
 * - Alex Explorer: Empty cart (browsing)
 */

/**
 * Get mock cart for Riley Dayhiker (regular shopper)
 * - 3 items: fleece, tee, waist pack
 */
export function getRegularShopperCart(): CartItem[] {
  return [
    {
      product: PRODUCTS.find(p => p.id === 'fleece-003')!, // Synchilla Snap-T $129
      quantity: 1,
      addedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      product: PRODUCTS.find(p => p.id === 'base-003')!, // P-6 Logo Tee $39 (sale)
      quantity: 1,
      addedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
    {
      product: PRODUCTS.find(p => p.id === 'gear-003')!, // Black Hole Waist Pack $59
      quantity: 1,
      addedAt: new Date(Date.now() - 30 * 60 * 1000),
    },
  ];
}

/**
 * Get mock cart for Jordan Summit (VIP shopper)
 * - 5 items: premium technical gear
 */
export function getVIPShopperCart(): CartItem[] {
  return [
    {
      product: PRODUCTS.find(p => p.id === 'jacket-002')!, // Nano Puff $249
      quantity: 1,
      addedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
      product: PRODUCTS.find(p => p.id === 'jacket-005')!, // Tres 3-in-1 Parka $449
      quantity: 1,
      addedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      product: PRODUCTS.find(p => p.id === 'fleece-001')!, // Better Sweater $149
      quantity: 1,
      addedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
    {
      product: PRODUCTS.find(p => p.id === 'gear-001')!, // Black Hole Duffel $129 (sale)
      quantity: 1,
      addedAt: new Date(Date.now() - 45 * 60 * 1000),
    },
    {
      product: PRODUCTS.find(p => p.id === 'base-004')!, // Tropic Comfort Sun Hoody $79
      quantity: 1,
      addedAt: new Date(Date.now() - 20 * 60 * 1000),
    },
  ];
}

/**
 * Get mock cart for Sam Trailtest (beta tester)
 * - 2 items: new gear being field tested
 */
export function getBetaTesterCart(): CartItem[] {
  return [
    {
      product: PRODUCTS.find(p => p.id === 'fleece-004')!, // Retro Pile $169 (new)
      quantity: 1,
      addedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
    {
      product: PRODUCTS.find(p => p.id === 'gear-006')!, // Guidewater Hip Pack $49 (sale)
      quantity: 1,
      addedAt: new Date(Date.now() - 15 * 60 * 1000),
    },
  ];
}

/**
 * Get mock cart for Alex Explorer (new shopper)
 * - Empty cart (browsing phase)
 */
export function getNewShopperCart(): CartItem[] {
  return [];
}

/**
 * Get cart by user ID
 */
export function getCartByUserId(userId: string): CartItem[] {
  switch (userId) {
    case 'regular-shopper':
      return getRegularShopperCart();
    case 'vip-shopper':
      return getVIPShopperCart();
    case 'beta-tester':
      return getBetaTesterCart();
    case 'new-shopper':
      return getNewShopperCart();
    default:
      return [];
  }
}

/**
 * Add item to cart
 */
export function addToCart(cart: CartItem[], product: Product, quantity: number = 1): CartItem[] {
  const existingItem = cart.find(item => item.product.id === product.id);

  if (existingItem) {
    return cart.map(item =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  } else {
    return [
      ...cart,
      {
        product,
        quantity,
        addedAt: new Date(),
      },
    ];
  }
}

/**
 * Remove item from cart
 */
export function removeFromCart(cart: CartItem[], productId: string): CartItem[] {
  return cart.filter(item => item.product.id !== productId);
}

/**
 * Update item quantity in cart
 */
export function updateCartItemQuantity(
  cart: CartItem[],
  productId: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(cart, productId);
  }

  return cart.map(item =>
    item.product.id === productId ? { ...item, quantity } : item
  );
}

/**
 * Clear cart
 */
export function clearCart(): CartItem[] {
  return [];
}

/**
 * Get cart item count
 */
export function getCartItemCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
