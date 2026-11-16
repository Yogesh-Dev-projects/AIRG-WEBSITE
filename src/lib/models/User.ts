import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password_hash: string;
  role: 'CEO' | 'MARKETING' | 'BUSINESS_DEVELOPER' | 'EMPLOYEE' | 'EXTERNAL_BD';
  department: string;
  phone?: string;
  employee_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password_hash: { type: String, required: true },
    role: {
      type: String,
      enum: ['CEO', 'MARKETING', 'BUSINESS_DEVELOPER', 'EMPLOYEE', 'EXTERNAL_BD'],
      default: 'EMPLOYEE',
      required: true
    },
    department: { type: String, default: 'General' },
    phone: { type: String, default: '' },
    employee_id: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
