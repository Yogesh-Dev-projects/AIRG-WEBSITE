import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const sessionCookie = req.cookies.get("aig_user_session");

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount } = await req.json();
    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const user = await User.findById(sessionCookie.value);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    user.walletBalance = (user.walletBalance || 0) + amount;
    await user.save();

    return NextResponse.json({ 
      success: true, 
      walletBalance: user.walletBalance 
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
