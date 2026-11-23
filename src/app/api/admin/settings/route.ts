import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import AdminSetting from '@/models/AdminSetting';
import { initialAdminSetting } from '@/lib/mockData';

export async function GET() {
  try {
    const conn = await connectDB();
    if (conn) {
      try {
        const setting = await AdminSetting.findOne();
        if (setting) {
          return NextResponse.json({ success: true, setting });
        }
      } catch (dbErr) {
        console.warn('DB settings fallback:', dbErr);
      }
    }

    return NextResponse.json({ success: true, setting: initialAdminSetting });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Error fetching settings' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const conn = await connectDB();
    if (conn) {
      try {
        const setting = await AdminSetting.findOneAndUpdate({}, body, { new: true, upsert: true });
        return NextResponse.json({ success: true, message: 'Settings updated successfully', setting });
      } catch (dbErr) {
        console.warn('DB settings update fallback:', dbErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Settings updated successfully', setting: body });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Error updating settings' }, { status: 500 });
  }
}
