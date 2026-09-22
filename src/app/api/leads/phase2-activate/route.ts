import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import { globalLeadsStore } from '@/lib/leadsStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lead_id, activated_by = 'Business Developer' } = body;

    if (!lead_id) {
      return NextResponse.json({ error: 'Lead ID is required for activation.' }, { status: 400 });
    }

    const memLead = globalLeadsStore.find(l => l.lead_id === lead_id);
    if (memLead) {
      memLead.status = 'ACTIVATED';
      if (!memLead.phase2) {
        memLead.phase2 = {
          activated_by,
          activated_at: new Date(),
          meetings: [],
          coordinator_name: memLead.contact_person || '',
          coordinator_phone: memLead.contact_number || '',
          coordinator_email: memLead.school_email || '',
          coordinator_designation: 'IT Head / Coordinator',
          room_length: 30,
          room_width: 20,
          room_height: 10,
          total_area_sqft: 600,
          proposed_lab_type: 'AI Innovation Lab',
          power_supply: 'Available',
          internet_status: 'Fiber Optic Ready',
          furniture_status: 'Required',
          room_condition: 'Good',
          expected_students: 400,
          expected_revenue: 15000000,
          conversion_model: 'Lab Direct Sale',
          remarks: 'Initial Activation',
          room_photos: [
            '/centres/gallery/photo-new-1.jpeg',
            '/centres/gallery/photo-new-2.jpeg',
            '/centres/gallery/photo-new-3.jpeg'
          ],
          is_submitted: false
        };
      } else {
        memLead.phase2.activated_by = activated_by;
        memLead.phase2.activated_at = new Date();
      }

      memLead.activity_history.push({
        action: 'PHASE2_LEAD_ACTIVATED',
        performed_by: activated_by,
        details: `Lead ${lead_id} activated for Phase 2 Lead Conversion by ${activated_by}.`,
        timestamp: new Date()
      });
    }

    try {
      await connectDB();
      const lead = await Lead.findOne({ lead_id }).exec();
      if (lead) {
        lead.status = 'ACTIVATED';
        if (!lead.phase2) {
          lead.phase2 = {
            activated_by,
            activated_at: new Date(),
            meetings: [],
            coordinator_name: lead.contact_person || '',
            coordinator_phone: lead.contact_number || '',
            coordinator_email: lead.school_email || '',
            coordinator_designation: 'IT Head / Coordinator',
            room_length: 30,
            room_width: 20,
            room_height: 10,
            total_area_sqft: 600,
            proposed_lab_type: 'AI Innovation Lab',
            power_supply: 'Available',
            internet_status: 'Fiber Optic Ready',
            furniture_status: 'Required',
            room_condition: 'Good',
            expected_students: 400,
            expected_revenue: 15000000,
            conversion_model: 'Lab Direct Sale',
            remarks: 'Initial Activation',
            room_photos: [],
            is_submitted: false
          };
        } else {
          lead.phase2.activated_by = activated_by;
          lead.phase2.activated_at = new Date();
        }

        lead.activity_history.push({
          action: 'PHASE2_LEAD_ACTIVATED',
          performed_by: activated_by,
          details: `Lead ${lead_id} activated for Phase 2 Lead Conversion by ${activated_by}.`,
          timestamp: new Date()
        });

        await lead.save();
      }
    } catch (dbErr) {
      console.warn('Phase 2 activate DB fallback:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `Lead ${lead_id} activated successfully for Phase 2!`,
      lead: memLead
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error activating lead' }, { status: 500 });
  }
}
