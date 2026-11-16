import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import { globalLeadsStore } from '@/lib/leadsStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lead_id, coordinator_name, coordinator_phone, coordinator_email, nominated_by = 'Business Developer' } = body;

    if (!lead_id || !coordinator_name || !coordinator_email) {
      return NextResponse.json({ error: 'Lead ID, Coordinator Name, and Coordinator Email are required.' }, { status: 400 });
    }

    const updatedPhase4Info = {
      coordinator_name: coordinator_name.trim(),
      coordinator_phone: coordinator_phone ? coordinator_phone.trim() : '9822123456',
      coordinator_email: coordinator_email.trim().toLowerCase(),
      coordinator_account_created: false,
      status: 'OPEN'
    };

    // 1. Update in-memory store
    const memLead = globalLeadsStore.find(l => l.lead_id.trim().toLowerCase() === lead_id.trim().toLowerCase());
    if (memLead) {
      memLead.phase4 = {
        ...memLead.phase4,
        ...updatedPhase4Info
      };
      memLead.status = 'COORDINATOR_NOMINATED';
      memLead.activity_history.push({
        action: 'COORDINATOR_NOMINATED_BY_BD',
        performed_by: nominated_by,
        details: `Nominated School Coordinator ${coordinator_name} (${coordinator_email}) for Phase 4 setup. Sent to CEO for Approval & Account Generation.`,
        timestamp: new Date()
      });
    }

    // 2. Update MongoDB
    try {
      await connectDB();
      const lead = await Lead.findOne({ lead_id: { $regex: `^${lead_id.trim()}$`, $options: 'i' } }).exec();
      if (lead) {
        lead.phase4 = {
          ...lead.phase4,
          ...updatedPhase4Info
        };
        lead.status = 'COORDINATOR_NOMINATED';
        lead.activity_history.push({
          action: 'COORDINATOR_NOMINATED_BY_BD',
          performed_by: nominated_by,
          details: `Nominated School Coordinator ${coordinator_name} (${coordinator_email}) for Phase 4 setup. Sent to CEO for Approval & Account Generation.`,
          timestamp: new Date()
        });
        await lead.save();
      }
    } catch (dbErr) {
      console.warn('Nominate coordinator DB fallback:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `School Coordinator ${coordinator_name} nominated successfully! Notification sent to CEO for approval and account creation.`,
      lead: memLead
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error nominating coordinator' }, { status: 500 });
  }
}
