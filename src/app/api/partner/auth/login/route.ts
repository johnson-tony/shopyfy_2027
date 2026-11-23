import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import DeliveryPartner from '@/models/DeliveryPartner';
import { comparePassword, signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Default test rider fallback
    if (
      (email === 'rider@shopy.test' || email === 'priya@shopy.test') &&
      password === 'password'
    ) {
      const token = signToken({
        id: 'partner_ravi_1',
        email,
        role: 'partner',
        name: email === 'rider@shopy.test' ? 'Ravi Kumar' : 'Priya Sharma',
        vehicleType: 'bike',
        status: 'active',
      });

      return NextResponse.json({
        success: true,
        partner: {
          id: 'partner_ravi_1',
          email,
          name: email === 'rider@shopy.test' ? 'Ravi Kumar' : 'Priya Sharma',
          role: 'partner',
          vehicleType: 'bike',
          is_available: true,
        },
        token,
      });
    }

    const conn = await connectDB();
    if (conn) {
      const partner = await DeliveryPartner.findOne({ email: email.toLowerCase() });
      if (!partner) {
        return NextResponse.json({ message: 'Invalid rider credentials' }, { status: 401 });
      }

      if (!partner.password) {
        return NextResponse.json({ message: 'Invalid rider credentials' }, { status: 401 });
      }

      const isMatch = await comparePassword(password, partner.password);
      if (!isMatch) {
        return NextResponse.json({ message: 'Invalid rider credentials' }, { status: 401 });
      }

      const token = signToken({
        id: partner._id.toString(),
        email: partner.email,
        role: 'partner',
        name: partner.name,
        vehicleType: partner.vehicle_type,
        status: partner.status,
      });

      return NextResponse.json({
        success: true,
        partner: {
          id: partner._id,
          email: partner.email,
          name: partner.name,
          role: 'partner',
          vehicleType: partner.vehicle_type,
          is_available: partner.is_available,
        },
        token,
      });
    }

    return NextResponse.json({ message: 'Invalid rider credentials' }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
