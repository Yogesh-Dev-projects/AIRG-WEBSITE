import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, phone, position, resumeLink, resumeFile, coverLetter } = await request.json();

    const smtpUser = process.env.SMTP_USER || "airgdatalab@gmail.com";
    const smtpPass = process.env.SMTP_PASS;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Handle resume presentation
    let resumeHTML = "";
    const attachments = [];

    if (resumeFile && resumeFile.base64) {
      resumeHTML = `<p style="font-size: 14px; margin: 0 0 10px 0;"><strong>Resume/CV:</strong> Attached directly (${resumeFile.name})</p>`;
      
      // Parse base64 content
      const base64Data = resumeFile.base64.split(",")[1];
      attachments.push({
        filename: resumeFile.name,
        content: Buffer.from(base64Data, 'base64'),
        contentType: resumeFile.type
      });
    } else if (resumeLink) {
      resumeHTML = `<p><strong>Resume/CV Link:</strong> <a href="${resumeLink}" target="_blank" style="background-color: #EB0028; color: white; padding: 5px 12px; text-decoration: none; border-radius: 4px; font-size: 12px; font-weight: bold; display: inline-block;">Open Candidate Resume</a></p>
                    <p style="font-size: 11px; color: #777; margin-top: 5px; margin-bottom: 20px;">Resume URL: <a href="${resumeLink}">${resumeLink}</a></p>`;
    } else {
      resumeHTML = `<p style="color: #EE2C3C; font-weight: bold;">No Resume Provided</p>`;
    }

    const mailOptions = {
      from: `"AIR G Careers" <${smtpUser}>`,
      to: "gurujiairlab@gmail.com", // Send to requested email address
      replyTo: email,
      subject: `New Job Application: ${position} - ${name}`,
      attachments: attachments,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #EB0028; border-bottom: 2px solid #EB0028; padding-bottom: 10px; margin-top: 0;">New Job Application</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 150px; color: #555;">Position:</td>
              <td style="padding: 6px 0; color: #1a1a2e; font-size: 15px; font-weight: bold;">${position}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #555;">Full Name:</td>
              <td style="padding: 6px 0; color: #1a1a2e;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #555;">Email Address:</td>
              <td style="padding: 6px 0; color: #1a1a2e;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #555;">Phone Number:</td>
              <td style="padding: 6px 0; color: #1a1a2e;">${phone}</td>
            </tr>
          </table>
          <div style="margin-bottom: 20px; padding: 10px 0; border-bottom: 1px solid #eee;">
            ${resumeHTML}
          </div>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; border-left: 4px solid #EB0028; margin-top: 10px;">
            <h4 style="margin-top: 0; color: #1a1a2e; margin-bottom: 8px;">Cover Letter / Message:</h4>
            <p style="white-space: pre-wrap; color: #444; line-height: 1.5; margin: 0; font-size: 13px;">${coverLetter || "No cover letter provided."}</p>
          </div>
        </div>
      `,
    };

    if (smtpPass) {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true, message: "Application submitted successfully" });
    } else {
      console.warn("SMTP_PASS is not configured. Logged career submission:", mailOptions);
      return NextResponse.json({ 
        success: true, 
        message: "Logged form submission locally (SMTP_PASS not set)" 
      });
    }
  } catch (error: any) {
    console.error("Error submitting application:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
