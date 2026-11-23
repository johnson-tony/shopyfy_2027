export interface MockMode {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  status: boolean;
  sort_order: number;
}

export interface MockCategory {
  _id: string;
  mode_slug: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  sort_order: number;
  status: boolean;
  is_featured: boolean;
}

export interface MockProduct {
  _id: string;
  mode_slug: string;
  category_slug?: string;
  restaurant_slug?: string;
  restaurant_name?: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  sale_price?: number;
  stock: number;
  description: string;
  short_description?: string;
  image: string;
  gallery: string[];
  colors: string[];
  sizes: string[];
  addons: Array<{ name: string; price: number; is_required?: boolean }>;
  delivery_time: string;
  return_policy: string;
  rating: number;
  ratings_count: number;
  is_featured: boolean;
  status: boolean;
}

export interface MockRestaurant {
  _id: string;
  name: string;
  slug: string;
  image: string;
  banner_image: string;
  cuisine: string;
  rating: number;
  ratings_count: number;
  delivery_time: string;
  cost_for_two: number;
  address: string;
  city: string;
  is_pure_veg: boolean;
  is_featured: boolean;
  status: boolean;
}

export interface MockCoupon {
  _id: string;
  code: string;
  name: string;
  description: string;
  type: 'fixed' | 'percentage' | 'free_delivery';
  value: number;
  min_order_amount: number;
  max_discount_amount?: number;
  mode_slug?: string;
  status: boolean;
}

export const initialModes: MockMode[] = [
  {
    _id: 'mode_1',
    name: 'Shopy',
    slug: 'shopy',
    description: 'General shopping',
    icon: 'fa-solid fa-bag-shopping',
    status: true,
    sort_order: 1,
  },
  {
    _id: 'mode_2',
    name: 'Food',
    slug: 'food',
    description: 'Food ordering',
    icon: 'fa-solid fa-utensils',
    status: true,
    sort_order: 2,
  },
  {
    _id: 'mode_3',
    name: 'Minutes',
    slug: 'minutes',
    description: 'Grocery and quick commerce',
    icon: 'fa-solid fa-bolt',
    status: true,
    sort_order: 3,
  },
];

export const initialCategories: MockCategory[] = [
  {
    _id: 'cat_1',
    mode_slug: 'shopy',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trending apparel, clothing, footwear, and accessories.',
    icon: 'fa-solid fa-shirt',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
    sort_order: 1,
    status: true,
    is_featured: true,
  },
  {
    _id: 'cat_2',
    mode_slug: 'shopy',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Laptops, computers, audio, and home tech.',
    icon: 'fa-solid fa-laptop',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80',
    sort_order: 2,
    status: true,
    is_featured: true,
  },
  {
    _id: 'cat_3',
    mode_slug: 'shopy',
    name: 'Mobiles',
    slug: 'mobiles',
    description: 'Smartphones, cases, and charging gear.',
    icon: 'fa-solid fa-mobile-screen',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    sort_order: 3,
    status: true,
    is_featured: true,
  },
  {
    _id: 'cat_4',
    mode_slug: 'shopy',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Cookware, dining, appliances, and home decor.',
    icon: 'fa-solid fa-couch',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    sort_order: 4,
    status: true,
    is_featured: true,
  },
  {
    _id: 'cat_5',
    mode_slug: 'minutes',
    name: 'Fresh Vegetables & Fruits',
    slug: 'fresh-veggies',
    description: 'Farm-fresh daily groceries delivered in 10 minutes.',
    icon: 'fa-solid fa-apple-whole',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
    sort_order: 1,
    status: true,
    is_featured: true,
  },
  {
    _id: 'cat_6',
    mode_slug: 'minutes',
    name: 'Dairy, Bread & Eggs',
    slug: 'dairy-bread-eggs',
    description: 'Morning essentials and breakfast packs.',
    icon: 'fa-solid fa-egg',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    sort_order: 2,
    status: true,
    is_featured: true,
  },
  {
    _id: 'cat_7',
    mode_slug: 'food',
    name: 'Biryani & Rice Bowls',
    slug: 'food-biryani',
    description: 'Authentic aromatic biryanis and royal feast bowls.',
    icon: 'fa-solid fa-bowl-rice',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    sort_order: 1,
    status: true,
    is_featured: true,
  },
  {
    _id: 'cat_8',
    mode_slug: 'food',
    name: 'Pizzas & Fast Food',
    slug: 'food-pizzas',
    description: 'Woodfired pizzas, burgers, and gourmet fries.',
    icon: 'fa-solid fa-pizza-slice',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    sort_order: 2,
    status: true,
    is_featured: true,
  },
];

