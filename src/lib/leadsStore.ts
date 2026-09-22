// Shared in-memory store ensuring local development works 100% seamlessly
export interface MemoryLead {
  _id: string;
  lead_id: string;
  school_name: string;
  school_address: string;
  school_email: string;
  contact_person: string;
  contact_number: string;
  inquiry_generated_by: string;
  inquiry_generator_name: string;
  inquiry_generator_phone: string;
  requirement: string;
  additional_message?: string;

  lead_source: string;
  lead_source_details: string;
  lead_provided_by_type: string;
  lead_provided_by_name: string;

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
  duplicate_status?: string;
  meeting_date?: Date | string;
  meeting_type?: string;
  meeting_place?: string;
  meeting_attendees?: string;
  meeting_notes?: string;
  reminder_24h_sent?: boolean;

  notes: any[];
  activity_history: any[];
  phase2?: any;
  phase3?: any;
  phase4?: any;
  purchase_checklist?: any;
  createdAt: Date;
  updatedAt: Date;
}

const globalForLeads = globalThis as unknown as {
  __AIRG_GLOBAL_LEADS_STORE__?: MemoryLead[];
};

const initialLeads: MemoryLead[] = [
  {
    _id: 'mem-1',
    lead_id: 'LD#LAB26A101',
    school_name: 'Gyan Deep Public School',
    school_address: 'Station Road, Satara, Maharashtra',
    school_email: 'principal@gyandeep.edu.in',
    contact_person: 'Mrs. Deshmukh (Principal)',
    contact_number: '9822123456',
    inquiry_generated_by: 'Principal',
    inquiry_generator_name: 'Mrs. Deshmukh',
    inquiry_generator_phone: '9822123456',
    requirement: 'AI Innovation Lab',
    additional_message: 'Interested in setting up 30-computer AI lab.',
    lead_source: 'Website',
    lead_source_details: 'Public School Inquiry Form',
    lead_provided_by_type: 'School',
    lead_provided_by_name: 'Gyan Deep Public School',
    created_by_id: 'PUBLIC_FORM',
    created_by_name: 'Mrs. Deshmukh',
    created_by_phone: '9822123456',
    created_by_role: 'Public School Inquiry',
    creator_category: 'EXTERNAL',
    suggested_owner_id: '',
    suggested_owner_name: '',
    assigned_to_id: 'UNASSIGNED',
    assigned_to_name: 'UNASSIGNED',
    status: 'NEW',
    is_duplicate: false,
    notes: [],
    activity_history: [
      { action: 'LEAD_GENERATED', performed_by: 'Mrs. Deshmukh', details: 'Public lead generated.', timestamp: new Date() }
    ],
    createdAt: new Date('2026-09-01T10:00:00Z'),
    updatedAt: new Date('2026-09-01T10:00:00Z')
  },
  {
    _id: 'mem-2',
    lead_id: 'LD#LAB26A102',
    school_name: 'Sunrise International School',
    school_address: 'Pune-Bangalore Highway, Phaltan, Satara',
    school_email: 'info@sunriseschool.edu.in',
    contact_person: 'Mr. Patil (IT Head)',
    contact_number: '9890123456',
    inquiry_generated_by: 'Teacher',
    inquiry_generator_name: 'Suyash Patil',
    inquiry_generator_phone: '7820848915',
    requirement: 'Robotics & Drone Kit Setup',
    additional_message: 'Referred by employee Rahul Sharma.',
    lead_source: 'Employee Referral',
    lead_source_details: 'Referred by Rahul Sharma (Employee)',
    lead_provided_by_type: 'Employee',
    lead_provided_by_name: 'Rahul Sharma (Employee)',
    created_by_id: 'INTERNAL_USER',
    created_by_name: 'Rahul Sharma',
    created_by_phone: '9876543210',
    created_by_role: 'EMPLOYEE',
    creator_category: 'INTERNAL',
    suggested_owner_id: 'SUGGESTED',
    suggested_owner_name: 'Amit Kumar (BD)',
    assigned_to_id: 'UNASSIGNED',
    assigned_to_name: 'UNASSIGNED',
    status: 'NEW',
    is_duplicate: false,
    notes: [],
    activity_history: [
      { action: 'LEAD_CREATED_INTERNAL', performed_by: 'Rahul Sharma', details: 'Internal lead created.', timestamp: new Date() }
    ],
    createdAt: new Date('2026-09-02T11:30:00Z'),
    updatedAt: new Date('2026-09-02T11:30:00Z')
  }
];

export const globalLeadsStore: MemoryLead[] = globalForLeads.__AIRG_GLOBAL_LEADS_STORE__ || initialLeads;

if (!globalForLeads.__AIRG_GLOBAL_LEADS_STORE__) {
  globalForLeads.__AIRG_GLOBAL_LEADS_STORE__ = globalLeadsStore;
}

export function getNextLeadSeqId(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const prefix = `LD#LAB${year}A`;
  const nextSeq = globalLeadsStore.length + 101;
  return `${prefix}${nextSeq}`;
}
