import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import { comparePassword, signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Default test Super Admin and Store Admin fallbacks
    if (
      (email === 'superadmin@shopy.test' || email === 'admin@shopy.test') &&
      password === 'password'
    ) {
      const isSuper = email === 'superadmin@shopy.test';
      const token = signToken({
        id: isSuper ? 'admin_super_1' : 'admin_store_2',
        email,
        role: 'admin',
        name: isSuper ? 'Root Super Admin' : 'Store Administrator',
        roles: [isSuper ? 'super-admin' : 'admin'],
        permissions: ['all'],
        allowedModes: ['shopy', 'food', 'minutes'],
      });

      return NextResponse.json({
        success: true,
        admin: {
          id: isSuper ? 'admin_super_1' : 'admin_store_2',
          email,
          name: isSuper ? 'Root Super Admin' : 'Store Administrator',
          role: 'admin',
        },
        token,
      });
    }

    const conn = await connectDB();
    if (conn) {
      const admin = await Admin.findOne({ email: email.toLowerCase() }).populate('roles');
      if (!admin) {
        return NextResponse.json({ message: 'Invalid admin credentials' }, { status: 401 });
      }

      if (!admin.password) {
        return NextResponse.json({ message: 'Invalid admin credentials' }, { status: 401 });
      }

      const isMatch = await comparePassword(password, admin.password);
      if (!isMatch) {
        return NextResponse.json({ message: 'Invalid admin credentials' }, { status: 401 });
      }

      const token = signToken({
        id: admin._id.toString(),
        email: admin.email,
        role: 'admin',
        name: admin.name,
        roles: (admin.roles as any[]).map((r) => r.slug || 'admin'),
        permissions: ['all'],
        allowedModes: ['shopy', 'food', 'minutes'],
      });

      return NextResponse.json({
        success: true,
        admin: { id: admin._id, email: admin.email, name: admin.name, role: 'admin' },
        token,
      });
    }

    return NextResponse.json({ message: 'Invalid admin credentials' }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
