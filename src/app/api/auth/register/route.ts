import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password, name, role } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email." }, { status: 400 });
    }

    const newUser = await User.create({
      email: email.toLowerCase(),
      displayName: name,
      password,
      role: role || "student",
      walletBalance: 0
    });

    const userObj = {
      uid: newUser._id.toString(),
      email: newUser.email,
      displayName: newUser.displayName,
      role: newUser.role,
      walletBalance: newUser.walletBalance,
      metadata: {
        creationTime: newUser.createdAt.toISOString(),
        lastSignInTime: newUser.lastSignInTime.toISOString()
      }
    };

    const response = NextResponse.json(userObj);
    response.cookies.set("aig_user_session", userObj.uid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/"
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
