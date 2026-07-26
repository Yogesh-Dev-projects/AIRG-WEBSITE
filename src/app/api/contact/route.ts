import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, entityType, entityName, subject, message } = await request.json();

    const smtpUser = process.env.SMTP_USER || "airgdatalab@gmail.com";
    const smtpPass = process.env.SMTP_PASS;

    // Create a transporter using secure TLS on port 465
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"AIR G Contact Form" <${smtpUser}>`,
      to: "airgdatalab@gmail.com",
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nEntity Type: ${entityType || "N/A"}\nEntity Name: ${entityName || "N/A"}\n\nMessage:\n${message}`,
    };

    if (smtpPass) {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true, message: "Email sent successfully" });
    } else {
      console.warn("SMTP_PASS is not configured. Logged form submission:", mailOptions);
      // Fallback for development/testing so it works without crashing
      return NextResponse.json({ 
        success: true, 
        message: "Logged form submission (SMTP_PASS not set in environment variables)" 
      });
    }
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
