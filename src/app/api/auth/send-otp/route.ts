import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Otp from "@/models/Otp";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in database (will replace any existing OTP for this email)
    await Otp.deleteMany({ email: email.toLowerCase() });
    await Otp.create({
      email: email.toLowerCase(),
      otp: otpCode
    });

    const isProduction = process.env.NODE_ENV === "production";
    const smtpUser = process.env.SMTP_USER || "airgdatalab@gmail.com";
    const smtpPass = process.env.SMTP_PASS;
    if (!smtpPass) {
      return NextResponse.json({ 
        success: false, 
        error: "SMTP_PASS is not configured in environment variables. Please add SMTP_PASS to your .env.local file to send verification emails."
      }, { status: 500 });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const mailOptions = {
        from: `"AIR G PAY" <${smtpUser}>`,
        to: email,
        subject: "Verification Code for AIR G Pay",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 10px;">
            <h2 style="color: #E82E32; text-align: center;">AIR G Pay Verification</h2>
            <p>Hello,</p>
            <p>Thank you for using AIR G Pay. Please use the following One-Time Password (OTP) to complete your transaction:</p>
            <div style="background-color: #f8f8f8; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333; margin: 20px 0; border-radius: 5px; border: 1px dashed #E82E32;">
              ${otpCode}
            </div>
            <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
            <br/>
            <p>Best regards,<br/>AIR G International Team</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
    } catch (err: any) {
      console.error("Nodemailer failed to send email:", err);
      return NextResponse.json({ success: false, error: `Failed to send email: ${err.message}` }, { status: 500 });
    }

    // Return response. Never expose OTP in response body.
    return NextResponse.json({
      success: true,
      message: "Verification code sent to email."
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
