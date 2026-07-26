import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Payment";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const sessionCookie = req.cookies.get("aig_user_session");

    if (!sessionCookie) {
      return NextResponse.json({ enrolled: false, pending: false });
    }

    // Look up any pending order for this user
    const pendingOrder = await Order.findOne({
      userId: sessionCookie.value,
      status: "pending"
    }).sort({ createdAt: -1 });

    const rejectedOrder = await Order.findOne({
      userId: sessionCookie.value,
      status: "rejected"
    }).sort({ createdAt: -1 });

    const completedOrder = await Order.findOne({
      userId: sessionCookie.value,
      status: "completed"
    });

    return NextResponse.json({
      enrolled: !!completedOrder,
      pending: !!pendingOrder,
      rejected: !!rejectedOrder && !pendingOrder && !completedOrder,
      pendingDetails: pendingOrder ? {
        orderId: pendingOrder.orderId,
        amount: pendingOrder.amount,
        createdAt: pendingOrder.createdAt
      } : null,
      rejectedDetails: rejectedOrder ? {
        orderId: rejectedOrder.orderId,
        amount: rejectedOrder.amount,
        createdAt: rejectedOrder.createdAt
      } : null
    });

  } catch (err: any) {
    console.error("Error fetching payment status:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
