import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';

async function generateNextLeadId() {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const prefix = `LD#LAB${currentYear}A`;

  try {
    const latestLead = await Lead.findOne({ lead_id: new RegExp(`^LD#LAB${currentYear}A`) })
      .sort({ createdAt: -1 })
      .exec();

    if (!latestLead || !latestLead.lead_id) {
      return `${prefix}101`;
    }

    const matches = latestLead.lead_id.match(/\d+$/);
    if (matches && matches[0]) {
      const nextSeq = parseInt(matches[0], 10) + 1;
      return `${prefix}${nextSeq}`;
    }
  } catch (e) {}

  return `${prefix}${Date.now().toString().slice(-4)}`;
}

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
      requirement = 'AI Innovation Lab',
      additional_message = '',
      lead_source = 'Phone Call',
      lead_source_details = '',
      lead_provided_by_type = 'Business Contact',
      lead_provided_by_name = '',
      created_by_name = 'Internal User',
      created_by_phone = '',
      created_by_role = 'Business Developer',
      created_by_id = 'INTERNAL_USER',
      creator_category = 'INTERNAL',
      suggested_owner_name = '',
      loi_document_url = '',
      loi_file_name = ''
    } = body;

    if (!school_name || !school_address || !contact_person || !contact_number) {
      return NextResponse.json({ error: 'School Name, Address, Contact Person, and Contact Number are required.' }, { status: 400 });
    }

    let is_duplicate = false;
    let duplicate_of_id = '';
    let duplicate_status = 'NONE';
    let lead_id = `LD#LAB${new Date().getFullYear().toString().slice(-2)}A${Date.now().toString().slice(-4)}`;

    try {
      await connectDB();

      const safeSchoolName = school_name.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const existingLead = await Lead.findOne({
        $or: [
          { contact_number: contact_number.trim() },
          { school_name: { $regex: new RegExp(`^${safeSchoolName}$`, 'i') } }
        ]
      }).exec();

      lead_id = await generateNextLeadId();
      is_duplicate = !!existingLead;
      duplicate_of_id = existingLead ? existingLead.lead_id : '';
      duplicate_status = existingLead ? 'SUSPECTED' : 'NONE';

      const leadData: any = {
        lead_id,
        school_name: school_name.trim(),
        school_address: school_address.trim(),
        school_email: school_email ? school_email.trim() : `info@${school_name.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu.in`,
        contact_person: contact_person.trim(),
        contact_number: contact_number.trim(),
        inquiry_generated_by,
        requirement,
        additional_message,
        lead_source,
        lead_source_details: lead_source_details || `Lead via ${lead_source}`,
        lead_provided_by_type,
        lead_provided_by_name: lead_provided_by_name || created_by_name,
        created_by_id: created_by_id || 'INTERNAL_USER',
        created_by_name,
        created_by_phone: created_by_phone || '',
        created_by_role,
        creator_category: creator_category || 'INTERNAL',
        suggested_owner_id: suggested_owner_name ? 'SUGGESTED' : '',
        suggested_owner_name: suggested_owner_name || '',
        loi_document_url: loi_document_url || '',
        loi_file_name: loi_file_name || '',
        assigned_to_id: 'UNASSIGNED',
        assigned_to_name: 'UNASSIGNED',
        status: 'NEW',
        is_duplicate,
        duplicate_of_id,
        duplicate_status,
        notes: [],
        activity_history: [
          {
            action: 'LEAD_CREATED_INTERNAL',
            performed_by: created_by_name,
            details: `Lead registered by ${created_by_name} (${created_by_role}). Category: ${creator_category}.`,
            timestamp: new Date()
          }
        ]
      };

      const newLead = new Lead(leadData);
      await newLead.save();

    } catch (dbErr: any) {
      console.error('Lead DB save error:', dbErr);
      return NextResponse.json({ error: 'Database error: ' + (dbErr.message || 'Could not save lead.') }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      lead_id,
      is_duplicate,
      duplicate_of_id,
      message: 'Lead created and saved to database successfully.'
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

