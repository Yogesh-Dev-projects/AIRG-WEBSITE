import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import CampusHiring from "@/models/CampusHiring";

function generateApplicationId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CH-${ts}-${rand}`;
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

    // Validation
    if (!full_name || !college_name || !contact_number || !email || !nationality ||
        !experience || !skills || !why_hire || !position_applied) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const application_id = generateApplicationId();
    const finalPosition = position_applied === "Other" ? (other_position || "Other") : position_applied;

    // Build DB record (don't store full base64 if too large - store name/type only)
    const dbRecord: any = {
      full_name, college_name, contact_number, email, nationality,
      experience, skills, why_hire,
      position_applied: finalPosition,
      other_position: position_applied === "Other" ? other_position : undefined,
      cv_submit_method,
      application_id,
      status: "PENDING"
    };

    if (cv_submit_method === "file" && cv_file) {
      dbRecord.cv_file_name = cv_file.name;
      dbRecord.cv_file_type = cv_file.type;
      // Store base64 for small files, skip for very large
      if (cv_file.base64 && cv_file.base64.length < 5_000_000) {
        dbRecord.cv_file_base64 = cv_file.base64;
      }
    } else if (cv_submit_method === "link" && cv_link) {
      dbRecord.cv_link = cv_link;
    }

    await CampusHiring.create(dbRecord);

    // ─── Email Setup ───────────────────────────────────────────
    const smtpUser = process.env.SMTP_USER || "airgdatalab@gmail.com";
    const smtpPass = process.env.SMTP_PASS;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass }
    });

    // Build CV section for admin email
    let cvHTML = "";
    const attachments: any[] = [];
    if (cv_submit_method === "file" && cv_file?.base64) {
      const base64Data = cv_file.base64.split(",")[1];
      cvHTML = `<p><strong>CV/Resume:</strong> Attached (${cv_file.name})</p>`;
      attachments.push({
        filename: cv_file.name,
        content: Buffer.from(base64Data, "base64"),
        contentType: cv_file.type
      });
    } else if (cv_submit_method === "link" && cv_link) {
      cvHTML = `<p><strong>CV Link:</strong> <a href="${cv_link}" style="color:#EB0028;">${cv_link}</a></p>`;
    } else {
      cvHTML = `<p style="color:#EE2C3C;"><strong>No CV provided</strong></p>`;
    }

    // ─── Admin Notification Email ───────────────────────────────
    const adminMailOptions = {
      from: `"AIR G Campus Hiring" <${smtpUser}>`,
      to: "gurujiairlab@gmail.com",
      replyTo: email,
      subject: `🎓 New Campus Hiring Application [${application_id}]: ${finalPosition} — ${full_name} (${college_name})`,
      attachments,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px 30px 20px; text-align: center;">
            <h1 style="color: #EE2C3C; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 2px;">Campus Hiring Application</h1>
            <p style="color: #aaa; margin: 6px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Internship Program — AIR G International</p>
            <div style="margin-top: 15px; background: rgba(238,44,60,0.15); border: 1px solid rgba(238,44,60,0.3); border-radius: 6px; padding: 8px 16px; display: inline-block;">
              <span style="color: #EE2C3C; font-weight: bold; font-size: 13px; font-family: monospace;">${application_id}</span>
            </div>
          </div>
          <div style="padding: 30px; background: #fff;">
            <h3 style="color: #1a1a2e; border-bottom: 2px solid #EE2C3C; padding-bottom: 8px; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Applicant Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
              <tr><td style="padding: 8px 0; color: #666; width: 160px; font-weight: bold;">Full Name</td><td style="padding: 8px 0; color: #1a1a2e; font-weight: 600;">${full_name}</td></tr>
              <tr style="background:#f9f9f9;"><td style="padding: 8px 6px; color: #666; font-weight: bold;">College / Institute</td><td style="padding: 8px 6px; color: #1a1a2e;">${college_name}</td></tr>
              <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color:#EE2C3C;">${email}</a></td></tr>
              <tr style="background:#f9f9f9;"><td style="padding: 8px 6px; color: #666; font-weight: bold;">Contact Number</td><td style="padding: 8px 6px; color: #1a1a2e;">${contact_number}</td></tr>
              <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Nationality</td><td style="padding: 8px 0; color: #1a1a2e;">${nationality}</td></tr>
              <tr style="background:#f9f9f9;"><td style="padding: 8px 6px; color: #666; font-weight: bold;">Position Applied</td><td style="padding: 8px 6px;"><span style="background:#EE2C3C;color:#fff;padding:3px 10px;border-radius:4px;font-size:12px;font-weight:bold;">${finalPosition}</span></td></tr>
              <tr><td style="padding: 8px 0; color: #666; font-weight: bold;">Experience</td><td style="padding: 8px 0; color: #1a1a2e;">${experience}</td></tr>
            </table>
            <div style="background:#f4f4f8; border-radius:8px; padding:16px; margin-bottom:16px;">
              <h4 style="margin:0 0 8px; color:#1a1a2e; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Skills</h4>
              <p style="margin:0; color:#444; font-size:13px; line-height:1.6;">${skills}</p>
            </div>
            <div style="background:#fff8f8; border-left: 4px solid #EE2C3C; border-radius:0 8px 8px 0; padding:16px; margin-bottom:16px;">
              <h4 style="margin:0 0 8px; color:#1a1a2e; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Why Should We Hire?</h4>
              <p style="margin:0; color:#444; font-size:13px; line-height:1.6; white-space:pre-wrap;">${why_hire}</p>
            </div>
            <div style="border-top: 1px solid #eee; padding-top: 16px;">
              ${cvHTML}
            </div>
          </div>
          <div style="background:#f9f9f9; padding:16px 30px; text-align:center; font-size:11px; color:#999;">
            AIR G International — Campus Hiring Portal | Application ID: ${application_id}
          </div>
        </div>
      `
    };

    // ─── Applicant Confirmation Email ───────────────────────────
    const applicantMailOptions = {
      from: `"AIR G International" <${smtpUser}>`,
      to: email,
      subject: `✅ Application Received — AIR G Campus Internship Program [${application_id}]`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #EE2C3C; margin: 0 0 8px; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Application Received!</h1>
            <p style="color: #ccc; margin: 0; font-size: 14px;">AIR G International — Campus Hiring (Internship Program)</p>
          </div>
          <div style="padding: 36px 30px; background: #fff;">
            <p style="color: #1a1a2e; font-size: 15px; margin-top: 0;">Dear <strong>${full_name}</strong>,</p>
            <p style="color: #555; font-size: 14px; line-height: 1.7;">
              Thank you for applying to the <strong>AIR G Campus Internship Program</strong>! 🎉<br/>
              We have successfully received your application for the position of <strong>${finalPosition}</strong>.
            </p>
            <div style="background: #f4f4f8; border-radius: 10px; padding: 20px; margin: 24px 0;">
              <p style="margin: 0 0 10px; color: #1a1a2e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Application Summary</p>
              <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
                <tr><td style="padding: 6px 0; color: #666; width: 150px;">Application ID</td><td style="color: #EE2C3C; font-weight: bold; font-family: monospace;">${application_id}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Position</td><td style="color: #1a1a2e;">${finalPosition}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">College</td><td style="color: #1a1a2e;">${college_name}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Applied On</td><td style="color: #1a1a2e;">${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</td></tr>
              </table>
            </div>
            <p style="color: #555; font-size: 14px; line-height: 1.7;">
              Our team will carefully review your application and reach out to you within <strong>5–7 working days</strong> if your profile matches our requirements. Please save your Application ID for future reference.
            </p>
            <p style="color: #555; font-size: 14px; line-height: 1.7;">
              For any queries, feel free to contact us at:<br/>
              📧 <a href="mailto:hr@gurujiair.com" style="color:#EE2C3C;">hr@gurujiair.com</a><br/>
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
    };

    if (smtpPass) {
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(applicantMailOptions)
      ]);
    } else {
      console.warn("SMTP_PASS not set. Campus hiring logged to DB only.");
    }

    return NextResponse.json({ success: true, application_id, message: "Application submitted successfully" });
  } catch (error: any) {
    console.error("Campus Hiring POST error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const college = searchParams.get("college") || "";
    const position = searchParams.get("position") || "";
    const status = searchParams.get("status") || "";
    const dateRange = searchParams.get("dateRange") || "ALL";
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    await connectDB();

    const filter: any = {};
    if (college && college !== "ALL") filter.college_name = { $regex: college, $options: "i" };
    if (position && position !== "ALL") filter.position_applied = { $regex: position, $options: "i" };
    if (status && status !== "ALL") filter.status = status;
    if (search) {
      filter.$or = [
        { full_name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { college_name: { $regex: search, $options: "i" } },
        { application_id: { $regex: search, $options: "i" } }
      ];
    }

    // Date filter
    if (dateRange !== "ALL") {
      const now = new Date();
      let from = new Date();
      if (dateRange === "TODAY") { from.setHours(0, 0, 0, 0); }
      else if (dateRange === "WEEK") { from.setDate(now.getDate() - 7); }
      else if (dateRange === "MONTH") { from.setMonth(now.getMonth() - 1); }
      filter.applied_at = { $gte: from };
    }

    const total = await CampusHiring.countDocuments(filter);
    const applications = await CampusHiring.find(filter)
      .sort({ applied_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-cv_file_base64") // Don't return huge base64 in list view
      .lean();

    // Get unique colleges for filter dropdown
    const colleges = await CampusHiring.distinct("college_name");
    const positions = await CampusHiring.distinct("position_applied");

    return NextResponse.json({ success: true, applications, total, colleges, positions, page, limit });
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