export const initialRestaurants: MockRestaurant[] = [
  {
    _id: 'rest_1',
    name: 'Dindigul Thalappakatti Biryani',
    slug: 'thalappakatti-biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    banner_image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Biryani, South Indian, Chettinad, Tandoori',
    rating: 4.7,
    ratings_count: 1420,
    delivery_time: '30-35 mins',
    cost_for_two: 500,
    address: '12/4 GST Road, Guindy',
    city: 'Chennai',
    is_pure_veg: false,
    is_featured: true,
    status: true,
  },
  {
    _id: 'rest_2',
    name: 'Buhari Hotel (Est. 1951)',
    slug: 'buhari-hotel',
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80',
    banner_image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    cuisine: 'Mughlai, Biryani, Chinese, Kebabs',
    rating: 4.6,
    ratings_count: 980,
    delivery_time: '25-30 mins',
    cost_for_two: 450,
    address: '83 Anna Salai',
    city: 'Chennai',
    is_pure_veg: false,
    is_featured: true,
    status: true,
  },
];

export const initialProducts: MockProduct[] = [
  {
    _id: 'prod_1',
    mode_slug: 'shopy',
    category_slug: 'fashion',
    name: 'Premium Classic Oxford Cotton Shirt',
    slug: 'premium-classic-oxford-cotton-shirt',
    sku: 'SHIRT-OXF-001',
    price: 1999,
    sale_price: 1299,
    stock: 45,
    description:
      'Crafted from breathable 100% Egyptian long-staple cotton, this classic button-down Oxford shirt offers timeless elegance for formal and casual gatherings.',
    short_description: 'Pure breathable cotton regular fit button-down shirt.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    ],
    colors: ['Sky Blue', 'Crisp White', 'Navy Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    addons: [],
    delivery_time: 'Fast Delivery in 2-3 Days',
    return_policy: '7 Days Hassle-Free Returns',
    rating: 4.8,
    ratings_count: 1420,
    is_featured: true,
    status: true,
  },
  {
    _id: 'prod_2',
    mode_slug: 'shopy',
    category_slug: 'electronics',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    slug: 'sony-wh-1000xm5-wireless-headphones',
    sku: 'AUD-SONY-005',
    price: 29990,
    sale_price: 26990,
    stock: 20,
    description:
      'Industry-leading noise cancellation with dual processors, 8 microphones, and ultra-comfortable lightweight design. Up to 30 hours battery life with quick charge.',
    short_description: 'Flagship ANC headphones with crystal clear hands-free calling.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    ],
    colors: ['Midnight Black', 'Silver Grey'],
    sizes: ['One Size'],
    addons: [],
    delivery_time: 'Express Next-Day Delivery',
    return_policy: '10 Days Replacement Warranty',
    rating: 4.9,
    ratings_count: 890,
    is_featured: true,
    status: true,
  },
  {
    _id: 'prod_3',
    mode_slug: 'shopy',
    category_slug: 'mobiles',
    name: 'Apple iPhone 16 Pro (128GB, Natural Titanium)',
    slug: 'apple-iphone-16-pro-128gb',
    sku: 'MOB-IPHONE-16P',
    price: 119900,
    sale_price: 114900,
    stock: 15,
    description:
      'Forged in titanium with the breakthrough A18 Pro chip, 48MP Fusion camera system, and industry-first Camera Control button for instant capture.',
    short_description: 'Titanium design with A18 Pro chip and 48MP camera.',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    ],
    colors: ['Natural Titanium', 'Black Titanium', 'Desert Titanium'],
    sizes: ['128 GB', '256 GB', '512 GB'],
    addons: [],
    delivery_time: 'Same Day Delivery available',
    return_policy: '7 Days Brand Replacement',
    rating: 4.9,
    ratings_count: 2310,
    is_featured: true,
    status: true,
  },
  {
    _id: 'prod_4',
    mode_slug: 'minutes',
    category_slug: 'fresh-veggies',
    name: 'Fresh Farm Onions (Pyaz) - 1 kg',
    slug: 'fresh-farm-onions-1kg',
    sku: 'GROC-ONION-1KG',
    price: 55,
    sale_price: 42,
    stock: 300,
    description:
      'Crisp and pungent farm-fresh onions directly sourced from farmers. Perfectly sorted, cleaned, and packed.',
    short_description: 'Fresh top quality onions 1 kg pack.',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    gallery: [],
    colors: [],
    sizes: ['1 kg', '2 kg'],
    addons: [],
    delivery_time: '⚡ Delivered in 10-15 Minutes',
    return_policy: 'Instant return at doorstep if dissatisfied',
    rating: 4.7,
    ratings_count: 650,
    is_featured: true,
    status: true,
  },
  {
    _id: 'prod_5',
    mode_slug: 'food',
    category_slug: 'food-biryani',
    restaurant_slug: 'thalappakatti-biryani',
    restaurant_name: 'Dindigul Thalappakatti Biryani',
    name: 'Dindigul Thalappakatti Special Mutton Biryani',
    slug: 'thalappakatti-special-mutton-biryani',
    sku: 'FOOD-THAL-MUT-01',
    price: 360,
    sale_price: 330,
    stock: 50,
    description:
      'Authentic Seeraga Samba rice simmered with tender succulence of grass-fed baby goat meat and secret family spices.',
    short_description: 'Iconic Seeraga samba mutton biryani served with raita and dalcha.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    gallery: [],
    colors: [],
    sizes: ['Regular (Serves 1)', 'Large (Serves 2)'],
    addons: [
      { name: 'Extra Boiled Egg', price: 20 },
      { name: 'Extra Onion Raita Cup', price: 25 },
      { name: 'Gulab Jamun (2 pcs)', price: 45 },
    ],
    delivery_time: 'Hot Delivery in 30-35 mins',
    return_policy: 'Non-returnable prepared food',
    rating: 4.8,
    ratings_count: 1420,
    is_featured: true,
    status: true,
  },
];

