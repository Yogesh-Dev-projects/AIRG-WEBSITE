import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const sessionCookie = req.cookies.get("aig_user_session");

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(sessionCookie.value);

    if (!user) {
      return NextResponse.json({ error: "User session not found." }, { status: 401 });
    }

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

    return NextResponse.json(userObj);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
