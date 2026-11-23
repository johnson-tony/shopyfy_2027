import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import OtpToken from '@/models/OtpToken';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, email and password are required' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const conn = await connectDB();
    if (conn) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return NextResponse.json({ message: 'An account with this email already exists' }, { status: 409 });
      }

      const newUser = await User.create({
        name,
        email: email.toLowerCase(),
        phone,
        password: hashedPassword,
        status: 'active',
        email_verified_at: new Date(),
      });

      // Save OTP record
      await OtpToken.create({
        email: email.toLowerCase(),
        otp,
        type: 'verification',
        expires_at: new Date(Date.now() + 15 * 60 * 1000),
      });

      const token = signToken({
        id: newUser._id.toString(),
        email: newUser.email,
        role: 'user',
        name: newUser.name,
        status: newUser.status,
      });

      return NextResponse.json({
        success: true,
        message: 'Account created successfully! Verification OTP: ' + otp,
        otp,
        user: { id: newUser._id, email: newUser.email, name: newUser.name, role: 'user' },
        token,
      });
    }

    // Offline / Mock fallback
    const mockToken = signToken({
      id: 'mock_user_' + Date.now(),
      email,
      role: 'user',
      name,
      status: 'active',
    });

    return NextResponse.json({
      success: true,
      message: 'Account registered successfully! Demo OTP: ' + otp,
      otp,
      user: { id: 'mock_user_1', email, name, role: 'user' },
      token: mockToken,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
