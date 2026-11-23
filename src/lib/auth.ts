import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_shopyfy_2027_production_grade_token_123456';

export interface UserTokenPayload {
  id: string;
  email: string;
  role: 'user';
  name: string;
  status: string;
}

export interface AdminTokenPayload {
  id: string;
  email: string;
  role: 'admin';
  name: string;
  roles: string[];
  permissions: string[];
  allowedModes: string[];
}

export interface PartnerTokenPayload {
  id: string;
  email: string;
  role: 'partner';
  name: string;
  vehicleType: string;
  status: string;
}

export type TokenPayload = UserTokenPayload | AdminTokenPayload | PartnerTokenPayload;

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: TokenPayload, expiresIn: string = '7d'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn as any });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function getAuthTokenFromRequest(req: NextRequest, guard: 'user' | 'admin' | 'partner' = 'user'): string | null {
  // Check cookie first
  const cookieName = guard === 'admin' ? 'shopy_admin_token' : guard === 'partner' ? 'shopy_partner_token' : 'shopy_user_token';
  const cookieToken = req.cookies.get(cookieName)?.value;
  if (cookieToken) return cookieToken;

  // Check Authorization header
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return null;
}

export function getUserFromRequest(req: NextRequest): UserTokenPayload | null {
  const token = getAuthTokenFromRequest(req, 'user');
  if (!token) return null;
  const decoded = verifyToken(token);
  if (decoded && decoded.role === 'user') return decoded as UserTokenPayload;
  return null;
}

export function getAdminFromRequest(req: NextRequest): AdminTokenPayload | null {
  const token = getAuthTokenFromRequest(req, 'admin');
  if (!token) return null;
  const decoded = verifyToken(token);
  if (decoded && decoded.role === 'admin') return decoded as AdminTokenPayload;
  return null;
}

export function getPartnerFromRequest(req: NextRequest): PartnerTokenPayload | null {
  const token = getAuthTokenFromRequest(req, 'partner');
  if (!token) return null;
  const decoded = verifyToken(token);
  if (decoded && decoded.role === 'partner') return decoded as PartnerTokenPayload;
  return null;
}
