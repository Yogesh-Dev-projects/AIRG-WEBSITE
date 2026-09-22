import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import { globalLeadsStore } from '@/lib/leadsStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      lead_id,
      meeting_date,
      meeting_type = 'In-Person',
      meeting_place = 'School Campus',
      meeting_attendees,
      meeting_notes,
      performed_by = 'Authorized User'
    } = body;

    if (!lead_id || !meeting_date) {
      return NextResponse.json({ error: 'Lead ID and Meeting Date are required.' }, { status: 400 });
    }

    const meetingDateObj = new Date(meeting_date);
    const activityEntry = {
      action: 'MEETING_SCHEDULED_ACTION_ON',
      performed_by,
      details: `Lead turned ON. Meeting scheduled for ${meetingDateObj.toLocaleDateString('en-IN')} at ${meeting_place}. Attendees: ${meeting_attendees || 'Principal & BD'}.`,
      timestamp: new Date()
    };

    // Try DB update
    try {
      await connectDB();
      const lead = await Lead.findOne({ lead_id }).exec();
      if (lead) {
        lead.is_active_lead = true;
        lead.status = 'MEETING_SCHEDULED';
        lead.meeting_date = meetingDateObj;
        lead.meeting_type = meeting_type;
        lead.meeting_place = meeting_place;
        lead.meeting_attendees = meeting_attendees;
        lead.meeting_notes = meeting_notes;
        lead.activity_history.push(activityEntry);

        await lead.save();
        return NextResponse.json({
          success: true,
          message: 'Lead turned ON & Meeting scheduled successfully!',
          lead
        });
      }
    } catch (dbErr) {
      console.warn('Fallback memory update for schedule meeting:', dbErr);
    }

    // Memory Store Fallback
    const memLead = globalLeadsStore.find(l => l.lead_id === lead_id || l._id === lead_id);
    if (memLead) {
      memLead.is_active_lead = true;
      memLead.status = 'MEETING_SCHEDULED';
      memLead.meeting_date = meetingDateObj.toISOString();
      memLead.meeting_type = meeting_type;
      memLead.meeting_place = meeting_place;
      memLead.meeting_attendees = meeting_attendees;
      memLead.meeting_notes = meeting_notes;
      memLead.activity_history.push(activityEntry);

      return NextResponse.json({
        success: true,
        message: 'Lead turned ON & Meeting scheduled successfully!',
        lead: memLead
      });
    }

    return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
