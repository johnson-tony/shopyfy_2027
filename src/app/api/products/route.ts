import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import Mode from '@/models/Mode';
import Category from '@/models/Category';
import { initialProducts, initialModes, initialCategories } from '@/lib/mockData';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const modeSlug = searchParams.get('mode') || 'shopy';
    const categorySlug = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');

    const conn = await connectDB();
    if (conn) {
      try {
        const modeDoc = await Mode.findOne({ slug: modeSlug });
        const query: any = { status: true };

        if (modeDoc) {
          query.mode_id = modeDoc._id;
        }

        if (categorySlug) {
          const catDoc = await Category.findOne({ slug: categorySlug });
          if (catDoc) query.category_id = catDoc._id;
        }

        if (search) {
          query.name = { $regex: search, $options: 'i' };
        }

        let sortOption: any = { is_featured: -1, created_at: -1 };
        if (sort === 'price_asc') sortOption = { price: 1 };
        if (sort === 'price_desc') sortOption = { price: -1 };

        const products = await Product.find(query).sort(sortOption).populate('category_id').populate('restaurant_id');

        if (products.length > 0) {
          return NextResponse.json({ success: true, products });
        }
      } catch (dbErr) {
        console.warn('DB query fallback to memory:', dbErr);
      }
    }

    // Memory / Fallback dataset
    let filtered = initialProducts.filter((p) => p.mode_slug === modeSlug);

    if (categorySlug) {
      filtered = filtered.filter((p) => p.category_slug === categorySlug);
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    if (sort === 'price_asc') {
      filtered.sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
    } else if (sort === 'price_desc') {
      filtered.sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));
    }

    return NextResponse.json({ success: true, products: filtered });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Error fetching products' }, { status: 500 });
  }
}
