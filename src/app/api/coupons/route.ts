import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Coupon from '@/models/Coupon';
import { initialCoupons } from '@/lib/mockData';

export async function GET(req: NextRequest) {
  try {
    const conn = await connectDB();
    if (conn) {
      try {
        const coupons = await Coupon.find({ status: true });
        if (coupons.length > 0) {
          return NextResponse.json({ success: true, coupons });
        }
      } catch (dbErr) {
        console.warn('DB coupons fallback:', dbErr);
      }
    }

    return NextResponse.json({ success: true, coupons: initialCoupons });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Error fetching coupons' }, { status: 500 });
  }
}
