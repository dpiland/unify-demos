/**
 * Product Data - EliteShop E-commerce
 *
 * Sample product catalog with realistic product data for demonstrations.
 * 24 products across 4 categories: Electronics, Fashion, Home & Garden, Sports & Outdoors
 */

/**
 * Product Interface
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number; // Optional sale price
  currency: string;
  category: string;
  image: string; // URL or placeholder
  rating: number; // 0-5
  reviewCount: number;
  inStock: boolean;
  badge?: 'new' | 'sale' | 'bestseller' | 'limited';
  tags: string[];
}

/**
 * Sample Product Catalog (24 products)
 *
 * Using Unsplash images for realistic product photography
 * In a real application, these would be actual product photos from inventory
 */
export const PRODUCTS: Product[] = [
  // ============================================
  // ELECTRONICS (6 products)
  // ============================================
  {
    id: 'elec-001',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
    price: 299.99,
    salePrice: 249.99,
    currency: 'USD',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 2847,
    inStock: true,
    badge: 'sale',
    tags: ['audio', 'wireless', 'noise-cancelling'],
  },
  {
    id: 'elec-002',
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking with heart rate monitor, GPS, and waterproof design.',
    price: 399.99,
    currency: 'USD',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 1523,
    inStock: true,
    badge: 'bestseller',
    tags: ['wearable', 'fitness', 'smart'],
  },
  {
    id: 'elec-003',
    name: 'Portable Bluetooth Speaker',
    description: '360-degree sound with deep bass, 20-hour battery, and IPX7 waterproof rating.',
    price: 89.99,
    currency: 'USD',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    tags: ['audio', 'bluetooth', 'portable'],
  },
  {
    id: 'elec-004',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging for all Qi-enabled devices with sleek aluminum design.',
    price: 39.99,
    salePrice: 29.99,
    currency: 'USD',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1591290619762-c588fc821f44?w=400&h=400&fit=crop',
    rating: 4.3,
    reviewCount: 567,
    inStock: true,
    badge: 'sale',
    tags: ['charging', 'wireless', 'accessories'],
  },
  {
    id: 'elec-005',
    name: 'HD Webcam with Microphone',
    description: '1080p video calling camera with built-in noise-cancelling microphone.',
    price: 79.99,
    currency: 'USD',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop',
    rating: 4.4,
    reviewCount: 423,
    inStock: true,
    tags: ['camera', 'video', 'work-from-home'],
  },
  {
    id: 'elec-006',
    name: 'USB-C Hub Multiport Adapter',
    description: '7-in-1 adapter with HDMI, USB 3.0, SD card reader, and USB-C power delivery.',
    price: 49.99,
    currency: 'USD',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 734,
    inStock: true,
    badge: 'new',
    tags: ['adapter', 'usb-c', 'connectivity'],
  },

  // ============================================
  // FASHION (6 products)
  // ============================================
  {
    id: 'fash-001',
    name: 'Classic Leather Jacket',
    description: 'Genuine leather jacket with zip closure and multiple pockets. Timeless style.',
    price: 249.99,
    salePrice: 199.99,
    currency: 'USD',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 456,
    inStock: true,
    badge: 'sale',
    tags: ['outerwear', 'leather', 'classic'],
  },
  {
    id: 'fash-002',
    name: 'Premium Running Sneakers',
    description: 'Lightweight athletic shoes with responsive cushioning and breathable mesh upper.',
    price: 129.99,
    currency: 'USD',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 1289,
    inStock: true,
    badge: 'bestseller',
    tags: ['footwear', 'athletic', 'running'],
  },
  {
    id: 'fash-003',
    name: 'Designer Sunglasses',
    description: 'UV-protective polarized lenses with premium acetate frames.',
    price: 199.99,
    currency: 'USD',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 234,
    inStock: true,
    tags: ['accessories', 'eyewear', 'designer'],
  },
  {
    id: 'fash-004',
    name: 'Cashmere Blend Scarf',
    description: 'Soft and warm scarf made from premium cashmere blend. Perfect for any season.',
    price: 79.99,
    salePrice: 59.99,
    currency: 'USD',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 178,
    inStock: true,
    badge: 'sale',
    tags: ['accessories', 'cashmere', 'winter'],
  },
  {
    id: 'fash-005',
    name: 'Minimalist Leather Watch',
    description: 'Japanese quartz movement with genuine leather strap and sapphire crystal.',
    price: 159.99,
    currency: 'USD',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 512,
    inStock: true,
    tags: ['accessories', 'timepiece', 'minimalist'],
  },
  {
    id: 'fash-006',
    name: 'Classic Tote Bag',
    description: 'Spacious leather tote with interior pockets and magnetic closure.',
    price: 189.99,
    currency: 'USD',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 389,
    inStock: true,
    badge: 'new',
    tags: ['bag', 'leather', 'everyday'],
  },

  // ============================================
  // HOME & GARDEN (6 products)
  // ============================================
  {
    id: 'home-001',
    name: 'Modern Table Lamp',
    description: 'Contemporary LED lamp with touch controls and adjustable brightness.',
    price: 69.99,
    currency: 'USD',
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    rating: 4.4,
    reviewCount: 267,
    inStock: true,
    tags: ['lighting', 'modern', 'led'],
  },
  {
    id: 'home-002',
    name: 'Ceramic Dinnerware Set',
    description: '16-piece dinnerware set with plates, bowls, and mugs. Microwave safe.',
    price: 89.99,
    salePrice: 69.99,
    currency: 'USD',
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 445,
    inStock: true,
    badge: 'sale',
    tags: ['kitchen', 'dinnerware', 'ceramic'],
  },
  {
    id: 'home-003',
    name: 'Memory Foam Pillow Set',
    description: 'Two premium memory foam pillows with cooling gel and hypoallergenic covers.',
    price: 79.99,
    currency: 'USD',
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 892,
    inStock: true,
    badge: 'bestseller',
    tags: ['bedroom', 'pillows', 'comfort'],
  },
  {
    id: 'home-004',
    name: 'Stainless Steel Cookware Set',
    description: '10-piece professional-grade cookware with non-stick coating and glass lids.',
    price: 199.99,
    salePrice: 149.99,
    currency: 'USD',
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 678,
    inStock: true,
    badge: 'sale',
    tags: ['kitchen', 'cookware', 'stainless-steel'],
  },
  {
    id: 'home-005',
    name: 'Indoor Plant Collection',
    description: 'Set of 3 low-maintenance indoor plants with decorative ceramic pots.',
    price: 59.99,
    currency: 'USD',
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 234,
    inStock: true,
    badge: 'new',
    tags: ['plants', 'decor', 'indoor'],
  },
  {
    id: 'home-006',
    name: 'Luxury Bath Towel Set',
    description: '6-piece Turkish cotton towel set with superior absorbency and softness.',
    price: 89.99,
    currency: 'USD',
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1629140799232-c6258a88a028?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 356,
    inStock: true,
    tags: ['bathroom', 'towels', 'luxury'],
  },

  // ============================================
  // SPORTS & OUTDOORS (6 products)
  // ============================================
  {
    id: 'sport-001',
    name: 'Yoga Mat Premium',
    description: 'Extra-thick non-slip yoga mat with carrying strap. Eco-friendly TPE material.',
    price: 49.99,
    salePrice: 39.99,
    currency: 'USD',
    category: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 1234,
    inStock: true,
    badge: 'sale',
    tags: ['yoga', 'fitness', 'mat'],
  },
  {
    id: 'sport-002',
    name: 'Adjustable Dumbbells Set',
    description: 'Space-saving adjustable weights from 5-52.5 lbs with quick-change dial.',
    price: 299.99,
    currency: 'USD',
    category: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1638805982835-e2d2df1d976a?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 789,
    inStock: true,
    badge: 'bestseller',
    tags: ['strength', 'weights', 'home-gym'],
  },
  {
    id: 'sport-003',
    name: 'Insulated Water Bottle',
    description: '32oz stainless steel bottle keeps drinks cold for 24hrs, hot for 12hrs.',
    price: 34.99,
    currency: 'USD',
    category: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 2145,
    inStock: true,
    tags: ['hydration', 'insulated', 'eco-friendly'],
  },
  {
    id: 'sport-004',
    name: 'Camping Backpack 50L',
    description: 'Durable hiking backpack with rain cover, multiple compartments, and ventilated back.',
    price: 129.99,
    salePrice: 99.99,
    currency: 'USD',
    category: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1622260614927-d41e57c7a5e3?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 456,
    inStock: true,
    badge: 'sale',
    tags: ['camping', 'hiking', 'backpack'],
  },
  {
    id: 'sport-005',
    name: 'Resistance Bands Set',
    description: '5-band set with handles, door anchor, and carrying bag. Perfect for home workouts.',
    price: 29.99,
    currency: 'USD',
    category: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1598632640487-6ea4a4e8b919?w=400&h=400&fit=crop',
    rating: 4.4,
    reviewCount: 1678,
    inStock: true,
    badge: 'new',
    tags: ['fitness', 'resistance', 'portable'],
  },
  {
    id: 'sport-006',
    name: 'Portable Hammock',
    description: 'Lightweight nylon hammock with tree straps. Supports up to 500 lbs.',
    price: 49.99,
    currency: 'USD',
    category: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 534,
    inStock: true,
    tags: ['camping', 'relaxation', 'portable'],
  },
];

/**
 * Get all product categories
 */
export function getCategories(): string[] {
  const categories = new Set(PRODUCTS.map(p => p.category));
  return Array.from(categories).sort();
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(p => p.category === category);
}

/**
 * Get product by ID
 */
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

/**
 * Get products on sale
 */
export function getSaleProducts(): Product[] {
  return PRODUCTS.filter(p => p.salePrice !== undefined);
}

/**
 * Get products by badge
 */
export function getProductsByBadge(badge: 'new' | 'sale' | 'bestseller' | 'limited'): Product[] {
  return PRODUCTS.filter(p => p.badge === badge);
}

/**
 * Search products by name or description
 */
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return PRODUCTS.filter(
    p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
