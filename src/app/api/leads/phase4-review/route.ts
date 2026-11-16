import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import { globalLeadsStore } from '@/lib/leadsStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lead_id, action, rejection_reason = '', performed_by = 'Business Developer' } = body;

    if (!lead_id || !action) {
      return NextResponse.json({ error: 'Lead ID and Review Action are required.' }, { status: 400 });
    }

    const isApprove = action === 'APPROVE';

    // 1. Update in-memory store
    const memLead = globalLeadsStore.find(l => l.lead_id.trim().toLowerCase() === lead_id.trim().toLowerCase());
    if (memLead) {
      if (!memLead.phase4) memLead.phase4 = {};
      
      memLead.phase4.review_status = isApprove ? 'APPROVED' : 'REJECTED';
      memLead.phase4.reviewed_by = performed_by;
      memLead.phase4.reviewed_at = new Date();

      if (isApprove) {
        memLead.phase4.status = 'APPROVED';
        memLead.phase4.rejection_reason = '';
        memLead.status = 'CONVERTED'; // Final conversion completion!
        memLead.activity_history.push({
          action: 'PHASE4_DATA_APPROVED_BY_BD',
          performed_by: performed_by,
          details: `Phase 4 School Representative Data reviewed & APPROVED by ${performed_by}. School setup fully converted!`,
          timestamp: new Date()
        });
      } else {
        memLead.phase4.status = 'REJECTED';
        memLead.phase4.rejection_reason = rejection_reason || 'Information incomplete or requires correction.';
        memLead.phase4.is_submitted = false; // Unlock form for Coordinator
        memLead.status = 'PHASE4_REJECTED';
        memLead.activity_history.push({
          action: 'PHASE4_DATA_REJECTED_BY_BD',
          performed_by: performed_by,
          details: `Phase 4 Data REJECTED by ${performed_by}. Reason: "${rejection_reason || 'N/A'}". Unlocked for Coordinator revision.`,
          timestamp: new Date()
        });
      }
    }

    // 2. Update MongoDB
    try {
      await connectDB();
      const lead = await Lead.findOne({ lead_id: { $regex: `^${lead_id.trim()}$`, $options: 'i' } }).exec();
      if (lead) {
        if (!lead.phase4) lead.phase4 = memLead?.phase4 || {};

        lead.phase4.review_status = isApprove ? 'APPROVED' : 'REJECTED';
        lead.phase4.reviewed_by = performed_by;
        lead.phase4.reviewed_at = new Date();

        if (isApprove) {
          lead.phase4.status = 'APPROVED';
          lead.phase4.rejection_reason = '';
          lead.status = 'CONVERTED';
          lead.activity_history.push({
            action: 'PHASE4_DATA_APPROVED_BY_BD',
            performed_by: performed_by,
            details: `Phase 4 School Representative Data reviewed & APPROVED by ${performed_by}. School setup fully converted!`,
            timestamp: new Date()
          });
        } else {
          lead.phase4.status = 'REJECTED';
          lead.phase4.rejection_reason = rejection_reason || 'Information incomplete or requires correction.';
          lead.phase4.is_submitted = false;
          lead.status = 'PHASE4_REJECTED';
          lead.activity_history.push({
            action: 'PHASE4_DATA_REJECTED_BY_BD',
            performed_by: performed_by,
            details: `Phase 4 Data REJECTED by ${performed_by}. Reason: "${rejection_reason || 'N/A'}". Unlocked for Coordinator revision.`,
            timestamp: new Date()
          });
        }
        await lead.save();
      }
    } catch (dbErr) {
      console.warn('Phase 4 review DB fallback:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: isApprove
        ? `Phase 4 Data APPROVED successfully! Lead converted into Active School Lab Opportunity.`
        : `Phase 4 Data REJECTED. Comments sent back to Coordinator for revision.`,
      lead: memLead
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error processing Phase 4 review' }, { status: 500 });
  }
}
