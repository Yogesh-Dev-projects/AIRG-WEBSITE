import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';

// GET /api/leads/debug — returns all leads directly from MongoDB with connection status
export async function GET() {
  try {
    await connectDB();
    const leads = await Lead.find({}).sort({ createdAt: -1 }).select('lead_id school_name contact_person created_by_name assigned_to_name status creator_category createdAt').lean().exec();
    return NextResponse.json({
      success: true,
      db_connected: true,
      total_leads_in_db: leads.length,
      leads: leads.map((l: any) => ({
        lead_id: l.lead_id,
        school_name: l.school_name,
        contact_person: l.contact_person,
        created_by_name: l.created_by_name,
        assigned_to_name: l.assigned_to_name,
        status: l.status,
        category: l.creator_category,
        created_at: l.createdAt
      }))
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      db_connected: false,
      error: err.message,
      total_leads_in_db: 0,
      leads: []
    });
  }
}
