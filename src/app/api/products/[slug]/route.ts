import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import ProductReview from '@/models/ProductReview';
import { initialProducts } from '@/lib/mockData';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const conn = await connectDB();
    if (conn) {
      try {
        const product = await Product.findOne({ slug })
          .populate('category_id')
          .populate('restaurant_id')
          .populate('mode_id');

        if (product) {
          const reviews = await ProductReview.find({ product_id: product._id, status: true }).sort({ created_at: -1 });
          return NextResponse.json({ success: true, product, reviews });
        }
      } catch (dbErr) {
        console.warn('DB query single product fallback:', dbErr);
      }
    }

    // Memory fallback
    const product = initialProducts.find((p) => p.slug === slug);
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    const reviews = [
      {
        _id: 'rev_1',
        user_name: 'Alice Customer',
        rating: 5,
        title: 'Outstanding quality and fit',
        comment: 'Exceeded my expectations! Material is durable, looks stylish, and delivered right on time.',
        images: product.gallery.slice(0, 2),
        is_verified_purchase: true,
        created_at: new Date().toISOString(),
      },
      {
        _id: 'rev_2',
        user_name: 'Rohan Mehta',
        rating: 4,
        title: 'Very satisfied!',
        comment: 'Great value for money. Packaging was neat and tidy.',
        images: [],
        is_verified_purchase: true,
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
    ];

    return NextResponse.json({ success: true, product, reviews });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Error fetching product' }, { status: 500 });
  }
}
