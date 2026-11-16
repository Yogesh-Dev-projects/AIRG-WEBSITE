import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import { globalLeadsStore } from '@/lib/leadsStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      lead_id,
      is_final_submit = false,
      phase3_data,
      performed_by = 'Business Developer'
    } = body;

    if (!lead_id) {
      return NextResponse.json({ error: 'Lead ID is required.' }, { status: 400 });
    }

    const photos = phase3_data?.photos || [];
    const photo_proof = phase3_data?.photo_proof;
    const hasPhoto = (photos.length > 0) || Boolean(photo_proof?.file_url);

    const hasRep = Boolean(phase3_data?.rep_meeting?.date);
    const hasTeachers = Boolean(phase3_data?.teachers_meeting?.date);
    const hasParents = Boolean(phase3_data?.parents_meeting?.date);
    const hasDemo = Boolean(phase3_data?.student_demo?.date);

    let phaseStatus: 'OPEN' | 'SCHEDULED' | 'COMPLETE' = 'OPEN';
    if (hasPhoto && is_final_submit) {
      phaseStatus = 'COMPLETE';
    } else if (hasRep && hasTeachers && hasParents && hasDemo) {
      phaseStatus = 'SCHEDULED';
    }

    const updatedPhase3 = {
      ...phase3_data,
      status: phaseStatus,
      is_submitted: phaseStatus === 'COMPLETE' || is_final_submit,
      submitted_at: (phaseStatus === 'COMPLETE' || is_final_submit) ? new Date() : (phase3_data?.submitted_at || null),
      updated_by: performed_by
    };

    // 1. Update in-memory store
    const memLead = globalLeadsStore.find(l => l.lead_id === lead_id);
    if (memLead) {
      memLead.phase3 = updatedPhase3;
      memLead.activity_history.push({
        action: phaseStatus === 'COMPLETE' ? 'PHASE3_PROMOTIONAL_COMPLETED' : 'PHASE3_PROMOTIONAL_SAVED',
        performed_by,
        details: phaseStatus === 'COMPLETE' 
          ? `Phase 3 Promotional Phase marked COMPLETE for ${lead_id}. Event photo proof uploaded.`
          : `Phase 3 Promotional Phase schedule updated for ${lead_id}. Status: ${phaseStatus}.`,
        timestamp: new Date()
      });
    }

    // 2. Update MongoDB
    try {
      await connectDB();
      const lead = await Lead.findOne({ lead_id }).exec();
      if (lead) {
        lead.phase3 = updatedPhase3;
        lead.activity_history.push({
          action: phaseStatus === 'COMPLETE' ? 'PHASE3_PROMOTIONAL_COMPLETED' : 'PHASE3_PROMOTIONAL_SAVED',
          performed_by,
          details: phaseStatus === 'COMPLETE' 
            ? `Phase 3 Promotional Phase marked COMPLETE for ${lead_id}. Event photo proof uploaded.`
            : `Phase 3 Promotional Phase schedule updated for ${lead_id}. Status: ${phaseStatus}.`,
          timestamp: new Date()
        });
        await lead.save();
      }
    } catch (dbErr) {
      console.warn('MongoDB update skipped, saved to memory store:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: phaseStatus === 'COMPLETE'
        ? '🎉 Step 3 (Promotional Phase) successfully completed with photo proof!'
        : '💾 Step 3 (Promotional Phase) schedule updated successfully.',
      status: phaseStatus,
      phase3: updatedPhase3
    });
  } catch (error: any) {
    console.error('Phase 3 submit error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
