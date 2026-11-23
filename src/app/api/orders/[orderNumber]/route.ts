import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { initialOrders } from '@/lib/mockData';

export async function GET(req: NextRequest, { params }: { params: Promise<{ orderNumber: string }> }) {
  try {
    const { orderNumber } = await params;

    const conn = await connectDB();
    if (conn) {
      try {
        const order = await Order.findOne({ order_number: orderNumber }).populate('delivery_partner_id');
        if (order) {
          return NextResponse.json({ success: true, order });
        }
      } catch (dbErr) {
        console.warn('DB single order fallback:', dbErr);
      }
    }

    const order = initialOrders.find((o) => o.order_number === orderNumber) || initialOrders[0];
    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Error fetching order' }, { status: 500 });
  }
}
