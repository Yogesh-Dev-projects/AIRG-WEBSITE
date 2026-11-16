import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import { globalLeadsStore } from '@/lib/leadsStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lead_id, coordinator_name, coordinator_phone = '', coordinator_email = '', performed_by = 'CEO' } = body;

    if (!lead_id || !coordinator_name) {
      return NextResponse.json({ error: 'Lead ID and Coordinator Name are required.' }, { status: 400 });
    }

    // 1. Update in-memory store
    const memLead = globalLeadsStore.find(l => l.lead_id.trim().toLowerCase() === lead_id.trim().toLowerCase());
    if (memLead) {
      memLead.phase4 = {
        ...memLead.phase4,
        coordinator_name,
        coordinator_phone: coordinator_phone || memLead.phase4?.coordinator_phone || '9822123456',
        coordinator_email: coordinator_email || memLead.phase4?.coordinator_email || 'coordinator@school.edu.in',
        status: memLead.phase4?.status || 'OPEN'
      };
      memLead.status = 'COORDINATOR_NOMINATED';
      memLead.activity_history.push({
        action: 'PHASE4_COORDINATOR_ASSIGNED',
        performed_by: performed_by,
        details: `Assigned School Coordinator ${coordinator_name} (${coordinator_email || 'N/A'}) for Phase 4 School Representative Input Process.`,
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
          coordinator_name,
          coordinator_phone: coordinator_phone || lead.phase4?.coordinator_phone || '9822123456',
          coordinator_email: coordinator_email || lead.phase4?.coordinator_email || 'coordinator@school.edu.in',
          status: lead.phase4?.status || 'OPEN'
        };
        lead.status = 'COORDINATOR_NOMINATED';
        lead.activity_history.push({
          action: 'PHASE4_COORDINATOR_ASSIGNED',
          performed_by: performed_by,
          details: `Assigned School Coordinator ${coordinator_name} (${coordinator_email || 'N/A'}) for Phase 4 School Representative Input Process.`,
          timestamp: new Date()
        });
        await lead.save();
      }
    } catch (dbErr) {
      console.warn('Phase 4 assign coordinator DB fallback:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `School Coordinator ${coordinator_name} assigned successfully for Lead ${lead_id}!`,
      lead: memLead
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error assigning Phase 4 coordinator' }, { status: 500 });
  }
}
