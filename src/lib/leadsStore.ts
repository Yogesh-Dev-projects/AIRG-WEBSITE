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

const initialLeads: MemoryLead[] = [];

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
