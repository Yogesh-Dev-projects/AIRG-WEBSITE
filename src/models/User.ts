import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  password: { type: String, required: true }, // Simple text password for mock/local database integration
  role: { type: String, default: "student" },
  walletBalance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  lastSignInTime: { type: Date, default: Date.now }
});

const User = models.User || model("User", UserSchema);
export default User;
