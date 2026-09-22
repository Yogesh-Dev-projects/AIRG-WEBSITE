import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const { lead_id, status, meeting_date, note, performed_by = 'Assigned Representative' } = body;

    if (!lead_id) {
      return NextResponse.json({ error: 'Lead ID is required.' }, { status: 400 });
    }

    const lead = await Lead.findOne({ lead_id }).exec();
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
    }

    if (status) {
      const oldStatus = lead.status;
      lead.status = status;
      lead.activity_history.push({
        action: 'STATUS_UPDATED',
        performed_by,
        details: `Status changed from ${oldStatus} to ${status}.`,
        timestamp: new Date()
      });
    }

    if (meeting_date) {
      lead.meeting_date = new Date(meeting_date);
      if (lead.status !== 'ACTIVE') {
        lead.status = 'MEETING_SCHEDULED';
      }
      lead.activity_history.push({
        action: 'MEETING_SCHEDULED',
        performed_by,
        details: `Meeting scheduled for ${new Date(meeting_date).toLocaleString()}.`,
        timestamp: new Date()
      });
    }

    if (note && note.trim()) {
      lead.notes.push({
        author: performed_by,
        text: note.trim(),
        date: new Date()
      });
      lead.activity_history.push({
        action: 'NOTE_ADDED',
        performed_by,
        details: `Added note: "${note.trim()}"`,
        timestamp: new Date()
      });
    }

    await lead.save();

    return NextResponse.json({
      success: true,
      message: 'Lead updated successfully.',
      lead
    });
  } catch (error: any) {
    console.error('Update lead status error:', error);
    return NextResponse.json({ error: error.message || 'Server error updating lead' }, { status: 500 });
  }
}
