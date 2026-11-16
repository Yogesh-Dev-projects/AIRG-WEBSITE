import mongoose, { Schema, Document } from 'mongoose';

export interface ILeadAssignmentHistory extends Document {
  lead_id: string;
  previous_assignee_id: string;
  previous_assignee_name: string;
  new_assignee_id: string;
  new_assignee_name: string;
  assigned_by_id: string;
  assigned_by_name: string;
  reason: string;
  assigned_at: Date;
}

const LeadAssignmentHistorySchema = new Schema<ILeadAssignmentHistory>(
  {
    lead_id: { type: String, required: true, index: true },
    previous_assignee_id: { type: String, default: 'UNASSIGNED' },
    previous_assignee_name: { type: String, default: 'UNASSIGNED' },
    new_assignee_id: { type: String, required: true },
    new_assignee_name: { type: String, required: true },
    assigned_by_id: { type: String, required: true, default: 'CEO' },
    assigned_by_name: { type: String, required: true, default: 'CEO / Head' },
    reason: { type: String, default: 'Initial Lead Assignment' },
    assigned_at: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.models.LeadAssignmentHistory ||
  mongoose.model<ILeadAssignmentHistory>('LeadAssignmentHistory', LeadAssignmentHistorySchema);
