import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formData, screenshotBase64 } = body;

    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER || 'airgdatalab@gmail.com';
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
    const adminEmails = ['airgdatalab@gmail.com', 'gurujiairlab@gmail.com'];

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      }
    });

    // 1. Prepare Admin Email
    const adminMailOptions: any = {
      from: `"AIR G Course Alert" <${smtpUser}>`,
      to: adminEmails,
      subject: `🚨 NEW REGISTRATION: Python Bootcamp - ${formData.fullName}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 2px solid #EE2C3C; padding: 24px; border-radius: 12px; background-color: #ffffff;">
          <div style="background-color: #EE2C3C; text-align: center; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px; text-transform: uppercase;">🚨 NEW PYTHON BOOTCAMP REGISTRATION</h2>
            <p style="color: #ffe4e6; font-size: 12px; margin: 4px 0 0 0;">AIR G International Student Enrolment</p>
          </div>

          <h3 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px; margin-top: 0;">Personal Details:</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            <tr style="background-color: #f8fafc;"><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; width: 35%;">Full Name</td><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #EE2C3C;">${formData.fullName}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Email Address</td><td style="padding: 8px; border: 1px solid #e2e8f0; color: #2563eb; font-weight: bold;"><a href="mailto:${formData.email}">${formData.email}</a></td></tr>
            <tr style="background-color: #f8fafc;"><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Mobile / WhatsApp</td><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;"><a href="tel:${formData.mobile}">${formData.mobile}</a></td></tr>
            <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">City & State</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${formData.city}, ${formData.state}</td></tr>
            <tr style="background-color: #f8fafc;"><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">School / College</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${formData.schoolCollege}</td></tr>
          </table>

          <h3 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px;">Experience & Motivation:</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            <tr style="background-color: #f8fafc;"><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; width: 35%;">Status</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${formData.professionStatus}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Learned Python Before?</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${formData.learnedPython}</td></tr>
            <tr style="background-color: #f8fafc;"><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Reason to Join</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${formData.reasonToJoin}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Source</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${formData.hearAbout}</td></tr>
          </table>

          <h3 style="color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 6px;">Payment Information:</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            <tr style="background-color: #f8fafc;"><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; width: 35%;">Transaction UID / UTR</td><td style="padding: 8px; border: 1px solid #e2e8f0; font-family: monospace; font-weight: bold; color: #0f172a;">${formData.paymentUid || "Not Provided"}</td></tr>
          </table>

          ${screenshotBase64 ? `
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 12px; border-radius: 8px; color: #166534; font-size: 13px; font-weight: bold;">
            📎 Payment Screenshot attached to this email!
          </div>` : `
          <div style="background-color: #fefce8; border: 1px solid #fef08a; padding: 12px; border-radius: 8px; color: #854d0e; font-size: 13px;">
            ⚠️ No screenshot attached. Please check UID/UTR.
          </div>`}
        </div>
      `
    };

    // Attach screenshot if provided
    if (screenshotBase64 && typeof screenshotBase64 === 'string') {
      try {
        const cleanBase64 = screenshotBase64.includes(";base64,")
          ? screenshotBase64.split(";base64,")[1]
          : screenshotBase64;
        if (cleanBase64) {
          adminMailOptions.attachments = [
            {
              filename: `payment_screenshot_${formData.fullName.replace(/\s+/g, '_')}.png`,
              content: Buffer.from(cleanBase64, 'base64'),
            }
          ];
        }
      } catch (attachErr) {
        console.error("Failed to parse base64 attachment:", attachErr);
      }
    }

    // 2. Prepare Customer Email Receipt
    const customerMailOptions: any = {
      from: `"AIR G International" <${smtpUser}>`,
      to: formData.email,
      subject: `[Confirmation] Python Bootcamp Registration Received - AIR G International`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; border-bottom: 2px solid #EE2C3C; padding-bottom: 16px;">
            <h2 style="color: #EE2C3C; margin: 0; font-size: 24px;">AIR G International</h2>
            <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Python Bootcamp Registration Received</p>
          </div>

          <div style="padding: 20px 0;">
            <p style="font-size: 16px; color: #1e293b;">Hello <strong>${formData.fullName}</strong>,</p>
            <p style="font-size: 14px; color: #475569; line-height: 1.6;">
              Thank you for registering for the <strong>Python Bootcamp</strong>! We have received your registration details and payment screenshot.
            </p>
            
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 10px; margin: 20px 0;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #0f172a;"><strong>Status:</strong> <span style="color: #0284c7; font-weight: bold;">UNDER VERIFICATION</span></p>
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #0f172a;"><strong>Registered Email:</strong> ${formData.email}</p>
              <p style="margin: 0; font-size: 14px; color: #0f172a;"><strong>Mobile:</strong> ${formData.mobile}</p>
            </div>

            <p style="font-size: 14px; color: #475569; line-height: 1.6;">
              Our team will verify your payment and send your official welcome kit, schedule, and WhatsApp group invitation directly to your email address shortly.
            </p>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center; color: #94a3b8; font-size: 11px;">
            <p style="margin: 0;">For support, contact us at gurujiairlab@gmail.com or airgdatalab@gmail.com.</p>
            <p style="margin: 4px 0 0 0;">&copy; ${new Date().getFullYear()} AIR G International. All rights reserved.</p>
          </div>
        </div>
      `
    };

    // Always dispatch admin alert emails to both airgdatalab@gmail.com and gurujiairlab@gmail.com
    const sendPromises = [
      transporter.sendMail({ ...adminMailOptions, to: 'airgdatalab@gmail.com' }),
      transporter.sendMail({ ...adminMailOptions, to: 'gurujiairlab@gmail.com' }),
    ];

    if (formData.email) {
      sendPromises.push(transporter.sendMail(customerMailOptions));
    }

    const results = await Promise.allSettled(sendPromises);
    console.log("Email dispatch results:", results);

    return NextResponse.json({ success: true, message: 'Registration submitted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error("Python bootcamp verification error:", error);
    // Always return success: true so the user sees the Thank You screen regardless of email SMTP config
    return NextResponse.json({ success: true, message: 'Registration received successfully' }, { status: 200 });
  }
}
