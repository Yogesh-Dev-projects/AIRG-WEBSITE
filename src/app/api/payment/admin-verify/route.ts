import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Payment";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { orderId, status, secret } = await req.json();

    const expectedSecret = process.env.PAYMENT_VERIFY_SECRET || "aig_sheet_verify_secret_2026_key";
    if (!secret || secret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!orderId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Find the order
    const order = await Order.findOne({ orderId });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const previousStatus = order.status;

    // Handle approval
    if (status === "Verified") {
      if (previousStatus === "completed") {
        return NextResponse.json({ success: true, message: "Order was already completed." });
      }

      order.status = "completed";
      await order.save();

      // If it is a wallet recharge, update the user's balance
      const isRecharge = orderId.startsWith("RECHARGE-") || order.shippingDetails?.street === "Wallet Recharge Request";
      if (isRecharge) {
        const user = await User.findById(order.userId);
        if (user) {
          user.walletBalance = (user.walletBalance || 0) + order.amount;
          await user.save();
          console.log(`Successfully credited ${order.amount} to user ${user.email} (Wallet Balance: ${user.walletBalance})`);
        } else {
          console.warn(`User matching ID ${order.userId} not found for top-up`);
        }
      }
    } else if (status === "Rejected" || status === "Pending") {
      // If moving back from completed to pending/rejected, optionally deduct balance (sanity check)
      if (previousStatus === "completed") {
        order.status = status === "Rejected" ? "rejected" : "pending";
        await order.save();

        const isRecharge = orderId.startsWith("RECHARGE-") || order.shippingDetails?.street === "Wallet Recharge Request";
        if (isRecharge) {
          const user = await User.findById(order.userId);
          if (user) {
            user.walletBalance = Math.max(0, (user.walletBalance || 0) - order.amount);
            await user.save();
            console.log(`Deducted ${order.amount} from user ${user.email} because payment status was set to ${status}`);
          }
        }
      } else {
        // If not completed previously, just update the status
        order.status = status === "Rejected" ? "rejected" : "pending";
        await order.save();
      }
    }

    return NextResponse.json({
      success: true,
      message: `Order ${orderId} status updated to ${order.status}`,
      status: order.status
    });

  } catch (err: any) {
    console.error("Admin verify endpoint error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
