import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

if (!process.env.MONGODB_URI) {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      for (const line of envContent.split('\n')) {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
        }
      }
    }
  } catch {
    // ignore
  }
}

let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shopyfy_2027';
if (MONGODB_URI.includes('.mongodb.net/') && !MONGODB_URI.split('.mongodb.net/')[1]?.split('?')[0]) {
  MONGODB_URI = MONGODB_URI.replace('.mongodb.net/', '.mongodb.net/shopyfy_2027');
}

async function seed() {
  console.log('Connecting to MongoDB at:', MONGODB_URI);
  await mongoose.connect(MONGODB_URI);
  console.log('Connected! Starting database seeding...');

  const db = mongoose.connection.db;

  // 1. Modes
  console.log('Seeding Modes...');
  const modesCol = db.collection('modes');
  await modesCol.deleteMany({});
  const modesData = [
    {
      name: 'Shopy',
      slug: 'shopy',
      description: 'General shopping',
      icon: 'fa-solid fa-bag-shopping',
      status: true,
      sort_order: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Food',
      slug: 'food',
      description: 'Food ordering',
      icon: 'fa-solid fa-utensils',
      status: true,
      sort_order: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Minutes',
      slug: 'minutes',
      description: 'Grocery and quick commerce',
      icon: 'fa-solid fa-bolt',
      status: true,
      sort_order: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  const insertedModes = await modesCol.insertMany(modesData);
  const shopyModeId = insertedModes.insertedIds[0];
  const foodModeId = insertedModes.insertedIds[1];
  const minutesModeId = insertedModes.insertedIds[2];

  // 2. Permissions
  console.log('Seeding Permissions...');
  const permsCol = db.collection('permissions');
  await permsCol.deleteMany({});
  const perms = [
    { name: 'View Dashboard', slug: 'dashboard.view', group: 'Dashboard' },
    { name: 'View Products', slug: 'products.view', group: 'Products' },
    { name: 'Create Products', slug: 'products.create', group: 'Products' },
    { name: 'Edit Products', slug: 'products.edit', group: 'Products' },
    { name: 'Delete Products', slug: 'products.delete', group: 'Products' },
    { name: 'View Categories', slug: 'categories.view', group: 'Categories' },
    { name: 'Create Categories', slug: 'categories.create', group: 'Categories' },
    { name: 'Edit Categories', slug: 'categories.edit', group: 'Categories' },
    { name: 'Delete Categories', slug: 'categories.delete', group: 'Categories' },
    { name: 'View Orders', slug: 'orders.view', group: 'Orders' },
    { name: 'Manage Orders', slug: 'orders.edit', group: 'Orders' },
    { name: 'View Restaurants', slug: 'restaurants.view', group: 'Restaurants' },
    { name: 'Manage Restaurants', slug: 'restaurants.edit', group: 'Restaurants' },
    { name: 'View Partners', slug: 'partners.view', group: 'Delivery Partners' },
    { name: 'Manage Partners', slug: 'partners.edit', group: 'Delivery Partners' },
    { name: 'View Coupons', slug: 'coupons.view', group: 'Coupons' },
    { name: 'Manage Coupons', slug: 'coupons.edit', group: 'Coupons' },
    { name: 'Manage Settings', slug: 'settings.edit', group: 'Settings' },
  ].map((p) => ({ ...p, created_at: new Date(), updated_at: new Date() }));
  const insertedPerms = await permsCol.insertMany(perms);
  const allPermIds = Object.values(insertedPerms.insertedIds);

  // 3. Roles
  console.log('Seeding Roles...');
  const rolesCol = db.collection('roles');
  await rolesCol.deleteMany({});
  const rolesData = [
    {
      name: 'Super Administrator',
      slug: 'super-admin',
      description: 'Root administrator with complete system access.',
      status: true,
      permissions: allPermIds,
      modes: [shopyModeId, foodModeId, minutesModeId],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Administrator',
      slug: 'admin',
      description: 'System administrator managing catalog and operations.',
      status: true,
      permissions: allPermIds,
      modes: [shopyModeId, foodModeId, minutesModeId],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Order Manager',
      slug: 'order-manager',
      description: 'Staff managing orders and deliveries.',
      status: true,
      permissions: allPermIds.slice(0, 10),
      modes: [shopyModeId, foodModeId, minutesModeId],
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  const insertedRoles = await rolesCol.insertMany(rolesData);
  const superAdminRoleId = insertedRoles.insertedIds[0];
  const adminRoleId = insertedRoles.insertedIds[1];

  // 4. Admins
  console.log('Seeding Admins...');
  const adminsCol = db.collection('admins');
  await adminsCol.deleteMany({});
  const hashedPassword = await bcrypt.hash('password', 12);
  const admins = [
    {
      name: 'Root Super Admin',
      email: 'superadmin@shopy.test',
      phone: '+1000000001',
      password: hashedPassword,
      status: 'active',
      roles: [superAdminRoleId],
      allowed_modes: [shopyModeId, foodModeId, minutesModeId],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Store Administrator',
      email: 'admin@shopy.test',
      phone: '+1000000002',
      password: hashedPassword,
      status: 'active',
      roles: [adminRoleId],
      allowed_modes: [shopyModeId, foodModeId, minutesModeId],
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  await adminsCol.insertMany(admins);

  // 5. Users (Customers)
  console.log('Seeding Users...');
  const usersCol = db.collection('users');
  await usersCol.deleteMany({});
  const usersData = [
    {
      name: 'Alice Customer',
      email: 'customer@shopy.test',
      phone: '+1000000004',
      password: hashedPassword,
      status: 'active',
      email_verified_at: new Date(),
      current_mode: 'shopy',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  const insertedUsers = await usersCol.insertMany(usersData);
  const aliceUserId = insertedUsers.insertedIds[0];

  // User Address
  const addressesCol = db.collection('addresses');
  await addressesCol.deleteMany({});
  await addressesCol.insertOne({
    user_id: aliceUserId,
    name: 'Alice Customer',
    phone: '+91 9876543210',
    type: 'home',
    address_line1: 'Flat 402, Green Valley Apartments',
    address_line2: '12th Main Road, Indiranagar',
    landmark: 'Near Metro Station',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postal_code: '600001',
    country: 'India',
    latitude: 13.0827,
    longitude: 80.2707,
    is_default: true,
    created_at: new Date(),
    updated_at: new Date(),
  });

  // 6. Delivery Partners
  console.log('Seeding Delivery Partners...');
  const partnersCol = db.collection('deliverypartners');
  await partnersCol.deleteMany({});
  const partners = [
    {
      name: 'Ravi Kumar',
      email: 'rider@shopy.test',
      phone: '+1000000101',
      password: hashedPassword,
      vehicle_type: 'bike',
      status: 'active',
      is_available: true,
      latitude: 13.08268,
      longitude: 80.270718,
      location_source: 'static',
      allowed_modes: ['shopy', 'minutes', 'food'],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Priya Sharma',
      email: 'priya@shopy.test',
      phone: '+1000000102',
      password: hashedPassword,
      vehicle_type: 'scooter',
      status: 'active',
      is_available: true,
      latitude: 13.035467,
      longitude: 80.159287,
      location_source: 'static',
      allowed_modes: ['minutes', 'food'],
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  const insertedPartners = await partnersCol.insertMany(partners);
  const raviPartnerId = insertedPartners.insertedIds[0];

  // 7. Categories
  console.log('Seeding Categories...');
  const catCol = db.collection('categories');
  await catCol.deleteMany({});
  const categoriesData = [
    // Shopy categories
    {
      mode_id: shopyModeId,
      name: 'Fashion',
      slug: 'fashion',
      description: 'Trending apparel, clothing, footwear, and accessories.',
      icon: 'fa-solid fa-shirt',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
      sort_order: 1,
      status: true,
      is_featured: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      mode_id: shopyModeId,
      name: 'Electronics',
      slug: 'electronics',
      description: 'Laptops, computers, audio, and home tech.',
      icon: 'fa-solid fa-laptop',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80',
      sort_order: 2,
      status: true,
      is_featured: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      mode_id: shopyModeId,
      name: 'Mobiles',
      slug: 'mobiles',
      description: 'Smartphones, cases, and charging gear.',
      icon: 'fa-solid fa-mobile-screen',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      sort_order: 3,
      status: true,
      is_featured: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      mode_id: shopyModeId,
      name: 'Home & Kitchen',
      slug: 'home-kitchen',
      description: 'Cookware, dining, appliances, and home decor.',
      icon: 'fa-solid fa-couch',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
      sort_order: 4,
      status: true,
      is_featured: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    // Minutes categories
    {
      mode_id: minutesModeId,
      name: 'Fresh Vegetables & Fruits',
      slug: 'fresh-veggies',
      description: 'Farm-fresh daily groceries delivered in 10 minutes.',
      icon: 'fa-solid fa-apple-whole',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
      sort_order: 1,
      status: true,
      is_featured: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      mode_id: minutesModeId,
      name: 'Dairy, Bread & Eggs',
      slug: 'dairy-bread-eggs',
      description: 'Morning essentials and breakfast packs.',
      icon: 'fa-solid fa-egg',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
      sort_order: 2,
      status: true,
      is_featured: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    // Food categories
    {
      mode_id: foodModeId,
      name: 'Biryani & Rice Bowls',
      slug: 'food-biryani',
      description: 'Authentic aromatic biryanis and royal feast bowls.',
      icon: 'fa-solid fa-bowl-rice',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
      sort_order: 1,
      status: true,
      is_featured: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      mode_id: foodModeId,
      name: 'Pizzas & Fast Food',
      slug: 'food-pizzas',
      description: 'Woodfired pizzas, burgers, and gourmet fries.',
      icon: 'fa-solid fa-pizza-slice',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      sort_order: 2,
      status: true,
      is_featured: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  const insertedCats = await catCol.insertMany(categoriesData);
  const fashionCatId = insertedCats.insertedIds[0];
  const electronicsCatId = insertedCats.insertedIds[1];
  const mobilesCatId = insertedCats.insertedIds[2];
  const freshVeggiesCatId = insertedCats.insertedIds[4];
  const biryaniCatId = insertedCats.insertedIds[6];

  // 8. Restaurants
  console.log('Seeding Restaurants...');
  const restCol = db.collection('restaurants');
  await restCol.deleteMany({});
  const restaurantsData = [
    {
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
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
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
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  const insertedRests = await restCol.insertMany(restaurantsData);
  const thalappakattiId = insertedRests.insertedIds[0];

  // 9. Products
  console.log('Seeding Products...');
  const prodCol = db.collection('products');
  await prodCol.deleteMany({});
  const products = [
    // Shopy Products
    {
      mode_id: shopyModeId,
      category_id: fashionCatId,
      name: 'Premium Classic Oxford Cotton Shirt',
      slug: 'premium-classic-oxford-cotton-shirt',
      sku: 'SHIRT-OXF-001',
      price: 1999,
      sale_price: 1299,
      stock: 45,
      description: 'Crafted from breathable 100% Egyptian long-staple cotton, this classic button-down Oxford shirt offers timeless elegance for formal and casual gatherings.',
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
      is_featured: true,
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      mode_id: shopyModeId,
      category_id: electronicsCatId,
      name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
      slug: 'sony-wh-1000xm5-wireless-headphones',
      sku: 'AUD-SONY-005',
      price: 29990,
      sale_price: 26990,
      stock: 20,
      description: 'Industry-leading noise cancellation with dual processors, 8 microphones, and ultra-comfortable lightweight design. Up to 30 hours battery life with quick charge.',
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
      is_featured: true,
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      mode_id: shopyModeId,
      category_id: mobilesCatId,
      name: 'Apple iPhone 16 Pro (128GB, Natural Titanium)',
      slug: 'apple-iphone-16-pro-128gb',
      sku: 'MOB-IPHONE-16P',
      price: 119900,
      sale_price: 114900,
      stock: 15,
      description: 'Forged in titanium with the breakthrough A18 Pro chip, 48MP Fusion camera system, and industry-first Camera Control button for instant capture.',
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
      is_featured: true,
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    // Minutes Products (10 Min Groceries)
    {
      mode_id: minutesModeId,
      category_id: freshVeggiesCatId,
      name: 'Fresh Farm Onions (Pyaz) - 1 kg',
      slug: 'fresh-farm-onions-1kg',
      sku: 'GROC-ONION-1KG',
      price: 55,
      sale_price: 42,
      stock: 300,
      description: 'Crisp and pungent farm-fresh onions directly sourced from farmers. Perfectly sorted and packed.',
      short_description: 'Fresh top quality onions 1 kg pack.',
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
      gallery: [],
      colors: [],
      sizes: ['1 kg', '2 kg'],
      addons: [],
      delivery_time: '⚡ Delivered in 10-15 Minutes',
      return_policy: 'Instant return at doorstep if dissatisfied',
      is_featured: true,
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    // Food Products (Restaurant delivery)
    {
      mode_id: foodModeId,
      category_id: biryaniCatId,
      restaurant_id: thalappakattiId,
      name: 'Dindigul Thalappakatti Special Mutton Biryani',
      slug: 'thalappakatti-special-mutton-biryani',
      sku: 'FOOD-THAL-MUT-01',
      price: 360,
      sale_price: 330,
      stock: 50,
      description: 'Authentic Seeraga Samba rice simmered with tender succulence of tender grass-fed baby goat meat and secret family spices.',
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
      is_featured: true,
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  const insertedProds = await prodCol.insertMany(products);
  const firstProdId = insertedProds.insertedIds[0];

  // 10. Reviews
  console.log('Seeding Reviews...');
  const revCol = db.collection('productreviews');
  await revCol.deleteMany({});
  await revCol.insertOne({
    product_id: firstProdId,
    user_id: aliceUserId,
    user_name: 'Alice Customer',
    rating: 5,
    title: 'Fantastic fit & fabric!',
    comment: 'The Oxford cotton shirt feels truly premium. Stays wrinkle-resistant and breathable in humid weather.',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80'],
    is_verified_purchase: true,
    status: true,
    created_at: new Date(),
    updated_at: new Date(),
  });

  // 11. Coupons
  console.log('Seeding Coupons...');
  const coupCol = db.collection('coupons');
  await coupCol.deleteMany({});
  const couponsData = [
    {
      code: 'WELCOME50',
      name: 'Flat ₹50 Off Welcome Discount',
      description: 'Enjoy ₹50 flat savings on your order. Valid on minimum cart of ₹199.',
      type: 'fixed',
      value: 50.0,
      min_order_amount: 199.0,
      max_discount_amount: null,
      mode_id: null,
      usage_limit: 1000,
      usage_limit_per_user: 2,
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      code: 'SAVE10',
      name: '10% Off Super Savings',
      description: 'Get 10% instant discount up to ₹200 on shopping orders above ₹499.',
      type: 'percentage',
      value: 10.0,
      min_order_amount: 499.0,
      max_discount_amount: 200.0,
      mode_id: shopyModeId,
      usage_limit: 500,
      usage_limit_per_user: 3,
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      code: 'MINUTES20',
      name: '20% Off 10-Minute Groceries',
      description: 'Get 20% discount on quick-commerce essentials delivered in 10 minutes. Max ₹80 off.',
      type: 'percentage',
      value: 20.0,
      min_order_amount: 149.0,
      max_discount_amount: 80.0,
      mode_id: minutesModeId,
      usage_limit: 2000,
      usage_limit_per_user: 5,
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      code: 'FREESHIP',
      name: 'Zero Delivery Fee',
      description: '100% off delivery fee on your cart when subtotal is ₹150 or more.',
      type: 'free_delivery',
      value: 0.0,
      min_order_amount: 150.0,
      max_discount_amount: null,
      mode_id: null,
      usage_limit: 1000,
      usage_limit_per_user: 1,
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  await coupCol.insertMany(couponsData);

  // 12. Admin Settings
  console.log('Seeding Admin Settings...');
  const setCol = db.collection('adminsettings');
  await setCol.deleteMany({});
  await setCol.insertOne({
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
    created_at: new Date(),
    updated_at: new Date(),
  });

  // 13. Sample Order
  console.log('Seeding Sample Orders...');
  const orderCol = db.collection('orders');
  await orderCol.deleteMany({});
  await orderCol.insertOne({
    order_number: 'ORD-2027-1001',
    user_id: aliceUserId,
    mode_id: shopyModeId,
    delivery_partner_id: raviPartnerId,
    shipping_address: {
      name: 'Alice Customer',
      phone: '+91 9876543210',
      address_line1: 'Flat 402, Green Valley Apartments',
      address_line2: '12th Main Road, Indiranagar',
      landmark: 'Near Metro Station',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postal_code: '600001',
      country: 'India',
      type: 'home',
      latitude: 13.0827,
      longitude: 80.2707,
    },
    status: 'out-for-delivery',
    payment_method: 'pay_on_delivery',
    payment_status: 'pending',
    subtotal: 1299,
    delivery_fee: 40,
    tax_amount: 65,
    discount_amount: 50,
    coupon_code: 'WELCOME50',
    grand_total: 1354,
    notes: 'Please ring the doorbell twice.',
    items: [
      {
        product_id: firstProdId,
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
    delivery_notes: 'Rider is on the way with your package.',
    created_at: new Date(),
    updated_at: new Date(),
  });

  console.log('Seeding completed successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Error during seeding:', err);
  process.exit(1);
});
