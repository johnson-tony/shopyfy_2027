# Shopyfy 2027 — Next.js 15 + Tailwind CSS + MongoDB Unified Commerce Platform

A modern, high-performance, full-stack multi-mode e-commerce web platform built with **Next.js 15 (App Router, TypeScript)**, **Tailwind CSS**, and **MongoDB with Mongoose**.

Migrated with 100% feature and design fidelity from the Laravel monolithic application (`shopy_app_2026`).

---

## 🌟 Architecture & Highlights

### 1. Unified 3-in-1 Shopping Modes (`Mode` Model)
- **🛍️ Shopy (General Retail E-Commerce):** Multi-category catalog (Fashion, Electronics, Mobiles, Home & Kitchen) with variant attributes (color, size), photo gallery zoom, and standard 2-4 day shipping.
- **⚡ Minutes (Quick Commerce):** Daily essentials, farm-fresh vegetables, dairy, bread & eggs with guaranteed **10-15 minute doorstep delivery**.
- **🍽️ Food Delivery:** Top city restaurant partners (Dindigul Thalappakatti, Buhari), full menus, custom food add-ons (extra egg, raita cups, gulab jamun), and live hot delivery estimates.

### 2. Triple Guard Authentication & Portals
- **👤 Customer Storefront (`/`):** Unified home, category filters, product detail, multi-mode persistent cart, wishlist, coupon code discount validator, multi-step OTP authentication, and address management.
- **🛡️ Admin Staff Control Panel (`/admin`):** Analytics dashboards, real-time mode distribution graphs, catalog & product manager, order fulfillment with delivery partner dispatch, coupon management, and global system toggles.
- **🛵 Delivery Partner Fleet (`/partner`):** Live On-Duty/Off-Duty shift toggle, assigned orders queue, customer phone dialer, navigation links, and proof-of-delivery (POD) photo confirmation.

---

## 🔑 Default Test Credentials

| Portal | Role | Email | Password |
| :--- | :--- | :--- | :--- |
| **Storefront** | Verified Customer | `customer@shopy.test` | `password` |
| **Admin Control Panel** | Super Administrator | `superadmin@shopy.test` | `password` |
| **Admin Control Panel** | Store Administrator | `admin@shopy.test` | `password` |
| **Rider Fleet Panel** | Delivery Partner (Bike) | `rider@shopy.test` | `password` |
| **Rider Fleet Panel** | Delivery Partner (Scooter) | `priya@shopy.test` | `password` |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
`.env.local` is already pre-configured with:
- `MONGODB_URI=mongodb://127.0.0.1:27017/shopyfy_2027`
- `JWT_SECRET` & `NEXTAUTH_SECRET`
- Google Maps, Places & Geocoding API keys
- Cloudinary credentials

### 3. Run Database Seeder
```bash
npm run seed
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
- Storefront: [http://localhost:3000](http://localhost:3000)
- Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)
- Rider Panel: [http://localhost:3000/partner](http://localhost:3000/partner)

---

## 📁 Project Directory Structure

```
shopyfy_2027/
├── public/
│   ├── css/user-theme.css     # Complete 2,416-line responsive design system
│   ├── images/                # Logos, icons, navbar SVG badges
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── (shop)/            # Public & Customer routes (Home, Product, Cart, Checkout, Orders, Wishlist)
│   │   ├── admin/             # Admin Control Panel routes (Dashboard, Products, Fleet, Orders, Coupons)
│   │   ├── partner/           # Delivery Partner Rider routes (Dashboard, Orders, Deliver)
│   │   ├── api/               # REST API Route Handlers (Auth, Catalog, Cart, Checkout, Orders)
│   │   └── layout.tsx         # Root Layout with FontAwesome 6, Google Fonts & Context Providers
│   ├── components/            # Header, Footer, ProductCard, RestaurantCard, CategoryScroll
│   ├── context/               # AuthContext, CartContext, WishlistContext, ThemeContext
│   ├── lib/                   # db.ts (Mongoose connection), auth.ts (JWT), mockData.ts (Fallback catalog)
│   └── models/                # 21 Mongoose Schemas (User, Admin, Mode, Category, Product, Order, etc.)
├── scripts/
│   └── seed.mjs               # Standalone database seeder script
├── package.json
├── tailwind.config.js
└── tsconfig.json
```
