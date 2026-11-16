import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import { globalLeadsStore } from '@/lib/leadsStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lead_id, items, is_final_submit = false, performed_by = 'Purchase Manager' } = body;

    if (!lead_id || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Lead ID and purchase items array are required.' }, { status: 400 });
    }

    const updatedChecklist = {
      status: is_final_submit ? 'COMPLETED' : 'IN_PROGRESS',
      items,
      verified_by: performed_by,
      verified_at: new Date(),
      is_submitted: is_final_submit
    };

    // 1. Update in-memory store
    const memLead = globalLeadsStore.find(l => l.lead_id.trim().toLowerCase() === lead_id.trim().toLowerCase());
    if (memLead) {
      memLead.purchase_checklist = updatedChecklist;
      if (is_final_submit) {
        memLead.status = 'PURCHASE_COMPLETED';
        memLead.activity_history.push({
          action: 'PURCHASE_CHECKLIST_SUBMITTED',
          performed_by: performed_by,
          details: `Phase 5 Purchase & Inventory Verification Checklist submitted by ${performed_by}. All lab setup items verified.`,
          timestamp: new Date()
        });
      } else {
        if (memLead.status !== 'PURCHASE_COMPLETED') {
          memLead.status = 'PURCHASE_VERIFICATION';
        }
        memLead.activity_history.push({
          action: 'PURCHASE_DRAFT_SAVED',
          performed_by: performed_by,
          details: `Purchase checklist draft saved by ${performed_by}.`,
          timestamp: new Date()
        });
      }
    }

    // 2. Update MongoDB
    try {
      await connectDB();
      const lead = await Lead.findOne({ lead_id: { $regex: `^${lead_id.trim()}$`, $options: 'i' } }).exec();
      if (lead) {
        lead.purchase_checklist = updatedChecklist as any;
        if (is_final_submit) {
          lead.status = 'PURCHASE_COMPLETED';
          lead.activity_history.push({
            action: 'PURCHASE_CHECKLIST_SUBMITTED',
            performed_by: performed_by,
            details: `Phase 5 Purchase & Inventory Verification Checklist submitted by ${performed_by}. All lab setup items verified.`,
            timestamp: new Date()
          });
        } else {
          if (lead.status !== 'PURCHASE_COMPLETED') {
            lead.status = 'PURCHASE_VERIFICATION';
          }
          lead.activity_history.push({
            action: 'PURCHASE_DRAFT_SAVED',
            performed_by: performed_by,
            details: `Purchase checklist draft saved by ${performed_by}.`,
            timestamp: new Date()
          });
        }
        await lead.save();
      }
    } catch (dbErr) {
      console.warn('Purchase checklist submit DB fallback:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: is_final_submit
        ? `Phase 5 Purchase Checklist for Lead ${lead_id} submitted & verified successfully!`
        : `Purchase Checklist draft saved for Lead ${lead_id}.`,
      lead: memLead,
      status: updatedChecklist.status
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error submitting purchase checklist' }, { status: 500 });
  }
}
