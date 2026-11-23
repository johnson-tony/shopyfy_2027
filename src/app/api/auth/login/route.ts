import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { comparePassword, signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Default test customer credential fallback
    if (email === 'customer@shopy.test' && password === 'password') {
      const token = signToken({
        id: 'cust_alice_1',
        email: 'customer@shopy.test',
        role: 'user',
        name: 'Alice Customer',
        status: 'active',
      });
      return NextResponse.json({
        success: true,
        user: { id: 'cust_alice_1', email: 'customer@shopy.test', name: 'Alice Customer', role: 'user' },
        token,
      });
    }

    const conn = await connectDB();
    if (conn) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
      }

      if (user.status === 'blocked') {
        return NextResponse.json({ message: 'Your account has been suspended. Please contact support.' }, { status: 403 });
      }

      if (user.password) {
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }
      }

      const token = signToken({
        id: user._id.toString(),
        email: user.email,
        role: 'user',
        name: user.name,
        status: user.status,
      });

      return NextResponse.json({
        success: true,
        user: { id: user._id, email: user.email, name: user.name, role: 'user' },
        token,
      });
    }

    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
