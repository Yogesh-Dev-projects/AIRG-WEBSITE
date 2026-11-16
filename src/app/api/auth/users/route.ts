import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { globalUserStore } from '@/lib/userStore';

export async function GET() {
  try {
    try {
      await connectDB();
      const dbUsers = await User.find({}).select('-password_hash').sort({ createdAt: -1 }).lean().exec();
      
      const allUsers = [...globalUserStore];
      if (dbUsers && dbUsers.length > 0) {
        dbUsers.forEach((dbUser: any) => {
          if (!allUsers.find(u => u.email.toLowerCase() === dbUser.email.toLowerCase())) {
            allUsers.push(dbUser);
          }
        });
      }
      
      return NextResponse.json({ success: true, users: allUsers });
    } catch (dbErr) {
      console.warn('Using globalUserStore fallback:', dbErr);
    }

    return NextResponse.json({ success: true, users: globalUserStore });
  } catch (error: any) {
    return NextResponse.json({ success: true, users: globalUserStore });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role = 'BUSINESS_DEVELOPER', department = 'General', phone = '', employee_id = '' } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
    }

    const newUser: any = {
      _id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      password_hash: password,
      role,
      department: department.trim(),
      phone: phone.trim() || '9876543210',
      employee_id: employee_id.trim() || `EMP-${Date.now().toString().slice(-4)}`
    };

    globalUserStore.unshift(newUser);

    try {
      await connectDB();
      const userDoc = new User({
        ...newUser,
        password_hash: password
      });
      await userDoc.save();
    } catch (dbErr) {
      console.warn('User DB save fallback:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `Account created for ${name} (${role})!`,
      user: newUser
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error creating user' }, { status: 500 });
  }
}
