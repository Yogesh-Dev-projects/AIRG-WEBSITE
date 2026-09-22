import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import { globalLeadsStore, getNextLeadSeqId } from '@/lib/leadsStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      school_name,
      school_address,
      school_email,
      contact_person,
      contact_number,
      inquiry_generated_by = 'Principal',
      inquiry_generator_name = '',
      inquiry_generator_phone = '',
      requirement = 'AI Innovation Lab',
      additional_message = ''
    } = body;

    if (!school_name || !school_address || !school_email || !contact_person || !contact_number) {
      return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 });
    }

    const genName = inquiry_generator_name ? inquiry_generator_name.trim() : contact_person.trim();
    const genPhone = inquiry_generator_phone ? inquiry_generator_phone.trim() : contact_number.trim();
    const lead_id = getNextLeadSeqId();

    const memLead: any = {
      _id: `mem-${Date.now()}`,
      lead_id,
      school_name: school_name.trim(),
      school_address: school_address.trim(),
      school_email: school_email.trim(),
      contact_person: contact_person.trim(),
      contact_number: contact_number.trim(),
      inquiry_generated_by,
      inquiry_generator_name: genName,
      inquiry_generator_phone: genPhone,
      requirement,
      additional_message,

      lead_source: 'Website',
      lead_source_details: 'Public School Form on lab.airginternational.com',
      lead_provided_by_type: 'School',
      lead_provided_by_name: school_name.trim(),

      created_by_id: 'PUBLIC_FORM',
      created_by_name: genName,
      created_by_phone: genPhone,
      created_by_role: `Public (${inquiry_generated_by})`,
      creator_category: 'EXTERNAL',

      suggested_owner_id: '',
      suggested_owner_name: '',

      assigned_to_id: 'UNASSIGNED',
      assigned_to_name: 'UNASSIGNED',

      status: 'NEW',

      is_duplicate: false,
      duplicate_of_id: '',
      duplicate_status: 'NONE',

      notes: [],
      activity_history: [
        {
          action: 'LEAD_GENERATED',
          performed_by: genName,
          details: `Public inquiry submitted by ${genName} (${inquiry_generated_by}). Ticket ${lead_id} generated.`,
          timestamp: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Always push to in-memory store to guarantee immediate local visibility
    globalLeadsStore.unshift(memLead);

    try {
      await connectDB();
      const newLead = new Lead(memLead);
      await newLead.save();
    } catch (dbErr) {
      console.warn('Public inquiry DB connection fallback, saved to globalLeadsStore:', dbErr);
    }

    return NextResponse.json({
      success: true,
      lead_id,
      is_duplicate: false,
      message: 'Inquiry registered successfully.'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error creating lead' }, { status: 500 });
  }
}
