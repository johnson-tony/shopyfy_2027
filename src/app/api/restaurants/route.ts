import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Restaurant from '@/models/Restaurant';
import { initialRestaurants } from '@/lib/mockData';

export async function GET() {
  try {
    const conn = await connectDB();
    if (conn) {
      try {
        const restaurants = await Restaurant.find({ status: true }).sort({ rating: -1 });
        if (restaurants.length > 0) {
          return NextResponse.json({ success: true, restaurants });
        }
      } catch (dbErr) {
        console.warn('DB restaurants fallback:', dbErr);
      }
    }

    return NextResponse.json({ success: true, restaurants: initialRestaurants });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Error fetching restaurants' }, { status: 500 });
  }
}
