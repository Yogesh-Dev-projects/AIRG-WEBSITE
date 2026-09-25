import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { globalUserStore } from '@/lib/userStore';

const FALLBACK_USERS = [
  {
    id: 'usr-ceo',
    name: 'Pratap Pawar (CEO)',
    email: 'ceo@airginternational.com',
    password: 'ceo123',
    role: 'CEO',
    department: 'Executive Management',
    employee_id: 'EMP-CEO-01'
  },
  {
    id: 'usr-ext-bd',
    name: 'Devidas Babanrao Ghogare',
    email: 'abhishekbuildcon22@gmail.com',
    password: 'Devidas@AirG2026',
    role: 'EXTERNAL_BD',
    department: 'External Partner Network',
    employee_id: 'EXT-BD-01'
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Check dynamically created users in globalUserStore
    const memoryMatch = globalUserStore.find(
      u => u.email.toLowerCase() === cleanEmail && (u.password === password || u.password_hash === password)
    );

    if (memoryMatch) {
      return NextResponse.json({
        success: true,
        user: {
          id: memoryMatch._id,
          name: memoryMatch.name,
          email: memoryMatch.email,
          role: memoryMatch.role,
          department: memoryMatch.department,
          employee_id: memoryMatch.employee_id
        }
      });
    }

    // 2. Try MongoDB connection
    try {
      await connectDB();
      const count = await User.countDocuments();
      if (count === 0) {
        await User.insertMany(FALLBACK_USERS.map(u => ({
          name: u.name,
          email: u.email,
          password_hash: u.password,
          role: u.role,
          department: u.department,
          employee_id: u.employee_id
        })));
      }

      const dbUser = await User.findOne({ email: cleanEmail }).exec();
      if (dbUser && dbUser.password_hash === password) {
        return NextResponse.json({
          success: true,
          user: {
            id: dbUser._id,
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role,
            department: dbUser.department,
            employee_id: dbUser.employee_id
          }
        });
      }
    } catch (dbErr) {
      console.warn('MongoDB connection fallback mode active:', dbErr);
    }

    // 3. Dev Fallback Match
    const match = FALLBACK_USERS.find(u => u.email === cleanEmail && u.password === password);

    if (match) {
      return NextResponse.json({
        success: true,
        user: {
          id: match.id,
          name: match.name,
          email: match.email,
          role: match.role,
          department: match.department,
          employee_id: match.employee_id
        }
      });
    }

    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  } catch (error: any) {
    console.error('Login route error:', error);
    return NextResponse.json({ error: error.message || 'Error processing login' }, { status: 500 });
  }
}
