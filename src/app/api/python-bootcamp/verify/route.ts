import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formData, screenshotBase64 } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'airglabdata@gmail.com',
        pass: process.env.EMAIL_PASS || 'your_app_password',
      }
    });

    const mailOptions: any = {
      from: process.env.EMAIL_USER || 'airglabdata@gmail.com',
      to: 'khanvilkarshravani06@gmail.com',
      subject: `New Python Bootcamp Registration: ${formData.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #EE2C3C; border-bottom: 2px solid #EE2C3C; padding-bottom: 10px;">New Registration for Python Bootcamp</h2>
          
          <h3 style="background-color: #f4f4f4; padding: 10px; border-radius: 4px;">Personal Details:</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 8px;"><strong>Full Name:</strong> ${formData.fullName}</li>
            <li style="margin-bottom: 8px;"><strong>Email:</strong> ${formData.email}</li>
            <li style="margin-bottom: 8px;"><strong>Mobile:</strong> ${formData.mobile}</li>
            <li style="margin-bottom: 8px;"><strong>City:</strong> ${formData.city}</li>
            <li style="margin-bottom: 8px;"><strong>State:</strong> ${formData.state}</li>
            <li style="margin-bottom: 8px;"><strong>School/College Name:</strong> ${formData.schoolCollege}</li>
          </ul>

          <h3 style="background-color: #f4f4f4; padding: 10px; border-radius: 4px;">Experience & Motivation:</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 8px;"><strong>Current Status:</strong> ${formData.professionStatus}</li>
            <li style="margin-bottom: 8px;"><strong>Learned Python Before?:</strong> ${formData.learnedPython}</li>
            <li style="margin-bottom: 8px;"><strong>Reason to Join:</strong> ${formData.reasonToJoin}</li>
            <li style="margin-bottom: 8px;"><strong>Heard About Bootcamp:</strong> ${formData.hearAbout}</li>
          </ul>

          <h3 style="background-color: #f4f4f4; padding: 10px; border-radius: 4px;">Payment Details:</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 8px;"><strong>Payment UID / Transaction ID:</strong> ${formData.paymentUid || "Not Provided"}</li>
            <li style="margin-bottom: 8px;"><strong>Payment Screenshot:</strong> See attachment below.</li>
          </ul>
        </div>
      `
    };

    // Attach screenshot if it exists
    if (screenshotBase64) {
      const base64Data = screenshotBase64.split(';base64,').pop();
      if (base64Data) {
        mailOptions.attachments = [
          {
            filename: `payment_screenshot_${formData.fullName.replace(/\s+/g, '_')}.png`,
            content: base64Data,
            encoding: 'base64'
          }
        ];
      }
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Registration email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
