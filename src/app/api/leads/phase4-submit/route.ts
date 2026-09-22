import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import { globalLeadsStore } from '@/lib/leadsStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lead_id, phase4_data, is_final_submit = false, performed_by = 'School Coordinator' } = body;

    if (!lead_id || !phase4_data) {
      return NextResponse.json({ error: 'Lead ID and Phase 4 Data are required.' }, { status: 400 });
    }

    const updatedPhase4 = {
      ...phase4_data,
      is_submitted: is_final_submit,
      submitted_at: is_final_submit ? new Date() : (phase4_data.submitted_at || null),
      submitted_by: performed_by
    };

    // 1. Update in-memory store
    const memLead = globalLeadsStore.find(l => l.lead_id.trim().toLowerCase() === lead_id.trim().toLowerCase());
    if (memLead) {
      memLead.phase4 = {
        ...memLead.phase4,
        ...updatedPhase4
      };
      if (is_final_submit) {
        memLead.status = 'PHASE4_SUBMITTED';
        memLead.activity_history.push({
          action: 'PHASE4_SUBMITTED_BY_COORDINATOR',
          performed_by: performed_by,
          details: `Phase 4 School Representative Input Form submitted by ${performed_by}. Status changed to Submitted / Awaiting AIR G Processing.`,
          timestamp: new Date()
        });
      } else {
        if (memLead.status !== 'PHASE4_SUBMITTED') {
          memLead.status = 'PHASE4_ACTIVE';
        }
        memLead.activity_history.push({
          action: 'PHASE4_DRAFT_SAVED',
          performed_by: performed_by,
          details: `Phase 4 draft saved by ${performed_by}.`,
          timestamp: new Date()
        });
      }
    }

    // 2. Update MongoDB
    try {
      await connectDB();
      const lead = await Lead.findOne({ lead_id: { $regex: `^${lead_id.trim()}$`, $options: 'i' } }).exec();
      if (lead) {
        lead.phase4 = {
          ...lead.phase4,
          ...updatedPhase4
        };
        if (is_final_submit) {
          lead.status = 'PHASE4_SUBMITTED';
          lead.activity_history.push({
            action: 'PHASE4_SUBMITTED_BY_COORDINATOR',
            performed_by: performed_by,
            details: `Phase 4 School Representative Input Form submitted by ${performed_by}. Status changed to Submitted / Awaiting AIR G Processing.`,
            timestamp: new Date()
          });
        }
        await lead.save();
      }
    } catch (dbErr) {
      console.warn('Phase 4 submit DB fallback:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: is_final_submit
        ? `Phase 4 School Representative Data submitted successfully! Status updated to "Submitted / Awaiting AIR G Processing".`
        : `Phase 4 Draft saved successfully!`,
      status: is_final_submit ? 'SUBMITTED' : 'IN_PROGRESS',
      lead: memLead
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error processing Phase 4 submit' }, { status: 500 });
  }
}
