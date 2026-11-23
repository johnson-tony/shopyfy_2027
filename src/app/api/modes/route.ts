import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Mode from '@/models/Mode';
import { initialModes } from '@/lib/mockData';

export async function GET() {
  try {
    const conn = await connectDB();
    if (conn) {
      try {
        const modes = await Mode.find({ status: true }).sort({ sort_order: 1 });
        if (modes.length > 0) {
          return NextResponse.json({ success: true, modes });
        }
      } catch (dbErr) {
        console.warn('DB modes fallback:', dbErr);
      }
    }

    return NextResponse.json({ success: true, modes: initialModes });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Error fetching modes' }, { status: 500 });
  }
}
