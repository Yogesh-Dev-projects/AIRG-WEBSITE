import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog {
  action: string;
  performed_by: string;
  details: string;
  timestamp: Date;
}

export interface INote {
  author: string;
  text: string;
  date: Date;
}

export interface IMeetingDetail {
  meeting_number: number;
  meeting_date: Date;
  meeting_type: string;
  meeting_place: string;
  attendees: string;
  notes: string;
  proof_photo_url?: string;
  next_action_date?: Date;
  status: 'Scheduled' | 'Conducted' | 'Cancelled' | 'Rescheduled';
}

export interface IStandardStudentRow {
  standard: string;
  student_count: number;
  admission_count: number;
  last_year_fees: number;
}

export interface IInfrastructureMeasurementRow {
  item_name: string;
  length_ft: number;
  width_ft: number;
  location_remarks: string;
  photo_url?: string;
  has_pillar?: boolean;
}

export interface IPhase2Data {
  activated_by: string;
  activated_at?: Date;
  meetings: IMeetingDetail[];
  
  // Section 1: Institute Information
  decision_maker_name?: string;
  decision_maker_phone?: string;
  decision_maker_email?: string;
  principal_name?: string;
  principal_phone?: string;
  principal_email?: string;
  program_coordinator_name?: string;
  program_coordinator_phone?: string;
  program_coordinator_email?: string;

  // Section 2: Standard-wise Students Table
  student_counts_table?: IStandardStudentRow[];

  // Section 3: Medium & Board
  medium_of_school?: string[];
  medium_other?: string;
  board_of_school?: string[];
  board_other?: string;

  // Section 4: Existing Knowledge
  ai_robotics_knowledge_level?: 'No Prior Knowledge' | 'Basic' | 'Medium' | 'Advance' | string;

  // Section 5: Facility Availability
  dedicated_classroom_available?: boolean;
  wifi_available?: boolean;

  // Section 6: Infrastructure Measurement Details
  infrastructure_measurements?: IInfrastructureMeasurementRow[];

  // Section 7: Principal Declaration & Signatures
  agreed_compulsory_basis?: boolean;
  min_students_committed?: number;
  min_qualification_required?: string;
  principal_signature_name?: string;
  coordinator_signature_name?: string;
  declaration_date?: Date | string;

  coordinator_name: string;
  coordinator_phone: string;
  coordinator_email: string;
  coordinator_designation: string;

  room_length: number;
  room_width: number;
  room_height: number;
  total_area_sqft: number;
  proposed_lab_type: string;

  power_supply: string;
  internet_status: string;
  furniture_status: string;
  room_condition: string;

  expected_students: number;
  expected_revenue: number;
  conversion_model: 'Lab Direct Sale' | 'Subscription Model';
  remarks: string;

  room_photos: string[];
  room_video_url?: string;
  is_submitted: boolean;
  submitted_at?: Date;
}

export interface IScheduledMeeting {
  date: string;
  time: string;
  notes?: string;
  status: 'Pending' | 'Scheduled' | 'Conducted';
}

export interface IStudentDemoSchedule {
  date: string;
  time: string;
  no_of_sections: number;
  required_days: number;
  notes?: string;
  status: 'Pending' | 'Scheduled' | 'Conducted';
}

export interface IPhotoProof {
  file_url: string;
  uploaded_at: Date | string;
  caption?: string;
}

export interface IPhase3Data {
  status: 'OPEN' | 'SCHEDULED' | 'COMPLETE';
  rep_meeting: IScheduledMeeting;
  teachers_meeting: IScheduledMeeting;
  parents_meeting: IScheduledMeeting;
  student_demo: IStudentDemoSchedule;
  photo_proof?: IPhotoProof;
  photos: string[];
  is_submitted: boolean;
  submitted_at?: Date;
  updated_by?: string;
}

export interface IStudentRow {
  student_name: string;
  standard: string;
  division: string;
  contact_number: string;
  roll_no?: string;
}

