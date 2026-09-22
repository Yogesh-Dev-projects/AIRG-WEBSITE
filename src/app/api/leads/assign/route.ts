import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import { globalLeadsStore } from '@/lib/leadsStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      lead_id, 
      assigned_to_name, 
      assigned_to_id = '', 
      assigned_to_role = 'Team Member', 
      assigned_by_name = 'CEO', 
      reason = '' 
    } = body;

    if (!lead_id || !assigned_to_name) {
      return NextResponse.json({ error: 'Lead ID and Assigned To Name are required.' }, { status: 400 });
    }

    // 1. Update in-memory store
    let memLead = globalLeadsStore.find(l => l.lead_id.trim().toLowerCase() === lead_id.trim().toLowerCase());
    if (memLead) {
      memLead.assigned_to_name = assigned_to_name;
      memLead.assigned_to_id = assigned_to_id || assigned_to_name;
      memLead.assigned_to_role = assigned_to_role;
      memLead.assigned_by_name = assigned_by_name;
      memLead.assigned_at = new Date();
      memLead.status = 'IN_PROCESS';
      memLead.activity_history.push({
        action: 'LEAD_ASSIGNED_BY_CEO',
        performed_by: assigned_by_name,
        details: `CEO assigned lead ${lead_id} to ${assigned_to_name} (${assigned_to_role}). Reason: ${reason || 'N/A'}`,
        timestamp: new Date()
      });
    } else {
      memLead = {
        _id: `mem-assigned-${Date.now()}`,
        lead_id: lead_id,
        school_name: body.school_name || (lead_id.includes('102') ? 'Sunrise International School' : 'Gyan Deep Public School'),
        school_address: body.school_address || 'Satara, Maharashtra',
        school_email: 'info@school.edu.in',
        contact_person: body.contact_person || 'School Principal',
        contact_number: body.contact_number || '9890123456',
        inquiry_generated_by: 'Management',
        inquiry_generator_name: 'Management',
        inquiry_generator_phone: '9890123456',
        requirement: 'AI Innovation Lab',
        lead_source: 'Company Lead Pool',
        lead_source_details: 'CEO Assignment',
        lead_provided_by_type: 'Management',
        lead_provided_by_name: 'CEO',
        created_by_id: 'CEO',
        created_by_name: 'CEO',
        created_by_phone: '9876543210',
        created_by_role: 'CEO',
        creator_category: 'INTERNAL',
        assigned_to_id: assigned_to_id || assigned_to_name,
        assigned_to_name: assigned_to_name,
        assigned_to_role: assigned_to_role,
        assigned_by_name: assigned_by_name,
        assigned_at: new Date(),
        status: 'IN_PROCESS',
        is_duplicate: false,
        notes: [],
        activity_history: [
          {
            action: 'LEAD_ASSIGNED_BY_CEO',
            performed_by: assigned_by_name,
            details: `CEO assigned lead ${lead_id} to ${assigned_to_name} (${assigned_to_role}). Reason: ${reason || 'N/A'}`,
            timestamp: new Date()
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      globalLeadsStore.push(memLead);
    }

    // 2. Update MongoDB
    try {
      await connectDB();
      let lead = await Lead.findOne({ lead_id: { $regex: `^${lead_id.trim()}$`, $options: 'i' } }).exec();
      if (!lead && memLead) {
        // Upsert memory lead into MongoDB if not existing yet
        lead = new Lead({
          ...memLead,
          _id: undefined
        });
      }
      if (lead) {
        lead.assigned_to_name = assigned_to_name;
        lead.assigned_to_id = assigned_to_id || assigned_to_name;
        lead.assigned_to_role = assigned_to_role;
        lead.assigned_by_name = assigned_by_name;
        lead.assigned_at = new Date();
        lead.status = 'IN_PROCESS';
        lead.activity_history.push({
          action: 'LEAD_ASSIGNED_BY_CEO',
          performed_by: assigned_by_name,
          details: `CEO assigned lead ${lead_id} to ${assigned_to_name} (${assigned_to_role}). Reason: ${reason || 'N/A'}`,
          timestamp: new Date()
        });
        await lead.save();
      }
    } catch (dbErr) {
      console.warn('Lead assignment DB fallback:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `Lead ${lead_id} assigned to ${assigned_to_name} successfully!`,
      lead: memLead
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error assigning lead' }, { status: 500 });
  }
}
