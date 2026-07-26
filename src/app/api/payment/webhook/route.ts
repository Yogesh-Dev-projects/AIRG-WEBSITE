import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ReceivedPayment } from "@/models/Payment";

export async function POST(request: Request) {
  try {
    await connectDB();
    
    // Different email parsing services send data in different shapes.
    // E.g., Zapier, Mailgun, SendGrid Inbound Parse, or raw post bodies.
    const body = await request.json();
    
    // We'll read from standard fields like body.text, body.html, or body.plain
    const emailBody = body.text || body.html || body.plain || JSON.stringify(body);
    
    // Regex for typical Indian Bank / UPI transaction alerts:
    // Matches 12-digit numeric UTR/Ref/Txn numbers.
    // Also searches for labels like UTR, Ref, Txn, UPI Ref, Transaction ID
    const utrRegex = /(?:UTR|Ref|Txn|Transaction\s*ID|UPI\s*Ref)(?:\s*(?:No|Num|Number)?\s*[:.-]?\s*)(\d{12})/i;
    
    // Amount matching e.g., Rs. 1,000.00, INR 500, Rs.2000, Rs 50
    const amountRegex = /(?:Rs\.?|INR)\s*([\d,]+(?:\.\d{2})?)/i;

    const utrMatch = emailBody.match(utrRegex);
    const amountMatch = emailBody.match(amountRegex);

    if (!utrMatch) {
      // Fallback: search for any 12-digit number in the text that could be a UTR
      const generic12DigitRegex = /\b\d{12}\b/;
      const fallbackUtrMatch = emailBody.match(generic12DigitRegex);
      if (fallbackUtrMatch && amountMatch) {
        const utrNumber = fallbackUtrMatch[0].trim();
        const amount = parseFloat(amountMatch[1].replace(/,/g, ""));
        
        await ReceivedPayment.findOneAndUpdate(
          { utr: utrNumber },
          { utr: utrNumber, amount, status: "unclaimed", createdAt: new Date() },
          { upsert: true, new: true }
        );
        return NextResponse.json({ success: true, message: "Parsed and saved (fallback)", utr: utrNumber, amount });
      }
      
      return NextResponse.json({ success: false, error: "UTR 12-digit number not found in email" }, { status: 400 });
    }

    if (!amountMatch) {
      return NextResponse.json({ success: false, error: "Amount not found in email" }, { status: 400 });
    }

    const utrNumber = utrMatch[1].trim();
    const amount = parseFloat(amountMatch[1].replace(/,/g, ""));

    // Save/update to received_payments in MongoDB
    await ReceivedPayment.findOneAndUpdate(
      { utr: utrNumber },
      { utr: utrNumber, amount, status: "unclaimed", createdAt: new Date() },
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Payment webhook received and logged successfully", 
      utr: utrNumber, 
      amount 
    });

  } catch (error: any) {
    console.error("Payment Webhook Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
