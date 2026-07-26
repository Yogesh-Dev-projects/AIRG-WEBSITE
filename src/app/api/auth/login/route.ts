import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
      password: password
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // Update lastSignInTime
    user.lastSignInTime = new Date();
    await user.save();

    const userObj = {
      uid: user._id.toString(),
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      walletBalance: user.walletBalance,
      metadata: {
        creationTime: user.createdAt.toISOString(),
        lastSignInTime: user.lastSignInTime.toISOString()
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
