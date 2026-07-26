import nodemailer from "nodemailer";

interface ReceiptDetails {
  email: string;
  phone?: string;
  amount: number;
  utr: string;
  orderId?: string;
  type: "checkout" | "recharge";
  customerName?: string;
}

/**
 * Sends a detailed HTML receipt to the customer's email address.
 */
export async function sendEmailReceipt(details: ReceiptDetails) {
  const { email, amount, utr, orderId, type, customerName } = details;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER || "airgdatalab@gmail.com",
        pass: process.env.SMTP_PASS, // App password
      },
    });

    const isRecharge = type === "recharge";
    const title = isRecharge ? "Wallet Recharge Successful" : "Order Placed Successfully";

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px; background-color: #ffffff;">
        <div style="text-align: center; border-bottom: 2px solid #e82e32; padding-bottom: 20px;">
          <h2 style="color: #e82e32; margin: 0; font-size: 24px;">AIR G International</h2>
          <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">Elite Verified Business Receipt</p>
        </div>
        
        <div style="padding: 20px 0;">
          <p style="font-size: 16px; color: #1e293b; margin: 0 0 10px 0;">Hello <strong>${customerName || "Customer"}</strong>,</p>
          <p style="font-size: 14px; color: #475569; line-height: 1.5; margin: 0 0 20px 0;">
            Your payment details of <strong>₹${amount.toLocaleString()}</strong> have been successfully submitted for verification. We are currently reviewing your transaction. You will receive another notification once your payment is confirmed and credited.
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="background-color: #f8fafc;">
              <th style="text-align: left; padding: 10px; border: 1px solid #e2e8f0; font-size: 12px; color: #475569; text-transform: uppercase;">Transaction Details</th>
              <th style="text-align: right; padding: 10px; border: 1px solid #e2e8f0; font-size: 12px; color: #475569; text-transform: uppercase;">Value</th>
            </tr>
            ${orderId ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; color: #1e293b;">Order ID</td>
              <td style="text-align: right; padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; font-weight: bold; color: #e82e32;">${orderId}</td>
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
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; color: #1e293b;">Verification Status</td>
              <td style="text-align: right; padding: 10px; border: 1px solid #e2e8f0; font-size: 12px; font-weight: bold; color: #0284c7; text-transform: uppercase;">PENDING</td>
            </tr>
          </table>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; color: #94a3b8; font-size: 11px;">
          <p style="margin: 0 0 5px 0;">This is an automated notification of payment receipt.</p>
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} AIR G International. All rights reserved.</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"AIR G International" <airgdatalab@gmail.com>`,
      to: email,
      subject: `[Receipt] ${title} - ₹${amount}`,
      html: htmlContent,
    };

    if (process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
      console.log(`Receipt email sent successfully to ${email}`);
      return { success: true };
    } else {
      console.warn("SMTP_PASS is not configured. Logged email receipt content:", mailOptions);
      return { success: false, error: "SMTP_PASS not set in environment" };
    }
  } catch (error: any) {
    console.error("Error sending receipt email:", error);
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