export const initialCoupons: MockCoupon[] = [
  {
    _id: 'coup_1',
    code: 'WELCOME50',
    name: 'Flat ₹50 Off Welcome Discount',
    description: 'Enjoy ₹50 flat savings on your order. Valid on minimum cart of ₹199.',
    type: 'fixed',
    value: 50,
    min_order_amount: 199,
    status: true,
  },
  {
    _id: 'coup_2',
    code: 'SAVE10',
    name: '10% Off Super Savings',
    description: 'Get 10% instant discount up to ₹200 on shopping orders above ₹499.',
    type: 'percentage',
    value: 10,
    min_order_amount: 499,
    max_discount_amount: 200,
    mode_slug: 'shopy',
    status: true,
  },
  {
    _id: 'coup_3',
    code: 'MINUTES20',
    name: '20% Off 10-Minute Groceries',
    description: 'Get 20% discount on quick-commerce essentials delivered in 10 minutes. Max ₹80 off.',
    type: 'percentage',
    value: 20,
    min_order_amount: 149,
    max_discount_amount: 80,
    mode_slug: 'minutes',
    status: true,
  },
  {
    _id: 'coup_4',
    code: 'FREESHIP',
    name: 'Zero Delivery Fee',
    description: '100% off delivery fee on your cart when subtotal is ₹150 or more.',
    type: 'free_delivery',
    value: 0,
    min_order_amount: 150,
    status: true,
  },
];

export const initialOrders = [
  {
    _id: 'order_1',
    order_number: 'ORD-2027-1001',
    user_name: 'Alice Customer',
    user_email: 'customer@shopy.test',
    mode_slug: 'shopy',
    status: 'out-for-delivery',
    payment_method: 'pay_on_delivery',
    payment_status: 'pending',
    subtotal: 1299,
    delivery_fee: 40,
    tax_amount: 65,
    discount_amount: 50,
    coupon_code: 'WELCOME50',
    grand_total: 1354,
    shipping_address: {
      name: 'Alice Customer',
      phone: '+91 9876543210',
      address_line1: 'Flat 402, Green Valley Apartments',
      address_line2: '12th Main Road, Indiranagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postal_code: '600001',
      country: 'India',
      type: 'home',
    },
    items: [
      {
        product_name: 'Premium Classic Oxford Cotton Shirt',
        product_slug: 'premium-classic-oxford-cotton-shirt',
        product_image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80',
        color: 'Sky Blue',
        size: 'M',
        quantity: 1,
        unit_price: 1299,
        subtotal: 1299,
      },
    ],
    delivery_partner: {
      name: 'Ravi Kumar',
      phone: '+91 9876543211',
      vehicle_type: 'bike',
      latitude: 13.08268,
      longitude: 80.270718,
    },
    created_at: new Date().toISOString(),
  },
];

export const initialAdminSetting = {
  is_dark_mode: false,
  site_name: 'Shopy 2027',
  site_logo: '/images/logo/logo.png',
  is_delivery_enabled: true,
  delivery_enabled_shopy: false,
  delivery_enabled_minutes: true,
  delivery_enabled_food: false,
  upi_id: 'merchant@upi',
  upi_merchant_name: 'Shopy Store',
  upi_qr_image: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=merchant@upi&pn=ShopyStore&cu=INR',
  is_cod_enabled: true,
  is_upi_enabled: true,
  is_card_enabled: true,
};
