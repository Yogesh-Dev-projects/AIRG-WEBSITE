import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      sectionType,
      organizationName,
      contactPerson,
      designation,
      phone,
      email,
      address,
      city,
      sessionType,
      duration,
      preferredDate,
      participantCount,
      department,
      industry,
      specialRequirements,
    } = body;

    const smtpUser = process.env.SMTP_USER || "gurujiairlab@gmail.com";
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

    const sectionLabel =
      sectionType === "school"
        ? "🏫 School Workshop"
        : sectionType === "college"
        ? "🎓 College / Institute Workshop"
        : "🏭 Corporate / Industry Workshop";

    const emailBody = `
===== NEW WORKSHOP BOOKING REQUEST =====

Section: ${sectionLabel}
Session Type: ${sessionType?.toUpperCase()}
Duration: ${duration}

--- Organization Details ---
Organization / Name: ${organizationName}
Contact Person: ${contactPerson}${designation ? ` (${designation})` : ""}
Phone: ${phone}
Email: ${email}

--- Location ---
City: ${city}
Full Address: ${address}

--- Session Details ---
Preferred Date: ${preferredDate}
Number of Participants: ${participantCount}
${department ? `Department / Stream: ${department}` : ""}
${industry ? `Industry / Domain: ${industry}` : ""}

--- Special Requirements ---
${specialRequirements || "None"}

==========================================
This inquiry was submitted via the AIRG Website Workshop Booking Form.
`;

    const mailOptions = {
      from: `"AIRG Workshop Booking" <${smtpUser}>`,
      to: "gurujiairlab@gmail.com",
      replyTo: email,
      subject: `Workshop Booking: ${sessionType?.toUpperCase()} - ${organizationName} (${sectionLabel})`,
      text: emailBody,
    };

    if (smtpPass) {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true, message: "Booking request sent successfully" });
    } else {
      console.warn("SMTP_PASS not configured. Logged workshop booking:", mailOptions);
      return NextResponse.json({
        success: true,
        message: "Booking logged (SMTP not configured in env)",
      });
    }
  } catch (error: any) {
    console.error("Error sending workshop booking email:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
