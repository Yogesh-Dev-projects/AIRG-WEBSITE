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
      phase2_data,
      performed_by = 'Business Developer'
    } = body;

    if (!lead_id) {
      return NextResponse.json({ error: 'Lead ID is required.' }, { status: 400 });
    }

    const length = Number(phase2_data?.room_length || 0);
    const width = Number(phase2_data?.room_width || 0);
    const total_area = length * width;
    const room_photos = phase2_data?.room_photos || [];

    if (is_final_submit) {
      if (room_photos.length < 3) {
        return NextResponse.json(
          { error: 'Minimum 3 room photos are required for final Phase 2 submission.' },
          { status: 400 }
        );
      }
      if (total_area <= 0) {
        return NextResponse.json({ error: 'Valid room dimensions (Length and Width) are required.' }, { status: 400 });
      }
    }

    const memLead = globalLeadsStore.find(l => l.lead_id === lead_id);
    if (memLead) {
      memLead.phase2 = {
        ...memLead.phase2,
        ...phase2_data,
        total_area_sqft: total_area,
        room_photos,
        is_submitted: is_final_submit,
        submitted_at: is_final_submit ? new Date() : memLead.phase2?.submitted_at
      };

      if (is_final_submit) {
        memLead.status = 'CONVERTED';
        memLead.activity_history.push({
          action: 'PHASE2_CONVERSION_SUBMITTED',
          performed_by,
          details: `Phase 2 Lead Conversion completed and submitted for ${lead_id}. Total Room Area: ${total_area} sq ft. Photos uploaded: ${room_photos.length}.`,
          timestamp: new Date()
        });
      } else {
        memLead.status = 'CONVERSION_DRAFT';
        memLead.activity_history.push({
          action: 'PHASE2_DRAFT_SAVED',
          performed_by,
          details: `Phase 2 draft saved for ${lead_id}.`,
          timestamp: new Date()
        });
      }
    }

    try {
      await connectDB();
      const lead = await Lead.findOne({ lead_id }).exec();
      if (lead) {
        lead.phase2 = {
          ...lead.phase2,
          ...phase2_data,
          total_area_sqft: total_area,
          room_photos,
          is_submitted: is_final_submit,
          submitted_at: is_final_submit ? new Date() : lead.phase2?.submitted_at
        };

        if (is_final_submit) {
          lead.status = 'CONVERTED';
          lead.activity_history.push({
            action: 'PHASE2_CONVERSION_SUBMITTED',
            performed_by,
            details: `Phase 2 Lead Conversion completed and submitted for ${lead_id}. Total Room Area: ${total_area} sq ft. Photos uploaded: ${room_photos.length}.`,
            timestamp: new Date()
          });
        } else {
          lead.status = 'CONVERSION_DRAFT';
          lead.activity_history.push({
            action: 'PHASE2_DRAFT_SAVED',
            performed_by,
            details: `Phase 2 draft saved for ${lead_id}.`,
            timestamp: new Date()
          });
        }

        await lead.save();
      }
    } catch (dbErr) {
      console.warn('Phase 2 submit DB fallback:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: is_final_submit
        ? `Phase 2 Lead Conversion successfully submitted for ${lead_id}!`
        : `Phase 2 draft saved for ${lead_id}.`,
      lead: memLead
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error saving Phase 2 conversion data' }, { status: 500 });
  }
}
