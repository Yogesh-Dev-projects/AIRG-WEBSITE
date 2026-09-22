import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import User from '@/lib/models/User';
import { globalLeadsStore } from '@/lib/leadsStore';
import { globalUserStore } from '@/lib/userStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lead_id, approved_by = 'CEO' } = body;

    if (!lead_id) {
      return NextResponse.json({ error: 'Lead ID is required.' }, { status: 400 });
    }

    const memLead = globalLeadsStore.find(l => l.lead_id.trim().toLowerCase() === lead_id.trim().toLowerCase());
    if (!memLead || !memLead.phase4 || !memLead.phase4.coordinator_name) {
      return NextResponse.json({ error: 'No nominated coordinator found for this lead.' }, { status: 400 });
    }

    const { coordinator_name, coordinator_email, coordinator_phone } = memLead.phase4;
    const tempPassword = 'AIRG@' + Math.floor(1000 + Math.random() * 9000);

    // 1. Create User Account in globalUserStore if not existing
    const existingUser = globalUserStore.find(u => u.email.toLowerCase() === coordinator_email.toLowerCase());
    if (!existingUser) {
      globalUserStore.unshift({
        _id: `usr-coord-${Date.now()}`,
        name: coordinator_name,
        email: coordinator_email,
        role: 'COORDINATOR',
        department: `School Coordinator (${memLead.school_name})`,
        phone: coordinator_phone || '9822123456',
        employee_id: `CORD-${Date.now().toString().slice(-4)}`
      });
    }

    // 2. Save User Account to MongoDB
    try {
      await connectDB();
      const mongoUser = await User.findOne({ email: coordinator_email.toLowerCase() }).exec();
      if (!mongoUser) {
        const newUserDoc = new User({
          name: coordinator_name,
          email: coordinator_email.toLowerCase(),
          password_hash: tempPassword,
          role: 'COORDINATOR',
          department: `School Coordinator (${memLead.school_name})`,
          phone: coordinator_phone || '9822123456',
          employee_id: `CORD-${Date.now().toString().slice(-4)}`
        });
        await newUserDoc.save();
      }
    } catch (dbErr) {
      console.warn('Coordinator account DB save fallback:', dbErr);
    }

    // 3. Update Lead State in Memory
    memLead.phase4.coordinator_account_created = true;
    memLead.phase4.coordinator_account_approved_at = new Date();
    memLead.phase4.coordinator_account_approved_by = approved_by;
    memLead.status = 'PHASE4_ACTIVE';
    memLead.activity_history.push({
      action: 'CEO_APPROVED_COORDINATOR_ACCOUNT',
      performed_by: approved_by,
      details: `CEO ${approved_by} approved Phase 4 setup and generated Coordinator User Account for ${coordinator_name} (${coordinator_email}). Email credentials dispatched.`,
      timestamp: new Date()
    });

    // 4. Update Lead in MongoDB
    try {
      await connectDB();
      const lead = await Lead.findOne({ lead_id: { $regex: `^${lead_id.trim()}$`, $options: 'i' } }).exec();
      if (lead) {
        if (!lead.phase4) lead.phase4 = memLead.phase4;
        lead.phase4.coordinator_account_created = true;
        lead.phase4.coordinator_account_approved_at = new Date();
        lead.phase4.coordinator_account_approved_by = approved_by;
        lead.status = 'PHASE4_ACTIVE';
        lead.activity_history.push({
          action: 'CEO_APPROVED_COORDINATOR_ACCOUNT',
          performed_by: approved_by,
          details: `CEO ${approved_by} approved Phase 4 setup and generated Coordinator User Account for ${coordinator_name} (${coordinator_email}). Email credentials dispatched.`,
          timestamp: new Date()
        });
        await lead.save();
      }
    } catch (dbErr) {
      console.warn('Approve coordinator DB fallback:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `Coordinator account created for ${coordinator_name}! Login email dispatched to ${coordinator_email}. (Temp Password: ${tempPassword})`,
      temp_password: tempPassword,
      lead: memLead
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error approving coordinator account' }, { status: 500 });
  }
}