export interface IAcademicSchedule {
  timetable_file_url?: string;
  timetable_uploaded_at?: Date | string;
  holidays_list: string;
  exam_dates_schedule: string;
}

export interface IInfrastructureInput {
  wifi_available: boolean;
  wifi_details: string;
  electricity_backup: boolean;
  electricity_details: string;
  classroom_readiness: string;
  facilities_notes: string;
}

export interface ISchoolContacts {
  security_name: string;
  security_phone: string;
  peon_name: string;
  peon_phone: string;
  authorized_rep_name: string;
  authorized_rep_phone: string;
}

export interface IPhase4Data {
  status: 'OPEN' | 'IN_PROGRESS' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  coordinator_name: string;
  coordinator_phone: string;
  coordinator_email: string;
  coordinator_account_created?: boolean;
  coordinator_account_approved_at?: Date | string;
  coordinator_account_approved_by?: string;

  student_list: IStudentRow[];
  academic_schedule: IAcademicSchedule;
  infrastructure_input: IInfrastructureInput;
  school_contacts: ISchoolContacts;

  is_submitted: boolean;
  submitted_at?: Date | string;
  submitted_by?: string;

  review_status?: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
  rejection_reason?: string;
  reviewed_by?: string;
  reviewed_at?: Date | string;
}

export interface IPurchaseItem {
  sr_no: number;
  category: string;
  inventory_item: string;
  description: string;
  expected_qty: string;
  actual_qty: string;
  is_purchased: boolean;
  status: string;
  remarks: string;
}

export interface IPurchaseChecklist {
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
  items: IPurchaseItem[];
  verified_by?: string;
  verified_at?: Date | string;
  is_submitted: boolean;
}

export interface ILead extends Document {
  lead_id: string;
  school_name: string;
  school_address: string;
  school_email: string;
  contact_person: string; // School Person Contact Name
  contact_number: string; // School Contact Number
  inquiry_generated_by: string;
  inquiry_generator_name?: string; // Inquiry Generated By Contact Name
  inquiry_generator_phone?: string; // Inquiry Generated By Contact Number
  requirement: string;
  additional_message?: string;

  lead_source: string;
  lead_source_details: string;
  lead_provided_by_type: string;
  lead_provided_by_name: string;
  lead_provided_by_employee_id?: string;

  created_by_id: string;
  created_by_name: string;
  created_by_phone: string;
  created_by_role: string;
  creator_category: 'INTERNAL' | 'EXTERNAL';

  suggested_owner_id?: string;
  suggested_owner_name?: string;

  assigned_to_id: string;
  assigned_to_name: string;
  assigned_to_role?: string;
  assigned_by_id?: string;
  assigned_by_name?: string;
  assigned_at?: Date;

  status: 'NEW' | 'IN_PROCESS' | 'ACTIVATED' | 'MEETING_SCHEDULED' | 'CONVERSION_DRAFT' | 'CONVERTED' | 'CANCELLED' | 'PHASE3_COMPLETE' | 'COORDINATOR_NOMINATED' | 'PHASE4_ACTIVE' | 'PHASE4_SUBMITTED' | 'PHASE4_APPROVED' | 'PHASE4_REJECTED' | 'PURCHASE_VERIFICATION' | 'PURCHASE_COMPLETED';

  is_active_lead?: boolean;
  is_duplicate: boolean;
  duplicate_of_id?: string;
  duplicate_status?: 'NONE' | 'SUSPECTED' | 'CONFIRMED_RELATED' | 'DISMISSED';

  meeting_date?: Date;
  meeting_type?: string;
  meeting_place?: string;
  meeting_attendees?: string;
  meeting_notes?: string;
  reminder_24h_sent?: boolean;
  notes: INote[];
  activity_history: IActivityLog[];
  phase2?: IPhase2Data;
  phase3?: IPhase3Data;
  phase4?: IPhase4Data;
  purchase_checklist?: IPurchaseChecklist;

