import mongoose, { Schema, model, models } from "mongoose";

const ReceivedPaymentSchema = new Schema({
  utr: { type: String, required: true, unique: true, index: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["unclaimed", "matched"], default: "unclaimed" },
  createdAt: { type: Date, default: Date.now, expires: 86400 * 30 } // Expire records after 30 days
});

const OrderSchema = new Schema({
  orderId: { type: String, required: true, unique: true, index: true },
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "completed", "rejected"], default: "pending" },
  screenshot: { type: String, default: "" },
  shippingDetails: {
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    pincode: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" }
  },
  createdAt: { type: Date, default: Date.now }
});

export const ReceivedPayment = models.ReceivedPayment || model("ReceivedPayment", ReceivedPaymentSchema);
export const Order = models.Order || model("Order", OrderSchema);
