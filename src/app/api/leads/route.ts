import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const userRole = searchParams.get('userRole');
    const userName = searchParams.get('userName');
    const userId = searchParams.get('userId');
    const category = searchParams.get('category'); // For CEO filters: INTERNAL / EXTERNAL

    const isCeo = !userRole || userRole === 'CEO';
    const cleanName = (userName || '').replace(/\(.*\)/g, '').trim().toLowerCase();

    let allLeads: any[] = [];

    try {
      await connectDB();
      const dbLeads = await Lead.find({}).sort({ createdAt: -1 }).lean().exec();
      if (dbLeads && dbLeads.length > 0) {
        allLeads = dbLeads.map((d: any) => ({ ...d, _id: d._id ? d._id.toString() : '' }));
      }
    } catch (dbErr) {
      console.error('MongoDB fetch error:', dbErr);
      return NextResponse.json({ success: false, leads: [], error: 'Database connection failed' }, { status: 500 });
    }

    // Filter by category (for CEO Lead Records tab)
    if (category && category !== 'ALL') {
      allLeads = allLeads.filter(l => (l.creator_category || '').toUpperCase() === category.toUpperCase());
    }

    // Filter by status
    if (status && status !== 'ALL') {
      allLeads = allLeads.filter(l => l.status === status);
    }

    // Filter by search
    if (search) {
      const q = search.toLowerCase();
      allLeads = allLeads.filter(
        l =>
          (l.lead_id && l.lead_id.toLowerCase().includes(q)) ||
          (l.school_name && l.school_name.toLowerCase().includes(q)) ||
          (l.contact_person && l.contact_person.toLowerCase().includes(q)) ||
          (l.created_by_name && l.created_by_name.toLowerCase().includes(q)) ||
          (l.contact_number && l.contact_number.includes(q))
      );
    }

    // Role-based visibility: non-CEO users only see leads they created or are assigned to
    if (!isCeo && (cleanName || userId)) {
      const qId = (userId || '').toLowerCase();
      allLeads = allLeads.filter(l => {
        const creatorName = (l.created_by_name || '').replace(/\(.*\)/g, '').trim().toLowerCase();
        const providerName = (l.lead_provided_by_name || '').replace(/\(.*\)/g, '').trim().toLowerCase();
        const assignedName = (l.assigned_to_name || '').replace(/\(.*\)/g, '').trim().toLowerCase();
        const creatorId = (l.created_by_id || '').toLowerCase();

        const isCreator =
          (cleanName && (creatorName.includes(cleanName) || cleanName.includes(creatorName))) ||
          (cleanName && (providerName.includes(cleanName) || cleanName.includes(providerName))) ||
          (qId && creatorId && (creatorId === qId || creatorId.includes(qId)));

        const isAssigned =
          (cleanName && assignedName && assignedName !== 'unassigned' &&
            (assignedName.includes(cleanName) || cleanName.includes(assignedName))) ||
          (qId && l.assigned_to_id && l.assigned_to_id.toLowerCase() === qId);

        return isCreator || isAssigned;
      });
    }

    // Sort newest first
    allLeads.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

    return NextResponse.json({ success: true, leads: allLeads });
  } catch (error: any) {
    return NextResponse.json({ success: false, leads: [], error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lead_id = searchParams.get('lead_id');
    const requestedBy = searchParams.get('requestedBy') || '';

    if (!lead_id) {
      return NextResponse.json({ error: 'lead_id is required' }, { status: 400 });
    }

    await connectDB();

    const lead = await Lead.findOne({ lead_id }).exec();

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // If the lead is already assigned (not UNASSIGNED), only CEO can delete
    const isAssigned = lead.assigned_to_id && lead.assigned_to_id.toUpperCase() !== 'UNASSIGNED';
    if (isAssigned && requestedBy !== 'CEO') {
      return NextResponse.json({ error: 'Cannot delete: Lead has already been assigned by CEO.' }, { status: 403 });
    }

    await Lead.deleteOne({ lead_id });

    return NextResponse.json({ success: true, message: `Lead ${lead_id} deleted successfully.` });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error deleting lead' }, { status: 500 });
  }
}

