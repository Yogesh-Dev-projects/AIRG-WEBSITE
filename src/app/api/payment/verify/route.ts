import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ReceivedPayment, Order } from "@/models/Payment";
import User from "@/models/User";
import { sendEmailReceipt, sendSmsReceipt, logPaymentToGoogleSheet } from "@/lib/notifications";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const sessionCookie = req.cookies.get("aig_user_session");

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { utr, amount, type, orderId, shippingDetails, screenshot } = await req.json();

    if (!utr || !/^\d{12}$/.test(utr)) {
      return NextResponse.json({ error: "Invalid UTR. Must be a 12-digit number." }, { status: 400 });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    // Retrieve user
    const dbUser = await User.findById(sessionCookie.value);
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Trigger notifications asynchronously so they don't block the API response
    const notificationPayload = {
      email: shippingDetails?.email || dbUser.email,
      phone: shippingDetails?.phone,
      amount,
      utr,
      orderId: type === "checkout" ? orderId : undefined,
      type: type as "checkout" | "recharge",
      customerName: dbUser.displayName,
    };

    // Run notifications without blocking HTTP response
    Promise.allSettled([
      sendEmailReceipt(notificationPayload),
      sendSmsReceipt(notificationPayload),
    ]).then((results) => {
      console.log("Notification dispatch completed:", results);
    }).catch((err) => {
      console.error("Critical error in notifications promise:", err);
    });

    if (type === "recharge") {
      const rechargeId = `RECHARGE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      let screenshotUrl = "";
      if (screenshot) {
        try {
          const matches = screenshot.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (matches && matches.length === 3) {
            const fileType = matches[1];
            const extension = fileType.split("/")[1] || "png";
            const buffer = Buffer.from(matches[2], "base64");
            
            const dirPath = path.join(process.cwd(), "public", "uploads", "receipts");
            // Check read-only environment safely
            try {
              if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
              }
              const fileName = `${rechargeId}.${extension}`;
              const filePath = path.join(dirPath, fileName);
              fs.writeFileSync(filePath, buffer);
              screenshotUrl = `/uploads/receipts/${fileName}`;
            } catch (fsErr: any) {
              console.warn("Local storage is read-only (expected on Vercel). Skipping local write. Error:", fsErr.message);
            }
          }
        } catch (uploadError) {
          console.error("Error parsing payment screenshot:", uploadError);
        }
      }

      // Create a pending Order to represent the recharge request
      await Order.findOneAndUpdate(
        { orderId: rechargeId },
        { 
          orderId: rechargeId, 
          userId: dbUser._id, 
          amount, 
          status: "pending", 
          shippingDetails: {
            phone: shippingDetails?.phone || "",
            email: dbUser.email,
            street: "Wallet Recharge Request",
            city: "",
            state: "",
            pincode: ""
          }, 
          screenshot: screenshotUrl, // Remains empty if read-only, but saved to Drive below
          createdAt: new Date() 
        },
        { upsert: true, new: true }
      );

      // Log to Google Sheet (includes base64 upload to Google Drive)
      logPaymentToGoogleSheet({
        email: dbUser.email,
        phone: shippingDetails?.phone,
        amount,
        utr,
        orderId: rechargeId,
        customerName: dbUser.displayName,
        screenshot: screenshot // Send the base64 string to Apps Script to store in Drive
      }).catch(err => console.error("Sheet logging error:", err));

      return NextResponse.json({
        success: true,
        type: "recharge",
        message: "Details submitted successfully. Please wait for confirmation."
      });
    } else if (type === "checkout" && orderId) {
      let screenshotUrl = "";
      if (screenshot) {
        try {
          const matches = screenshot.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (matches && matches.length === 3) {
            const fileType = matches[1];
            const extension = fileType.split("/")[1] || "png";
            const buffer = Buffer.from(matches[2], "base64");
            
            const dirPath = path.join(process.cwd(), "public", "uploads", "receipts");
            try {
              if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
              }
              const fileName = `${orderId}.${extension}`;
              const filePath = path.join(dirPath, fileName);
              fs.writeFileSync(filePath, buffer);
              screenshotUrl = `/uploads/receipts/${fileName}`;
            } catch (fsErr: any) {
              console.warn("Local storage is read-only (expected on Vercel). Skipping local write. Error:", fsErr.message);
            }
          }
        } catch (uploadError) {
          console.error("Error parsing payment screenshot:", uploadError);
        }
      }

      // Create or update the order in pending status
      await Order.findOneAndUpdate(
        { orderId },
        { 
          orderId, 
          userId: dbUser._id, 
          amount, 
          status: "pending", 
          shippingDetails, 
          screenshot: screenshotUrl,
          createdAt: new Date() 
        },
        { upsert: true, new: true }
      );

      // Log to Google Sheet (includes base64 upload to Google Drive)
      logPaymentToGoogleSheet({
        email: shippingDetails?.email || dbUser.email,
        phone: shippingDetails?.phone,
        amount,
        utr,
        orderId,
        customerName: dbUser.displayName,
        screenshot: screenshot // Send the base64 string to Apps Script to store in Drive
      }).catch(err => console.error("Sheet logging error:", err));

      return NextResponse.json({
        success: true,
        type: "checkout",
        message: "Details submitted successfully. Please wait for confirmation."
      });
    }

    return NextResponse.json({ error: "Invalid verification type" }, { status: 400 });

  } catch (err: any) {
    console.error("Verification error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
