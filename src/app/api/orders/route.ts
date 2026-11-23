import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { initialOrders } from '@/lib/mockData';

export async function GET(req: NextRequest) {
  try {
    const conn = await connectDB();
    if (conn) {
      try {
        const orders = await Order.find().sort({ created_at: -1 }).populate('delivery_partner_id');
        if (orders.length > 0) {
          return NextResponse.json({ success: true, orders });
        }
      } catch (dbErr) {
        console.warn('DB orders fallback:', dbErr);
      }
    }

    return NextResponse.json({ success: true, orders: initialOrders });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Error fetching orders' }, { status: 500 });
  }
}
