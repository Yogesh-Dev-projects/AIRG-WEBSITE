import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import { globalLeadsStore } from '@/lib/leadsStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lead_id, is_active, performed_by = 'Authorized User' } = body;

    if (!lead_id) {
      return NextResponse.json({ error: 'Lead ID is required.' }, { status: 400 });
    }

    const activityEntry = {
      action: is_active ? 'LEAD_TURNED_ON' : 'LEAD_TURNED_OFF',
      performed_by,
      details: `Lead status turned ${is_active ? 'ON (Active)' : 'OFF (Inactive)'} by ${performed_by}.`,
      timestamp: new Date()
    };

    try {
      await connectDB();
      const lead = await Lead.findOne({ lead_id }).exec();
      if (lead) {
        lead.is_active_lead = is_active;
        if (is_active && lead.status === 'NEW') {
          lead.status = 'IN_PROCESS';
        }
        lead.activity_history.push(activityEntry);
        await lead.save();

        return NextResponse.json({
          success: true,
          message: `Lead turned ${is_active ? 'ON' : 'OFF'} successfully.`,
          lead
        });
      }
    } catch (dbErr) {
      console.warn('Fallback memory toggle active:', dbErr);
    }

    const memLead = globalLeadsStore.find(l => l.lead_id === lead_id || l._id === lead_id);
    if (memLead) {
      memLead.is_active_lead = is_active;
      if (is_active && memLead.status === 'NEW') {
        memLead.status = 'IN_PROCESS';
      }
      memLead.activity_history.push(activityEntry);
      return NextResponse.json({
        success: true,
        message: `Lead turned ${is_active ? 'ON' : 'OFF'} successfully.`,
        lead: memLead
      });
    }

    return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
