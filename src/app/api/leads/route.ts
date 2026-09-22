import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import { globalLeadsStore } from '@/lib/leadsStore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const userRole = searchParams.get('userRole');
    const userName = searchParams.get('userName');
    const userEmail = searchParams.get('userEmail');
    const userId = searchParams.get('userId');

    const isCeo = !userRole || userRole === 'CEO';
    const cleanName = (userName || '').replace(/\(.*\)/g, '').trim().toLowerCase();

    let allLeads: any[] = [];

    try {
      await connectDB();
      const dbLeads = await Lead.find({}).sort({ createdAt: -1 }).lean().exec();
      if (dbLeads && dbLeads.length > 0) {
        allLeads = dbLeads.map((d: any) => ({ ...d, _id: d._id ? d._id.toString() : `db-${Date.now()}` }));
      }
    } catch (dbErr) {
      console.warn('MongoDB fetch fallback:', dbErr);
    }

    // Merge in memory leads (prefer memory version if updated more recently)
    globalLeadsStore.forEach(memLead => {
      const idx = allLeads.findIndex(l => l.lead_id && l.lead_id.trim().toLowerCase() === memLead.lead_id.trim().toLowerCase());
      if (idx !== -1) {
        // If memory lead has assignment or phase updates, merge them
        const isMemAssigned = memLead.assigned_to_name && memLead.assigned_to_name.toUpperCase() !== 'UNASSIGNED';
        allLeads[idx] = {
          ...allLeads[idx],
          ...memLead,
          assigned_to_name: isMemAssigned ? memLead.assigned_to_name : allLeads[idx].assigned_to_name,
          assigned_to_id: memLead.assigned_to_id || allLeads[idx].assigned_to_id,
          status: memLead.status || allLeads[idx].status,
          phase2: memLead.phase2 || allLeads[idx].phase2,
          phase3: memLead.phase3 || allLeads[idx].phase3
        };
      } else {
        allLeads.push(memLead);
      }
    });

    // 1. Filter by Status
    if (status && status !== 'ALL') {
      allLeads = allLeads.filter(l => l.status === status);
    }

    // 2. Filter by Search Query
    if (search) {
      const q = search.toLowerCase();
      allLeads = allLeads.filter(
        l =>
          (l.lead_id && l.lead_id.toLowerCase().includes(q)) ||
          (l.school_name && l.school_name.toLowerCase().includes(q)) ||
          (l.contact_person && l.contact_person.toLowerCase().includes(q)) ||
          (l.inquiry_generator_name && l.inquiry_generator_name.toLowerCase().includes(q))
      );
    }

    // 3. Role-based visibility isolation (Non-CEO sees created or assigned leads)
    if (!isCeo && (cleanName || userId || userEmail)) {
      const qId = userId || '';
      allLeads = allLeads.filter(l => {
        const creatorName = (l.created_by_name || '').replace(/\(.*\)/g, '').trim().toLowerCase();
        const inquiryName = (l.inquiry_generator_name || '').replace(/\(.*\)/g, '').trim().toLowerCase();
        const providerName = (l.lead_provided_by_name || '').replace(/\(.*\)/g, '').trim().toLowerCase();
        const assignedName = (l.assigned_to_name || '').replace(/\(.*\)/g, '').trim().toLowerCase();
        const assignedId = (l.assigned_to_id || '').toLowerCase();

        const isCreator =
          (creatorName && (creatorName.includes(cleanName) || cleanName.includes(creatorName))) ||
          (l.created_by_id && l.created_by_id === qId) ||
          (inquiryName && (inquiryName.includes(cleanName) || cleanName.includes(inquiryName))) ||
          (providerName && (providerName.includes(cleanName) || cleanName.includes(providerName)));

        const isAssigned =
          (assignedName && assignedName !== 'unassigned' && (assignedName.includes(cleanName) || cleanName.includes(assignedName))) ||
          (assignedId && (assignedId === qId.toLowerCase() || assignedId.includes(cleanName) || cleanName.includes(assignedId)));

        return isCreator || isAssigned;
      });
    }

    // Sort newest first
    allLeads.sort((a, b) => new Date(b.createdAt || Date.now()).getTime() - new Date(a.createdAt || Date.now()).getTime());

    return NextResponse.json({ success: true, leads: allLeads });
  } catch (error: any) {
    return NextResponse.json({ success: true, leads: globalLeadsStore });
  }
}
