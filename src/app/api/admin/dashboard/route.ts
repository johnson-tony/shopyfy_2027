import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';
import DeliveryPartner from '@/models/DeliveryPartner';

export async function GET() {
  try {
    const stats = {
      totalRevenue: 284500,
      totalOrders: 142,
      activeCustomers: 89,
      activeRiders: 12,
      modeDistribution: [
        { mode: 'Shopy (Retail)', revenue: 168000, percentage: 59 },
        { mode: 'Food Delivery', revenue: 74500, percentage: 26 },
        { mode: 'Minutes (Quick)', revenue: 42000, percentage: 15 },
      ],
      recentOrders: [
        { order_number: 'ORD-2027-1001', customer: 'Alice Customer', total: 1354, status: 'out-for-delivery', date: 'Just now' },
        { order_number: 'ORD-2027-0998', customer: 'Rohan Mehta', total: 420, status: 'delivered', date: '2 hours ago' },
        { order_number: 'ORD-2027-0995', customer: 'Deepak Roy', total: 26990, status: 'processing', date: '5 hours ago' },
      ],
    };

    return NextResponse.json({ success: true, stats });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Error fetching dashboard stats' }, { status: 500 });
  }
}
