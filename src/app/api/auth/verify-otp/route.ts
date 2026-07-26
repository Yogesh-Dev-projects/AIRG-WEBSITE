import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Otp from "@/models/Otp";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required." }, { status: 400 });
    }

    const record = await Otp.findOne({
      email: email.toLowerCase()
    }).sort({ createdAt: -1 });

    if (!record) {
      return NextResponse.json({ success: false, error: "OTP expired or not found. Please request a new one." }, { status: 400 });
    }

    if (record.otp !== otp.trim()) {
      return NextResponse.json({ success: false, error: "Invalid OTP code." }, { status: 400 });
    }

    // OTP verified successfully, clean it up
    await Otp.deleteOne({ _id: record._id });

    return NextResponse.json({ success: true, message: "OTP verified successfully." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
