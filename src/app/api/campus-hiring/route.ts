import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import CampusHiring from "@/models/CampusHiring";

function generateApplicationId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CH-${ts}-${rand}`;
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      full_name, college_name, contact_number, email, nationality,
      experience, skills, why_hire,
      position_applied, other_position,
      cv_submit_method, cv_file, cv_link
    } = body;

    const cleanEmail = String(email || "").trim();

    // Validation
    if (!full_name || !college_name || !contact_number || !cleanEmail || !nationality ||
        !experience || !skills || !why_hire || !position_applied) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const application_id = generateApplicationId();
    const finalPosition = position_applied === "Other"
      ? (String(other_position || "").trim() || "Other")
      : String(position_applied).trim();

    // Build DB record (don't store full base64 if too large - store name/type only)
    const dbRecord: any = {
      full_name: String(full_name).trim(),
      college_name: String(college_name).trim(),
      contact_number: String(contact_number).trim(),
      email: cleanEmail,
      nationality: String(nationality).trim(),
      experience: String(experience).trim(),
      skills: String(skills).trim(),
      why_hire: String(why_hire).trim(),
      position_applied: finalPosition,
      other_position: position_applied === "Other" ? String(other_position || "").trim() : undefined,
      cv_submit_method,
      application_id,
      status: "PENDING"
    };

    if (cv_submit_method === "file" && cv_file) {
      dbRecord.cv_file_name = cv_file.name;
      dbRecord.cv_file_type = cv_file.type;
      // Store base64 for all valid uploads up to 4MB (~5.6MB base64)
      if (cv_file.base64 && cv_file.base64.length < 8_000_000) {
        dbRecord.cv_file_base64 = cv_file.base64;
      }
    } else if (cv_submit_method === "link" && cv_link) {
      dbRecord.cv_link = String(cv_link).trim();
    }

    await CampusHiring.create(dbRecord);

    // ─── Base URL for Direct CV Download / Portal Links ────────
    const reqUrl = new URL(request.url);
    const forwardedHost = request.headers.get("x-forwarded-host");
    const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
    const baseUrl = (
      process.env.NEXT_PUBLIC_SITE_URL ||
      (forwardedHost ? `${forwardedProto}://${forwardedHost}` : reqUrl.origin)
    ).replace(/\/+$/, "");

    const cvDownloadUrl = `${baseUrl}/api/campus-hiring/cv?application_id=${encodeURIComponent(application_id)}&mode=download`;
    const cvViewUrl = `${baseUrl}/api/campus-hiring/cv?application_id=${encodeURIComponent(application_id)}&mode=view`;
    const ceoPortalUrl = `${baseUrl}/lab-setup`;

    // ─── Email Setup (Dedicated HR Mailer + Fallback) ──────────
    const hrReceiverEmail = (process.env.HR_RECEIVER_EMAIL || "hr@gurujiair.com").trim();
    const hrSmtpUser = (process.env.HR_SMTP_USER || process.env.HR_EMAIL_USER || "").trim();
    const hrSmtpPass = process.env.HR_SMTP_PASS || process.env.HR_EMAIL_PASS || "";
    const fallbackUser = (process.env.SMTP_USER || process.env.EMAIL_USER || "airglabdata@gmail.com").trim();
    const fallbackPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || "";

    const safeName = escapeHtml(dbRecord.full_name);
    const safeCollege = escapeHtml(dbRecord.college_name);
    const safeEmail = escapeHtml(cleanEmail);
    const safePhone = escapeHtml(dbRecord.contact_number);
    const safeNationality = escapeHtml(dbRecord.nationality);
    const safePosition = escapeHtml(finalPosition);
    const safeExperience = escapeHtml(dbRecord.experience);
    const safeSkills = escapeHtml(dbRecord.skills);
    const safeWhyHire = escapeHtml(dbRecord.why_hire);
    const safeCvLink = dbRecord.cv_link ? escapeHtml(dbRecord.cv_link) : "";
    const appliedDateStr = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata"
    });

    // Build CV section & attachments for HR email
    let cvHTML = "";
    const attachments: any[] = [];
    if (cv_submit_method === "file" && cv_file?.base64) {
      const isPdf = String(cv_file.name || "").toLowerCase().endsWith(".pdf");
      try {
        const base64Data = cv_file.base64.includes(",") ? cv_file.base64.split(",")[1] : cv_file.base64;
        if (base64Data) {
          attachments.push({
            filename: cv_file.name,
            content: Buffer.from(base64Data, "base64"),
            contentType: cv_file.type
          });
          cvHTML = `
            <div style="background: #f0f4ff; border: 1px solid #c7d2fe; border-radius: 10px; padding: 18px;">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #1a1a2e;">
                <strong>CV / Resume File:</strong> ${escapeHtml(cv_file.name)}
                <span style="display: inline-block; background: #dcfce7; color: #166534; font-size: 11px; font-weight: bold; padding: 2px 8px; border-radius: 999px; margin-left: 6px;">Attached in Email</span>
              </p>
              <p style="margin: 0 0 14px 0; font-size: 12px; color: #475569;">
                The full CV is attached to this email, or you can download it directly using the button below:
              </p>
              <div>
                <a href="${cvDownloadUrl}" target="_blank" style="background-color: #4f46e5; color: #ffffff; padding: 10px 18px; text-decoration: none; border-radius: 8px; font-size: 12px; font-weight: bold; display: inline-block; margin-right: 8px;">⬇ Download Full CV</a>
                ${isPdf ? `<a href="${cvViewUrl}" target="_blank" style="background-color: #1a1a2e; color: #ffffff; padding: 10px 18px; text-decoration: none; border-radius: 8px; font-size: 12px; font-weight: bold; display: inline-block;">👁 View CV Online</a>` : ""}
              </div>
            </div>
          `;
        }
      } catch (attachErr) {
        console.error("Failed to attach CV:", attachErr);
        cvHTML = `
          <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 16px;">
            <p style="color:#EE2C3C; margin: 0 0 10px 0;"><strong>CV attachment failed to parse (${escapeHtml(cv_file.name)})</strong></p>
            <a href="${cvDownloadUrl}" target="_blank" style="background-color: #4f46e5; color: #ffffff; padding: 10px 18px; text-decoration: none; border-radius: 8px; font-size: 12px; font-weight: bold; display: inline-block;">⬇ Try Direct CV Download</a>
          </div>
        `;
      }
    } else if (cv_submit_method === "link" && safeCvLink) {
      cvHTML = `
        <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 18px;">
          <p style="margin: 0 0 10px 0; font-size: 13px; color: #1a1a2e;"><strong>CV / Resume Link Provided:</strong></p>
          <a href="${safeCvLink}" target="_blank" style="background-color: #EB0028; color: #ffffff; padding: 10px 18px; text-decoration: none; border-radius: 8px; font-size: 12px; font-weight: bold; display: inline-block;">🔗 Open Candidate Resume</a>
          <p style="font-size: 11px; color: #64748b; margin: 10px 0 0 0; word-break: break-all;">URL: <a href="${safeCvLink}" style="color: #2563eb;">${safeCvLink}</a></p>
        </div>
      `;
    } else {
      cvHTML = `<p style="color:#EE2C3C;"><strong>No CV provided</strong></p>`;
    }

    // ─── Build Mail Content Templates (Sender injected dynamically) ───
    const buildHrMailOptions = (fromEmail: string) => ({
      from: `"AIR G Campus Hiring" <${fromEmail}>`,
      to: hrReceiverEmail,
      replyTo: cleanEmail,
      subject: `🎓 New Campus Application [${application_id}]: ${finalPosition} — ${dbRecord.full_name} (${dbRecord.college_name})`,
      attachments,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px 30px 22px; text-align: center;">
            <h1 style="color: #EE2C3C; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 2px;">New Campus Hiring Application</h1>
            <p style="color: #cbd5e1; margin: 6px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Internship Program — AIR G International</p>
            <div style="margin-top: 14px; background: rgba(238,44,60,0.15); border: 1px solid rgba(238,44,60,0.35); border-radius: 6px; padding: 8px 16px; display: inline-block;">
              <span style="color: #EE2C3C; font-weight: bold; font-size: 13px; font-family: monospace;">${application_id}</span>
            </div>
          </div>
          <div style="padding: 30px; background: #ffffff;">
            <h3 style="color: #1a1a2e; border-bottom: 2px solid #EE2C3C; padding-bottom: 8px; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Student Application Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
              <tr><td style="padding: 9px 8px; color: #64748b; width: 165px; font-weight: bold;">Full Name</td><td style="padding: 9px 8px; color: #1a1a2e; font-weight: 700;">${safeName}</td></tr>
              <tr style="background:#f8fafc;"><td style="padding: 9px 8px; color: #64748b; font-weight: bold;">College / Institute</td><td style="padding: 9px 8px; color: #1a1a2e; font-weight: 600;">${safeCollege}</td></tr>
              <tr><td style="padding: 9px 8px; color: #64748b; font-weight: bold;">Email Address</td><td style="padding: 9px 8px;"><a href="mailto:${safeEmail}" style="color:#EE2C3C; font-weight: 600;">${safeEmail}</a></td></tr>
              <tr style="background:#f8fafc;"><td style="padding: 9px 8px; color: #64748b; font-weight: bold;">Contact Number</td><td style="padding: 9px 8px; color: #1a1a2e; font-weight: 600;">${safePhone}</td></tr>
              <tr><td style="padding: 9px 8px; color: #64748b; font-weight: bold;">Nationality</td><td style="padding: 9px 8px; color: #1a1a2e;">${safeNationality}</td></tr>
              <tr style="background:#f8fafc;"><td style="padding: 9px 8px; color: #64748b; font-weight: bold;">Position Applied</td><td style="padding: 9px 8px;"><span style="background:#EE2C3C;color:#fff;padding:4px 10px;border-radius:4px;font-size:12px;font-weight:bold;">${safePosition}</span></td></tr>
              <tr><td style="padding: 9px 8px; color: #64748b; font-weight: bold;">Experience</td><td style="padding: 9px 8px; color: #1a1a2e;">${safeExperience}</td></tr>
              <tr style="background:#f8fafc;"><td style="padding: 9px 8px; color: #64748b; font-weight: bold;">Applied On</td><td style="padding: 9px 8px; color: #1a1a2e;">${escapeHtml(appliedDateStr)} IST</td></tr>
            </table>
            <div style="background:#f4f4f8; border-radius:8px; padding:16px; margin-bottom:16px;">
              <h4 style="margin:0 0 8px; color:#1a1a2e; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Skills</h4>
              <p style="margin:0; color:#334155; font-size:13px; line-height:1.6;">${safeSkills}</p>
            </div>
            <div style="background:#fff8f8; border-left: 4px solid #EE2C3C; border-radius:0 8px 8px 0; padding:16px; margin-bottom:20px;">
              <h4 style="margin:0 0 8px; color:#1a1a2e; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Why Should We Hire?</h4>
              <p style="margin:0; color:#334155; font-size:13px; line-height:1.6; white-space:pre-wrap;">${safeWhyHire}</p>
            </div>
            <div style="margin-bottom: 20px;">
              ${cvHTML}
            </div>
            <div style="text-align: center; padding-top: 12px; border-top: 1px solid #e2e8f0;">
              <a href="${ceoPortalUrl}" target="_blank" style="color: #4f46e5; font-size: 12px; font-weight: bold; text-decoration: none;">Open CEO Campus Hiring Dashboard →</a>
            </div>
          </div>
          <div style="background:#f8fafc; padding:16px 30px; text-align:center; font-size:11px; color:#94a3b8; border-top: 1px solid #e2e8f0;">
            AIR G International — Campus Hiring Portal | Delivered to ${escapeHtml(hrReceiverEmail)} | ID: ${application_id}
          </div>
        </div>
      `
    });

    const buildApplicantMailOptions = (fromEmail: string) => ({
      from: `"AIR G International — HR" <${fromEmail}>`,
      to: cleanEmail,
      replyTo: hrReceiverEmail,
      subject: `✅ Thank You for Applying — AIR G Campus Internship Program [${application_id}]`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #EE2C3C; margin: 0 0 8px; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Thank You for Applying!</h1>
            <p style="color: #ccc; margin: 0; font-size: 14px;">AIR G International — Campus Hiring (Internship Program)</p>
          </div>
          <div style="padding: 36px 30px; background: #fff;">
            <p style="color: #1a1a2e; font-size: 15px; margin-top: 0;">Dear <strong>${safeName}</strong>,</p>
            <p style="color: #555; font-size: 14px; line-height: 1.7;">
              Thank you for applying to the <strong>AIR G Campus Internship Program</strong>! 🎉<br/>
              We have successfully received your application for the position of <strong>${safePosition}</strong>.
            </p>
            <div style="background: #f4f4f8; border-radius: 10px; padding: 20px; margin: 24px 0;">
              <p style="margin: 0 0 10px; color: #1a1a2e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Application Summary</p>
              <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
                <tr><td style="padding: 6px 0; color: #666; width: 150px;">Application ID</td><td style="color: #EE2C3C; font-weight: bold; font-family: monospace;">${application_id}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Position</td><td style="color: #1a1a2e;">${safePosition}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">College</td><td style="color: #1a1a2e;">${safeCollege}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Applied On</td><td style="color: #1a1a2e;">${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric", timeZone: "Asia/Kolkata" })}</td></tr>
              </table>
            </div>
            <p style="color: #555; font-size: 14px; line-height: 1.7;">
              Our team will carefully review your application and reach out to you within <strong>5–7 working days</strong> if your profile matches our requirements. Please save your Application ID for future reference.
            </p>
            <p style="color: #555; font-size: 14px; line-height: 1.7;">
              For any queries, feel free to contact us at:<br/>
              📧 <a href="mailto:${escapeHtml(hrReceiverEmail)}" style="color:#EE2C3C;">${escapeHtml(hrReceiverEmail)}</a><br/>
              📞 <a href="tel:+918446534087" style="color:#EE2C3C;">+91 8446534087</a>
            </p>
            <p style="color: #1a1a2e; font-size: 14px; margin-bottom: 0;">
              Best Regards,<br/>
              <strong>HR Team — AIR G International</strong><br/>
              <span style="color:#999; font-size:12px;">Lab Guruji Pvt. Limited</span>
            </p>
          </div>
          <div style="background: #1a1a2e; padding: 20px 30px; text-align: center;">
            <p style="color: #666; margin: 0; font-size: 11px;">© 2026 AIR G International. All rights reserved.</p>
            <p style="color: #555; margin: 4px 0 0; font-size: 11px;">Shaping the future of AI education in India 🇮🇳</p>
          </div>
        </div>
      `
    });

    const createTransporter = (user: string, pass: string, customHost?: string, customPort?: string) => {
      const lower = user.toLowerCase();
      const inferredHost = lower.endsWith("@gurujiair.com") ? "smtp.hostinger.com" : "smtp.gmail.com";
      const host = (customHost || inferredHost).trim();
      const port = Number(customPort || 465);
      return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
      });
    };

    let adminEmailSent = false;
    let studentEmailSent = false;
    let senderEmailUsed = "";

    const useHrMailer = Boolean(hrSmtpUser && hrSmtpPass);

    if (useHrMailer) {
      const hrTransporter = createTransporter(
        hrSmtpUser,
        hrSmtpPass,
        process.env.HR_SMTP_HOST,
        process.env.HR_SMTP_PORT
      );
      const [hrResult, studentResult] = await Promise.allSettled([
        hrTransporter.sendMail(buildHrMailOptions(hrSmtpUser)),
        hrTransporter.sendMail(buildApplicantMailOptions(hrSmtpUser))
      ]);

      adminEmailSent = hrResult.status === "fulfilled";
      studentEmailSent = studentResult.status === "fulfilled";
      if (adminEmailSent || studentEmailSent) senderEmailUsed = hrSmtpUser;

      if (hrResult.status === "rejected") {
        console.error("HR SMTP failed for HR notification:", hrResult.reason);
      }
      if (studentResult.status === "rejected") {
        console.error("HR SMTP failed for student thank-you email:", studentResult.reason);
      }

      // Fallback for any failed email if general SMTP credentials are also configured
      if ((!adminEmailSent || !studentEmailSent) && fallbackPass) {
        const fbTransporter = createTransporter(
          fallbackUser,
          fallbackPass,
          process.env.SMTP_HOST,
          process.env.SMTP_PORT
        );
        if (!adminEmailSent) {
          try {
            await fbTransporter.sendMail(buildHrMailOptions(fallbackUser));
            adminEmailSent = true;
            if (!senderEmailUsed) senderEmailUsed = fallbackUser;
          } catch (fbErr) {
            console.error("Fallback SMTP also failed for HR notification:", fbErr);
          }
        }
        if (!studentEmailSent) {
          try {
            await fbTransporter.sendMail(buildApplicantMailOptions(fallbackUser));
            studentEmailSent = true;
            if (!senderEmailUsed) senderEmailUsed = fallbackUser;
          } catch (fbErr) {
            console.error("Fallback SMTP also failed for student thank-you email:", fbErr);
          }
        }
      }
    } else if (fallbackPass) {
      const fbTransporter = createTransporter(
        fallbackUser,
        fallbackPass,
        process.env.SMTP_HOST,
        process.env.SMTP_PORT
      );
      const [hrResult, studentResult] = await Promise.allSettled([
        fbTransporter.sendMail(buildHrMailOptions(fallbackUser)),
        fbTransporter.sendMail(buildApplicantMailOptions(fallbackUser))
      ]);

      adminEmailSent = hrResult.status === "fulfilled";
      studentEmailSent = studentResult.status === "fulfilled";
      senderEmailUsed = fallbackUser;

      if (hrResult.status === "rejected") {
        console.error("Failed to send Campus Hiring HR email:", hrResult.reason);
      }
      if (studentResult.status === "rejected") {
        console.error("Failed to send Campus Hiring student thank-you email:", studentResult.reason);
      }
    } else {
      console.warn("No HR_SMTP_PASS, SMTP_PASS, or EMAIL_PASS configured. Campus hiring logged to DB only.");
    }

    return NextResponse.json({
      success: true,
      application_id,
      studentEmailSent,
      adminEmailSent,
      hrEmailTarget: hrReceiverEmail,
      senderEmailUsed,
      message: "Application submitted successfully"
    });
  } catch (error: any) {
    console.error("Campus Hiring POST error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

function escapeCsvCell(value: unknown): string {
  const str = String(value ?? "").replace(/\r?\n/g, " ");
  if (/[",]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const college = searchParams.get("college") || "";
    const position = searchParams.get("position") || "";
    const status = searchParams.get("status") || "";
    const experience = searchParams.get("experience") || "";
    const nationality = searchParams.get("nationality") || "";
    const dateRange = searchParams.get("dateRange") || "ALL";
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "newest";
    const exportFormat = searchParams.get("export") || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "20", 10)));

    await connectDB();

    const filter: any = {};
    if (college && college !== "ALL") filter.college_name = college;
    if (position && position !== "ALL") filter.position_applied = position;
    if (status && status !== "ALL") filter.status = status;
    if (experience && experience !== "ALL") filter.experience = experience;
    if (nationality && nationality !== "ALL") filter.nationality = nationality;
    if (search.trim()) {
      const q = search.trim();
      filter.$or = [
        { full_name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { contact_number: { $regex: q, $options: "i" } },
        { college_name: { $regex: q, $options: "i" } },
        { position_applied: { $regex: q, $options: "i" } },
        { skills: { $regex: q, $options: "i" } },
        { application_id: { $regex: q, $options: "i" } }
      ];
    }

    // Date filter
    if (dateRange !== "ALL") {
      const now = new Date();
      const from = new Date();
      if (dateRange === "TODAY") { from.setHours(0, 0, 0, 0); }
      else if (dateRange === "WEEK") { from.setDate(now.getDate() - 7); }
      else if (dateRange === "MONTH") { from.setMonth(now.getMonth() - 1); }
      filter.applied_at = { $gte: from };
    }

    const sortMap: Record<string, Record<string, 1 | -1>> = {
      newest: { applied_at: -1 },
      oldest: { applied_at: 1 },
      college_asc: { college_name: 1, applied_at: -1 },
      name_asc: { full_name: 1, applied_at: -1 },
    };
    const sortStage = sortMap[sort] || sortMap.newest;

    // CSV Export for CEO
    if (exportFormat === "csv") {
      const rows = await CampusHiring.find(filter)
        .sort(sortStage)
        .select("-cv_file_base64")
        .lean();

      const header = [
        "Application ID",
        "Full Name",
        "College / Institute",
        "Position Applied",
        "Email",
        "Contact Number",
        "Nationality",
        "Experience",
        "Skills",
        "Why Should We Hire",
        "CV Method",
        "CV File / Link",
        "Status",
        "CEO Notes",
        "Applied Date"
      ];

      const csvLines = [
        header.join(","),
        ...rows.map((r: any) =>
          [
            r.application_id,
            r.full_name,
            r.college_name,
            r.position_applied,
            r.email,
            r.contact_number,
            r.nationality,
            r.experience,
            r.skills,
            r.why_hire,
            r.cv_submit_method,
            r.cv_link || r.cv_file_name || "",
            r.status,
            r.ceo_notes || "",
            r.applied_at ? new Date(r.applied_at).toISOString() : ""
          ]
            .map(escapeCsvCell)
            .join(",")
        )
      ];

      return new NextResponse(csvLines.join("\r\n"), {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="campus-hiring-applications-${new Date().toISOString().slice(0, 10)}.csv"`,
          "Cache-Control": "no-store",
        },
      });
    }

    const [total, applications, analyticsFacet, colleges, positions, experiences, nationalities] = await Promise.all([
      CampusHiring.countDocuments(filter),
      CampusHiring.aggregate([
        { $match: filter },
        { $sort: sortStage },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
          $addFields: {
            has_cv_file: {
              $ne: [{ $ifNull: ["$cv_file_base64", ""] }, ""]
            }
          }
        },
        { $project: { cv_file_base64: 0 } }
      ]),
      CampusHiring.aggregate([
        {
          $facet: {
            overallCounts: [
              {
                $group: {
                  _id: "$status",
                  count: { $sum: 1 }
                }
              }
            ],
            collegeDistribution: [
              {
                $group: {
                  _id: "$college_name",
                  total: { $sum: 1 },
                  pending: { $sum: { $cond: [{ $eq: ["$status", "PENDING"] }, 1, 0] } },
                  reviewed: { $sum: { $cond: [{ $eq: ["$status", "REVIEWED"] }, 1, 0] } },
                  shortlisted: { $sum: { $cond: [{ $eq: ["$status", "SHORTLISTED"] }, 1, 0] } },
                  selected: { $sum: { $cond: [{ $eq: ["$status", "SELECTED"] }, 1, 0] } },
                  rejected: { $sum: { $cond: [{ $eq: ["$status", "REJECTED"] }, 1, 0] } },
                }
              },
              { $sort: { total: -1, _id: 1 } }
            ],
            positionDistribution: [
              {
                $group: {
                  _id: "$position_applied",
                  count: { $sum: 1 }
                }
              },
              { $sort: { count: -1, _id: 1 } }
            ]
          }
        }
      ]),
      CampusHiring.distinct("college_name"),
      CampusHiring.distinct("position_applied"),
      CampusHiring.distinct("experience"),
      CampusHiring.distinct("nationality"),
    ]);

    const facetResult = analyticsFacet[0] || {};
    const statusMap: Record<string, number> = {};
    for (const item of facetResult.overallCounts || []) {
      statusMap[item._id] = item.count;
    }

    const collegeDistribution = (facetResult.collegeDistribution || []).map((c: any) => ({
      college: c._id || "Unknown",
      total: c.total,
      pending: c.pending,
      reviewed: c.reviewed,
      shortlisted: c.shortlisted,
      selected: c.selected,
      rejected: c.rejected,
    }));

    const positionDistribution = (facetResult.positionDistribution || []).map((p: any) => ({
      position: p._id || "Other",
      count: p.count,
    }));

    const overallTotal = Object.values(statusMap).reduce((a, b) => a + b, 0);
    const stats = {
      total: overallTotal,
      pending: statusMap.PENDING || 0,
      reviewed: statusMap.REVIEWED || 0,
      shortlisted: statusMap.SHORTLISTED || 0,
      selected: statusMap.SELECTED || 0,
      rejected: statusMap.REJECTED || 0,
      collegesCount: collegeDistribution.length,
    };

    return NextResponse.json({
      success: true,
      applications,
      total,
      stats,
      collegeDistribution,
      positionDistribution,
      colleges: (colleges as string[]).sort(),
      positions: (positions as string[]).sort(),
      experiences: (experiences as string[]).sort(),
      nationalities: (nationalities as string[]).sort(),
      page,
      limit,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { application_id, status, ceo_notes } = body;

    await connectDB();
    const updated = await CampusHiring.findOneAndUpdate(
      { application_id },
      { $set: { status, ceo_notes } },
      { new: true }
    ).select("-cv_file_base64");

    if (!updated) {
      return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, application: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

