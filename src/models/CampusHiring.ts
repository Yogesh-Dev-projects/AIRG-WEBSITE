import mongoose, { Schema, Document } from "mongoose";

export interface ICampusHiring extends Document {
  // Applicant Info
  full_name: string;
  college_name: string;
  contact_number: string;
  email: string;
  nationality: string;
  experience: string;
  skills: string;
  why_hire: string;
  // Position
  position_applied: string;
  other_position?: string; // if "Other"
  // CV
  cv_file_name?: string;
  cv_file_type?: string;
  cv_file_base64?: string;
  cv_link?: string;
  cv_submit_method: "file" | "link";
  // Meta
  application_id: string;
  applied_at: Date;
  status: "PENDING" | "REVIEWED" | "SHORTLISTED" | "REJECTED" | "SELECTED";
  ceo_notes?: string;
}

const CampusHiringSchema = new Schema<ICampusHiring>({
  full_name: { type: String, required: true },
  college_name: { type: String, required: true },
  contact_number: { type: String, required: true },
  email: { type: String, required: true },
  nationality: { type: String, required: true },
  experience: { type: String, required: true },
  skills: { type: String, required: true },
  why_hire: { type: String, required: true },
  position_applied: { type: String, required: true },
  other_position: { type: String },
  cv_file_name: { type: String },
  cv_file_type: { type: String },
  cv_file_base64: { type: String },
  cv_link: { type: String },
  cv_submit_method: { type: String, enum: ["file", "link"], required: true },
  application_id: { type: String, required: true, unique: true },
  applied_at: { type: Date, default: Date.now },
  status: { type: String, enum: ["PENDING", "REVIEWED", "SHORTLISTED", "REJECTED", "SELECTED"], default: "PENDING" },
  ceo_notes: { type: String }
}, { timestamps: true });

export default mongoose.models.CampusHiring || mongoose.model<ICampusHiring>("CampusHiring", CampusHiringSchema);

