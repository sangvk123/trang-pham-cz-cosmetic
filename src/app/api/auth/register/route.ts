import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

// Simple in-memory rate limiter (per IP, 5 attempts per minute)
const attempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = attempts.get(ip);
  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password, name } = body;

    // Validate email
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Validate password strength
    if (!password || typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` },
        { status: 400 }
      );
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      return NextResponse.json(
        { error: 'Password must contain uppercase, lowercase, and a number' },
        { status: 400 }
      );
    }

    // Validate and sanitize name (strip HTML tags)
    const sanitizedName = name && typeof name === 'string'
      ? name.replace(/<[^>]*>/g, '').trim().slice(0, 100)
      : null;

    if (name && typeof name === 'string' && sanitizedName && sanitizedName.length === 0) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check existing user
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      // Don't reveal whether email exists (security: prevent enumeration)
      return NextResponse.json(
        { error: 'Registration failed. Please try again or use a different email.' },
        { status: 400 }
      );
    }

    // Hash password with bcrypt (cost factor 12)
    const passwordHash = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        name: sanitizedName || null,
        passwordHash,
      },
    });

    return NextResponse.json(
      { success: true, user: { id: user.id, email: user.email, name: user.name } },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
