/**
 * Product Data - Ridgeline Outfitters
 *
 * Outdoor gear catalog with 24 products across 4 categories:
 * Jackets & Outerwear, Fleece & Midlayers, Baselayers & Tops, Packs & Gear
 */

/**
 * Product Interface
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  currency: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: 'new' | 'sale' | 'bestseller' | 'limited';
  tags: string[];
}

/**
 * Outdoor Gear Catalog (24 products)
 */
export const PRODUCTS: Product[] = [
  // ============================================
  // JACKETS & OUTERWEAR (6 products)
  // ============================================
  {
    id: 'jacket-001',
    name: 'Torrentshell 3L Rain Jacket',
    description: 'Waterproof, windproof, and breathable 3-layer H2No shell for year-round storm protection.',
    price: 179,
    salePrice: 149,
    currency: 'USD',
    category: 'Jackets & Outerwear',
    image: 'https://images.unsplash.com/photo-1545594861-3bef43ff2fc8?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 2847,
    inStock: true,
    badge: 'sale',
    tags: ['rain-shell', 'waterproof', '3-layer', 'packable'],
  },
  {
    id: 'jacket-002',
    name: 'Nano Puff Insulated Jacket',
    description: 'Lightweight, windproof insulation with 60g PrimaLoft Gold. Packs into its own pocket.',
    price: 249,
    currency: 'USD',
    category: 'Jackets & Outerwear',
    image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 3521,
    inStock: true,
    badge: 'bestseller',
    tags: ['insulation', 'packable', 'primaloft', 'lightweight'],
  },
  {
    id: 'jacket-003',
    name: 'Down Sweater Hoody',
    description: 'Versatile 800-fill-power down hoody for cold belays and chilly trails.',
    price: 329,
    currency: 'USD',
    category: 'Jackets & Outerwear',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 1876,
    inStock: true,
    tags: ['down', '800-fill', 'hoody', 'warmth'],
  },
  {
    id: 'jacket-004',
    name: 'Houdini Windbreaker',
    description: 'Ultralight wind shell weighing just 3.7 oz. Stuffs into its own chest pocket.',
    price: 129,
    salePrice: 99,
    currency: 'USD',
    category: 'Jackets & Outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 1234,
    inStock: true,
    badge: 'sale',
    tags: ['windbreaker', 'ultralight', 'packable', 'running'],
  },
  {
    id: 'jacket-005',
    name: 'Tres 3-in-1 Parka',
    description: 'Versatile 3-in-1 system with waterproof shell and removable down liner.',
    price: 449,
    currency: 'USD',
    category: 'Jackets & Outerwear',
    image: 'https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 567,
    inStock: true,
    badge: 'new',
    tags: ['3-in-1', 'parka', 'waterproof', 'winter'],
  },
  {
    id: 'jacket-006',
    name: 'Storm Shift Alpine Jacket',
    description: 'High-performance alpine shell with GORE-TEX and helmet-compatible hood.',
    price: 549,
    currency: 'USD',
    category: 'Jackets & Outerwear',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 342,
    inStock: true,
    badge: 'limited',
    tags: ['alpine', 'gore-tex', 'ski', 'backcountry'],
  },

  // ============================================
  // FLEECE & MIDLAYERS (6 products)
  // ============================================
  {
    id: 'fleece-001',
    name: 'Better Sweater Fleece Jacket',
    description: 'Knit fleece jacket with sweater-knit face and fleece interior. Fair Trade Certified.',
    price: 149,
    currency: 'USD',
    category: 'Fleece & Midlayers',
    image: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 4123,
    inStock: true,
    badge: 'bestseller',
    tags: ['fleece', 'fair-trade', 'midlayer', 'everyday'],
  },
  {
    id: 'fleece-002',
    name: 'R1 Air Full-Zip Hoody',
    description: 'Ultralight fleece hoody with open-knit pattern for breathable warmth on aerobic pursuits.',
    price: 179,
    salePrice: 139,
    currency: 'USD',
    category: 'Fleece & Midlayers',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    badge: 'sale',
    tags: ['fleece', 'hoody', 'breathable', 'technical'],
  },
  {
    id: 'fleece-003',
    name: 'Synchilla Snap-T Pullover',
    description: 'Iconic fleece pullover with snap-T front. Made from 100% recycled polyester.',
    price: 129,
    currency: 'USD',
    category: 'Fleece & Midlayers',
    image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 2567,
    inStock: true,
    tags: ['fleece', 'recycled', 'snap-t', 'classic'],
  },
  {
    id: 'fleece-004',
    name: 'Retro Pile Fleece Jacket',
    description: 'Plush high-pile fleece jacket with vintage-inspired style and modern performance.',
    price: 169,
    currency: 'USD',
    category: 'Fleece & Midlayers',
    image: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 1345,
    inStock: true,
    badge: 'new',
    tags: ['fleece', 'retro', 'high-pile', 'casual'],
  },
  {
    id: 'fleece-005',
    name: 'Micro D Pullover',
    description: 'Lightweight recycled-polyester fleece pullover for everyday layering.',
    price: 89,
    currency: 'USD',
    category: 'Fleece & Midlayers',
    image: 'https://images.unsplash.com/photo-1614495039153-e9cd13240469?w=400&h=400&fit=crop',
    rating: 4.4,
    reviewCount: 678,
    inStock: true,
    tags: ['fleece', 'lightweight', 'recycled', 'layering'],
  },
  {
    id: 'fleece-006',
    name: 'Thermal Weight Zip-Neck',
    description: 'Grid-pattern fleece base layer with zip-neck for variable ventilation.',
    price: 119,
    salePrice: 89,
    currency: 'USD',
    category: 'Fleece & Midlayers',
    image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 456,
    inStock: true,
    badge: 'sale',
    tags: ['baselayer', 'thermal', 'zip-neck', 'grid-fleece'],
  },

  // ============================================
  // BASELAYERS & TOPS (6 products)
  // ============================================
  {
    id: 'base-001',
    name: 'Capilene Cool Daily Shirt',
    description: 'Moisture-wicking daily shirt with HeiQ Fresh odor control and UPF 50+ sun protection.',
    price: 49,
    currency: 'USD',
    category: 'Baselayers & Tops',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 3456,
    inStock: true,
    badge: 'bestseller',
    tags: ['capilene', 'moisture-wicking', 'upf-50', 'daily'],
  },
  {
    id: 'base-002',
    name: 'Capilene Midweight Crew',
    description: 'Versatile midweight base layer with Polygiene odor control for multi-day adventures.',
    price: 69,
    currency: 'USD',
    category: 'Baselayers & Tops',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 1234,
    inStock: true,
    tags: ['capilene', 'midweight', 'baselayer', 'crew'],
  },
  {
    id: 'base-003',
    name: 'Long-Sleeved P-6 Logo Tee',
    description: 'Organic cotton long-sleeve tee with classic mountain logo. Fair Trade Certified.',
    price: 55,
    salePrice: 39,
    currency: 'USD',
    category: 'Baselayers & Tops',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 2134,
    inStock: true,
    badge: 'sale',
    tags: ['organic-cotton', 'logo-tee', 'fair-trade', 'casual'],
  },
  {
    id: 'base-004',
    name: 'Tropic Comfort Sun Hoody',
    description: 'Lightweight sun hoody with UPF 50 protection for hot-weather fishing and paddling.',
    price: 79,
    currency: 'USD',
    category: 'Baselayers & Tops',
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 789,
    inStock: true,
    badge: 'new',
    tags: ['sun-protection', 'upf-50', 'hoody', 'fishing'],
  },
  {
    id: 'base-005',
    name: 'Capilene Thermal Crew',
    description: 'Warm hollow-core base layer for cold-weather pursuits. Polygiene odor control.',
    price: 89,
    currency: 'USD',
    category: 'Baselayers & Tops',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 567,
    inStock: true,
    tags: ['capilene', 'thermal', 'baselayer', 'cold-weather'],
  },
  {
    id: 'base-006',
    name: 'Regenerative Organic Cotton Tee',
    description: 'Made with Regenerative Organic Certified cotton that builds soil health.',
    price: 45,
    currency: 'USD',
    category: 'Baselayers & Tops',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    rating: 4.4,
    reviewCount: 345,
    inStock: true,
    tags: ['organic', 'regenerative', 'cotton', 'sustainable'],
  },

  // ============================================
  // PACKS & GEAR (6 products)
  // ============================================
  {
    id: 'gear-001',
    name: 'Black Hole Duffel 55L',
    description: 'Burly, weather-resistant duffel with recycled body fabric and padded shoulder straps.',
    price: 169,
    salePrice: 129,
    currency: 'USD',
    category: 'Packs & Gear',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 2345,
    inStock: true,
    badge: 'sale',
    tags: ['duffel', 'travel', 'recycled', 'weather-resistant'],
  },
  {
    id: 'gear-002',
    name: 'Refugio Daypack 26L',
    description: 'Versatile everyday daypack with laptop sleeve and recycled materials.',
    price: 99,
    currency: 'USD',
    category: 'Packs & Gear',
    image: 'https://images.unsplash.com/photo-1581985673473-0784a7a44e39?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 1567,
    inStock: true,
    badge: 'bestseller',
    tags: ['daypack', 'laptop', 'recycled', 'everyday'],
  },
  {
    id: 'gear-003',
    name: 'Black Hole Waist Pack',
    description: 'Compact, weather-resistant hip pack for essentials on the trail or in town.',
    price: 59,
    currency: 'USD',
    category: 'Packs & Gear',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 892,
    inStock: true,
    tags: ['waist-pack', 'hip-pack', 'compact', 'weather-resistant'],
  },
  {
    id: 'gear-004',
    name: 'Altvia Pack 28L',
    description: 'Technical hiking pack with aluminum frame and breathable back panel.',
    price: 179,
    currency: 'USD',
    category: 'Packs & Gear',
    image: 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 456,
    inStock: true,
    badge: 'new',
    tags: ['hiking', 'technical', 'frame-pack', 'breathable'],
  },
  {
    id: 'gear-005',
    name: 'Ultralight Black Hole Tote',
    description: 'Packable tote made from lightweight, weather-resistant recycled nylon.',
    price: 79,
    currency: 'USD',
    category: 'Packs & Gear',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
    rating: 4.4,
    reviewCount: 567,
    inStock: true,
    tags: ['tote', 'ultralight', 'packable', 'recycled'],
  },
  {
    id: 'gear-006',
    name: 'Guidewater Hip Pack',
    description: 'Waterproof hip pack for fly fishing with easy-access front pocket.',
    price: 69,
    salePrice: 49,
    currency: 'USD',
    category: 'Packs & Gear',
    image: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 234,
    inStock: true,
    badge: 'sale',
    tags: ['fishing', 'waterproof', 'hip-pack', 'fly-fishing'],
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
