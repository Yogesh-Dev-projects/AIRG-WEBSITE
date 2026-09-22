import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import { globalLeadsStore } from '@/lib/leadsStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lead_id, activated_by = 'Business Developer' } = body;

    if (!lead_id) {
      return NextResponse.json({ error: 'Lead ID is required.' }, { status: 400 });
    }

    const initialPhase3 = {
      status: 'OPEN',
      rep_meeting: { date: '', time: '10:00 AM', status: 'Pending' },
      teachers_meeting: { date: '', time: '02:00 PM', status: 'Pending' },
      parents_meeting: { date: '', time: '04:00 PM', status: 'Pending' },
      student_demo: { date: '', time: '11:00 AM', no_of_sections: 2, required_days: 1, status: 'Pending' },
      photo_proof: { file_url: '', uploaded_at: new Date(), caption: '' },
      photos: [
        '/centres/gallery/photo-new-1.jpeg',
        '/centres/gallery/photo-new-2.jpeg'
      ],
      is_submitted: false,
      updated_by: activated_by
    };

    // 1. Update in-memory store
    const memLead = globalLeadsStore.find(l => l.lead_id === lead_id);
    if (memLead) {
      if (!memLead.phase3) {
        memLead.phase3 = initialPhase3;
      }
      memLead.activity_history.push({
        action: 'PHASE3_ACTIVATED',
        performed_by: activated_by,
        details: `Step 3 Promotional Phase activated for ${lead_id}.`,
        timestamp: new Date()
      });
    }

    // 2. Update MongoDB
    try {
      await connectDB();
      const lead = await Lead.findOne({ lead_id }).exec();
      if (lead) {
        if (!lead.phase3) {
          lead.phase3 = initialPhase3;
        }
        lead.activity_history.push({
          action: 'PHASE3_ACTIVATED',
          performed_by: activated_by,
          details: `Step 3 Promotional Phase activated for ${lead_id}.`,
          timestamp: new Date()
        });
        await lead.save();
      }
    } catch (dbErr) {
      console.warn('MongoDB update skipped, saved to memory store:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `Step 3 Promotional Phase activated for lead ${lead_id}`,
      phase3: memLead?.phase3 || initialPhase3
    });
  } catch (error: any) {
    console.error('Phase 3 activate error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
