import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/models/Category';
import Mode from '@/models/Mode';
import { initialCategories } from '@/lib/mockData';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const modeSlug = searchParams.get('mode');

    const conn = await connectDB();
    if (conn) {
      try {
        let query: any = { status: true };
        if (modeSlug) {
          const modeDoc = await Mode.findOne({ slug: modeSlug });
          if (modeDoc) query.mode_id = modeDoc._id;
        }

        const categories = await Category.find(query).sort({ sort_order: 1 });
        if (categories.length > 0) {
          return NextResponse.json({ success: true, categories });
        }
      } catch (dbErr) {
        console.warn('DB categories fallback:', dbErr);
      }
    }

    let result = initialCategories;
    if (modeSlug) {
      result = initialCategories.filter((c) => c.mode_slug === modeSlug);
    }

    return NextResponse.json({ success: true, categories: result });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Error fetching categories' }, { status: 500 });
  }
}
