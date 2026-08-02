import nodemailer from "nodemailer";

interface ReceiptDetails {
  email: string;
  phone?: string;
  amount: number;
  utr: string;
  orderId?: string;
  type: "checkout" | "recharge";
  customerName?: string;
  itemName?: string;
  screenshot?: string;
  shippingDetails?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    phone?: string;
    email?: string;
  };
}

/**
 * Sends detailed HTML email notifications to BOTH Admin/Team and Customer.
 */
export async function sendEmailReceipt(details: ReceiptDetails) {
  const { email, phone, amount, utr, orderId, type, customerName, itemName, screenshot, shippingDetails } = details;

  try {
    const smtpUser = process.env.SMTP_USER || "airglabdata@gmail.com";
    const smtpPass = process.env.SMTP_PASS;
    const adminEmails = ["airglabdata@gmail.com", "airgdatalab@gmail.com", "gurujiairlab@gmail.com"];

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass, // App password
      },
    });

    const isRecharge = type === "recharge";
    const courseTitle = itemName || (isRecharge ? "Wallet Recharge" : "Course / Product Purchase");
    const displayCustomerName = customerName || shippingDetails?.email?.split("@")[0] || "Customer";
    const displayPhone = phone || shippingDetails?.phone || "N/A";
    const displayEmail = email || shippingDetails?.email || "N/A";

    // Prepare payment screenshot attachment if base64 provided
    const attachments: any[] = [];
    if (screenshot && typeof screenshot === "string" && screenshot.startsWith("data:image/")) {
      const matches = screenshot.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        const base64Data = matches[2];
        const ext = mimeType.split("/")[1] || "jpeg";
        attachments.push({
          filename: `Payment-Proof-${orderId || utr}.${ext}`,
          content: Buffer.from(base64Data, "base64"),
          contentType: mimeType,
        });
      }
    }

    // 1. ADMIN NOTIFICATION EMAIL CONTENT
    const adminHtmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: auto; padding: 24px; border: 2px solid #e82e32; rounded: 16px; background-color: #ffffff;">
        <div style="background-color: #e82e32; text-align: center; padding: 16px; border-radius: 12px; margin-bottom: 20px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">🚨 NEW COURSE REGISTRATION / PAYMENT</h2>
          <p style="color: #ffe4e6; font-size: 13px; margin: 4px 0 0 0;">AIR G International Purchase Alert</p>
        </div>

        <div style="padding: 10px 0;">
          <h3 style="color: #0f172a; font-size: 18px; margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Registration Details</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; font-weight: bold; color: #475569;">Course / Item</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 15px; font-weight: bold; color: #e82e32;">${courseTitle}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; font-weight: bold; color: #475569;">Amount Paid</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 18px; font-weight: 900; color: #16a34a;">₹${amount.toLocaleString()}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; font-weight: bold; color: #475569;">12-Digit UTR / Ref No.</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 15px; font-family: monospace; font-weight: bold; color: #0f172a;">${utr}</td>
            </tr>
            ${orderId ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; font-weight: bold; color: #475569;">Order ID</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; font-weight: bold; color: #2563eb;">${orderId}</td>
            </tr>` : ""}
          </table>

          <h3 style="color: #0f172a; font-size: 18px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Student Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; font-weight: bold; color: #475569; width: 35%;">Student Name</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; color: #0f172a; font-weight: bold;">${displayCustomerName}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; font-weight: bold; color: #475569;">Email Address</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; color: #2563eb; font-weight: bold;"><a href="mailto:${displayEmail}">${displayEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; font-weight: bold; color: #475569;">Phone / WhatsApp</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; color: #0f172a; font-weight: bold;"><a href="tel:${displayPhone}">${displayPhone}</a></td>
            </tr>
            ${shippingDetails?.street ? `
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; font-weight: bold; color: #475569;">Address</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; color: #0f172a;">
                ${shippingDetails.street}, ${shippingDetails.city || ""}, ${shippingDetails.state || ""} ${shippingDetails.pincode || ""}
              </td>
            </tr>` : ""}
          </table>

          ${attachments.length > 0 ? `
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 12px; border-radius: 8px; margin-bottom: 20px; color: #166534; font-size: 13px; font-weight: bold;">
            📎 Payment Screenshot attached directly to this email for quick verification!
          </div>` : `
          <div style="background-color: #fefce8; border: 1px solid #fef08a; padding: 12px; border-radius: 8px; margin-bottom: 20px; color: #854d0e; font-size: 13px;">
            ⚠️ No screenshot attachment was included in this submission. Please verify UTR <strong>${utr}</strong> in bank records.
          </div>`}
        </div>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center; color: #64748b; font-size: 12px;">
          <p style="margin: 0;">Automated alert generated by AIR G International Website.</p>
        </div>
      </div>
    `;

    // 2. CUSTOMER RECEIPT EMAIL CONTENT
    const customerHtmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; border-bottom: 2px solid #e82e32; padding-bottom: 20px;">
          <h2 style="color: #e82e32; margin: 0; font-size: 24px;">AIR G International</h2>
          <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">Course Registration Receipt</p>
        </div>
        
        <div style="padding: 20px 0;">
          <p style="font-size: 16px; color: #1e293b; margin: 0 0 10px 0;">Hello <strong>${displayCustomerName}</strong>,</p>
          <p style="font-size: 14px; color: #475569; line-height: 1.5; margin: 0 0 20px 0;">
            Thank you for registering! Your payment of <strong>₹${amount.toLocaleString()}</strong> for <strong>${courseTitle}</strong> has been received and is currently under verification by our team.
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="background-color: #f8fafc;">
              <th style="text-align: left; padding: 10px; border: 1px solid #e2e8f0; font-size: 12px; color: #475569; text-transform: uppercase;">Registration Details</th>
              <th style="text-align: right; padding: 10px; border: 1px solid #e2e8f0; font-size: 12px; color: #475569; text-transform: uppercase;">Info</th>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; color: #1e293b;">Course / Item</td>
              <td style="text-align: right; padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; font-weight: bold; color: #e82e32;">${courseTitle}</td>
            </tr>
            ${orderId ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; color: #1e293b;">Order ID</td>
              <td style="text-align: right; padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; font-weight: bold; color: #0284c7;">${orderId}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; color: #1e293b;">12-Digit UTR</td>
              <td style="text-align: right; padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; font-family: monospace; color: #1e293b;">${utr}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; color: #1e293b;">Amount Paid</td>
              <td style="text-align: right; padding: 10px; border: 1px solid #e2e8f0; font-size: 16px; font-weight: bold; color: #0f172a;">₹${amount.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; color: #1e293b;">Status</td>
              <td style="text-align: right; padding: 10px; border: 1px solid #e2e8f0; font-size: 12px; font-weight: bold; color: #0284c7; text-transform: uppercase;">PENDING VERIFICATION</td>
            </tr>
          </table>
          
          <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
            Our support team will verify your transaction shortly and grant access to your course. For questions, reply directly to this email or call/WhatsApp us at <strong>+91 98607 79172</strong>.
          </p>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; color: #94a3b8; font-size: 11px;">
          <p style="margin: 0 0 5px 0;">This is an automated course registration receipt.</p>
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} AIR G International. All rights reserved.</p>
        </div>
      </div>
    `;

    const adminMailOptions = {
      from: `"AIR G Course Alert" <${smtpUser}>`,
      to: adminEmails,
      subject: `🚨 NEW REGISTRATION: ${courseTitle} - ₹${amount.toLocaleString()} (${displayCustomerName})`,
      html: adminHtmlContent,
      attachments: attachments,
    };

    const customerMailOptions = {
      from: `"AIR G International" <${smtpUser}>`,
      to: displayEmail,
      subject: `[Receipt] Course Registration Received: ${courseTitle}`,
      html: customerHtmlContent,
    };

    if (smtpPass) {
      // Dispatch both Admin alert email and Customer receipt email
      const [adminRes, customerRes] = await Promise.allSettled([
        transporter.sendMail(adminMailOptions),
        displayEmail ? transporter.sendMail(customerMailOptions) : Promise.resolve(null),
      ]);
      
      console.log("Admin email alert dispatch result:", adminRes);
      console.log("Customer receipt email dispatch result:", customerRes);
      return { success: true };
    } else {
      console.warn("SMTP_PASS is not configured in environment variables. Email notification logged locally:", {
        adminRecipient: adminEmails,
        customerRecipient: displayEmail,
        courseTitle,
        amount,
        utr
      });
      return { success: false, error: "SMTP_PASS not set in environment" };
    }
  } catch (error: any) {
    console.error("Error sending course registration email:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Sends a receipt confirmation via SMS or WhatsApp using Twilio or Msg91.
 */
export async function sendSmsReceipt(details: ReceiptDetails) {
  const { phone, amount, utr, orderId, type } = details;

  if (!phone) {
    console.log("No phone number provided for receipt SMS/WhatsApp");
    return { success: false, error: "No phone number" };
  }

  // Normalize phone number to include country code (default to +91 if Indian format)
  let formattedPhone = phone.trim();
  if (formattedPhone.length === 10) {
    formattedPhone = `+91${formattedPhone}`;
  } else if (!formattedPhone.startsWith("+")) {
    formattedPhone = `+${formattedPhone}`;
  }

  const messageText = `AIR G: Payment details of Rs.${amount} received. UTR: ${utr}. Under verification. You will be notified once confirmed.`;

  // 1. Twilio Integration
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioNumber = process.env.TWILIO_PHONE_NUMBER || "whatsapp:+14155238886"; // Can use a standard SMS sender or WhatsApp sender

      const isWhatsApp = twilioNumber.startsWith("whatsapp:");
      const toRecipient = isWhatsApp ? `whatsapp:${formattedPhone}` : formattedPhone;

      const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

      const bodyParams = new URLSearchParams();
      bodyParams.append("From", twilioNumber);
      bodyParams.append("To", toRecipient);
      bodyParams.append("Body", messageText);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyParams.toString(),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(`Twilio message sent to ${toRecipient}: ${data.sid}`);
        return { success: true, provider: "twilio" };
      } else {
        console.error("Twilio API Error:", data);
        return { success: false, provider: "twilio", error: data.message };
      }
    } catch (err: any) {
      console.error("Error sending Twilio message:", err);
      return { success: false, error: err.message };
    }
  }

  // 2. Msg91 Integration (Alternate option)
  if (process.env.MSG91_AUTH_KEY && process.env.MSG91_TEMPLATE_ID) {
    try {
      const response = await fetch("https://api.msg91.com/api/v5/flow/", {
        method: "POST",
        headers: {
          "authkey": process.env.MSG91_AUTH_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          template_id: process.env.MSG91_TEMPLATE_ID,
          recipients: [
            {
              mobiles: formattedPhone.replace("+", ""), // Msg91 requires no '+' sign
              amount: amount.toString(),
              utr: utr,
              orderId: orderId || "N/A"
            }
          ]
        }),
      });

      const data = await response.json();
      if (response.ok && data.type === "success") {
        console.log(`Msg91 SMS sent to ${formattedPhone}`);
        return { success: true, provider: "msg91" };
      } else {
        console.error("Msg91 API Error:", data);
        return { success: false, provider: "msg91", error: data.message || "Failed" };
      }
    } catch (err: any) {
      console.error("Error sending Msg91 SMS:", err);
      return { success: false, error: err.message };
    }
  }

  console.warn("SMS/WhatsApp credentials are not configured. Logged message text:", messageText);
  return { success: false, error: "SMS providers not configured" };
}

/**
 * Logs a payment details row to the configured Google Sheet via Apps Script Web App.
 */
export async function logPaymentToGoogleSheet(details: {
  email: string;
  phone?: string;
  amount: number;
  utr: string;
  orderId?: string;
  customerName?: string;
  screenshot?: string;
}) {
  const webappUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;

  if (!webappUrl) {
    console.warn("GOOGLE_SHEET_WEBAPP_URL is not set. Google Sheet logging skipped.");
    return { success: false, error: "URL not set" };
  }

  try {
    console.log("Sending to Google Sheet:", webappUrl);

    const response = await fetch(webappUrl, {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });

    const text = await response.text();

    console.log("Google Sheet Status:", response.status);
    console.log("Google Sheet Response:", text);

    return {
      success: response.ok,
      response: text,
    };
  } catch (err: any) {
    console.error("Failed to connect to Google Sheet webapp URL:", err);

    return {
      success: false,
      error: err?.message || String(err),
    };
  }
}