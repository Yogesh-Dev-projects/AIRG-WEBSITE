import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';

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

    await connectDB();

    // Find the lead in MongoDB — source of truth
    const lead = await Lead.findOne({ lead_id: { $regex: `^${lead_id.trim()}$`, $options: 'i' } }).exec();

    if (!lead) {
      return NextResponse.json({ error: `Lead ${lead_id} not found in database.` }, { status: 404 });
    }

    // Update assignment fields in MongoDB
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

    return NextResponse.json({
      success: true,
      message: `Lead ${lead_id} assigned to ${assigned_to_name} successfully!`,
      lead: {
        lead_id: lead.lead_id,
        assigned_to_name: lead.assigned_to_name,
        assigned_to_id: lead.assigned_to_id,
        assigned_to_role: lead.assigned_to_role,
        status: lead.status
      }
    });

  } catch (error: any) {
    console.error('Lead assign error:', error);
    return NextResponse.json({ error: error.message || 'Error assigning lead' }, { status: 500 });
  }
}