  createdAt: Date;
  updatedAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>({
  action: { type: String, required: true },
  performed_by: { type: String, required: true },
  details: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const NoteSchema = new Schema<INote>({
  author: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const MeetingDetailSchema = new Schema<IMeetingDetail>({
  meeting_number: { type: Number, required: true },
  meeting_date: { type: Date, required: true },
  meeting_type: { type: String, default: 'In-Person' },
  meeting_place: { type: String, default: 'School Campus' },
  attendees: { type: String, default: '' },
  notes: { type: String, default: '' },
  proof_photo_url: { type: String, default: '' },
  next_action_date: { type: Date },
  status: { type: String, enum: ['Scheduled', 'Conducted', 'Cancelled', 'Rescheduled'], default: 'Conducted' }
});

const Phase2Schema = new Schema<IPhase2Data>({
  activated_by: { type: String, default: '' },
  activated_at: { type: Date },
  meetings: [MeetingDetailSchema],

  decision_maker_name: { type: String, default: '' },
  decision_maker_phone: { type: String, default: '' },
  decision_maker_email: { type: String, default: '' },
  principal_name: { type: String, default: '' },
  principal_phone: { type: String, default: '' },
  principal_email: { type: String, default: '' },
  program_coordinator_name: { type: String, default: '' },
  program_coordinator_phone: { type: String, default: '' },
  program_coordinator_email: { type: String, default: '' },

  student_counts_table: [
    {
      standard: { type: String },
      student_count: { type: Number, default: 0 },
      admission_count: { type: Number, default: 0 },
      last_year_fees: { type: Number, default: 0 }
    }
  ],

  medium_of_school: [{ type: String }],
  medium_other: { type: String, default: '' },
  board_of_school: [{ type: String }],
  board_other: { type: String, default: '' },

  ai_robotics_knowledge_level: { type: String, default: 'No Prior Knowledge' },

  dedicated_classroom_available: { type: Boolean, default: true },
  wifi_available: { type: Boolean, default: true },

  infrastructure_measurements: [
    {
      item_name: { type: String },
      length_ft: { type: Number, default: 0 },
      width_ft: { type: Number, default: 0 },
      location_remarks: { type: String, default: '' },
      photo_url: { type: String, default: '' },
      has_pillar: { type: Boolean, default: false }
    }
  ],

  agreed_compulsory_basis: { type: Boolean, default: true },
  min_students_committed: { type: Number, default: 0 },
  min_qualification_required: { type: String, default: '' },
  principal_signature_name: { type: String, default: '' },
  coordinator_signature_name: { type: String, default: '' },
  declaration_date: { type: Date },

  coordinator_name: { type: String, default: '' },
  coordinator_phone: { type: String, default: '' },
  coordinator_email: { type: String, default: '' },
  coordinator_designation: { type: String, default: '' },
  room_length: { type: Number, default: 0 },
  room_width: { type: Number, default: 0 },
  room_height: { type: Number, default: 0 },
  total_area_sqft: { type: Number, default: 0 },
  proposed_lab_type: { type: String, default: 'AI Innovation Lab' },
  power_supply: { type: String, default: 'Available' },
  internet_status: { type: String, default: 'Fiber Optic Ready' },
  furniture_status: { type: String, default: 'Required' },
  room_condition: { type: String, default: 'Good' },
  expected_students: { type: Number, default: 0 },
  expected_revenue: { type: Number, default: 0 },
  conversion_model: { type: String, enum: ['Lab Direct Sale', 'Subscription Model'], default: 'Lab Direct Sale' },
  remarks: { type: String, default: '' },
  room_photos: [{ type: String }],
  room_video_url: { type: String, default: '' },
  is_submitted: { type: Boolean, default: false },
  submitted_at: { type: Date }
});

const ScheduledMeetingSchema = new Schema<IScheduledMeeting>({
  date: { type: String, default: '' },
  time: { type: String, default: '' },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Scheduled', 'Conducted'], default: 'Pending' }
});

const StudentDemoScheduleSchema = new Schema<IStudentDemoSchedule>({
  date: { type: String, default: '' },
  time: { type: String, default: '' },
  no_of_sections: { type: Number, default: 1 },
  required_days: { type: Number, default: 1 },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Scheduled', 'Conducted'], default: 'Pending' }
});

const PhotoProofSchema = new Schema<IPhotoProof>({
  file_url: { type: String, default: '' },
  uploaded_at: { type: Date, default: Date.now },
  caption: { type: String, default: '' }
});

const Phase3Schema = new Schema<IPhase3Data>({
  status: { type: String, enum: ['OPEN', 'SCHEDULED', 'COMPLETE'], default: 'OPEN' },
  rep_meeting: ScheduledMeetingSchema,
  teachers_meeting: ScheduledMeetingSchema,
  parents_meeting: ScheduledMeetingSchema,
  student_demo: StudentDemoScheduleSchema,
  photo_proof: PhotoProofSchema,
  photos: [{ type: String }],
  is_submitted: { type: Boolean, default: false },
  submitted_at: { type: Date },
  updated_by: { type: String, default: '' }
});

const LeadSchema = new Schema<ILead>(
  {
    lead_id: { type: String, required: true, unique: true, index: true },
    school_name: { type: String, required: true, index: true },
    school_address: { type: String, required: true },
    school_email: { type: String, required: true },
    contact_person: { type: String, required: true },
    contact_number: { type: String, required: true },
    inquiry_generated_by: { type: String, default: 'Principal' },
    inquiry_generator_name: { type: String, default: '' },
    inquiry_generator_phone: { type: String, default: '' },
    requirement: { type: String, default: 'AI Innovation Lab' },
    additional_message: { type: String, default: '' },

    lead_source: { type: String, required: true, default: 'Website' },
    lead_source_details: { type: String, default: '' },
    lead_provided_by_type: { type: String, default: 'School' },
    lead_provided_by_name: { type: String, default: 'School Directly' },
    lead_provided_by_employee_id: { type: String, default: '' },

    created_by_id: { type: String, required: true, default: 'SYSTEM' },
    created_by_name: { type: String, required: true, default: 'Public Website' },
    created_by_phone: { type: String, default: '' },
    created_by_role: { type: String, required: true, default: 'Public' },
    creator_category: { type: String, enum: ['INTERNAL', 'EXTERNAL'], default: 'EXTERNAL' },

    suggested_owner_id: { type: String, default: '' },
    suggested_owner_name: { type: String, default: '' },

    assigned_to_id: { type: String, default: 'UNASSIGNED', index: true },
    assigned_to_name: { type: String, default: 'UNASSIGNED' },
    assigned_to_role: { type: String, default: '' },
    assigned_by_id: { type: String, default: '' },
    assigned_by_name: { type: String, default: '' },
    assigned_at: { type: Date },

    status: {
      type: String,
      enum: ['NEW', 'IN_PROCESS', 'ACTIVATED', 'MEETING_SCHEDULED', 'CONVERSION_DRAFT', 'CONVERTED', 'CANCELLED'],
      default: 'NEW',
      index: true
    },

    is_active_lead: { type: Boolean, default: false },
    is_duplicate: { type: Boolean, default: false },
    duplicate_of_id: { type: String, default: '' },
    duplicate_status: {
      type: String,
      enum: ['NONE', 'SUSPECTED', 'CONFIRMED_RELATED', 'DISMISSED'],
      default: 'NONE'
    },

    meeting_date: { type: Date },
    meeting_type: { type: String, default: 'In-Person' },
    meeting_place: { type: String, default: 'School Campus' },
    meeting_attendees: { type: String, default: '' },
    meeting_notes: { type: String, default: '' },
    reminder_24h_sent: { type: Boolean, default: false },
    notes: [NoteSchema],
    activity_history: [ActivityLogSchema],
    phase2: Phase2Schema,
    phase3: Phase3Schema
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
