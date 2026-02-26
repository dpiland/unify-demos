/**
 * Shopping Cart Data - EliteShop E-commerce
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
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  // Calculate tax (8% for demo purposes)
  const tax = subtotal * 0.08;

  // Calculate shipping ($10 if below threshold, free otherwise)
  const shipping = subtotal >= freeShippingThreshold ? 0 : 10;

  // Calculate total
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
 * - Regular shopper: 3 items, moderate value
 * - VIP shopper: 5 items, high value
 * - Beta tester: 2 items, testing features
 * - New shopper: Empty cart (browsing)
 */

/**
 * Get mock cart for regular shopper (Casey Standard)
 * - 3 items in cart
 * - Mix of categories
 * - Below free shipping threshold initially
 */
export function getRegularShopperCart(): CartItem[] {
  return [
    {
      product: PRODUCTS.find(p => p.id === 'elec-003')!, // Bluetooth Speaker $89.99
      quantity: 1,
      addedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      product: PRODUCTS.find(p => p.id === 'fash-004')!, // Cashmere Scarf $59.99 (sale)
      quantity: 1,
      addedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    },
    {
      product: PRODUCTS.find(p => p.id === 'sport-003')!, // Water Bottle $34.99
      quantity: 2,
      addedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    },
  ];
}

/**
 * Get mock cart for VIP shopper (Morgan Premium)
 * - 5 items in cart
 * - Higher value items
 * - Well above free shipping threshold
 */
export function getVIPShopperCart(): CartItem[] {
  return [
    {
      product: PRODUCTS.find(p => p.id === 'elec-002')!, // Smart Watch $399.99
      quantity: 1,
      addedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    },
    {
      product: PRODUCTS.find(p => p.id === 'fash-001')!, // Leather Jacket $199.99 (sale)
      quantity: 1,
      addedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      product: PRODUCTS.find(p => p.id === 'home-004')!, // Cookware Set $149.99 (sale)
      quantity: 1,
      addedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    },
    {
      product: PRODUCTS.find(p => p.id === 'fash-003')!, // Designer Sunglasses $199.99
      quantity: 1,
      addedAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    },
    {
      product: PRODUCTS.find(p => p.id === 'home-006')!, // Luxury Towel Set $89.99
      quantity: 2,
      addedAt: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
    },
  ];
}

/**
 * Get mock cart for beta tester (Taylor Beta)
 * - 2 items in cart
 * - Mix of new and sale items
 * - Testing different features
 */
export function getBetaTesterCart(): CartItem[] {
  return [
    {
      product: PRODUCTS.find(p => p.id === 'elec-006')!, // USB-C Hub $49.99 (new)
      quantity: 1,
      addedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    },
    {
      product: PRODUCTS.find(p => p.id === 'sport-005')!, // Resistance Bands $29.99 (new)
      quantity: 1,
      addedAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    },
  ];
}

/**
 * Get mock cart for new shopper (Alex New)
 * - Empty cart (browsing phase)
 */
export function getNewShopperCart(): CartItem[] {
  return [];
}

/**
 * Get cart by user ID
 *
 * @param userId - User ID to get cart for
 * @returns Cart items for the user
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
 *
 * @param cart - Current cart items
 * @param product - Product to add
 * @param quantity - Quantity to add (default: 1)
 * @returns Updated cart items
 */
export function addToCart(cart: CartItem[], product: Product, quantity: number = 1): CartItem[] {
  const existingItem = cart.find(item => item.product.id === product.id);

  if (existingItem) {
    // Update quantity if item already in cart
    return cart.map(item =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  } else {
    // Add new item to cart
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
 *
 * @param cart - Current cart items
 * @param productId - Product ID to remove
 * @returns Updated cart items
 */
export function removeFromCart(cart: CartItem[], productId: string): CartItem[] {
  return cart.filter(item => item.product.id !== productId);
}

/**
 * Update item quantity in cart
 *
 * @param cart - Current cart items
 * @param productId - Product ID to update
 * @param quantity - New quantity (removes item if 0)
 * @returns Updated cart items
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
 *
 * @returns Empty cart
 */
export function clearCart(): CartItem[] {
  return [];
}

/**
 * Get cart item count
 *
 * @param cart - Cart items
 * @returns Total number of items in cart
 */
export function getCartItemCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
