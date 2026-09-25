"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Navbar } from "@/components/demo-navbar";
import { Footer } from "@/components/demo-footer";
import { PurchaseItemData, getDefaultPurchaseChecklist } from "@/data/purchaseInventoryData";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "CEO" | "MARKETING" | "BUSINESS_DEVELOPER" | "EMPLOYEE" | "EXTERNAL_BD" | "COORDINATOR" | "PURCHASE_MANAGER";
  department: string;
  employee_id?: string;
}

export default function LabSetupPage() {
  // Session State
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState<"create" | "pool" | "phase2" | "phase3" | "phase4" | "purchase" | "users">("create");

  // Public Form State
  const [publicForm, setPublicForm] = useState({
    school_name: "",
    school_address: "",
    school_email: "",
    contact_person: "",
    contact_number: "",
    inquiry_generated_by: "Principal",
    inquiry_generator_name: "",
    inquiry_generator_phone: "",
    requirement: "AI Innovation Lab",
    additional_message: "",
    agree_terms: false
  });
  const [isSubmittingPublic, setIsSubmittingPublic] = useState(false);
  const [publicTicket, setPublicTicket] = useState<{ lead_id: string; is_duplicate: boolean; duplicate_of_id?: string } | null>(null);

  // Internal Form State
  const [internalForm, setInternalForm] = useState({
    school_name: "",
    school_address: "",
    school_email: "",
    contact_person: "",
    contact_number: "",
    created_by_phone: "9876543210",
    inquiry_generated_by: "School Management",
    inquiry_generator_name: "",
    inquiry_generator_phone: "",
    requirement: "AI Innovation Lab",
    additional_message: "",
    lead_source: "Phone Call",
    lead_source_details: "",
    lead_provided_by_type: "Business Contact",
    lead_provided_by_name: "",
    suggested_owner_name: ""
  });
  const [isSubmittingInternal, setIsSubmittingInternal] = useState(false);
  const [internalTicket, setInternalTicket] = useState<{ lead_id: string; is_duplicate: boolean } | null>(null);

  // Central Lead Pool State
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [viewDetailsLead, setViewDetailsLead] = useState<any | null>(null);

  // CEO Lead Assignment Modal State
  const [teamUsers, setTeamUsers] = useState<any[]>([
    { name: "Amit Kumar (BD)", role: "BUSINESS_DEVELOPER", department: "Business Development", email: "bd@airginternational.com" },
    { name: "Priya Sharma (Marketing)", role: "MARKETING", department: "Marketing", email: "marketing@airginternational.com" },
    { name: "Rahul Deshmukh (Employee)", role: "EMPLOYEE", department: "Field Operations", email: "employee@airginternational.com" },
    { name: "Anjali Deshmukh (Coordinator)", role: "COORDINATOR", department: "School Coordinator", email: "coordinator@sunriseschool.edu.in" },
    { name: "Sujit Bhendarkar (Purchase Manager)", role: "PURCHASE_MANAGER", department: "Procurement & Inventory Operations", email: "purchase@airginternational.com" }
  ]);
  const [selectedAssignee, setSelectedAssignee] = useState("Amit Kumar (BD)");
  const [assignmentReason, setAssignmentReason] = useState("Management CEO Assignment");
  const [isAssigning, setIsAssigning] = useState(false);

  // Phase 2 Conversion Module State
  const [activePhase2Lead, setActivePhase2Lead] = useState<any | null>(null);
  const [isActivatingLead, setIsActivatingLead] = useState(false);
  const [phase2Form, setPhase2Form] = useState({
    // Section 1: Institute Information
    decision_maker_name: "",
    decision_maker_phone: "",
    decision_maker_email: "",
    principal_name: "",
    principal_phone: "",
    principal_email: "",
    program_coordinator_name: "",
    program_coordinator_phone: "",
    program_coordinator_email: "",

    // Section 2: Standard-wise Students Table
    student_counts_table: [
      { standard: "Pre-Primary / Nursery", student_count: 50, admission_count: 50, last_year_fees: 25000 },
      { standard: "Std 1", student_count: 60, admission_count: 60, last_year_fees: 30000 },
      { standard: "Std 2", student_count: 60, admission_count: 60, last_year_fees: 30000 },
      { standard: "Std 3", student_count: 55, admission_count: 55, last_year_fees: 32000 },
      { standard: "Std 4", student_count: 55, admission_count: 55, last_year_fees: 32000 },
      { standard: "Std 5", student_count: 50, admission_count: 50, last_year_fees: 35000 },
      { standard: "Std 6", student_count: 50, admission_count: 50, last_year_fees: 35000 },
      { standard: "Std 7", student_count: 45, admission_count: 45, last_year_fees: 38000 },
      { standard: "Std 8", student_count: 45, admission_count: 45, last_year_fees: 38000 },
      { standard: "Std 9", student_count: 40, admission_count: 40, last_year_fees: 40000 },
      { standard: "Std 10", student_count: 40, admission_count: 40, last_year_fees: 40000 },
      { standard: "Std 11", student_count: 30, admission_count: 30, last_year_fees: 45000 },
      { standard: "Std 12", student_count: 30, admission_count: 30, last_year_fees: 45000 }
    ],

    // Section 3: Medium & Board
    medium_of_school: ["English"],
    medium_other: "",
    board_of_school: ["CBSE"],
    board_other: "",

    // Section 4: Existing Knowledge
    ai_robotics_knowledge_level: "Basic",

    // Section 5: Facility Availability
    dedicated_classroom_available: true,
    wifi_available: true,

    // Section 6: Infrastructure Measurement Details
    infrastructure_measurements: [
      { item_name: "Wall 1", length_ft: 30, width_ft: 10, location_remarks: "Front Blackboard & TV Wall", photo_url: "/centres/gallery/photo-new-1.jpeg", has_pillar: false },
      { item_name: "Wall 2", length_ft: 20, width_ft: 10, location_remarks: "Window Wall (East Facing) - Concrete Pillar on left", photo_url: "/centres/gallery/photo-new-2.jpeg", has_pillar: true },
      { item_name: "Wall 3", length_ft: 30, width_ft: 10, location_remarks: "Back Display & Storage Wall", photo_url: "/centres/gallery/photo-new-3.jpeg", has_pillar: false },
      { item_name: "Wall 4", length_ft: 20, width_ft: 10, location_remarks: "Entry Door Wall", photo_url: "", has_pillar: false },
      { item_name: "Upper Side / Terrace (Ceiling)", length_ft: 30, width_ft: 20, location_remarks: "False Ceiling with LED Lights", photo_url: "", has_pillar: false },
      { item_name: "Floor", length_ft: 30, width_ft: 20, location_remarks: "Vitrified Tile Flooring", photo_url: "", has_pillar: false },
      { item_name: "Door", length_ft: 4, width_ft: 7, location_remarks: "Main Entrance Wooden Door", photo_url: "", has_pillar: false },
      { item_name: "Window", length_ft: 6, width_ft: 4, location_remarks: "Sliding Glass Windows (2 Units)", photo_url: "", has_pillar: false }
    ],

    // Section 7: Principal Declaration & Signatures
    agreed_compulsory_basis: true,
    min_students_committed: 400,
    min_qualification_required: "B.Sc / B.E. Robotics / IT Certification",
    principal_signature_name: "",
    coordinator_signature_name: "",
    declaration_date: new Date().toISOString().split('T')[0],

    // Legacy fields
    coordinator_name: "",
    coordinator_phone: "",
    coordinator_email: "",
    coordinator_designation: "IT Head / Coordinator",
    room_length: 30,
    room_width: 20,
    room_height: 10,
    proposed_lab_type: "AI Innovation Lab",
    power_supply: "Available",
    internet_status: "Fiber Optic Ready",
    furniture_status: "Required",
    room_condition: "Good",
    expected_students: 640,
    expected_revenue: 15000000,
    conversion_model: "Lab Direct Sale" as "Lab Direct Sale" | "Subscription Model",
    remarks: "",
    room_photos: [
      "/centres/gallery/photo-new-1.jpeg",
      "/centres/gallery/photo-new-2.jpeg",
      "/centres/gallery/photo-new-3.jpeg"
    ],
    room_video_url: "https://drive.google.com/file/d/1AIRG_Lab_Walkthrough_Video_Demo/view"
  });

  // Phase 2 Meeting Form State
  const [meetings, setMeetings] = useState<any[]>([
    {
      meeting_number: 1,
      meeting_date: "2026-09-04",
      meeting_type: "In-Person",
      meeting_place: "School Campus",
      attendees: "Principal & BD Amit",
      notes: "Principal showed interest in 30-PC AI Lab setup.",
      proof_photo_url: "/centres/gallery/photo-new-1.jpeg",
      status: "Conducted"
    }
  ]);
  const [newMeeting, setNewMeeting] = useState({
    meeting_date: new Date().toISOString().split("T")[0],
    meeting_type: "In-Person",
    meeting_place: "School Campus",
    attendees: "",
    notes: "",
    proof_photo_url: "",
    status: "Conducted"
  });

  const [isSavingPhase2, setIsSavingPhase2] = useState(false);
  const [previewWallPhoto, setPreviewWallPhoto] = useState<{ title: string; url: string; remarks?: string } | null>(null);

  // Step 3 Promotional Phase Module State
  const [activePhase3Lead, setActivePhase3Lead] = useState<any | null>(null);
  const [isActivatingPhase3, setIsActivatingPhase3] = useState(false);
  const [isSavingPhase3, setIsSavingPhase3] = useState(false);
  const [phase3Form, setPhase3Form] = useState({
    status: "OPEN" as "OPEN" | "SCHEDULED" | "COMPLETE",
    rep_meeting: {
      date: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
      time: "10:30 AM",
      notes: "Meeting with School Program Coordinator to outline promotional event workflow.",
      status: "Pending" as "Pending" | "Scheduled" | "Conducted"
    },
    teachers_meeting: {
      date: new Date(Date.now() + 86400000 * 4).toISOString().split("T")[0],
      time: "02:00 PM",
      notes: "Briefing teachers on AI & Robotics curriculum integration.",
      status: "Pending" as "Pending" | "Scheduled" | "Conducted"
    },
    parents_meeting: {
      date: new Date(Date.now() + 86400000 * 5).toISOString().split("T")[0],
      time: "04:30 PM",
      notes: "Parents orientation session & Q&A regarding AI lab benefits.",
      status: "Pending" as "Pending" | "Scheduled" | "Conducted"
    },
    student_demo: {
      date: new Date(Date.now() + 86400000 * 6).toISOString().split("T")[0],
      time: "11:00 AM",
      no_of_sections: 4,
      required_days: 2,
      notes: "Live AI & Robotics student demo session across 4 sections.",
      status: "Pending" as "Pending" | "Scheduled" | "Conducted"
    },
    photos: [
      "/centres/gallery/photo-new-1.jpeg",
      "/centres/gallery/photo-new-2.jpeg",
      "/centres/gallery/photo-new-3.jpeg"
    ],
    photo_caption: "On-site promotional demo & meeting execution proof"
  });

  const handleActivatePhase3Lead = async (leadToActivate: any) => {
    setIsActivatingPhase3(true);
    try {
      const res = await fetch("/api/leads/phase3-activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: leadToActivate.lead_id,
          activated_by: currentUser?.name || "Business Developer"
        })
      });
      const data = await res.json();
      if (data.success) {
        setActivePhase3Lead(leadToActivate);
        if (leadToActivate.phase3) {
          setPhase3Form({
            status: leadToActivate.phase3.status || "OPEN",
            rep_meeting: leadToActivate.phase3.rep_meeting || phase3Form.rep_meeting,
            teachers_meeting: leadToActivate.phase3.teachers_meeting || phase3Form.teachers_meeting,
            parents_meeting: leadToActivate.phase3.parents_meeting || phase3Form.parents_meeting,
            student_demo: leadToActivate.phase3.student_demo || phase3Form.student_demo,
            photos: leadToActivate.phase3.photos || phase3Form.photos,
            photo_caption: leadToActivate.phase3.photo_proof?.caption || phase3Form.photo_caption
          });
        }
        fetchLeads();
      }
    } catch (err) {
      console.error("Activate Phase 3 error:", err);
    } finally {
      setIsActivatingPhase3(false);
    }
  };

  const handleSavePhase3 = async (isFinalSubmit: boolean) => {
    if (!activePhase3Lead) return;
    setIsSavingPhase3(true);
    try {
      const res = await fetch("/api/leads/phase3-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: activePhase3Lead.lead_id,
          is_final_submit: isFinalSubmit,
          phase3_data: {
            ...phase3Form,
            photo_proof: {
              file_url: phase3Form.photos[0] || "",
              uploaded_at: new Date(),
              caption: phase3Form.photo_caption
            }
          },
          performed_by: currentUser?.name || "Business Developer"
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        fetchLeads();
        if (data.status === "COMPLETE") {
          alert(`Step 3 Promotional Phase completed! Nominate the School Coordinator to send credentials for CEO approval.`);
          setNominateModalLead(activePhase3Lead);
          setNominateForm({
            coordinator_name: activePhase3Lead.contact_person || "Anjali Deshmukh",
            coordinator_email: activePhase3Lead.school_email || "coordinator@sunriseschool.edu.in",
            coordinator_phone: activePhase3Lead.contact_number || "9822123456"
          });
          setActivePhase3Lead(null);
        }
      } else {
        alert(data.error || "Error saving Phase 3 data.");
      }
    } catch (err) {
      alert("Error submitting Phase 3 promotional data.");
    } finally {
      setIsSavingPhase3(false);
    }
  };

  // Phase 4 School Representative Input Module State
  const [activePhase4Lead, setActivePhase4Lead] = useState<any | null>(null);
  const [isActivatingPhase4, setIsActivatingPhase4] = useState(false);
  const [isSavingPhase4, setIsSavingPhase4] = useState(false);
  const [phase4Form, setPhase4Form] = useState({
    coordinator_name: "Anjali Deshmukh (Coordinator)",
    coordinator_phone: "9822123456",
    coordinator_email: "coordinator@sunriseschool.edu.in",

    student_list: [
      { student_name: "Aarav Sharma", standard: "Std 6", division: "A", contact_number: "9822112233", roll_no: "601" },
      { student_name: "Ananya Patil", standard: "Std 7", division: "B", contact_number: "9822445566", roll_no: "712" },
      { student_name: "Rohan Deshmukh", standard: "Std 8", division: "A", contact_number: "9822778899", roll_no: "804" },
      { student_name: "Saniya Kulkarni", standard: "Std 9", division: "C", contact_number: "9822001122", roll_no: "915" },
      { student_name: "Aditya Verma", standard: "Std 10", division: "A", contact_number: "9890123456", roll_no: "1002" }
    ],
    new_student: { student_name: "", standard: "Std 6", division: "A", contact_number: "", roll_no: "" },

    timetable_file_url: "/schedules/school_timetable_2026.pdf",
    holidays_list: "Diwali Vacation (Nov 5 - Nov 18), Winter Break (Dec 25 - Jan 1), Annual Sports Week (Feb 10 - Feb 15)",
    exam_dates_schedule: "Mid-Term Examinations: Oct 12 - Oct 22 | Final Board Exams: Mar 1 - Mar 25",

    wifi_available: true,
    wifi_details: "High-speed 100 Mbps fiber optic connection in AI Lab with dedicated router.",
    electricity_backup: true,
    electricity_details: "Heavy-duty 10 KVA Diesel Generator + 30-min Online UPS backup.",
    classroom_readiness: "Fully Ready",
    facilities_notes: "Air-conditioned 30-PC lab setup with anti-static flooring, project board, and smart TV.",

    security_name: "Ramchandra Jadhav",
    security_phone: "9850123456",
    peon_name: "Suresh Bhosale",
    peon_phone: "9850987654",
    authorized_rep_name: "Mrs. Deshmukh (Principal)",
    authorized_rep_phone: "9822123456",

    confirm_accuracy: false,
    status: "OPEN"
  });

  const handleActivatePhase4Lead = async (leadToActivate: any) => {
    setIsActivatingPhase4(true);
    try {
      setActivePhase4Lead(leadToActivate);
      if (leadToActivate.phase4) {
        setPhase4Form(prev => ({
          ...prev,
          coordinator_name: leadToActivate.phase4.coordinator_name || leadToActivate.contact_person || prev.coordinator_name,
          coordinator_phone: leadToActivate.phase4.coordinator_phone || leadToActivate.contact_number || prev.coordinator_phone,
          coordinator_email: leadToActivate.phase4.coordinator_email || leadToActivate.school_email || prev.coordinator_email,
          student_list: leadToActivate.phase4.student_list?.length > 0 ? leadToActivate.phase4.student_list : prev.student_list,
          timetable_file_url: leadToActivate.phase4.academic_schedule?.timetable_file_url || prev.timetable_file_url,
          holidays_list: leadToActivate.phase4.academic_schedule?.holidays_list || prev.holidays_list,
          exam_dates_schedule: leadToActivate.phase4.academic_schedule?.exam_dates_schedule || prev.exam_dates_schedule,
          wifi_available: leadToActivate.phase4.infrastructure_input?.wifi_available ?? prev.wifi_available,
          wifi_details: leadToActivate.phase4.infrastructure_input?.wifi_details || prev.wifi_details,
          electricity_backup: leadToActivate.phase4.infrastructure_input?.electricity_backup ?? prev.electricity_backup,
          electricity_details: leadToActivate.phase4.infrastructure_input?.electricity_details || prev.electricity_details,
          classroom_readiness: leadToActivate.phase4.infrastructure_input?.classroom_readiness || prev.classroom_readiness,
          facilities_notes: leadToActivate.phase4.infrastructure_input?.facilities_notes || prev.facilities_notes,
          security_name: leadToActivate.phase4.school_contacts?.security_name || prev.security_name,
          security_phone: leadToActivate.phase4.school_contacts?.security_phone || prev.security_phone,
          peon_name: leadToActivate.phase4.school_contacts?.peon_name || prev.peon_name,
          peon_phone: leadToActivate.phase4.school_contacts?.peon_phone || prev.peon_phone,
          authorized_rep_name: leadToActivate.phase4.school_contacts?.authorized_rep_name || prev.authorized_rep_name,
          authorized_rep_phone: leadToActivate.phase4.school_contacts?.authorized_rep_phone || prev.authorized_rep_phone,
          status: leadToActivate.phase4.status || "OPEN"
        }));
      }
      setActiveTab("phase4");
    } catch (err) {
      console.error("Activate Phase 4 error:", err);
    } finally {
      setIsActivatingPhase4(false);
    }
  };

  const handleAddStudentRow = () => {
    if (!phase4Form.new_student.student_name) {
      alert("Please enter student name.");
      return;
    }
    setPhase4Form({
      ...phase4Form,
      student_list: [...phase4Form.student_list, { ...phase4Form.new_student }],
      new_student: { student_name: "", standard: "Std 6", division: "A", contact_number: "", roll_no: "" }
    });
  };

  const handleRemoveStudentRow = (index: number) => {
    setPhase4Form({
      ...phase4Form,
      student_list: phase4Form.student_list.filter((_, idx) => idx !== index)
    });
  };

  const handleSavePhase4 = async (isFinalSubmit: boolean) => {
    if (!activePhase4Lead) return;
    if (isFinalSubmit && !phase4Form.confirm_accuracy) {
      alert("Please confirm accuracy checkbox before submitting Phase 4 data.");
      return;
    }
    setIsSavingPhase4(true);
    try {
      const res = await fetch("/api/leads/phase4-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: activePhase4Lead.lead_id,
          is_final_submit: isFinalSubmit,
          phase4_data: {
            coordinator_name: phase4Form.coordinator_name,
            coordinator_phone: phase4Form.coordinator_phone,
            coordinator_email: phase4Form.coordinator_email,
            student_list: phase4Form.student_list,
            academic_schedule: {
              timetable_file_url: phase4Form.timetable_file_url,
              holidays_list: phase4Form.holidays_list,
              exam_dates_schedule: phase4Form.exam_dates_schedule
            },
            infrastructure_input: {
              wifi_available: phase4Form.wifi_available,
              wifi_details: phase4Form.wifi_details,
              electricity_backup: phase4Form.electricity_backup,
              electricity_details: phase4Form.electricity_details,
              classroom_readiness: phase4Form.classroom_readiness,
              facilities_notes: phase4Form.facilities_notes
            },
            school_contacts: {
              security_name: phase4Form.security_name,
              security_phone: phase4Form.security_phone,
              peon_name: phase4Form.peon_name,
              peon_phone: phase4Form.peon_phone,
              authorized_rep_name: phase4Form.authorized_rep_name,
              authorized_rep_phone: phase4Form.authorized_rep_phone
            },
            status: isFinalSubmit ? "SUBMITTED" : "IN_PROGRESS"
          },
          performed_by: currentUser?.name || "School Coordinator"
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        fetchLeads();
      } else {
        alert(data.error || "Error submitting Phase 4 data.");
      }
    } catch (err) {
      alert("Error submitting Phase 4 data.");
    } finally {
      setIsSavingPhase4(false);
    }
  };

  // Nominate Coordinator Modal State (BD)
  const [nominateModalLead, setNominateModalLead] = useState<any | null>(null);
  const [nominateForm, setNominateForm] = useState({
    coordinator_name: "Anjali Deshmukh",
    coordinator_email: "coordinator@sunriseschool.edu.in",
    coordinator_phone: "9822123456"
  });
  const [isNominatingCoordinator, setIsNominatingCoordinator] = useState(false);

  // Reject Phase 4 Data Modal State (BD)
  const [rejectModalLead, setRejectModalLead] = useState<any | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState("");
  const [isReviewingPhase4, setIsReviewingPhase4] = useState(false);

  const handleNominateCoordinatorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nominateModalLead) return;
    setIsNominatingCoordinator(true);
    try {
      const res = await fetch("/api/leads/phase4-nominate-coordinator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: nominateModalLead.lead_id,
          coordinator_name: nominateForm.coordinator_name,
          coordinator_email: nominateForm.coordinator_email,
          coordinator_phone: nominateForm.coordinator_phone,
          nominated_by: currentUser?.name || "Business Developer"
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        setNominateModalLead(null);
        fetchLeads(currentUser);
      } else {
        alert(data.error || "Failed to nominate coordinator.");
      }
    } catch (err) {
      alert("Error nominating coordinator.");
    } finally {
      setIsNominatingCoordinator(false);
    }
  };

  const handleApproveCoordinatorAccount = async (lead: any) => {
    try {
      const res = await fetch("/api/leads/phase4-approve-coordinator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: lead.lead_id,
          approved_by: currentUser?.name || "CEO"
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(`✓ CEO APPROVAL SUCCESSFUL!\n\nUser Account Generated for: ${lead.phase4?.coordinator_name || 'Coordinator'} (${lead.phase4?.coordinator_email})\nTemporary Password: ${data.temp_password}\n\nCredentials email dispatched to coordinator.`);
        fetchLeads(currentUser);
      } else {
        alert(data.error || "Failed to approve coordinator account.");
      }
    } catch (err) {
      alert("Error approving coordinator account.");
    }
  };

  const handleReviewPhase4 = async (lead: any, action: 'APPROVE' | 'REJECT') => {
    setIsReviewingPhase4(true);
    try {
      const res = await fetch("/api/leads/phase4-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: lead.lead_id,
          action,
          rejection_reason: action === 'REJECT' ? rejectionReasonInput : '',
          performed_by: currentUser?.name || "Business Developer"
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        setRejectModalLead(null);
        setRejectionReasonInput("");
        fetchLeads(currentUser);
      } else {
        alert(data.error || "Failed to submit review.");
      }
    } catch (err) {
      alert("Error submitting Phase 4 review.");
    } finally {
      setIsReviewingPhase4(false);
    }
  };

  // Phase 5 Purchase & Inventory Checklist Module State
  const [activePurchaseLead, setActivePurchaseLead] = useState<any | null>(null);
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItemData[]>(getDefaultPurchaseChecklist());
  const [purchaseCategoryFilter, setPurchaseCategoryFilter] = useState<string>("ALL");
  const [purchaseSearchQuery, setPurchaseSearchQuery] = useState<string>("");
  const [isSavingPurchase, setIsSavingPurchase] = useState<boolean>(false);

  const handleActivatePurchaseLead = (leadToActivate: any) => {
    setActivePurchaseLead(leadToActivate);
    if (leadToActivate.purchase_checklist && leadToActivate.purchase_checklist.items?.length > 0) {
      setPurchaseItems(leadToActivate.purchase_checklist.items);
    } else {
      setPurchaseItems(getDefaultPurchaseChecklist());
    }
  };

  const handleToggleItemPurchased = (sr_no: number) => {
    setPurchaseItems(prev => prev.map(item => {
      if (item.sr_no === sr_no) {
        const nextState = !item.is_purchased;
        return {
          ...item,
          is_purchased: nextState,
          status: nextState ? 'Purchased' : 'Pending'
        };
      }
      return item;
    }));
  };

  const handleUpdateItemField = (sr_no: number, field: keyof PurchaseItemData, value: any) => {
    setPurchaseItems(prev => prev.map(item => {
      if (item.sr_no === sr_no) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleSelectAllCategoryItems = (category: string) => {
    setPurchaseItems(prev => prev.map(item => {
      if (category === "ALL" || item.category === category) {
        return {
          ...item,
          is_purchased: true,
          status: 'Purchased'
        };
      }
      return item;
    }));
  };

  const handleSavePurchaseChecklist = async (isFinalSubmit: boolean) => {
    if (!activePurchaseLead) return;
    setIsSavingPurchase(true);
    try {
      const res = await fetch("/api/leads/purchase-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: activePurchaseLead.lead_id,
          items: purchaseItems,
          is_final_submit: isFinalSubmit,
          performed_by: currentUser?.name || "Purchase Manager"
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        fetchLeads(currentUser);
      } else {
        alert(data.error || "Error saving purchase checklist.");
      }
    } catch (err) {
      alert("Error saving purchase checklist.");
    } finally {
      setIsSavingPurchase(false);
    }
  };

  // Meeting Details Module Modal State (Screenshot 1)
  const [meetingModalLead, setMeetingModalLead] = useState<any | null>(null);
  const [meetingForm, setMeetingForm] = useState({
    meeting_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    meeting_type: "In-Person Meeting",
    meeting_place: "School Campus",
    attendees: "",
    notes: ""
  });
  const [isSchedulingMeeting, setIsSchedulingMeeting] = useState(false);

  // Authorization check for Action ON/OFF switch
  const canUserManageLead = (lead: any, user: UserSession | null) => {
    if (!user) return false;
    if (user.role === "CEO") return true;

    const uClean = user.name.replace(/\(.*\)/g, '').trim().toLowerCase();

    // Internal company BD creator has direct authorization
    if (user.role === "BUSINESS_DEVELOPER") {
      const cClean = (lead.created_by_name || '').replace(/\(.*\)/g, '').trim().toLowerCase();
      const pClean = (lead.lead_provided_by_name || '').replace(/\(.*\)/g, '').trim().toLowerCase();
      const iClean = (lead.inquiry_generator_name || '').replace(/\(.*\)/g, '').trim().toLowerCase();

      if (cClean && (cClean.includes(uClean) || uClean.includes(cClean))) return true;
      if (pClean && (pClean.includes(uClean) || uClean.includes(pClean))) return true;
      if (iClean && (iClean.includes(uClean) || uClean.includes(iClean))) return true;
    }

    // Assigned owner
    const aClean = (lead.assigned_to_name || '').replace(/\(.*\)/g, '').trim().toLowerCase();
    if (aClean && aClean !== 'unassigned' && (aClean.includes(uClean) || uClean.includes(aClean))) return true;
    if (lead.assigned_to_id && (lead.assigned_to_id === user.id || lead.assigned_to_id === user.employee_id || lead.assigned_to_id.toLowerCase().includes(uClean))) return true;

    return false;
  };

  const handleToggleLeadActive = async (lead: any, targetActiveState: boolean) => {
    try {
      const res = await fetch("/api/leads/toggle-active", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: lead.lead_id,
          is_active: targetActiveState,
          performed_by: currentUser?.name || "Authorized User"
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchLeads(currentUser);
      }
    } catch (err) {
      console.error("Toggle active error:", err);
    }
  };

  const handleScheduleMeetingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingModalLead) return;
    setIsSchedulingMeeting(true);
    try {
      const res = await fetch("/api/leads/schedule-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: meetingModalLead.lead_id,
          meeting_date: meetingForm.meeting_date,
          meeting_type: meetingForm.meeting_type,
          meeting_place: meetingForm.meeting_place,
          meeting_attendees: meetingForm.attendees,
          meeting_notes: meetingForm.notes,
          performed_by: currentUser?.name || "Authorized User"
        })
      });
      const data = await res.json();
      if (data.success) {
        setMeetingModalLead(null);
        fetchLeads(currentUser);
        if (activePhase2Lead && activePhase2Lead.lead_id === meetingModalLead.lead_id) {
          setActivePhase2Lead(data.lead || meetingModalLead);
        }
      }
    } catch (err) {
      console.error("Schedule meeting submit error:", err);
    } finally {
      setIsSchedulingMeeting(false);
    }
  };

  // Compute 24-Hour Pre-Meeting Alerts
  const upcomingMeetingAlerts = leads.filter(lead => {
    if (!lead.meeting_date || !lead.is_active_lead) return false;
    const mDate = new Date(lead.meeting_date);
    const now = new Date();
    const diffMs = mDate.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours >= -12 && diffHours <= 48;
  });

  // User Creator State (CEO)
  const [newUserForm, setNewUserForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "BUSINESS_DEVELOPER" as "CEO" | "MARKETING" | "BUSINESS_DEVELOPER" | "EMPLOYEE" | "EXTERNAL_BD" | "PURCHASE_MANAGER",
    department: "Business Development",
    phone: "",
    employee_id: ""
  });
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [showNewUserPassword, setShowNewUserPassword] = useState(false);

  const fetchLeads = async (userSessionOverride?: UserSession | null) => {
    setIsLoadingLeads(true);
    try {
      let url = `/api/leads?status=${selectedStatus}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      
      const sessionUser = userSessionOverride !== undefined ? userSessionOverride : currentUser;
      if (sessionUser) {
        url += `&userRole=${encodeURIComponent(sessionUser.role)}&userName=${encodeURIComponent(sessionUser.name)}&userEmail=${encodeURIComponent(sessionUser.email)}&userId=${encodeURIComponent(sessionUser.id || '')}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.leads) {
        const localAssignments = JSON.parse(localStorage.getItem("airg_lead_assignments") || "{}");
        const mergedLeads = data.leads.map((l: any) => {
          const override = localAssignments[l.lead_id];
          if (override) {
            return {
              ...l,
              assigned_to_name: override.assigned_to_name || l.assigned_to_name,
              assigned_to_id: override.assigned_to_id || l.assigned_to_id,
              assigned_to_role: override.assigned_to_role || l.assigned_to_role,
              status: l.status === "NEW" ? "IN_PROCESS" : l.status
            };
          }
          return l;
        });

        if (sessionUser && sessionUser.role === "BUSINESS_DEVELOPER") {
          const uClean = sessionUser.name.replace(/\(.*\)/g, '').trim().toLowerCase();
          
          Object.keys(localAssignments).forEach(leadId => {
            const assign = localAssignments[leadId];
            const aClean = (assign.assigned_to_name || '').replace(/\(.*\)/g, '').trim().toLowerCase();
            if (aClean && (aClean.includes(uClean) || uClean.includes(aClean))) {
              const exists = mergedLeads.some((l: any) => l.lead_id.trim().toLowerCase() === leadId.trim().toLowerCase());
              if (!exists) {
                mergedLeads.push({
                  _id: `assigned-${leadId}`,
                  lead_id: leadId,
                  school_name: assign.school_name || 'Sunrise International School',
                  school_address: assign.school_address || 'Pune-Bangalore Highway, Satara',
                  school_email: 'info@sunriseschool.edu.in',
                  contact_person: 'Mr. Patil (IT Head)',
                  contact_number: '9890123456',
                  inquiry_generated_by: 'Teacher',
                  inquiry_generator_name: 'Suyash Patil',
                  inquiry_generator_phone: '7820848915',
                  requirement: 'Robotics & Drone Kit Setup',
                  lead_source: 'Employee Referral',
                  lead_provided_by_type: 'Employee',
                  lead_provided_by_name: 'Rahul Sharma (Employee)',
                  created_by_id: 'INTERNAL_USER',
                  created_by_name: 'Rahul Sharma',
                  created_by_phone: '9876543210',
                  created_by_role: 'EMPLOYEE',
                  creator_category: 'INTERNAL',
                  assigned_to_id: assign.assigned_to_id || sessionUser.name,
                  assigned_to_name: assign.assigned_to_name || sessionUser.name,
                  assigned_to_role: 'BUSINESS_DEVELOPER',
                  status: assign.status || 'IN_PROCESS',
                  is_duplicate: false,
                  notes: [],
                  activity_history: []
                });
              }
            }
          });

          const bdLeads = mergedLeads.filter((l: any) => {
            const creatorName = (l.created_by_name || '').replace(/\(.*\)/g, '').trim().toLowerCase();
            const inquiryName = (l.inquiry_generator_name || '').replace(/\(.*\)/g, '').trim().toLowerCase();
            const providerName = (l.lead_provided_by_name || '').replace(/\(.*\)/g, '').trim().toLowerCase();
            const assignedName = (l.assigned_to_name || '').replace(/\(.*\)/g, '').trim().toLowerCase();

            const isCreator =
              (creatorName && (creatorName.includes(uClean) || uClean.includes(creatorName))) ||
              (inquiryName && (inquiryName.includes(uClean) || uClean.includes(inquiryName))) ||
              (providerName && (providerName.includes(uClean) || uClean.includes(providerName)));

            const isAssigned =
              (assignedName && assignedName !== 'unassigned' && (assignedName.includes(uClean) || uClean.includes(assignedName)));

            return isCreator || isAssigned;
          });
          setLeads(bdLeads);
        } else {
          setLeads(mergedLeads);
        }
      }
    } catch (err) {
      console.error("Fetch leads error:", err);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/auth/users");
      const data = await res.json();
      if (data.users && data.users.length > 0) {
        setTeamUsers(data.users);
        if (!selectedAssignee) {
          setSelectedAssignee(data.users[0].name);
        }
      }
    } catch (err) {}
  };

  const loadUserSession = () => {
    const saved = localStorage.getItem("airg_user_session");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCurrentUser(parsed);
        fetchLeads(parsed);
      } catch (e) {}
    } else {
      setCurrentUser(null);
      fetchLeads(null);
    }
  };

  useEffect(() => {
    document.title = "AI Lab Setup & Phase 2 Lead Conversion | AIR G INTERNATIONAL";
    loadUserSession();
    fetchUsers();

    const handleAuthChange = () => {
      loadUserSession();
      fetchUsers();
    };
    window.addEventListener("airg_auth_change", handleAuthChange);
    return () => window.removeEventListener("airg_auth_change", handleAuthChange);
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "CEO") {
        setActiveTab("pool");
      } else if (currentUser.role === "BUSINESS_DEVELOPER") {
        setActiveTab("phase2");
      } else if (currentUser.role === "EXTERNAL_BD") {
        setActiveTab("pool");
      } else if (currentUser.role === "COORDINATOR") {
        setActiveTab("phase4");
      } else if (currentUser.role === "PURCHASE_MANAGER") {
        setActiveTab("purchase");
      } else {
        setActiveTab("create");
      }
    }
  }, [currentUser]);

  useEffect(() => {
    fetchLeads(currentUser);
  }, [selectedStatus, searchQuery]);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("airg_user_session");
    window.dispatchEvent(new Event("airg_auth_change"));
  };

  // Public Submit
  const handlePublicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicForm.agree_terms) {
      alert("Please agree to let AIR G International contact you.");
      return;
    }
    setIsSubmittingPublic(true);
    try {
      const res = await fetch("/api/leads/public-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(publicForm)
      });
      const data = await res.json();
      if (data.success) {
        setPublicTicket({
          lead_id: data.lead_id,
          is_duplicate: data.is_duplicate,
          duplicate_of_id: data.duplicate_of_id
        });
        setPublicForm({
          school_name: "",
          school_address: "",
          school_email: "",
          contact_person: "",
          contact_number: "",
          inquiry_generated_by: "Principal",
          inquiry_generator_name: "",
          inquiry_generator_phone: "",
          requirement: "AI Innovation Lab",
          additional_message: "",
          agree_terms: false
        });
        fetchLeads();
      } else {
        alert(data.error || "Failed to submit inquiry.");
      }
    } catch (err) {
      alert("An error occurred.");
    } finally {
      setIsSubmittingPublic(false);
    }
  };

  // Internal Lead Submit
  const handleInternalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setIsSubmittingInternal(true);
    try {
      const res = await fetch("/api/leads/internal-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...internalForm,
          created_by_name: currentUser.name,
          created_by_phone: internalForm.created_by_phone || currentUser.phone || "9876543210",
          created_by_role: currentUser.role,
          creator_category: "INTERNAL",
          suggested_owner_name: currentUser.role === "BUSINESS_DEVELOPER" ? currentUser.name : internalForm.suggested_owner_name,
          lead_provided_by_name: currentUser.role === "EMPLOYEE" ? `${currentUser.name} (Employee)` : (internalForm.lead_provided_by_name || currentUser.name)
        })
      });
      const data = await res.json();
      if (data.success) {
        setInternalTicket({ lead_id: data.lead_id, is_duplicate: data.is_duplicate });
        setInternalForm({
          school_name: "",
          school_address: "",
          school_email: "",
          contact_person: "",
          contact_number: "",
          created_by_phone: "9876543210",
          inquiry_generated_by: "School Management",
          inquiry_generator_name: "",
          inquiry_generator_phone: "",
          requirement: "AI Innovation Lab",
          additional_message: "",
          lead_source: "Phone Call",
          lead_source_details: "",
          lead_provided_by_type: "Business Contact",
          lead_provided_by_name: "",
          suggested_owner_name: ""
        });
        fetchLeads();
      } else {
        alert(data.error || "Failed to create internal lead.");
      }
    } catch (err) {
      alert("Error submitting lead.");
    } finally {
      setIsSubmittingInternal(false);
    }
  };

  // CEO Lead Assignment
  const handleAssignLead = async () => {
    if (!selectedLead || !selectedAssignee) return;
    setIsAssigning(true);
    try {
      const assignedUser = teamUsers.find(u => u.name === selectedAssignee);
      const assigned_to_id = assignedUser ? (assignedUser.id || assignedUser._id || assignedUser.employee_id || assignedUser.email || selectedAssignee) : selectedAssignee;
      
      // Save local assignment into localStorage for instant and persistent client state
      const localAssignments = JSON.parse(localStorage.getItem("airg_lead_assignments") || "{}");
      localAssignments[selectedLead.lead_id] = {
        lead_id: selectedLead.lead_id,
        school_name: selectedLead.school_name,
        assigned_to_name: selectedAssignee,
        assigned_to_id: assigned_to_id,
        assigned_to_role: assignedUser ? assignedUser.role : "BUSINESS_DEVELOPER",
        status: "IN_PROCESS"
      };
      localStorage.setItem("airg_lead_assignments", JSON.stringify(localAssignments));

      const res = await fetch("/api/leads/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: selectedLead.lead_id,
          assigned_to_name: selectedAssignee,
          assigned_to_id: assigned_to_id,
          assigned_to_role: assignedUser ? assignedUser.role : "BUSINESS_DEVELOPER",
          assigned_by_name: currentUser?.name || "CEO / Head",
          reason: assignmentReason
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Lead ${selectedLead.lead_id} assigned to ${selectedAssignee}! Notification recorded.`);
        setLeads(prevLeads => prevLeads.map(l => {
          if (l.lead_id.trim().toLowerCase() === selectedLead.lead_id.trim().toLowerCase()) {
            return {
              ...l,
              assigned_to_name: selectedAssignee,
              assigned_to_id: assigned_to_id,
              assigned_to_role: assignedUser ? assignedUser.role : "BUSINESS_DEVELOPER",
              status: "IN_PROCESS"
            };
          }
          return l;
        }));
        setSelectedLead(null);
        await fetchLeads(currentUser);
      } else {
        alert(data.error || "Failed to assign lead.");
      }
    } catch (err) {
      alert("Error assigning lead.");
    } finally {
      setIsAssigning(false);
    }
  };

  // Phase 2 Lead Activation
  const handleActivatePhase2Lead = async (leadToActivate: any) => {
    setIsActivatingLead(true);
    try {
      const res = await fetch("/api/leads/phase2-activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: leadToActivate.lead_id,
          activated_by: currentUser?.name || "Business Developer"
        })
      });
      const data = await res.json();
      if (data.success) {
        setActivePhase2Lead(leadToActivate);
        setPhase2Form({
          ...phase2Form,
          coordinator_name: leadToActivate.contact_person || "",
          coordinator_phone: leadToActivate.contact_number || "",
          coordinator_email: leadToActivate.school_email || ""
        });
        alert(`Lead ${leadToActivate.lead_id} successfully activated for Phase 2 Conversion!`);
        fetchLeads();
      } else {
        alert(data.error || "Failed to activate lead.");
      }
    } catch (err) {
      alert("Error activating lead.");
    } finally {
      setIsActivatingLead(false);
    }
  };

  // Add Meeting Record in Phase 2
  const handleAddMeeting = () => {
    if (!newMeeting.notes) {
      alert("Please enter discussion notes for the meeting.");
      return;
    }
    if (meetings.length >= 3) {
      alert("Maximum 3 meetings allowed per Phase 2 conversion requirement.");
      return;
    }
    const meetingNum = meetings.length + 1;
    setMeetings([
      ...meetings,
      {
        meeting_number: meetingNum,
        meeting_date: newMeeting.meeting_date || new Date().toISOString().split("T")[0],
        meeting_type: newMeeting.meeting_type,
        meeting_place: newMeeting.meeting_place,
        attendees: newMeeting.attendees || "School Committee & BD",
        notes: newMeeting.notes,
        proof_photo_url: newMeeting.proof_photo_url || "",
        status: newMeeting.status
      }
    ]);
    setNewMeeting({
      meeting_date: new Date().toISOString().split("T")[0],
      meeting_type: "In-Person",
      meeting_place: "School Campus",
      attendees: "",
      notes: "",
      proof_photo_url: "",
      status: "Conducted"
    });
  };

  // Phase 2 Save Draft vs Final Submit
  const handleSavePhase2 = async (isFinalSubmit: boolean) => {
    if (!activePhase2Lead) return;
    setIsSavingPhase2(true);
    try {
      const targetLead = activePhase2Lead;
      const res = await fetch("/api/leads/phase2-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: targetLead.lead_id,
          is_final_submit: isFinalSubmit,
          phase2_data: {
            ...phase2Form,
            meetings
          },
          performed_by: currentUser?.name || "Business Developer"
        })
      });
      const data = await res.json();
      if (data.success) {
        if (isFinalSubmit) {
          alert(`Phase 2 Conversion completed! Automatically advancing to Step 3 Promotional Phase.`);
          await handleActivatePhase3Lead(targetLead);
          setActiveTab("phase3");
          setActivePhase2Lead(null);
        } else {
          alert(data.message);
        }
        fetchLeads();
      } else {
        alert(data.error || "Error saving Phase 2 data.");
      }
    } catch (err) {
      alert("Error processing Phase 2 submit.");
    } finally {
      setIsSavingPhase2(false);
    }
  };

  // CEO Create New User Account
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingUser(true);
    try {
      const res = await fetch("/api/auth/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserForm)
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        setNewUserForm({
          name: "",
          email: "",
          password: "",
          role: "BUSINESS_DEVELOPER",
          department: "Business Development",
          phone: "",
          employee_id: ""
        });
        fetchUsers();
      } else {
        alert(data.error || "Failed to create account.");
      }
    } catch (err) {
      alert("Error creating account.");
    } finally {
      setIsCreatingUser(false);
    }
  };

  const totalCalculatedArea = (phase2Form.room_length || 0) * (phase2Form.room_width || 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-body selection:bg-[#EE2C3C] selection:text-white">
      <Navbar />

      {/* Top Banner Header */}
      <section className="relative pt-28 pb-10 px-5 md:px-20 border-b border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold tracking-widest text-[#EE2C3C] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#EE2C3C] animate-pulse" />
              AIR G AI LAB SETUP & PHASE 2 CONVERSION PORTAL
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-headline">
              REGISTER YOUR SCHOOL FOR <span className="text-[#EE2C3C]">SPONSORED AIRG AI INNOVATION LAB</span>
            </h1>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg mt-1">
              <span className="text-amber-400 text-xs">🏢</span>
              <p className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                Sponsored &amp; Fully Owned by <span className="text-white">Lab Guruji Pvt. Limited</span>
              </p>
            </div>
            <p className="text-xs md:text-sm text-slate-400 font-light max-w-2xl">
              Centralized platform for Lead Generation (Phase 1) and Lead Conversion (Phase 2). Every lead uses a permanent ID (`LD#LAB26A...`).
            </p>
          </div>

          {/* User Profile Badge */}
          {currentUser && (
            <div className="bg-slate-900/90 border border-white/15 p-4 rounded-2xl flex items-center gap-4 shadow-xl shrink-0">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                  ● LOGGED IN ({currentUser.role})
                </span>
                <h4 className="text-sm font-bold text-white">{currentUser.name}</h4>
                <p className="text-[11px] text-slate-400 font-mono">{currentUser.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-slate-300 font-mono text-xs rounded-xl uppercase transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Logged-In User Navigation Tabs */}
        {currentUser && (
          <div className="max-w-[1440px] mx-auto pt-8 flex flex-wrap gap-3">
            {currentUser.role !== "PURCHASE_MANAGER" && currentUser.role !== "COORDINATOR" && (
              <>
                <button
                  onClick={() => setActiveTab("create")}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeTab === "create" ? "bg-[#EE2C3C] text-white border-[#EE2C3C]" : "bg-white/5 text-slate-300 border-white/10"
                  }`}
                >
                  📝 Create Lead (Phase 1)
                </button>

                <button
                  onClick={() => {
                    setActiveTab("pool");
                    fetchLeads(currentUser);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeTab === "pool" ? "bg-[#EE2C3C] text-white border-[#EE2C3C]" : "bg-white/5 text-slate-300 border-white/10"
                  }`}
                >
                  {currentUser.role === "CEO"
                    ? `👑 Master Lead Dictionary (ALL) (${leads.length})`
                    : currentUser.role === "EXTERNAL_BD"
                    ? `🤝 My Referred Leads & Commission (${leads.length})`
                    : `📋 My Created Leads (${leads.length})`}
                </button>
              </>
            )}

            {(currentUser.role === "BUSINESS_DEVELOPER" || currentUser.role === "CEO" || currentUser.role === "COORDINATOR") && (
              <>
                <button
                  onClick={() => setActiveTab("phase2")}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeTab === "phase2" ? "bg-[#EE2C3C] text-white border-[#EE2C3C]" : "bg-white/5 text-slate-300 border-white/10"
                  }`}
                >
                  🚀 Phase 2 Lead Conversion Portal
                </button>
                <button
                  onClick={() => setActiveTab("phase3")}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeTab === "phase3" ? "bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg shadow-amber-500/20" : "bg-white/5 text-slate-300 border-white/10"
                  }`}
                >
                  📢 Step 3 — Promotional Phase
                </button>
                <button
                  onClick={() => setActiveTab("phase4")}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeTab === "phase4" ? "bg-blue-600 text-white border-blue-500 font-extrabold shadow-lg shadow-blue-500/20" : "bg-white/5 text-slate-300 border-white/10"
                  }`}
                >
                  🏫 Phase 4 — School Representative Input
                </button>
              </>
            )}

            {(currentUser.role === "PURCHASE_MANAGER" || currentUser.role === "BUSINESS_DEVELOPER" || currentUser.role === "CEO" || currentUser.role === "EMPLOYEE") && (
              <button
                onClick={() => setActiveTab("purchase")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeTab === "purchase" ? "bg-emerald-600 text-white border-emerald-500 font-extrabold shadow-lg shadow-emerald-500/20" : "bg-white/5 text-slate-300 border-white/10"
                }`}
              >
                🛒 Phase 5 — Purchase Checklist
              </button>
            )}

            {currentUser.role === "CEO" && (
              <button
                onClick={() => {
                  setActiveTab("users");
                  fetchUsers();
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeTab === "users" ? "bg-[#EE2C3C] text-white border-[#EE2C3C]" : "bg-white/5 text-slate-300 border-white/10"
                }`}
              >
                👤 Manage Team Accounts
              </button>
            )}
          </div>
        )}
      </section>

      {/* Main Body */}
      <main className="max-w-[1440px] mx-auto px-5 md:px-20 py-12">
        {/* ⏰ 24-HOUR PRE-MEETING ALERTS BANNER */}
        {currentUser && upcomingMeetingAlerts.length > 0 && (
          <div className="mb-8 bg-gradient-to-r from-amber-950/80 via-rose-950/80 to-slate-900/90 border border-amber-500/50 p-5 md:p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-2xl font-bold shrink-0 animate-pulse">
                ⏰
              </div>
              <div>
                <div className="inline-block px-2.5 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[9px] font-mono font-bold uppercase rounded mb-1">
                  AUTOMATED 24-HOUR PRE-MEETING ALERT SYSTEM
                </div>
                <h4 className="text-base font-bold text-white uppercase">
                  You have {upcomingMeetingAlerts.length} upcoming school meeting(s) scheduled tomorrow / today!
                </h4>
                <p className="text-xs text-slate-300">
                  Meeting scheduled for:{" "}
                  <strong className="text-emerald-400">
                    {upcomingMeetingAlerts.map(l => `${l.school_name} (${new Date(l.meeting_date).toLocaleDateString('en-IN')})`).join(', ')}
                  </strong>
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveTab("pool");
                fetchLeads(currentUser);
              }}
              className="px-4 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-all font-mono shrink-0 shadow-lg shadow-amber-500/20"
            >
              View Scheduled Meetings 🔍
            </button>
          </div>
        )}
        
        {/* ================= 1. PUBLIC VIEW (NOT LOGGED IN) ================= */}
        {!currentUser && (
          <div className="max-w-3xl mx-auto bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl space-y-8">
            <div className="border-b border-white/10 pb-6 text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-black uppercase text-white font-headline">
                REGISTER YOUR SCHOOL FOR <span className="text-[#EE2C3C]">AI LAB</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-400 font-light">
                Public School Registration Form. Submit details to get a permanent Lead Ticket ID.
              </p>
            </div>

            {publicTicket ? (
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-8 rounded-2xl text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl font-bold">✓</div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Inquiry Registered Successfully!</h3>
                <p className="text-sm text-slate-300">
                  Your ticket has been generated and emailed to your school. Log in as CEO or BD to view it in the pool!
                </p>
                <div className="bg-slate-950/80 p-5 rounded-xl border border-emerald-500/40 inline-block text-left w-full max-w-md font-mono">
                  <p className="text-xs text-slate-400 uppercase font-bold">Permanent Lead Ticket ID</p>
                  <p className="text-3xl font-black text-[#EE2C3C] tracking-widest mt-1">{publicTicket.lead_id}</p>
                </div>
                <div>
                  <button
                    onClick={() => setPublicTicket(null)}
                    className="px-6 py-3 bg-[#EE2C3C] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#d42332] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePublicSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-slate-400 font-bold">School Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sunrise Public School"
                      value={publicForm.school_name}
                      onChange={(e) => setPublicForm({ ...publicForm, school_name: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-slate-400 font-bold">School Person Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mrs. Deshmukh"
                      value={publicForm.contact_person}
                      onChange={(e) => setPublicForm({ ...publicForm, contact_person: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-slate-400 font-bold">School Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. principal@sunriseschool.edu.in"
                      value={publicForm.school_email}
                      onChange={(e) => setPublicForm({ ...publicForm, school_email: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-slate-400 font-bold">School Contact Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98221 23456"
                      value={publicForm.contact_number}
                      onChange={(e) => setPublicForm({ ...publicForm, contact_number: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-slate-400 font-bold">School Address & City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Station Road, Satara, Maharashtra"
                    value={publicForm.school_address}
                    onChange={(e) => setPublicForm({ ...publicForm, school_address: e.target.value })}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                  />
                </div>

                <div className="space-y-2 border-t border-b border-white/10 py-4 my-2">
                  <label className="text-xs font-mono uppercase text-[#EE2C3C] font-bold block mb-2">Inquiry Generator Details</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">Inquiry Generated By</label>
                      <select
                        value={publicForm.inquiry_generated_by}
                        onChange={(e) => setPublicForm({ ...publicForm, inquiry_generated_by: e.target.value })}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                      >
                        <option value="Principal">Principal</option>
                        <option value="School Management">School Management</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Parent">Parent</option>
                        <option value="Student">Student</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">Inquiry Generated By Contact Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={publicForm.inquiry_generator_name}
                        onChange={(e) => setPublicForm({ ...publicForm, inquiry_generator_name: e.target.value })}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">Inquiry Generated By Contact Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={publicForm.inquiry_generator_phone}
                        onChange={(e) => setPublicForm({ ...publicForm, inquiry_generator_phone: e.target.value })}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-slate-400 font-bold">Requirement Interest</label>
                    <select
                      value={publicForm.requirement}
                      onChange={(e) => setPublicForm({ ...publicForm, requirement: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                    >
                      <option value="AI Innovation Lab">AI Innovation Lab Setup</option>
                      <option value="Robotics & Drone Kit Setup">Robotics & Drone Kit Setup</option>
                      <option value="3D Printing & Virtual Reality Hub">3D Printing & Virtual Reality Hub</option>
                      <option value="More Information">More Information & Catalogue</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-slate-400 font-bold">Additional Message or Questions</label>
                  <textarea
                    rows={3}
                    placeholder="Provide any extra details about lab space, student count, or timing..."
                    value={publicForm.additional_message}
                    onChange={(e) => setPublicForm({ ...publicForm, additional_message: e.target.value })}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={publicForm.agree_terms}
                    onChange={(e) => setPublicForm({ ...publicForm, agree_terms: e.target.checked })}
                    className="w-4 h-4 accent-[#EE2C3C] rounded cursor-pointer"
                  />
                  <label htmlFor="agree" className="text-xs text-slate-400 cursor-pointer">
                    I agree to allow AIR G International to contact our school regarding this inquiry.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingPublic}
                  className="w-full py-4 bg-[#EE2C3C] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#d42332] transition-all disabled:opacity-50"
                >
                  {isSubmittingPublic ? "SUBMITTING & GENERATING TICKET..." : "SUBMIT SCHOOL INQUIRY"}
                </button>
              </form>
            )}
          </div>
        )}

        {/* ================= 2. LOGGED IN TAB: CREATE LEAD (PHASE 1) ================= */}
        {currentUser && activeTab === "create" && (
          <div className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl space-y-8">
            <div className="border-b border-white/10 pb-6 text-center space-y-2">
              <div className="inline-block px-3 py-1 bg-[#EE2C3C]/20 border border-[#EE2C3C]/40 text-[#EE2C3C] text-[10px] font-mono font-bold uppercase rounded-md">
                ROLE: {currentUser.role} (PHASE 1 LEAD CREATION)
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase text-white font-headline">
                CREATE NEW <span className="text-[#EE2C3C]">LEAD RECORD</span>
              </h2>
            </div>

            {internalTicket ? (
              <div className="bg-blue-950/40 border border-blue-500/30 p-8 rounded-2xl text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto text-3xl font-bold">✓</div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Lead Registered Successfully!</h3>
                <div className="bg-slate-950/80 p-5 rounded-xl border border-blue-500/40 inline-block text-left w-full max-w-md font-mono">
                  <p className="text-xs text-slate-400 uppercase font-bold">Lead Ticket ID</p>
                  <p className="text-3xl font-black text-[#EE2C3C] tracking-widest mt-1">{internalTicket.lead_id}</p>
                </div>
                <div>
                  <button
                    onClick={() => setInternalTicket(null)}
                    className="px-6 py-3 bg-[#EE2C3C] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#d42332] transition-colors"
                  >
                    Create Another Lead
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInternalSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Lead Created By</span>
                    <span className="font-bold text-white">{currentUser.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Creator Contact Phone</span>
                    <input
                      type="tel"
                      value={internalForm.created_by_phone}
                      onChange={(e) => setInternalForm({ ...internalForm, created_by_phone: e.target.value })}
                      className="bg-transparent border-b border-white/20 font-bold text-emerald-400 focus:outline-none w-full"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Category</span>
                    <span className="font-bold text-amber-400">INTERNAL (Organization Member)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-slate-400 font-bold">School Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Modern High School"
                      value={internalForm.school_name}
                      onChange={(e) => setInternalForm({ ...internalForm, school_name: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-slate-400 font-bold">School Person Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mrs. Deshmukh (Principal)"
                      value={internalForm.contact_person}
                      onChange={(e) => setInternalForm({ ...internalForm, contact_person: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-slate-400 font-bold">School Contact Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98221 23456"
                      value={internalForm.contact_number}
                      onChange={(e) => setInternalForm({ ...internalForm, contact_number: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-slate-400 font-bold">School Email</label>
                    <input
                      type="email"
                      placeholder="e.g. info@modernhighschool.ac.in"
                      value={internalForm.school_email}
                      onChange={(e) => setInternalForm({ ...internalForm, school_email: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-slate-400 font-bold">School Address & City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karad, Satara, Maharashtra"
                    value={internalForm.school_address}
                    onChange={(e) => setInternalForm({ ...internalForm, school_address: e.target.value })}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                  />
                </div>

                <div className="border-t border-white/10 pt-4 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-[#EE2C3C] uppercase tracking-wider">
                    ATTRIBUTION & LEAD SOURCE ARCHITECTURE
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-slate-400 font-bold">1. Source *</label>
                      <select
                        value={internalForm.lead_source}
                        onChange={(e) => setInternalForm({ ...internalForm, lead_source: e.target.value })}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                      >
                        <option value="Phone Call">Phone Call</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Email">Email</option>
                        <option value="Referral">Referral / Relative</option>
                        <option value="Exhibition / Event">Exhibition / Event</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Business Contact">Business Contact</option>
                        <option value="Employee Referral">Employee Referral</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-slate-400 font-bold">2. Provided By Category</label>
                      <select
                        value={internalForm.lead_provided_by_type}
                        onChange={(e) => setInternalForm({ ...internalForm, lead_provided_by_type: e.target.value })}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                      >
                        <option value="Employee">Employee (Internal)</option>
                        <option value="Business Contact">Business Contact</option>
                        <option value="Relative">Relative / Personal Contact</option>
                        <option value="School Directly">School Directly</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-slate-400 font-bold">3. Provided By Person Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma (Employee)"
                        value={internalForm.lead_provided_by_name || currentUser.name}
                        onChange={(e) => setInternalForm({ ...internalForm, lead_provided_by_name: e.target.value })}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-3 text-sm text-white focus:border-[#EE2C3C] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingInternal}
                  className="w-full py-4 bg-[#EE2C3C] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#d42332] transition-all disabled:opacity-50"
                >
                  {isSubmittingInternal ? "SUBMITTING LEAD..." : "CREATE INTERNAL LEAD"}
                </button>
              </form>
            )}
          </div>
        )}

        {/* ================= 3. CENTRAL LEAD DICTIONARY (EXACT 9 COLUMNS) ================= */}
        {currentUser && activeTab === "pool" && (
          <div className="space-y-8">
            {/* External BD Commission Summary Dashboard Card */}
            {currentUser.role === "EXTERNAL_BD" && (
              <div className="bg-gradient-to-r from-rose-950/60 via-slate-900/80 to-purple-950/60 border border-rose-500/30 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-mono font-bold uppercase rounded-full mb-2">
                      🤝 Registered External Broker Partner Portal
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight font-headline">
                      Welcome, <span className="text-rose-400">{currentUser.name}</span>
                    </h3>
                    <p className="text-xs text-slate-300">
                      Track your submitted lab inquiries, onboarding steps, and earn commission payouts upon deal conversion.
                    </p>
                  </div>
                  {/* Commission Slab Card */}
                  <div className="bg-slate-950/80 border border-rose-500/40 px-5 py-4 rounded-2xl font-mono min-w-[240px]">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-2">📊 Commission Structure (Per School — One Time Only)</span>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between gap-6">
                        <span className="text-slate-400">300 students</span>
                        <span className="text-emerald-400 font-black">5%</span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span className="text-slate-400">500 students</span>
                        <span className="text-emerald-400 font-black">7%</span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span className="text-slate-400">900 students</span>
                        <span className="text-emerald-400 font-black">9%</span>
                      </div>
                      <div className="flex justify-between gap-6 border-t border-white/10 pt-1 mt-1">
                        <span className="text-slate-300 font-bold">Above 900</span>
                        <span className="text-yellow-400 font-black">11% (Fixed)</span>
                      </div>
                    </div>
                    {/* One-time commission alert */}
                    <div className="mt-3 bg-rose-950/70 border border-rose-500/60 rounded-xl px-3 py-2.5">
                      <p className="text-[10px] text-rose-300 font-black uppercase tracking-wide flex items-center gap-1.5">
                        ⚠️ ONE-TIME COMMISSION ONLY
                      </p>
                      <p className="text-[9px] text-rose-200/80 mt-1 leading-relaxed font-sans">
                        Commission is paid <span className="font-black text-white">only once per school</span>. Once a school is converted and commission is paid out, <span className="font-black text-white">no further commission</span> will be applicable for the same school. Ensure every school you refer is a <span className="font-black text-white">new, unconverted school</span>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                  <div className="bg-slate-950/60 border border-white/10 p-4 rounded-2xl">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">My Referred Leads</span>
                    <span className="text-2xl font-black text-white">{leads.length}</span>
                  </div>
                  <div className="bg-slate-950/60 border border-emerald-500/30 p-4 rounded-2xl">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">Converted Labs</span>
                    <span className="text-2xl font-black text-emerald-400">
                      {leads.filter(l => l.status === "CONVERTED" || l.status === "ACTIVATED").length}
                    </span>
                  </div>
                  <div className="bg-slate-950/60 border border-amber-500/30 p-4 rounded-2xl">
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">In-Process / Verification</span>
                    <span className="text-2xl font-black text-amber-400">
                      {leads.filter(l => l.status !== "CONVERTED" && l.status !== "ACTIVATED" && l.status !== "CANCELLED").length}
                    </span>
                  </div>
                  <div className="bg-slate-950/60 border border-purple-500/30 p-4 rounded-2xl">
                    <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block">Est. Payable Commission</span>
                    <span className="text-2xl font-black text-purple-300">
                      ₹ {(leads.filter(l => l.status === "CONVERTED" || l.status === "ACTIVATED").length * 75000).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/80 p-6 rounded-3xl border border-white/10">
              <div>
                <div className="inline-block px-3 py-1 bg-[#EE2C3C]/20 border border-[#EE2C3C]/40 text-[#EE2C3C] text-[10px] font-mono font-bold uppercase rounded-md">
                  {currentUser.role === "CEO"
                    ? "EXACT 9-COLUMN MASTER CENTRAL LEAD DICTIONARY (ALL LEADS)"
                    : currentUser.role === "EXTERNAL_BD"
                    ? "BROKER REFERRED LEADS ISOLATION VIEW"
                    : "MY CREATED & ASSIGNED LEADS ONLY"}
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight font-headline mt-1">
                  {currentUser.role === "CEO"
                    ? "ALL SCHOOL LEADS IN SYSTEM"
                    : currentUser.role === "EXTERNAL_BD"
                    ? "MY SUBMITTED SCHOOL INQUIRIES"
                    : "MY SUBMITTED LEADS"}{" "}
                  <span className="text-[#EE2C3C]">({leads.length})</span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search Lead ID, School, Phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:border-[#EE2C3C] focus:outline-none"
                />
                <button
                  onClick={() => fetchLeads(currentUser)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-mono font-bold rounded-xl uppercase transition-colors"
                >
                  Refresh 🔄
                </button>
              </div>
            </div>

            {/* Exact 9-Column Table */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              {isLoadingLeads ? (
                <div className="p-12 text-center text-slate-400 font-mono text-xs">Loading Leads Pool...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-slate-950/80 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        <th className="py-4 px-4">1. Lead Ticket ID</th>
                        <th className="py-4 px-4">2. School Name</th>
                        <th className="py-4 px-4">3. School Contact</th>
                        <th className="py-4 px-4">4. Person Who Created Lead</th>
                        <th className="py-4 px-4">5. Source</th>
                        <th className="py-4 px-4">6. Created By Category</th>
                        <th className="py-4 px-4">7. Assigned To</th>
                        <th className="py-4 px-4">8. Status</th>
                        <th className="py-4 px-4 text-right">9. Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs">
                      {leads.map((lead) => (
                        <tr key={lead._id || lead.lead_id} className="hover:bg-white/5 transition-colors">
                          {/* 1. Lead Ticket ID */}
                          <td className="py-4 px-4 font-mono font-bold text-[#EE2C3C]">
                            <button
                              onClick={() => setViewDetailsLead(lead)}
                              className="hover:underline font-bold text-[#EE2C3C]"
                            >
                              {lead.lead_id} 🔍
                            </button>
                            {lead.is_duplicate && <span className="block text-[9px] text-amber-400 font-mono">⚠️ Duplicate</span>}
                          </td>

                          {/* 2. School Name */}
                          <td className="py-4 px-4 font-bold text-white max-w-[180px] truncate">
                            <button onClick={() => setViewDetailsLead(lead)} className="hover:text-[#EE2C3C] text-left">
                              {lead.school_name}
                            </button>
                          </td>

                          {/* 3. School Contact (School Person Contact Name + School Contact Number) */}
                          <td className="py-4 px-4 text-slate-300">
                            <span className="block font-bold text-white">{lead.contact_person}</span>
                            <span className="block text-[11px] text-emerald-400 font-mono font-bold">{lead.contact_number}</span>
                          </td>

                          {/* 4. Person Who Created Lead (Inquiry Generator Name + Phone) */}
                          <td className="py-4 px-4 text-slate-300">
                            <span className="block font-bold text-white">{lead.inquiry_generator_name || lead.created_by_name}</span>
                            <span className="block text-[11px] text-slate-400 font-mono">{lead.inquiry_generator_phone || lead.created_by_phone || "9876543210"}</span>
                          </td>

                          {/* 5. Source */}
                          <td className="py-4 px-4">
                            <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px]">
                              {lead.lead_source || "Website"}
                            </span>
                          </td>

                          {/* 6. Created By Category (INTERNAL vs EXTERNAL) */}
                          <td className="py-4 px-4">
                            {lead.creator_category === "INTERNAL" || (lead.created_by_role && !lead.created_by_role.includes("Public")) ? (
                              <span className="px-2 py-1 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono text-[10px] font-bold">
                                INTERNAL (Company)
                              </span>
                            ) : (
                              <span className="px-2 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold">
                                EXTERNAL (School / Referral)
                              </span>
                            )}
                          </td>

                          {/* 7. Assigned To */}
                          <td className="py-4 px-4">
                            {!lead.assigned_to_name || lead.assigned_to_name.toUpperCase() === "UNASSIGNED" ? (
                              <span className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] font-bold">
                                UNASSIGNED
                              </span>
                            ) : (
                              <span className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                                {lead.assigned_to_name}
                              </span>
                            )}
                          </td>

                          {/* 8. Status */}
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded font-mono text-[9px] font-bold uppercase ${
                              lead.status === "NEW" ? "bg-amber-500/20 text-amber-400" :
                              lead.status === "ACTIVATED" ? "bg-blue-500/20 text-blue-400" :
                              lead.status === "CONVERTED" ? "bg-emerald-500/20 text-emerald-400" :
                              "bg-purple-500/20 text-purple-400"
                            }`}>
                              {lead.status.replace('_', ' ')}
                            </span>
                          </td>

                          {/* 9. Action */}
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2 flex-wrap">
                              {currentUser.role === "CEO" && lead.status === "COORDINATOR_NOMINATED" && (
                                <button
                                  onClick={() => handleApproveCoordinatorAccount(lead)}
                                  className="px-2.5 py-1 bg-blue-600 text-white font-bold text-[10px] uppercase rounded-lg hover:bg-blue-700 transition-colors shadow-md font-mono"
                                >
                                  Approve Coord 🔑
                                </button>
                              )}

                              {(currentUser.role === "PURCHASE_MANAGER" || currentUser.role === "CEO" || currentUser.role === "BUSINESS_DEVELOPER") && (
                                <button
                                  onClick={() => {
                                    handleActivatePurchaseLead(lead);
                                    setActiveTab("purchase");
                                  }}
                                  className="px-2.5 py-1 bg-emerald-600 text-white font-bold text-[10px] uppercase rounded-lg hover:bg-emerald-700 transition-colors shadow-md font-mono"
                                >
                                  Purchase List 🛒
                                </button>
                              )}

                              {(currentUser.role === "BUSINESS_DEVELOPER" || currentUser.role === "CEO") && (lead.status === "STEP3_COMPLETE" || (lead.phase3 && lead.phase3.status === "COMPLETE")) && !(lead.phase4 && lead.phase4.coordinator_email) && (
                                <button
                                  onClick={() => {
                                    setNominateModalLead(lead);
                                    setNominateForm({
                                      coordinator_name: lead.contact_person || "Anjali Deshmukh",
                                      coordinator_email: lead.school_email || "coordinator@sunriseschool.edu.in",
                                      coordinator_phone: lead.contact_number || "9822123456"
                                    });
                                  }}
                                  className="px-2.5 py-1 bg-indigo-600 text-white font-bold text-[10px] uppercase rounded-lg hover:bg-indigo-700 transition-colors shadow-md font-mono"
                                >
                                  Nominate Coord 👤
                                </button>
                              )}

                              {currentUser.role === "CEO" && (
                                <button
                                  onClick={() => {
                                    setSelectedLead(lead);
                                    if (teamUsers.length > 0) {
                                      setSelectedAssignee(teamUsers[0].name);
                                    }
                                  }}
                                  className="px-2.5 py-1 bg-[#EE2C3C] text-white font-bold text-[10px] uppercase rounded-lg hover:bg-[#d42332] transition-colors shadow-md"
                                >
                                  {!lead.assigned_to_name || lead.assigned_to_name.toUpperCase() === "UNASSIGNED" ? "Assign 👑" : "Reassign 👑"}
                                </button>
                              )}

                              {canUserManageLead(lead, currentUser) ? (
                                <button
                                  onClick={() => {
                                    if (!lead.is_active_lead) {
                                      setMeetingModalLead(lead);
                                      setMeetingForm({
                                        meeting_date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
                                        meeting_type: "In-Person Meeting",
                                        meeting_place: "School Campus",
                                        attendees: `${lead.contact_person} & ${currentUser.name}`,
                                        notes: `Meeting scheduled with ${lead.school_name} principal.`
                                      });
                                    } else {
                                      handleToggleLeadActive(lead, false);
                                    }
                                  }}
                                  className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold uppercase transition-all shadow-md flex items-center gap-1.5 ${
                                    lead.is_active_lead
                                      ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30"
                                      : "bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30"
                                  }`}
                                >
                                  <span className={`w-2 h-2 rounded-full ${lead.is_active_lead ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`} />
                                  <span>{lead.is_active_lead ? "ON" : "OFF"}</span>
                                </button>
                              ) : (
                                <span className="text-[10px] font-mono text-slate-500 italic">
                                  {lead.is_active_lead ? "● ON" : "○ OFF"}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* CEO Lead Assignment Modal */}
            {selectedLead && currentUser.role === "CEO" && (
              <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-white/20 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
                  <div className="flex justify-between items-start border-b border-white/10 pb-4">
                    <div>
                      <span className="font-mono text-xs text-[#EE2C3C] font-bold uppercase">{selectedLead.lead_id}</span>
                      <h3 className="text-2xl font-black text-white uppercase">{selectedLead.school_name}</h3>
                      <p className="text-xs text-slate-400">School Contact: {selectedLead.contact_person} ({selectedLead.contact_number})</p>
                    </div>
                    <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-white text-2xl font-bold">✕</button>
                  </div>

                  <div className="bg-slate-950/80 p-5 rounded-2xl border border-[#EE2C3C]/40 space-y-4">
                    <h4 className="text-xs font-mono font-bold text-[#EE2C3C] uppercase tracking-wider">
                      👑 CEO LEAD ASSIGNMENT CONTROL
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-400 font-mono uppercase block font-bold mb-1">Select Assignee (BD / Marketing)</label>
                        <select
                          value={selectedAssignee}
                          onChange={(e) => setSelectedAssignee(e.target.value)}
                          className="w-full bg-slate-900 border border-white/20 rounded-xl px-3 py-3 text-xs text-white focus:outline-none"
                        >
                          {teamUsers.map((u, idx) => (
                            <option key={u._id || idx} value={u.name}>
                              {u.name} ({u.role} — {u.department})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleAssignLead}
                      disabled={isAssigning}
                      className="w-full py-3 bg-[#EE2C3C] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#d42332] transition-all disabled:opacity-50 shadow-lg"
                    >
                      {isAssigning ? "ASSIGNING & NOTIFYING..." : `ASSIGN LEAD TO ${selectedAssignee.toUpperCase()}`}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* FULL LEAD DETAILS DRAWER MODAL */}
            {viewDetailsLead && (
              <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-slate-900 border border-white/20 rounded-3xl max-w-3xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative my-8">
                  <div className="flex justify-between items-start border-b border-white/10 pb-4">
                    <div>
                      <span className="font-mono text-xs text-[#EE2C3C] font-bold uppercase">{viewDetailsLead.lead_id}</span>
                      <h3 className="text-2xl font-black text-white uppercase">{viewDetailsLead.school_name}</h3>
                      <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold uppercase">
                        Status: {viewDetailsLead.status}
                      </span>
                    </div>
                    <button onClick={() => setViewDetailsLead(null)} className="text-slate-400 hover:text-white text-2xl font-bold">✕</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-950 p-4 rounded-xl space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">School Person Contact</span>
                      <p className="font-bold text-white">{viewDetailsLead.contact_person}</p>
                      <p className="font-mono text-emerald-400 font-bold">{viewDetailsLead.contact_number}</p>
                      <p className="text-slate-400">{viewDetailsLead.school_email}</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Inquiry Generator Details</span>
                      <p className="font-bold text-white">{viewDetailsLead.inquiry_generator_name || viewDetailsLead.created_by_name} ({viewDetailsLead.inquiry_generated_by || "Public"})</p>
                      <p className="font-mono text-slate-300">{viewDetailsLead.inquiry_generator_phone || viewDetailsLead.created_by_phone || "N/A"}</p>
                      <span className="inline-block px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[9px] mt-1">
                        Category: {viewDetailsLead.creator_category || "EXTERNAL"}
                      </span>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl space-y-1 col-span-1 md:col-span-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">School Address & City</span>
                      <p className="text-slate-300">{viewDetailsLead.school_address}</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Requirement Interest</span>
                      <p className="font-bold text-amber-400">{viewDetailsLead.requirement || "AI Innovation Lab"}</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Assigned Owner</span>
                      <p className="font-bold text-emerald-400">{viewDetailsLead.assigned_to_name}</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl space-y-1 col-span-1 md:col-span-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Additional Message / Notes</span>
                      <p className="text-slate-300 italic">{viewDetailsLead.additional_message || "No additional message provided."}</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setViewDetailsLead(null)}
                      className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase rounded-xl"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 4. PHASE 2 LEAD CONVERSION & CONNECTION PORTAL ================= */}
        {currentUser && (currentUser.role === "BUSINESS_DEVELOPER" || currentUser.role === "CEO") && activeTab === "phase2" && (
          <div className="space-y-8">
            <div className="bg-slate-900/90 border border-white/10 p-6 md:p-8 rounded-3xl space-y-2">
              <div className="inline-block px-3 py-1 bg-[#EE2C3C]/20 border border-[#EE2C3C]/40 text-[#EE2C3C] text-[10px] font-mono font-bold uppercase rounded-md">
                PHASE 2 — LEAD CONVERSION & CONNECTION
              </div>
              <h2 className="text-3xl font-black uppercase text-white font-headline">
                TURNING CREATED LEADS INTO <span className="text-[#EE2C3C]">ACTIVE SCHOOL OPPORTUNITIES</span>
              </h2>
            </div>

            {!activePhase2Lead ? (
              <div className="bg-slate-900/60 border border-white/10 p-6 rounded-3xl space-y-4">
                <h3 className="text-lg font-bold text-white uppercase">1. Select Lead to Activate for Phase 2 Conversion</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {leads.map((l) => (
                    <div key={l._id || l.lead_id} className="bg-slate-950 p-5 rounded-2xl border border-white/10 flex justify-between items-center">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#EE2C3C]">{l.lead_id}</span>
                        <h4 className="text-base font-bold text-white">{l.school_name}</h4>
                        <p className="text-xs text-slate-400">School Contact: {l.contact_person} ({l.contact_number})</p>
                        <p className="text-xs text-slate-500">Inquiry Generator: {l.inquiry_generator_name || l.created_by_name} ({l.inquiry_generator_phone || l.created_by_phone || "N/A"})</p>
                      </div>
                      <button
                        onClick={() => handleActivatePhase2Lead(l)}
                        disabled={isActivatingLead}
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg"
                      >
                        Activate Lead ⚡
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-slate-900 p-6 rounded-3xl border border-emerald-500/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase">● ACTIVATED LEAD WORKSPACE</span>
                    <h2 className="text-3xl font-black text-white uppercase">{activePhase2Lead.school_name}</h2>
                    <p className="text-xs text-slate-400 font-mono">Lead Ticket ID: <span className="text-[#EE2C3C] font-bold">{activePhase2Lead.lead_id}</span> | Activated By: {currentUser.name}</p>
                  </div>
                  <button
                    onClick={() => setActivePhase2Lead(null)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-mono text-slate-300 rounded-xl"
                  >
                    Select Different Lead ↩
                  </button>
                </div>

                {/* Meetings Module */}
                <div className="bg-slate-900/60 border border-white/10 p-6 rounded-3xl space-y-6">
                  <h3 className="text-lg font-bold text-white uppercase border-b border-white/10 pb-4">
                    2. Meeting Details Module (Meetings Recorded: {meetings.length}/3)
                  </h3>
                  
                  {/* Recorded Meetings List with Proof Photos */}
                  <div className="space-y-3">
                    {meetings.map((m, idx) => (
                      <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                        <div className="flex items-start gap-3 flex-1">
                          {m.proof_photo_url ? (
                            <div className="relative group shrink-0">
                              <img
                                src={m.proof_photo_url}
                                alt={`Meeting #${m.meeting_number} Proof`}
                                className="w-16 h-14 object-cover rounded-xl border border-emerald-500/40 cursor-pointer shadow-md"
                                onClick={() => setPreviewWallPhoto({ title: `Meeting #${m.meeting_number} Proof Photo (${m.attendees})`, url: m.proof_photo_url, remarks: `Date: ${m.meeting_date} | Place: ${m.meeting_place} | Notes: ${m.notes}` })}
                              />
                              <button
                                type="button"
                                onClick={() => setPreviewWallPhoto({ title: `Meeting #${m.meeting_number} Proof Photo (${m.attendees})`, url: m.proof_photo_url, remarks: `Date: ${m.meeting_date} | Place: ${m.meeting_place} | Notes: ${m.notes}` })}
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[9px] font-bold text-white rounded-xl transition-opacity"
                              >
                                🔍 Inspect
                              </button>
                            </div>
                          ) : (
                            <div className="w-16 h-14 rounded-xl border border-dashed border-white/20 bg-slate-900 flex flex-col items-center justify-center text-[9px] text-slate-500 shrink-0">
                              <span>📸</span>
                              <span>No Photo</span>
                            </div>
                          )}

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-emerald-400 font-bold uppercase">Meeting #{m.meeting_number} — {m.meeting_date} ({m.meeting_type})</span>
                              {m.proof_photo_url && (
                                <span className="text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                                  ✅ Photo Verified
                                </span>
                              )}
                            </div>
                            <p className="text-white font-bold">Attendees: {m.attendees} | Location: {m.meeting_place}</p>
                            <p className="text-slate-300">{m.notes}</p>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px] rounded uppercase shrink-0">
                          {m.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Record New Meeting Form with Person Proof Photo */}
                  {meetings.length < 3 && (
                    <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/5 space-y-4">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <h4 className="text-xs font-mono font-bold text-slate-300 uppercase">+ Record New Meeting ({meetings.length + 1}/3)</h4>
                        <span className="text-[10px] font-mono text-amber-400 font-bold">Upload Person Photo as Proof</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">Meeting Date *</label>
                          <input
                            type="date"
                            required
                            value={newMeeting.meeting_date}
                            onChange={(e) => setNewMeeting({ ...newMeeting, meeting_date: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">Attendees *</label>
                          <input
                            type="text"
                            placeholder="Attendees (e.g. Principal & IT Head)"
                            value={newMeeting.attendees}
                            onChange={(e) => setNewMeeting({ ...newMeeting, attendees: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">Meeting Place *</label>
                          <input
                            type="text"
                            placeholder="Meeting Place"
                            value={newMeeting.meeting_place}
                            onChange={(e) => setNewMeeting({ ...newMeeting, meeting_place: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">Meeting Type *</label>
                          <select
                            value={newMeeting.meeting_type}
                            onChange={(e) => setNewMeeting({ ...newMeeting, meeting_type: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                          >
                            <option value="In-Person">In-Person Meeting</option>
                            <option value="Online Video Call">Online Video Call</option>
                          </select>
                        </div>
                      </div>

                      {/* Discussion Notes */}
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">Discussion Notes & Budget Decisions *</label>
                        <textarea
                          rows={2}
                          placeholder="Discussion notes, budget decisions..."
                          value={newMeeting.notes}
                          onChange={(e) => setNewMeeting({ ...newMeeting, notes: e.target.value })}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>

                      {/* Meeting Person Photo Proof Uploader */}
                      <div className="bg-slate-900 p-3.5 rounded-xl border border-white/10 space-y-2">
                        <label className="text-[11px] font-mono font-bold text-slate-300 uppercase flex items-center justify-between">
                          <span>📸 Meeting Person / Principal Proof Photo *</span>
                          {newMeeting.proof_photo_url && (
                            <span className="text-[9px] text-emerald-400 font-mono font-bold">✓ Proof Photo Attached</span>
                          )}
                        </label>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          {newMeeting.proof_photo_url ? (
                            <div className="relative group shrink-0">
                              <img
                                src={newMeeting.proof_photo_url}
                                alt="Person Proof Preview"
                                className="w-16 h-14 object-cover rounded-lg border border-emerald-500/40 shadow cursor-pointer"
                                onClick={() => setPreviewWallPhoto({ title: "Meeting Person Proof Photo", url: newMeeting.proof_photo_url, remarks: newMeeting.notes })}
                              />
                              <button
                                type="button"
                                onClick={() => setPreviewWallPhoto({ title: "Meeting Person Proof Photo", url: newMeeting.proof_photo_url, remarks: newMeeting.notes })}
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[9px] font-bold text-white rounded-lg transition-opacity"
                              >
                                🔍 View
                              </button>
                            </div>
                          ) : (
                            <div className="w-16 h-14 rounded-lg border border-dashed border-white/20 bg-slate-950 flex flex-col items-center justify-center text-[9px] text-slate-500 shrink-0">
                              <span>📷</span>
                              <span>No Photo</span>
                            </div>
                          )}

                          <input
                            type="text"
                            placeholder="Paste photo URL or Upload button below"
                            value={newMeeting.proof_photo_url}
                            onChange={(e) => setNewMeeting({ ...newMeeting, proof_photo_url: e.target.value })}
                            className="flex-1 w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                          />

                          <div className="flex gap-2 shrink-0">
                            <label className="px-3 py-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase rounded-xl cursor-pointer transition-all">
                              📁 Upload Person Photo
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      if (event.target?.result) {
                                        setNewMeeting({ ...newMeeting, proof_photo_url: event.target.result as string });
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => setNewMeeting({ ...newMeeting, proof_photo_url: "/centres/gallery/photo-new-1.jpeg" })}
                              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl border border-white/10"
                            >
                              📷 Sample Proof
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleAddMeeting}
                        className="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-xl transition-all shadow-lg font-mono"
                      >
                        + Add Meeting Entry
                      </button>
                    </div>
                  )}
                </div>

                {/* Conversion Form */}
                <div className="bg-slate-900/80 border border-white/10 p-6 md:p-8 rounded-3xl space-y-8 shadow-2xl">
                  <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#EE2C3C] uppercase tracking-wider">
                        FORM 2 — SCHOOL INFORMATION COLLECTION FORM
                      </span>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                        AIR G INTERNATIONAL — AI & ROBOTICS LAB PROGRAM ONBOARDING FORM
                      </h3>
                      <p className="text-xs text-slate-400">
                        Phase 2 Conversion & Site Assessment Details for {activePhase2Lead.school_name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold rounded-lg">
                        Phase 2 Active
                      </span>
                    </div>
                  </div>

                  {/* SECTION 1: INSTITUTE INFORMATION */}
                  <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <h4 className="text-sm font-mono font-bold text-[#EE2C3C] uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#EE2C3C]"></span>
                        SECTION 1: INSTITUTE INFORMATION
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">School & Management Contacts</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">School Name</label>
                        <input
                          type="text"
                          value={activePhase2Lead.school_name || ""}
                          disabled
                          className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-slate-300 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Decision Maker (Trustee/Director)</label>
                        <input
                          type="text"
                          placeholder="Name"
                          value={phase2Form.decision_maker_name || ""}
                          onChange={(e) => setPhase2Form({ ...phase2Form, decision_maker_name: e.target.value })}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white mb-2"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={phase2Form.decision_maker_phone || ""}
                          onChange={(e) => setPhase2Form({ ...phase2Form, decision_maker_phone: e.target.value })}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Principal Details</label>
                        <input
                          type="text"
                          placeholder="Principal Name"
                          value={phase2Form.principal_name || ""}
                          onChange={(e) => setPhase2Form({ ...phase2Form, principal_name: e.target.value })}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white mb-2"
                        />
                        <input
                          type="tel"
                          placeholder="Principal Phone"
                          value={phase2Form.principal_phone || ""}
                          onChange={(e) => setPhase2Form({ ...phase2Form, principal_phone: e.target.value })}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">School Program Coordinator</label>
                        <input
                          type="text"
                          placeholder="Coordinator Name"
                          value={phase2Form.coordinator_name || ""}
                          onChange={(e) => setPhase2Form({ ...phase2Form, coordinator_name: e.target.value })}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white mb-2"
                        />
                        <input
                          type="tel"
                          placeholder="Coordinator Phone"
                          value={phase2Form.coordinator_phone || ""}
                          onChange={(e) => setPhase2Form({ ...phase2Form, coordinator_phone: e.target.value })}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: NUMBER OF STUDENTS — STANDARD-WISE TABLE */}
                  <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <h4 className="text-sm font-mono font-bold text-[#EE2C3C] uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#EE2C3C]"></span>
                        SECTION 2: NUMBER OF STUDENTS (STANDARD-WISE TABLE)
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        Live Auto-Calculated Totals ✓
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px] uppercase bg-slate-900/80">
                            <th className="py-2.5 px-3">Sr. Standard / Class</th>
                            <th className="py-2.5 px-3">Total Student Count</th>
                            <th className="py-2.5 px-3">Total Admission Count</th>
                            <th className="py-2.5 px-3">Last Year School Fees (₹/Yr)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono">
                          {(phase2Form.student_counts_table || []).map((row, idx) => (
                            <tr key={idx} className="hover:bg-white/5">
                              <td className="py-2 px-3 text-white font-bold">{row.standard}</td>
                              <td className="py-2 px-3">
                                <input
                                  type="number"
                                  value={row.student_count || 0}
                                  onChange={(e) => {
                                    const updated = [...(phase2Form.student_counts_table || [])];
                                    updated[idx] = { ...updated[idx], student_count: Number(e.target.value) };
                                    setPhase2Form({ ...phase2Form, student_counts_table: updated });
                                  }}
                                  className="w-28 bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                                />
                              </td>
                              <td className="py-2 px-3">
                                <input
                                  type="number"
                                  value={row.admission_count || 0}
                                  onChange={(e) => {
                                    const updated = [...(phase2Form.student_counts_table || [])];
                                    updated[idx] = { ...updated[idx], admission_count: Number(e.target.value) };
                                    setPhase2Form({ ...phase2Form, student_counts_table: updated });
                                  }}
                                  className="w-28 bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                                />
                              </td>
                              <td className="py-2 px-3">
                                <input
                                  type="number"
                                  value={row.last_year_fees || 0}
                                  onChange={(e) => {
                                    const updated = [...(phase2Form.student_counts_table || [])];
                                    updated[idx] = { ...updated[idx], last_year_fees: Number(e.target.value) };
                                    setPhase2Form({ ...phase2Form, student_counts_table: updated });
                                  }}
                                  className="w-36 bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-xs text-emerald-400"
                                />
                              </td>
                            </tr>
                          ))}
                          {/* TOTALS SUMMARY ROW */}
                          <tr className="bg-slate-900 font-bold border-t-2 border-emerald-500/40 text-emerald-400">
                            <td className="py-3 px-3 uppercase">TOTAL / AVERAGE SUM</td>
                            <td className="py-3 px-3 text-sm">
                              {(phase2Form.student_counts_table || []).reduce((sum, r) => sum + (Number(r.student_count) || 0), 0)} Students
                            </td>
                            <td className="py-3 px-3 text-sm">
                              {(phase2Form.student_counts_table || []).reduce((sum, r) => sum + (Number(r.admission_count) || 0), 0)} Admissions
                            </td>
                            <td className="py-3 px-3 text-sm">
                              Avg ₹{
                                phase2Form.student_counts_table && phase2Form.student_counts_table.length > 0
                                  ? Math.round((phase2Form.student_counts_table || []).reduce((sum, r) => sum + (Number(r.last_year_fees) || 0), 0) / phase2Form.student_counts_table.length)
                                  : 0
                              } / year
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* SECTION 3: MEDIUM OF INSTRUCTION & BOARD */}
                  <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <h4 className="text-sm font-mono font-bold text-[#EE2C3C] uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#EE2C3C]"></span>
                        SECTION 3: MEDIUM OF INSTRUCTION & BOARD OF SCHOOL
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Medium Checkboxes */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono text-slate-300 uppercase block font-bold">Medium of Instruction</label>
                        <div className="flex flex-wrap gap-3">
                          {["English", "Hindi", "Marathi", "Other"].map((med) => {
                            const isChecked = (phase2Form.medium_of_school || []).includes(med);
                            return (
                              <label key={med} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs cursor-pointer ${isChecked ? 'bg-[#EE2C3C]/20 border-[#EE2C3C] text-white font-bold' : 'bg-slate-900 border-white/10 text-slate-400'}`}>
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    const current = phase2Form.medium_of_school || [];
                                    const updated = current.includes(med) ? current.filter(x => x !== med) : [...current, med];
                                    setPhase2Form({ ...phase2Form, medium_of_school: updated });
                                  }}
                                  className="accent-[#EE2C3C]"
                                />
                                {med}
                              </label>
                            );
                          })}
                        </div>
                        {(phase2Form.medium_of_school || []).includes("Other") && (
                          <input
                            type="text"
                            placeholder="Specify Other Medium"
                            value={phase2Form.medium_other || ""}
                            onChange={(e) => setPhase2Form({ ...phase2Form, medium_other: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white mt-2"
                          />
                        )}
                      </div>

                      {/* Board Checkboxes */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono text-slate-300 uppercase block font-bold font-mono">Board of School</label>
                        <div className="flex flex-wrap gap-3">
                          {["CBSE", "ICSE", "State Board", "IB", "Other"].map((brd) => {
                            const isChecked = (phase2Form.board_of_school || []).includes(brd);
                            return (
                              <label key={brd} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs cursor-pointer ${isChecked ? 'bg-blue-600/20 border-blue-500 text-white font-bold' : 'bg-slate-900 border-white/10 text-slate-400'}`}>
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    const current = phase2Form.board_of_school || [];
                                    const updated = current.includes(brd) ? current.filter(x => x !== brd) : [...current, brd];
                                    setPhase2Form({ ...phase2Form, board_of_school: updated });
                                  }}
                                  className="accent-blue-500"
                                />
                                {brd}
                              </label>
                            );
                          })}
                        </div>
                        {(phase2Form.board_of_school || []).includes("Other") && (
                          <input
                            type="text"
                            placeholder="Specify Other Board"
                            value={phase2Form.board_other || ""}
                            onChange={(e) => setPhase2Form({ ...phase2Form, board_other: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white mt-2"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4 & SECTION 5 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* SECTION 4: STUDENTS' EXISTING KNOWLEDGE */}
                    <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-white/5">
                      <div className="border-b border-white/10 pb-2">
                        <h4 className="text-sm font-mono font-bold text-[#EE2C3C] uppercase flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#EE2C3C]"></span>
                          SECTION 4: STUDENTS' EXISTING KNOWLEDGE IN AI & ROBOTICS
                        </h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {["No Prior Knowledge", "Basic", "Medium", "Advance"].map((lvl) => {
                          const isSelected = phase2Form.ai_robotics_knowledge_level === lvl;
                          return (
                            <button
                              type="button"
                              key={lvl}
                              onClick={() => setPhase2Form({ ...phase2Form, ai_robotics_knowledge_level: lvl as any })}
                              className={`p-3 rounded-xl border text-xs font-mono font-bold text-left transition-all ${
                                isSelected
                                  ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg'
                                  : 'bg-slate-900 border-white/10 text-slate-400 hover:border-white/20'
                              }`}
                            >
                              {isSelected ? "● " : "○ "} {lvl}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* SECTION 5: FACILITY AVAILABILITY */}
                    <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-white/5">
                      <div className="border-b border-white/10 pb-2">
                        <h4 className="text-sm font-mono font-bold text-[#EE2C3C] uppercase flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#EE2C3C]"></span>
                          SECTION 5: FACILITY AVAILABILITY
                        </h4>
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 bg-slate-900 border border-white/10 rounded-xl cursor-pointer">
                          <span className="text-xs text-white font-bold">1. Dedicated Classroom Available for AI Lab</span>
                          <input
                            type="checkbox"
                            checked={phase2Form.dedicated_classroom_available || false}
                            onChange={(e) => setPhase2Form({ ...phase2Form, dedicated_classroom_available: e.target.checked })}
                            className="w-5 h-5 accent-emerald-500"
                          />
                        </label>
                        <label className="flex items-center justify-between p-3 bg-slate-900 border border-white/10 rounded-xl cursor-pointer">
                          <span className="text-xs text-white font-bold">2. High-Speed Wi-Fi / LAN Connectivity</span>
                          <input
                            type="checkbox"
                            checked={phase2Form.wifi_available || false}
                            onChange={(e) => setPhase2Form({ ...phase2Form, wifi_available: e.target.checked })}
                            className="w-5 h-5 accent-emerald-500"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 6: CLASSROOM INFRASTRUCTURE MEASUREMENT & WALL PHOTO DETAILS TABLE */}
                  <div className="space-y-6 bg-slate-950/60 p-5 md:p-6 rounded-2xl border border-white/5 shadow-xl">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 border-b border-white/10 pb-3">
                      <div>
                        <h4 className="text-sm font-mono font-bold text-[#EE2C3C] uppercase flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#EE2C3C]"></span>
                          SECTION 6: CLASSROOM INFRASTRUCTURE — MEASUREMENT & WALL PHOTO DETAILS
                        </h4>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                          Record exact wall measurements and attach photos to identify pillars, beams, electrical boxes, or non-plain obstacles.
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                        Calculated Floor Area: {
                          ((phase2Form.infrastructure_measurements || []).find(m => m.item_name === "Floor")?.length_ft || phase2Form.room_length || 0) *
                          ((phase2Form.infrastructure_measurements || []).find(m => m.item_name === "Floor")?.width_ft || phase2Form.room_width || 0)
                        } sq ft
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px] uppercase bg-slate-900/80">
                            <th className="py-2.5 px-3 min-w-[140px]">Item / Particulars</th>
                            <th className="py-2.5 px-3 min-w-[90px]">Length (ft)</th>
                            <th className="py-2.5 px-3 min-w-[90px]">Width/Height (ft)</th>
                            <th className="py-2.5 px-3 min-w-[200px]">Location & Pillar Remarks</th>
                            <th className="py-2.5 px-3 min-w-[260px]">Wall Photo (Pillar & Structure Proof)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono">
                          {(phase2Form.infrastructure_measurements || []).map((row, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                              <td className="py-3 px-3 text-white font-bold align-top">
                                <span>{row.item_name}</span>
                                {row.has_pillar && (
                                  <span className="block text-[9px] text-amber-400 font-bold mt-1 uppercase bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 w-fit">
                                    ⚠️ Pillar / Obstacle
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-3 align-top">
                                <input
                                  type="number"
                                  value={row.length_ft || 0}
                                  onChange={(e) => {
                                    const updated = [...(phase2Form.infrastructure_measurements || [])];
                                    updated[idx] = { ...updated[idx], length_ft: Number(e.target.value) };
                                    setPhase2Form({ ...phase2Form, infrastructure_measurements: updated });
                                  }}
                                  className="w-20 bg-slate-900 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white"
                                />
                              </td>
                              <td className="py-3 px-3 align-top">
                                <input
                                  type="number"
                                  value={row.width_ft || 0}
                                  onChange={(e) => {
                                    const updated = [...(phase2Form.infrastructure_measurements || [])];
                                    updated[idx] = { ...updated[idx], width_ft: Number(e.target.value) };
                                    setPhase2Form({ ...phase2Form, infrastructure_measurements: updated });
                                  }}
                                  className="w-20 bg-slate-900 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white"
                                />
                              </td>
                              <td className="py-3 px-3 align-top space-y-2">
                                <input
                                  type="text"
                                  placeholder="Location, window side, pillar notes..."
                                  value={row.location_remarks || ""}
                                  onChange={(e) => {
                                    const updated = [...(phase2Form.infrastructure_measurements || [])];
                                    updated[idx] = { ...updated[idx], location_remarks: e.target.value };
                                    setPhase2Form({ ...phase2Form, infrastructure_measurements: updated });
                                  }}
                                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-slate-300"
                                />
                                <label className="flex items-center gap-2 text-[10px] text-amber-300 cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    checked={Boolean(row.has_pillar)}
                                    onChange={(e) => {
                                      const updated = [...(phase2Form.infrastructure_measurements || [])];
                                      updated[idx] = { ...updated[idx], has_pillar: e.target.checked };
                                      setPhase2Form({ ...phase2Form, infrastructure_measurements: updated });
                                    }}
                                    className="rounded border-white/20 bg-slate-900 text-amber-500 focus:ring-0"
                                  />
                                  <span>Has Pillar / Beam / Non-plain Obstacle</span>
                                </label>
                              </td>
                              <td className="py-3 px-3 align-top space-y-2">
                                <div className="flex items-center gap-2">
                                  {row.photo_url ? (
                                    <div className="relative group shrink-0">
                                      <img
                                        src={row.photo_url}
                                        alt={row.item_name}
                                        className="w-14 h-12 object-cover rounded-lg border border-emerald-500/40 shadow cursor-pointer"
                                        onClick={() => setPreviewWallPhoto({ title: row.item_name, url: row.photo_url || "", remarks: row.location_remarks })}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => setPreviewWallPhoto({ title: row.item_name, url: row.photo_url || "", remarks: row.location_remarks })}
                                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[9px] font-bold text-white rounded-lg transition-opacity"
                                      >
                                        🔍 View
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="w-14 h-12 rounded-lg border border-dashed border-white/20 bg-slate-900 flex items-center justify-center text-[10px] text-slate-500 shrink-0">
                                      No Image
                                    </div>
                                  )}
                                  <div className="flex-1 space-y-1">
                                    <input
                                      type="text"
                                      placeholder="Photo URL or Upload below"
                                      value={row.photo_url || ""}
                                      onChange={(e) => {
                                        const updated = [...(phase2Form.infrastructure_measurements || [])];
                                        updated[idx] = { ...updated[idx], photo_url: e.target.value };
                                        setPhase2Form({ ...phase2Form, infrastructure_measurements: updated });
                                      }}
                                      className="w-full bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-slate-200"
                                    />
                                    <div className="flex items-center gap-1.5">
                                      <label className="px-2 py-1 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase rounded cursor-pointer transition-all">
                                        📁 Upload
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                              const reader = new FileReader();
                                              reader.onload = (event) => {
                                                const updated = [...(phase2Form.infrastructure_measurements || [])];
                                                updated[idx] = { ...updated[idx], photo_url: event.target?.result as string };
                                                setPhase2Form({ ...phase2Form, infrastructure_measurements: updated });
                                              };
                                              reader.readAsDataURL(file);
                                            }
                                          }}
                                        />
                                      </label>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const samplePhotos = [
                                            "/centres/gallery/photo-new-1.jpeg",
                                            "/centres/gallery/photo-new-2.jpeg",
                                            "/centres/gallery/photo-new-3.jpeg"
                                          ];
                                          const sample = samplePhotos[idx % samplePhotos.length];
                                          const updated = [...(phase2Form.infrastructure_measurements || [])];
                                          updated[idx] = { ...updated[idx], photo_url: sample };
                                          setPhase2Form({ ...phase2Form, infrastructure_measurements: updated });
                                        }}
                                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] rounded border border-white/10"
                                      >
                                        📷 Sample
                                      </button>
                                      {row.photo_url && (
                                        <button
                                          type="button"
                                          onClick={() => setPreviewWallPhoto({ title: row.item_name, url: row.photo_url || "", remarks: row.location_remarks })}
                                          className="px-2 py-1 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 text-[10px] font-bold rounded border border-blue-500/30"
                                        >
                                          🔍 Inspect
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Dedicated Classroom Wall Photos Gallery & Inspection Cards */}
                    <div className="border-t border-white/10 pt-4 space-y-3">
                      <h5 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <span>📷 CLASSROOM WALL PHOTOS & PILLAR INSPECTION GALLERY</span>
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        {(phase2Form.infrastructure_measurements || []).map((row, idx) => (
                          <div key={idx} className="bg-slate-900 border border-white/10 p-3 rounded-xl space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-white font-mono">{row.item_name}</span>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono ${
                                row.has_pillar ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              }`}>
                                {row.has_pillar ? "⚠️ Pillar/Beam" : "✅ Plain Wall"}
                              </span>
                            </div>
                            <div className="relative h-28 bg-slate-950 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center">
                              {row.photo_url ? (
                                <img
                                  src={row.photo_url}
                                  alt={row.item_name}
                                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                                  onClick={() => setPreviewWallPhoto({ title: row.item_name, url: row.photo_url || "", remarks: row.location_remarks })}
                                />
                              ) : (
                                <div className="text-center p-2 space-y-1">
                                  <span className="text-2xl block">🧱</span>
                                  <span className="text-[10px] text-slate-500 font-mono block">No photo attached</span>
                                </div>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono truncate">
                              {row.location_remarks || `${row.length_ft}ft x ${row.width_ft}ft`}
                            </div>
                            <div className="flex gap-1.5">
                              <label className="flex-1 text-center py-1 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase rounded cursor-pointer">
                                📁 Upload Photo
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        const updated = [...(phase2Form.infrastructure_measurements || [])];
                                        updated[idx] = { ...updated[idx], photo_url: event.target?.result as string };
                                        setPhase2Form({ ...phase2Form, infrastructure_measurements: updated });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                              {row.photo_url && (
                                <button
                                  type="button"
                                  onClick={() => setPreviewWallPhoto({ title: row.item_name, url: row.photo_url || "", remarks: row.location_remarks })}
                                  className="px-2 py-1 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 text-[10px] font-bold rounded border border-blue-500/30"
                                >
                                  🔍 Inspect
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 7: PRINCIPAL'S DECLARATION & SIGNATURES */}
                  <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-white/5">
                    <div className="border-b border-white/10 pb-2">
                      <h4 className="text-sm font-mono font-bold text-[#EE2C3C] uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#EE2C3C]"></span>
                        SECTION 7: PRINCIPAL'S DECLARATION & SIGNATURES
                      </h4>
                    </div>
                    <div className="space-y-4 text-xs">
                      <label className="flex items-start gap-3 p-4 bg-slate-900 border border-emerald-500/30 rounded-xl cursor-pointer">
                        <input
                          type="checkbox"
                          checked={phase2Form.agreed_compulsory_basis || false}
                          onChange={(e) => setPhase2Form({ ...phase2Form, agreed_compulsory_basis: e.target.checked })}
                          className="mt-0.5 w-5 h-5 accent-emerald-500"
                        />
                        <span className="text-slate-200 leading-relaxed">
                          <strong className="text-white">Compulsory Basis Agreement:</strong> I hereby declare and agree that AIR G International AI & Robotics Lab training program will be conducted on a compulsory basis for enrolled students.
                        </span>
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Minimum Committed Students</label>
                          <input
                            type="number"
                            value={phase2Form.min_students_committed || 0}
                            onChange={(e) => setPhase2Form({ ...phase2Form, min_students_committed: Number(e.target.value) })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Minimum Qualification Required for Trainer</label>
                          <input
                            type="text"
                            placeholder="e.g. B.Sc / B.E. Robotics / IT Certification"
                            value={phase2Form.min_qualification_required || ""}
                            onChange={(e) => setPhase2Form({ ...phase2Form, min_qualification_required: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Principal Digital Signature / Authorized Name</label>
                          <input
                            type="text"
                            placeholder="Principal Name"
                            value={phase2Form.principal_signature_name || ""}
                            onChange={(e) => setPhase2Form({ ...phase2Form, principal_signature_name: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Coordinator Digital Signature / Authorized Name</label>
                          <input
                            type="text"
                            placeholder="Coordinator Name"
                            value={phase2Form.coordinator_signature_name || ""}
                            onChange={(e) => setPhase2Form({ ...phase2Form, coordinator_signature_name: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Declaration Date</label>
                          <input
                            type="date"
                            value={phase2Form.declaration_date || new Date().toISOString().split('T')[0]}
                            onChange={(e) => setPhase2Form({ ...phase2Form, declaration_date: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 8: LAB ROOM PHOTOS & WALKTHROUGH VIDEO DRIVE LINK */}
                  <div className="space-y-6 bg-slate-950/60 p-5 md:p-6 rounded-2xl border border-white/5 shadow-xl">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 border-b border-white/10 pb-3">
                      <div>
                        <h4 className="text-sm font-mono font-bold text-[#EE2C3C] uppercase flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#EE2C3C]"></span>
                          SECTION 8: LAB ROOM PHOTOS & WALKTHROUGH VIDEO (GOOGLE DRIVE LINK)
                        </h4>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                          Upload minimum 3 lab room photos and provide the Google Drive link for the complete lab walkthrough video.
                        </p>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                        {phase2Form.room_photos.length} Photos Verified ✓
                      </span>
                    </div>

                    {/* Photo Gallery Grid */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-mono font-bold text-slate-300 uppercase">
                          1. Lab Room Inspection Photos (Min. 3) *
                        </label>
                        <label className="px-3 py-1 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase rounded cursor-pointer transition-all">
                          📁 Upload New Photo
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    setPhase2Form({
                                      ...phase2Form,
                                      room_photos: [...phase2Form.room_photos, event.target.result as string]
                                    });
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {phase2Form.room_photos.map((src, idx) => (
                          <div key={idx} className="relative rounded-xl overflow-hidden border border-white/20 h-36 bg-black group shadow-md">
                            <img src={src} alt={`Room Photo ${idx + 1}`} className="w-full h-full object-cover" />
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 text-white font-mono text-[10px] rounded">
                              Photo #{idx + 1}
                            </span>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => setPreviewWallPhoto({ title: `Lab Room Photo #${idx + 1}`, url: src })}
                                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded"
                              >
                                🔍 Inspect
                              </button>
                              {phase2Form.room_photos.length > 3 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = phase2Form.room_photos.filter((_, i) => i !== idx);
                                    setPhase2Form({ ...phase2Form, room_photos: updated });
                                  }}
                                  className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold rounded"
                                >
                                  🗑️ Delete
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Google Drive Video Upload Section */}
                    <div className="border-t border-white/10 pt-4 space-y-3">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <label className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-2">
                          <span>📹 2. Lab Room Walkthrough Video (Google Drive Link) *</span>
                        </label>
                        {phase2Form.room_video_url ? (
                          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 w-fit">
                            ✅ Drive Video Link Attached
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 w-fit">
                            ⚠️ Video Drive Link Pending
                          </span>
                        )}
                      </div>

                      <div className="bg-slate-900 p-4 rounded-xl border border-white/10 space-y-3">
                        <p className="text-[11px] text-slate-400 font-mono">
                          Record a 1-2 minute video of the lab room showing entrance, walls, pillars, ceiling, and power switches. Upload it to Google Drive and paste the share link below.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="url"
                            placeholder="e.g. https://drive.google.com/file/d/1A2B3C4D.../view or YouTube video link"
                            value={phase2Form.room_video_url || ""}
                            onChange={(e) => setPhase2Form({ ...phase2Form, room_video_url: e.target.value })}
                            className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none font-mono"
                          />
                          <div className="flex gap-2">
                            {phase2Form.room_video_url && (
                              <button
                                type="button"
                                onClick={() => window.open(phase2Form.room_video_url, "_blank")}
                                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-xl transition-all font-mono shrink-0"
                              >
                                🔗 Open Drive Video
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setPhase2Form({ ...phase2Form, room_video_url: "https://drive.google.com/file/d/1AIRG_Lab_Walkthrough_Video_Demo/view" })}
                              className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-white/10 shrink-0"
                            >
                              📹 Sample Drive Link
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SUBMISSION BUTTONS */}
                  <div className="flex flex-col md:flex-row gap-4 border-t border-white/10 pt-6">
                    <button
                      onClick={() => handleSavePhase2(false)}
                      disabled={isSavingPhase2}
                      className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                    >
                      💾 Save Onboarding Form Draft
                    </button>
                    <button
                      onClick={() => handleSavePhase2(true)}
                      disabled={isSavingPhase2}
                      className="flex-1 py-4 bg-[#EE2C3C] hover:bg-[#d42332] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(238,44,60,0.4)] transition-all"
                    >
                      🚀 Final Submit Phase 2 Conversion
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 4. STEP 03 — PROMOTIONAL PHASE ================= */}
        {currentUser && (currentUser.role === "BUSINESS_DEVELOPER" || currentUser.role === "CEO") && activeTab === "phase3" && (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="border-l-4 border-amber-500 pl-4 space-y-1">
              <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-mono font-bold uppercase rounded-md">
                STEP 03 — PROMOTIONAL PHASE
              </div>
              <h2 className="text-3xl font-black uppercase text-white font-headline">
                SCHOOL TOUCHPOINT <span className="text-amber-400">MEETINGS & DEMO SCHEDULER</span>
              </h2>
              <p className="text-xs text-slate-400">
                Schedule 4 key promotional touchpoints: Coordinator Meeting, Teachers Meeting, Parents Meeting, and Student Demo. Close phase with Event Day Photo Proof.
              </p>
            </div>

            {!activePhase3Lead ? (
              <div className="bg-slate-900/60 border border-white/10 p-6 rounded-3xl space-y-4">
                <h3 className="text-lg font-bold text-white uppercase">1. Select Converted / Active Lead for Step 3 Promotional Phase</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {leads.map((l) => (
                    <div key={l._id || l.lead_id} className="bg-slate-950 p-5 rounded-2xl border border-white/10 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-amber-400">{l.lead_id}</span>
                          <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded uppercase ${
                            l.phase3?.status === 'COMPLETE' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            l.phase3?.status === 'SCHEDULED' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                            'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {l.phase3?.status || 'OPEN'}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white">{l.school_name}</h4>
                        <p className="text-xs text-slate-400">Contact: {l.contact_person} ({l.contact_number})</p>
                        <p className="text-xs text-slate-500">Inquiry Generator: {l.inquiry_generator_name || l.created_by_name}</p>
                      </div>
                      <button
                        onClick={() => handleActivatePhase3Lead(l)}
                        disabled={isActivatingPhase3}
                        className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg font-mono"
                      >
                        Open Phase 3 ⚡
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-slate-900 p-6 rounded-3xl border border-amber-500/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase">● STEP 03 PROMOTIONAL WORKSPACE</span>
                      <span className={`px-2.5 py-0.5 text-[10px] font-mono font-bold rounded uppercase ${
                        phase3Form.status === 'COMPLETE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                        phase3Form.status === 'SCHEDULED' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' :
                        'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}>
                        STATUS: {phase3Form.status}
                      </span>
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase">{activePhase3Lead.school_name}</h2>
                    <p className="text-xs text-slate-400 font-mono">
                      Lead Ticket ID: <span className="text-amber-400 font-bold">{activePhase3Lead.lead_id}</span> | Handler: {currentUser.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setActivePhase3Lead(null)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-mono text-slate-300 rounded-xl"
                  >
                    Select Different Lead ↩
                  </button>
                </div>

                {/* PROMOTIONAL FORM SPECIFICATION (4 TOUCHPOINT BLOCKS) */}
                <div className="bg-slate-900/80 border border-white/10 p-6 md:p-8 rounded-3xl space-y-8 shadow-2xl">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                      PROMOTIONAL TOUCHPOINTS & DEMO SPECIFICATION
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                      STEP 03 — PROMOTIONAL TOUCHPOINTS SCHEDULE
                    </h3>
                    <p className="text-xs text-slate-400">
                      Fill in scheduled dates and times for the 4 mandatory promotional events.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 1. REPRESENTATIVE / COORDINATOR MEETING */}
                    <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <h4 className="text-sm font-mono font-bold text-amber-400 uppercase flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                          1. REPRESENTATIVE / COORDINATOR MEETING
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">Mandatory</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Meeting Date</label>
                          <input
                            type="date"
                            value={phase3Form.rep_meeting.date}
                            onChange={(e) => setPhase3Form({
                              ...phase3Form,
                              rep_meeting: { ...phase3Form.rep_meeting, date: e.target.value }
                            })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Meeting Time</label>
                          <input
                            type="text"
                            placeholder="e.g. 10:30 AM"
                            value={phase3Form.rep_meeting.time}
                            onChange={(e) => setPhase3Form({
                              ...phase3Form,
                              rep_meeting: { ...phase3Form.rep_meeting, time: e.target.value }
                            })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Meeting Agenda / Discussion Notes"
                        value={phase3Form.rep_meeting.notes || ""}
                        onChange={(e) => setPhase3Form({
                          ...phase3Form,
                          rep_meeting: { ...phase3Form.rep_meeting, notes: e.target.value }
                        })}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-slate-300"
                      />
                    </div>

                    {/* 2. TEACHERS MEETING */}
                    <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <h4 className="text-sm font-mono font-bold text-amber-400 uppercase flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                          2. TEACHERS MEETING
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">Mandatory</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Meeting Date</label>
                          <input
                            type="date"
                            value={phase3Form.teachers_meeting.date}
                            onChange={(e) => setPhase3Form({
                              ...phase3Form,
                              teachers_meeting: { ...phase3Form.teachers_meeting, date: e.target.value }
                            })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Meeting Time</label>
                          <input
                            type="text"
                            placeholder="e.g. 02:00 PM"
                            value={phase3Form.teachers_meeting.time}
                            onChange={(e) => setPhase3Form({
                              ...phase3Form,
                              teachers_meeting: { ...phase3Form.teachers_meeting, time: e.target.value }
                            })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Teachers Orientation Notes"
                        value={phase3Form.teachers_meeting.notes || ""}
                        onChange={(e) => setPhase3Form({
                          ...phase3Form,
                          teachers_meeting: { ...phase3Form.teachers_meeting, notes: e.target.value }
                        })}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-slate-300"
                      />
                    </div>

                    {/* 3. PARENTS MEETING */}
                    <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <h4 className="text-sm font-mono font-bold text-amber-400 uppercase flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                          3. PARENTS MEETING
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">Mandatory</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Meeting Date</label>
                          <input
                            type="date"
                            value={phase3Form.parents_meeting.date}
                            onChange={(e) => setPhase3Form({
                              ...phase3Form,
                              parents_meeting: { ...phase3Form.parents_meeting, date: e.target.value }
                            })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Meeting Time</label>
                          <input
                            type="text"
                            placeholder="e.g. 04:30 PM"
                            value={phase3Form.parents_meeting.time}
                            onChange={(e) => setPhase3Form({
                              ...phase3Form,
                              parents_meeting: { ...phase3Form.parents_meeting, time: e.target.value }
                            })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Parents Session & Fee Structure Notes"
                        value={phase3Form.parents_meeting.notes || ""}
                        onChange={(e) => setPhase3Form({
                          ...phase3Form,
                          parents_meeting: { ...phase3Form.parents_meeting, notes: e.target.value }
                        })}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-slate-300"
                      />
                    </div>

                    {/* 4. STUDENT DEMO */}
                    <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <h4 className="text-sm font-mono font-bold text-amber-400 uppercase flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                          4. STUDENT DEMO SESSION
                        </h4>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">Includes Sections & Days</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Demo Date</label>
                          <input
                            type="date"
                            value={phase3Form.student_demo.date}
                            onChange={(e) => setPhase3Form({
                              ...phase3Form,
                              student_demo: { ...phase3Form.student_demo, date: e.target.value }
                            })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Demo Time</label>
                          <input
                            type="text"
                            placeholder="e.g. 11:00 AM"
                            value={phase3Form.student_demo.time}
                            onChange={(e) => setPhase3Form({
                              ...phase3Form,
                              student_demo: { ...phase3Form.student_demo, time: e.target.value }
                            })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Number of Sections</label>
                          <input
                            type="number"
                            min={1}
                            value={phase3Form.student_demo.no_of_sections}
                            onChange={(e) => setPhase3Form({
                              ...phase3Form,
                              student_demo: { ...phase3Form.student_demo, no_of_sections: Number(e.target.value) }
                            })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Required Days</label>
                          <input
                            type="number"
                            min={1}
                            value={phase3Form.student_demo.required_days}
                            onChange={(e) => setPhase3Form({
                              ...phase3Form,
                              student_demo: { ...phase3Form.student_demo, required_days: Number(e.target.value) }
                            })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Student Demo Kit & Hardware Notes"
                        value={phase3Form.student_demo.notes || ""}
                        onChange={(e) => setPhase3Form({
                          ...phase3Form,
                          student_demo: { ...phase3Form.student_demo, notes: e.target.value }
                        })}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-slate-300"
                      />
                    </div>
                  </div>

                  {/* CLOSURE: EVENT DAY PHOTO PROOF UPLOAD */}
                  <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <h4 className="text-sm font-mono font-bold text-amber-400 uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                        CLOSURE: EVENT DAY PHOTO PROOF (REQUIRED FOR STEP 3 COMPLETION)
                      </h4>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        {phase3Form.photos.length} Photo Proof(s) Uploaded ✓
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      On the actual event day, upload photo proof of meetings or student demo execution to unlock Step 4 (School Lab Representative Phase).
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {phase3Form.photos.map((src, idx) => (
                        <div key={idx} className="relative rounded-xl overflow-hidden border border-white/20 h-32 bg-black">
                          <img src={src} alt={`Meeting Photo Proof ${idx + 1}`} className="w-full h-full object-cover" />
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 text-white font-mono text-[10px] rounded">
                            Proof #{idx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Photo Proof Remarks / Event Highlights"
                      value={phase3Form.photo_caption}
                      onChange={(e) => setPhase3Form({ ...phase3Form, photo_caption: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-col md:flex-row gap-4 border-t border-white/10 pt-6">
                    <button
                      onClick={() => handleSavePhase3(false)}
                      disabled={isSavingPhase3}
                      className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                    >
                      💾 Save Promotional Touchpoints Schedule
                    </button>
                    <button
                      onClick={() => handleSavePhase3(true)}
                      disabled={isSavingPhase3}
                      className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all font-mono"
                    >
                      🚀 Upload Proof & Mark Step 3 COMPLETE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 6. PHASE 4 — SCHOOL REPRESENTATIVE INPUT PROCESS PORTAL ================= */}
        {currentUser && (currentUser.role === "COORDINATOR" || currentUser.role === "BUSINESS_DEVELOPER" || currentUser.role === "CEO") && activeTab === "phase4" && (
          <div className="space-y-8">
            {/* Header Title Card */}
            <div className="bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-indigo-950/80 border border-blue-500/30 p-6 md:p-8 rounded-3xl space-y-3 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[10px] font-mono font-bold uppercase rounded-md">
                🏫 PHASE 4 — SCHOOL REPRESENTATIVE INPUT PROCESS
              </div>
              <h2 className="text-3xl font-black uppercase text-white font-headline">
                SCHOOL-SIDE <span className="text-blue-400">DATA COLLECTION PORTAL</span>
              </h2>
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-blue-500/30 text-xs text-slate-300 space-y-1 font-mono">
                <span className="text-amber-400 font-bold block uppercase">🎯 KEY PRINCIPLE & SYSTEM ARCHITECTURE:</span>
                <p>100% SCHOOL-SIDE INPUT • AIR G TEAM DOES NOT ENTER THIS DATA • SYSTEM VALIDATES & STORES THE SUBMITTED INFORMATION</p>
                <p className="text-[11px] text-slate-400">Coordinator Portal → Form / File Upload → Validation → Database → AIR G Admin Dashboard</p>
              </div>
            </div>

            {!activePhase4Lead ? (
              <div className="bg-slate-900/60 border border-white/10 p-6 rounded-3xl space-y-4">
                <h3 className="text-lg font-bold text-white uppercase">1. Select School Lead for Phase 4 Representative Input</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {leads.map((l) => (
                    <div key={l._id || l.lead_id} className="bg-slate-950 p-5 rounded-2xl border border-white/10 flex justify-between items-center">
                      <div>
                        <span className="text-xs font-mono font-bold text-blue-400">{l.lead_id}</span>
                        <h4 className="text-base font-bold text-white">{l.school_name}</h4>
                        <p className="text-xs text-slate-400">School Contact: {l.contact_person} ({l.contact_number})</p>
                        <span className="inline-block px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px] mt-1">
                          Status: {l.status}
                        </span>
                      </div>
                      <button
                        onClick={() => handleActivatePhase4Lead(l)}
                        disabled={isActivatingPhase4}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg font-mono"
                      >
                        Open Phase 4 Workspace 🏫
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Active Lead Header Bar */}
                <div className="bg-slate-900 p-6 rounded-3xl border border-blue-500/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-400 uppercase">● PHASE 4 ACTIVE SCHOOL WORKSPACE</span>
                      <span className={`px-2.5 py-0.5 text-[10px] font-mono font-bold rounded uppercase ${
                        phase4Form.status === 'SUBMITTED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                      }`}>
                        STATUS: {phase4Form.status === 'SUBMITTED' ? 'Submitted / Awaiting AIR G Processing' : 'IN_PROGRESS'}
                      </span>
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase">{activePhase4Lead.school_name}</h2>
                    <p className="text-xs text-slate-400 font-mono">
                      Lead Ticket ID: <span className="text-blue-400 font-bold">{activePhase4Lead.lead_id}</span> | School Coordinator: <span className="text-emerald-400 font-bold">{phase4Form.coordinator_name}</span> ({phase4Form.coordinator_phone})
                    </p>
                  </div>
                  <button
                    onClick={() => setActivePhase4Lead(null)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-mono text-slate-300 rounded-xl"
                  >
                    Select Different Lead ↩
                  </button>
                </div>

                {/* ROLE-BASED ACTION BANNERS */}
                
                {/* 1. CEO APPROVAL PANEL */}
                {currentUser && currentUser.role === "CEO" && (
                  <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/40 p-6 rounded-3xl space-y-4 shadow-xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <span className="text-xs font-mono font-bold text-blue-400 uppercase">👑 CEO COORDINATOR APPROVAL CONTROL</span>
                        <h3 className="text-xl font-bold text-white uppercase">Nominated Coordinator: {(activePhase4Lead.phase4 && activePhase4Lead.phase4.coordinator_name) || activePhase4Lead.contact_person || "Anjali Deshmukh"}</h3>
                        <p className="text-xs text-slate-300 font-mono">
                          Email: <span className="text-blue-300 font-bold">{(activePhase4Lead.phase4 && activePhase4Lead.phase4.coordinator_email) || activePhase4Lead.school_email || "coordinator@sunriseschool.edu.in"}</span> | Phone: {(activePhase4Lead.phase4 && activePhase4Lead.phase4.coordinator_phone) || activePhase4Lead.contact_number || "9822123456"}
                        </p>
                      </div>
                      {activePhase4Lead.status === "COORDINATOR_NOMINATED" || !(activePhase4Lead.phase4 && activePhase4Lead.phase4.account_created) ? (
                        <button
                          onClick={() => handleApproveCoordinatorAccount(activePhase4Lead)}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg font-mono flex items-center gap-2"
                        >
                          <span>Approve Coordinator & Create Account 🔑</span>
                        </button>
                      ) : (
                        <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono text-xs font-bold rounded-xl">
                          ✓ Coordinator Account Approved & Sent
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono border-t border-white/10 pt-2">
                      ℹ️ CEO approval generates the coordinator user account, assigns login credentials, and releases email notification to the school representative to complete Phase 4 input.
                    </p>
                  </div>
                )}

                {/* 2. BD REVIEW & APPROVAL / REJECTION PANEL */}
                {currentUser && (currentUser.role === "BUSINESS_DEVELOPER" || currentUser.role === "CEO") && (activePhase4Lead.status === "PHASE4_SUBMITTED" || phase4Form.status === "SUBMITTED") && (
                  <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-emerald-950/80 border-2 border-amber-500/60 p-6 rounded-3xl space-y-4 shadow-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                          📋 PHASE 4 FORM SUBMITTED — ACTION REQUIRED BY BD
                        </span>
                        <h3 className="text-xl font-bold text-white uppercase">Review Submitted School Representative Data</h3>
                        <p className="text-xs text-slate-300">
                          Please verify student counts, uploaded schedule, infrastructure readiness, and contacts below.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => handleReviewPhase4(activePhase4Lead, 'APPROVE')}
                          disabled={isReviewingPhase4}
                          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase rounded-xl transition-all shadow-lg font-mono flex items-center gap-2"
                        >
                          <span>Approve Phase 4 Data & Convert Deal ✅</span>
                        </button>
                        <button
                          onClick={() => setRejectModalLead(activePhase4Lead)}
                          disabled={isReviewingPhase4}
                          className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase rounded-xl transition-all shadow-lg font-mono flex items-center gap-2"
                        >
                          <span>Reject & Request Revision ❌</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. COORDINATOR REJECTION FEEDBACK BANNER */}
                {currentUser && currentUser.role === "COORDINATOR" && (activePhase4Lead.status === "PHASE4_REJECTED" || (activePhase4Lead.phase4 && activePhase4Lead.phase4.rejection_reason)) && (
                  <div className="bg-rose-950/90 border-2 border-rose-500 p-6 rounded-3xl space-y-2 text-white shadow-2xl">
                    <div className="flex items-center gap-2 text-rose-300 font-bold text-sm uppercase font-mono">
                      <span>⚠️ REVISION REQUIRED — BUSINESS DEVELOPER FEEDBACK</span>
                    </div>
                    <p className="text-xs text-rose-100 bg-black/40 p-3 rounded-xl border border-rose-500/30 font-mono">
                      Feedback Note: "{(activePhase4Lead.phase4 && activePhase4Lead.phase4.rejection_reason) || 'Please review and correct submitted student list and infrastructure details.'}"
                    </p>
                    <p className="text-[11px] text-slate-300 font-mono">
                      Please revise the form details below and click "🚀 SUBMIT TO AIR G PROCESSING" to send back for review.
                    </p>
                  </div>
                )}

                {/* 6 STEP PHASE 4 INPUT PROCESS FORM */}
                <div className="bg-slate-900/80 border border-white/10 p-6 md:p-8 rounded-3xl space-y-8 shadow-2xl">
                  {/* STEP 1: COORDINATOR LOGIN & CREDENTIALS */}
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <h4 className="text-sm font-mono font-bold text-blue-400 uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        1. COORDINATOR LOGIN & AUTHORIZATION
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">Authorized Representative</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Coordinator Name</label>
                        <input
                          type="text"
                          value={phase4Form.coordinator_name}
                          onChange={(e) => setPhase4Form({ ...phase4Form, coordinator_name: e.target.value })}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Coordinator Email Address</label>
                        <input
                          type="email"
                          value={phase4Form.coordinator_email}
                          onChange={(e) => setPhase4Form({ ...phase4Form, coordinator_email: e.target.value })}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Coordinator Contact Phone</label>
                        <input
                          type="tel"
                          value={phase4Form.coordinator_phone}
                          onChange={(e) => setPhase4Form({ ...phase4Form, coordinator_phone: e.target.value })}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* STEP 2: STUDENT DATA ENTRY & LIST */}
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-2 gap-2">
                      <h4 className="text-sm font-mono font-bold text-blue-400 uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        2. STUDENT DATA COLLECTION ({phase4Form.student_list.length} Students Listed)
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">Student Name | Standard | Division | Contact</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-[10px] font-mono text-slate-400 uppercase">
                            <th className="py-2 px-3">#</th>
                            <th className="py-2 px-3">Student Name</th>
                            <th className="py-2 px-3">Standard / Class</th>
                            <th className="py-2 px-3">Division / Batch</th>
                            <th className="py-2 px-3">Roll No</th>
                            <th className="py-2 px-3">Parent Phone</th>
                            <th className="py-2 px-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {phase4Form.student_list.map((st, idx) => (
                            <tr key={idx} className="hover:bg-white/5">
                              <td className="py-2 px-3 font-mono text-slate-500">{idx + 1}</td>
                              <td className="py-2 px-3 font-bold text-white">{st.student_name}</td>
                              <td className="py-2 px-3 text-blue-300 font-mono">{st.standard}</td>
                              <td className="py-2 px-3 text-slate-300 font-mono">{st.division}</td>
                              <td className="py-2 px-3 text-amber-400 font-mono">{st.roll_no || "N/A"}</td>
                              <td className="py-2 px-3 text-emerald-400 font-mono">{st.contact_number}</td>
                              <td className="py-2 px-3 text-right">
                                <button
                                  onClick={() => handleRemoveStudentRow(idx)}
                                  className="text-rose-400 hover:text-rose-300 font-mono text-[10px]"
                                >
                                  Remove ✕
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Add New Student Form */}
                    <div className="bg-slate-900 p-4 rounded-xl space-y-3 border border-white/10">
                      <span className="text-xs font-mono font-bold text-slate-300 uppercase block">+ Add Individual Student</span>
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                        <input
                          type="text"
                          placeholder="Student Name *"
                          value={phase4Form.new_student.student_name}
                          onChange={(e) => setPhase4Form({
                            ...phase4Form,
                            new_student: { ...phase4Form.new_student, student_name: e.target.value }
                          })}
                          className="bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        />
                        <select
                          value={phase4Form.new_student.standard}
                          onChange={(e) => setPhase4Form({
                            ...phase4Form,
                            new_student: { ...phase4Form.new_student, standard: e.target.value }
                          })}
                          className="bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        >
                          <option value="Std 5">Std 5</option>
                          <option value="Std 6">Std 6</option>
                          <option value="Std 7">Std 7</option>
                          <option value="Std 8">Std 8</option>
                          <option value="Std 9">Std 9</option>
                          <option value="Std 10">Std 10</option>
                          <option value="Std 11">Std 11</option>
                          <option value="Std 12">Std 12</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Division / Batch (e.g. A)"
                          value={phase4Form.new_student.division}
                          onChange={(e) => setPhase4Form({
                            ...phase4Form,
                            new_student: { ...phase4Form.new_student, division: e.target.value }
                          })}
                          className="bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        />
                        <input
                          type="tel"
                          placeholder="Parent Contact Phone"
                          value={phase4Form.new_student.contact_number}
                          onChange={(e) => setPhase4Form({
                            ...phase4Form,
                            new_student: { ...phase4Form.new_student, contact_number: e.target.value }
                          })}
                          className="bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono"
                        />
                        <button
                          onClick={handleAddStudentRow}
                          className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-xl transition-all"
                        >
                          Add Student Entry
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* STEP 3: ACADEMIC SCHEDULE */}
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <h4 className="text-sm font-mono font-bold text-blue-400 uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        3. ACADEMIC SCHEDULE & TIMETABLE
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">School Timetable & Exam Dates</span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">School Timetable Document URL / Upload Path</label>
                        <input
                          type="text"
                          value={phase4Form.timetable_file_url}
                          onChange={(e) => setPhase4Form({ ...phase4Form, timetable_file_url: e.target.value })}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">School Holidays Calendar</label>
                          <textarea
                            rows={3}
                            value={phase4Form.holidays_list}
                            onChange={(e) => setPhase4Form({ ...phase4Form, holidays_list: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-slate-300"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Examination Schedule & Key Dates</label>
                          <textarea
                            rows={3}
                            value={phase4Form.exam_dates_schedule}
                            onChange={(e) => setPhase4Form({ ...phase4Form, exam_dates_schedule: e.target.value })}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-slate-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* STEP 4: INFRASTRUCTURE INPUT */}
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <h4 className="text-sm font-mono font-bold text-blue-400 uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        4. INFRASTRUCTURE & FACILITY INPUT
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">Wi-Fi, Power Backup & Classroom Readiness</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Wi-Fi Details */}
                      <div className="bg-slate-900 p-4 rounded-xl space-y-2 border border-white/10">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-mono font-bold text-white uppercase">Wi-Fi Connection</label>
                          <button
                            type="button"
                            onClick={() => setPhase4Form({ ...phase4Form, wifi_available: !phase4Form.wifi_available })}
                            className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${phase4Form.wifi_available ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}
                          >
                            {phase4Form.wifi_available ? 'Available ✓' : 'Not Available ✕'}
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Wi-Fi Bandwidth / Network Details"
                          value={phase4Form.wifi_details}
                          onChange={(e) => setPhase4Form({ ...phase4Form, wifi_details: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-slate-300"
                        />
                      </div>

                      {/* Electricity Backup */}
                      <div className="bg-slate-900 p-4 rounded-xl space-y-2 border border-white/10">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-mono font-bold text-white uppercase">Electricity Backup / UPS</label>
                          <button
                            type="button"
                            onClick={() => setPhase4Form({ ...phase4Form, electricity_backup: !phase4Form.electricity_backup })}
                            className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${phase4Form.electricity_backup ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}
                          >
                            {phase4Form.electricity_backup ? 'Available ✓' : 'Not Available ✕'}
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Generator / UPS Power Capacity"
                          value={phase4Form.electricity_details}
                          onChange={(e) => setPhase4Form({ ...phase4Form, electricity_details: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-slate-300"
                        />
                      </div>

                      {/* Classroom Readiness */}
                      <div className="bg-slate-900 p-4 rounded-xl space-y-2 border border-white/10">
                        <label className="text-xs font-mono font-bold text-white uppercase block">Classroom / Lab Readiness</label>
                        <select
                          value={phase4Form.classroom_readiness}
                          onChange={(e) => setPhase4Form({ ...phase4Form, classroom_readiness: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        >
                          <option value="Fully Ready">Fully Ready for Lab Installation</option>
                          <option value="Minor Modifications Needed">Minor Modifications Needed</option>
                          <option value="Work In Progress">Work In Progress</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* STEP 5: KEY SCHOOL CONTACTS */}
                  <div className="bg-slate-950/60 p-5 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <h4 className="text-sm font-mono font-bold text-blue-400 uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        5. KEY SCHOOL CONTACTS (SECURITY, PEON & AUTHORIZED STAFF)
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">On-Site Emergency Contacts</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Security */}
                      <div className="bg-slate-900 p-4 rounded-xl space-y-2 border border-white/10">
                        <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">Watchman / Security Contact</span>
                        <input
                          type="text"
                          placeholder="Security Guard Name"
                          value={phase4Form.security_name}
                          onChange={(e) => setPhase4Form({ ...phase4Form, security_name: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        />
                        <input
                          type="tel"
                          placeholder="Security Phone Number"
                          value={phase4Form.security_phone}
                          onChange={(e) => setPhase4Form({ ...phase4Form, security_phone: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-emerald-400 font-mono"
                        />
                      </div>

                      {/* Peon / Support Staff */}
                      <div className="bg-slate-900 p-4 rounded-xl space-y-2 border border-white/10">
                        <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">Peon / Support Staff Contact</span>
                        <input
                          type="text"
                          placeholder="Peon Name"
                          value={phase4Form.peon_name}
                          onChange={(e) => setPhase4Form({ ...phase4Form, peon_name: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        />
                        <input
                          type="tel"
                          placeholder="Peon Phone Number"
                          value={phase4Form.peon_phone}
                          onChange={(e) => setPhase4Form({ ...phase4Form, peon_phone: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-emerald-400 font-mono"
                        />
                      </div>

                      {/* Authorized Representative */}
                      <div className="bg-slate-900 p-4 rounded-xl space-y-2 border border-white/10">
                        <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">Authorized School Representative</span>
                        <input
                          type="text"
                          placeholder="Representative Name"
                          value={phase4Form.authorized_rep_name}
                          onChange={(e) => setPhase4Form({ ...phase4Form, authorized_rep_name: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        />
                        <input
                          type="tel"
                          placeholder="Representative Phone"
                          value={phase4Form.authorized_rep_phone}
                          onChange={(e) => setPhase4Form({ ...phase4Form, authorized_rep_phone: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-emerald-400 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* STEP 6: REVIEW & FINAL SUBMISSION */}
                  <div className="space-y-4 bg-slate-950/80 p-6 rounded-2xl border border-blue-500/40">
                    <div className="border-b border-white/10 pb-3">
                      <h4 className="text-sm font-mono font-bold text-blue-400 uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        6. REVIEW & SUBMIT TO AIR G PROCESSING
                      </h4>
                      <p className="text-xs text-slate-300">
                        Please review all school-side information entered above. Once submitted, status will update to <strong className="text-emerald-400 font-mono">Submitted / Awaiting AIR G Processing</strong>.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
                      <div className="bg-slate-900 p-3 rounded-xl border border-white/10">
                        <span className="text-[9px] text-slate-400 block uppercase font-bold">Total Students</span>
                        <span className="text-lg font-black text-blue-400">{phase4Form.student_list.length}</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-white/10">
                        <span className="text-[9px] text-slate-400 block uppercase font-bold">Academic Schedule</span>
                        <span className="text-xs font-bold text-emerald-400">Uploaded ✓</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-white/10">
                        <span className="text-[9px] text-slate-400 block uppercase font-bold">Lab Readiness</span>
                        <span className="text-xs font-bold text-amber-400">{phase4Form.classroom_readiness}</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-white/10">
                        <span className="text-[9px] text-slate-400 block uppercase font-bold">School Contacts</span>
                        <span className="text-xs font-bold text-purple-300">3 Staff Added ✓</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="confirm_accuracy"
                        checked={phase4Form.confirm_accuracy}
                        onChange={(e) => setPhase4Form({ ...phase4Form, confirm_accuracy: e.target.checked })}
                        className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                      />
                      <label htmlFor="confirm_accuracy" className="text-xs text-slate-200 cursor-pointer font-bold">
                        I confirm that 100% of the school-side information entered above is accurate and verified by the school coordinator.
                      </label>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-col md:flex-row gap-4 pt-4">
                      <button
                        onClick={() => handleSavePhase4(false)}
                        disabled={isSavingPhase4}
                        className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                      >
                        💾 Save Phase 4 Draft
                      </button>
                      <button
                        onClick={() => handleSavePhase4(true)}
                        disabled={isSavingPhase4}
                        className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all font-mono"
                      >
                        🚀 SUBMIT TO AIR G PROCESSING
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 7. PHASE 5 — PURCHASE & INVENTORY CHECKLIST PORTAL ================= */}
        {currentUser && (currentUser.role === "PURCHASE_MANAGER" || currentUser.role === "BUSINESS_DEVELOPER" || currentUser.role === "CEO" || currentUser.role === "EMPLOYEE") && activeTab === "purchase" && (
          <div className="space-y-8">
            {/* Header Title Card */}
            <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900/90 to-teal-950/90 border border-emerald-500/40 p-6 md:p-8 rounded-3xl space-y-3 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold uppercase rounded-md">
                🛒 PHASE 5 — PURCHASE & INVENTORY CHECKLIST
              </div>
              <h2 className="text-3xl font-black uppercase text-white font-headline">
                LAB SETUP <span className="text-emerald-400">PURCHASE VERIFICATION PORTAL</span>
              </h2>
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-emerald-500/30 text-xs text-slate-300 space-y-1 font-mono">
                <span className="text-amber-400 font-bold block uppercase">🎯 KEY GOAL & INVENTORY VERIFICATION:</span>
                <p>PURCHASE EXECUTIVE PORTAL • VERIFY & TICK BOUGHT LAB ITEMS • RECORD ACTUAL QUANTITIES & REMARKS</p>
                <p className="text-[11px] text-slate-400">Phase 4 Complete → Purchase Executive Verification → Tick Items Category-wise → Save/Submit → Lab Setup Ready</p>
              </div>
            </div>

            {!activePurchaseLead ? (
              <div className="bg-slate-900/60 border border-white/10 p-6 rounded-3xl space-y-4">
                <h3 className="text-lg font-bold text-white uppercase">1. Select School Lead for Purchase & Inventory Verification</h3>
                {(() => {
                  const phase5Leads = leads.filter(l => 
                    l.status === 'PHASE4_SUBMITTED' ||
                    l.status === 'PHASE4_APPROVED' ||
                    l.status === 'PURCHASE_VERIFICATION' ||
                    l.status === 'PURCHASE_COMPLETED' ||
                    (l.phase4 && l.phase4.is_submitted) ||
                    currentUser?.role === 'CEO'
                  );

                  if (phase5Leads.length === 0) {
                    return (
                      <div className="bg-slate-950 p-8 rounded-2xl border border-white/10 text-center space-y-3">
                        <div className="text-4xl">🛒</div>
                        <h4 className="text-lg font-bold text-white uppercase">No Completed Phase 4 Leads Awaiting Purchase Verification</h4>
                        <p className="text-xs text-slate-400 font-mono max-w-lg mx-auto">
                          School leads will automatically appear here in the Purchase Manager portal once the School Coordinator completes and submits the Phase 4 form.
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {phase5Leads.map((l) => (
                        <div key={l._id || l.lead_id} className="bg-slate-950 p-5 rounded-2xl border border-white/10 flex justify-between items-center">
                          <div>
                            <span className="text-xs font-mono font-bold text-emerald-400">{l.lead_id}</span>
                            <h4 className="text-base font-bold text-white">{l.school_name}</h4>
                            <p className="text-xs text-slate-400">School Contact: {l.contact_person} ({l.contact_number})</p>
                            <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] mt-1">
                              Status: {l.status}
                            </span>
                          </div>
                          <button
                            onClick={() => handleActivatePurchaseLead(l)}
                            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg font-mono"
                          >
                            Open Purchase Checklist 🛒
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="space-y-8">
                {/* Active Lead Header Bar */}
                <div className="bg-slate-900 p-6 rounded-3xl border border-emerald-500/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase">● ACTIVE SCHOOL PURCHASE WORKSPACE</span>
                      <span className={`px-2.5 py-0.5 text-[10px] font-mono font-bold rounded uppercase ${
                        activePurchaseLead.purchase_checklist?.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                        'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}>
                        STATUS: {activePurchaseLead.purchase_checklist?.status === 'COMPLETED' ? 'VERIFIED & COMPLETED' : 'IN_PROGRESS'}
                      </span>
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase">{activePurchaseLead.school_name}</h2>
                    <p className="text-xs text-slate-400 font-mono">
                      Lead Ticket ID: <span className="text-emerald-400 font-bold">{activePurchaseLead.lead_id}</span> | Verified By: <span className="text-amber-400 font-bold">{currentUser.name}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setActivePurchaseLead(null)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-mono text-slate-300 rounded-xl"
                  >
                    Select Different Lead ↩
                  </button>
                </div>

                {/* PROGRESS & CATEGORY SUMMARY */}
                {(() => {
                  const purchasedCount = purchaseItems.filter(i => i.is_purchased).length;
                  const totalCount = purchaseItems.length;
                  const pct = Math.round((purchasedCount / totalCount) * 100) || 0;
                  const categoriesList = Array.from(new Set(purchaseItems.map(i => i.category)));

                  const filteredItems = purchaseItems.filter(item => {
                    const matchesCategory = purchaseCategoryFilter === "ALL" || item.category === purchaseCategoryFilter;
                    const matchesSearch = !purchaseSearchQuery || 
                      item.inventory_item.toLowerCase().includes(purchaseSearchQuery.toLowerCase()) ||
                      item.description.toLowerCase().includes(purchaseSearchQuery.toLowerCase()) ||
                      item.category.toLowerCase().includes(purchaseSearchQuery.toLowerCase());
                    return matchesCategory && matchesSearch;
                  });

                  return (
                    <div className="space-y-6">
                      {/* Overall Progress Card */}
                      <div className="bg-slate-900/80 border border-white/10 p-6 rounded-3xl space-y-4 shadow-2xl">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <h3 className="text-sm font-mono font-bold uppercase text-white flex items-center gap-2">
                            <span>📊 PURCHASE PROGRESS SUMMARY:</span>
                            <span className="text-emerald-400 font-black text-base">{purchasedCount} / {totalCount} Items Verified ({pct}%)</span>
                          </h3>
                          <button
                            onClick={() => handleSelectAllCategoryItems(purchaseCategoryFilter)}
                            className="px-3.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold rounded-xl"
                          >
                            ✓ Mark All in Filtered View Purchased
                          </button>
                        </div>
                        <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden border border-white/10 p-0.5">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        {/* Search & Category Filter Bar */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-2">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => setPurchaseCategoryFilter("ALL")}
                              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold ${
                                purchaseCategoryFilter === "ALL" ? "bg-emerald-600 text-white" : "bg-slate-950 text-slate-300 border border-white/10"
                              }`}
                            >
                              ALL (89)
                            </button>
                            {categoriesList.map(cat => {
                              const catItems = purchaseItems.filter(i => i.category === cat);
                              const catDone = catItems.filter(i => i.is_purchased).length;
                              return (
                                <button
                                  key={cat}
                                  onClick={() => setPurchaseCategoryFilter(cat)}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                                    purchaseCategoryFilter === cat
                                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                                      : "bg-slate-950 text-slate-300 border border-white/10 hover:border-emerald-500/50"
                                  }`}
                                >
                                  {cat} ({catDone}/{catItems.length})
                                </button>
                              );
                            })}
                          </div>

                          <input
                            type="text"
                            placeholder="🔍 Search item name or description..."
                            value={purchaseSearchQuery}
                            onChange={(e) => setPurchaseSearchQuery(e.target.value)}
                            className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none w-full md:w-64 font-mono"
                          />
                        </div>
                      </div>

                      {/* 8-COLUMN PURCHASE INVENTORY TABLE MATCHING SCREENSHOTS */}
                      <div className="bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="border-b border-white/10 bg-slate-950 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                                <th className="py-3.5 px-4 w-12 text-center">Sr. No.</th>
                                <th className="py-3.5 px-4">Category</th>
                                <th className="py-3.5 px-4">Inventory Item</th>
                                <th className="py-3.5 px-4">Description</th>
                                <th className="py-3.5 px-4 text-center">Expected Qty</th>
                                <th className="py-3.5 px-4 text-center">Purchased / Bought?</th>
                                <th className="py-3.5 px-4 w-28">Actual Qty</th>
                                <th className="py-3.5 px-4 w-32">Status</th>
                                <th className="py-3.5 px-4">Remarks</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                              {filteredItems.map((item) => (
                                <tr
                                  key={item.sr_no}
                                  className={`transition-colors ${
                                    item.is_purchased ? "bg-emerald-950/20 hover:bg-emerald-950/30" : "hover:bg-white/5"
                                  }`}
                                >
                                  {/* 1. Sr. No. */}
                                  <td className="py-3 px-4 font-mono text-slate-500 text-center font-bold">
                                    {item.sr_no}
                                  </td>

                                  {/* 2. Category */}
                                  <td className="py-3 px-4">
                                    <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-mono font-bold block whitespace-nowrap">
                                      {item.category}
                                    </span>
                                  </td>

                                  {/* 3. Inventory Item */}
                                  <td className="py-3 px-4 font-bold text-white">
                                    {item.inventory_item}
                                  </td>

                                  {/* 4. Description */}
                                  <td className="py-3 px-4 text-slate-300 text-xs">
                                    {item.description}
                                  </td>

                                  {/* 5. Expected Qty */}
                                  <td className="py-3 px-4 text-center font-mono font-bold text-amber-400">
                                    {item.expected_qty}
                                  </td>

                                  {/* 6. Purchased / Bought Checkbox */}
                                  <td className="py-3 px-4 text-center">
                                    <button
                                      type="button"
                                      onClick={() => handleToggleItemPurchased(item.sr_no)}
                                      className={`px-3 py-1 rounded-xl text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1.5 mx-auto ${
                                        item.is_purchased
                                          ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-300"
                                          : "bg-slate-950 border border-white/10 text-slate-400 hover:border-emerald-500/50"
                                      }`}
                                    >
                                      <span>{item.is_purchased ? "✓ Bought" : "○ Pending"}</span>
                                    </button>
                                  </td>

                                  {/* 7. Actual Qty */}
                                  <td className="py-3 px-4">
                                    <input
                                      type="text"
                                      value={item.actual_qty || item.expected_qty}
                                      onChange={(e) => handleUpdateItemField(item.sr_no, "actual_qty", e.target.value)}
                                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                                    />
                                  </td>

                                  {/* 8. Status */}
                                  <td className="py-3 px-4">
                                    <select
                                      value={item.status || "Pending"}
                                      onChange={(e) => handleUpdateItemField(item.sr_no, "status", e.target.value)}
                                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none font-mono"
                                    >
                                      <option value="Purchased">Purchased</option>
                                      <option value="Pending">Pending</option>
                                      <option value="In Stock">In Stock</option>
                                      <option value="N/A">N/A</option>
                                    </select>
                                  </td>

                                  {/* 9. Remarks */}
                                  <td className="py-3 px-4">
                                    <input
                                      type="text"
                                      placeholder="Remarks / Vendor Note"
                                      value={item.remarks || ""}
                                      onChange={(e) => handleUpdateItemField(item.sr_no, "remarks", e.target.value)}
                                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* BOTTOM ACTION BAR */}
                        <div className="p-6 bg-slate-950 border-t border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center">
                          <div className="text-xs text-slate-400 font-mono">
                            Showing <span className="text-emerald-400 font-bold">{filteredItems.length}</span> of {totalCount} total lab setup inventory items.
                          </div>
                          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <button
                              onClick={() => handleSavePurchaseChecklist(false)}
                              disabled={isSavingPurchase}
                              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all font-mono"
                            >
                              💾 Save Purchase Draft
                            </button>
                            <button
                              onClick={() => handleSavePurchaseChecklist(true)}
                              disabled={isSavingPurchase}
                              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all font-mono"
                            >
                              🚀 SUBMIT VERIFIED PURCHASE LIST
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {currentUser && currentUser.role === "CEO" && activeTab === "users" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-slate-900/60 border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
              <h2 className="text-2xl font-black text-white uppercase">CREATE TEAM ACCOUNT</h2>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={newUserForm.name}
                    onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                    className="bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    className="bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                  <div className="relative">
                    <input
                      type={showNewUserPassword ? "text" : "password"}
                      required
                      placeholder="Password"
                      value={newUserForm.password}
                      onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 pr-10 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewUserPassword(!showNewUserPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showNewUserPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <select
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as any })}
                    className="bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white"
                  >
                    <option value="BUSINESS_DEVELOPER">Business Developer (BD)</option>
                    <option value="EXTERNAL_BD">🤝 External BD / Broker Partner</option>
                    <option value="PURCHASE_MANAGER">🛒 Purchase Executive / Inventory Manager</option>
                    <option value="MARKETING">Marketing Team</option>
                    <option value="EMPLOYEE">Authorized Employee</option>
                    <option value="CEO">CEO / Executive Admin</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isCreatingUser}
                  className="w-full py-3 bg-[#EE2C3C] text-white font-bold text-xs uppercase rounded-xl hover:bg-[#d42332]"
                >
                  Create Team Account
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= MEETING DETAILS MODULE MODAL (SCREENSHOT 1) ================= */}
        {meetingModalLead && (
          <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0f172a] border border-white/20 w-full max-w-3xl rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl text-white font-sans relative my-8">
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold uppercase rounded-md mb-2">
                    ● ACTION TRIGGERED: TURN LEAD ON & SCHEDULE MEETING
                  </div>
                  <h3 className="text-xl md:text-2xl font-black uppercase text-white font-headline">
                    2. MEETING DETAILS MODULE ({meetingModalLead.school_name})
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Lead Ticket ID: <span className="text-[#EE2C3C] font-bold">{meetingModalLead.lead_id}</span> | School Contact: {meetingModalLead.contact_person} ({meetingModalLead.contact_number})
                  </p>
                </div>
                <button
                  onClick={() => setMeetingModalLead(null)}
                  className="text-slate-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleScheduleMeetingSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                      Scheduled Meeting Date & Time *
                    </label>
                    <input
                      type="date"
                      required
                      value={meetingForm.meeting_date}
                      onChange={(e) => setMeetingForm({ ...meetingForm, meeting_date: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white font-mono focus:border-[#EE2C3C] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                      Meeting Type *
                    </label>
                    <select
                      value={meetingForm.meeting_type}
                      onChange={(e) => setMeetingForm({ ...meetingForm, meeting_type: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-[#EE2C3C] focus:outline-none"
                    >
                      <option value="In-Person Meeting">In-Person Meeting (School Campus)</option>
                      <option value="Online Video Demo">Online Video Demo (Zoom/Google Meet)</option>
                      <option value="Phone Discussion">Phone Discussion</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                      Meeting Location / Venue *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Principal Office, School Campus"
                      value={meetingForm.meeting_place}
                      onChange={(e) => setMeetingForm({ ...meetingForm, meeting_place: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-[#EE2C3C] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                      Attendees (Who will meet?) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Principal Mrs. Deshmukh & BD Amit"
                      value={meetingForm.attendees}
                      onChange={(e) => setMeetingForm({ ...meetingForm, attendees: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-[#EE2C3C] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                    Discussion Notes & Key Decisions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Discussed 30-PC AI Innovation Lab setup. Principal requested physical room inspection on meeting date."
                    value={meetingForm.notes}
                    onChange={(e) => setMeetingForm({ ...meetingForm, notes: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-[#EE2C3C] focus:outline-none"
                  />
                </div>

                <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-2xl text-xs text-emerald-300 flex items-center gap-3 font-mono">
                  <span className="text-xl">🔔</span>
                  <span>
                    Submitting this form will turn the lead status <strong>ON (Active)</strong>, schedule a <strong>24-Hour Pre-Meeting Email/Alert</strong>, and unlock the <strong>School Conversion Form (Screenshot 3)</strong> on the meeting date.
                  </span>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setMeetingModalLead(null)}
                    className="px-5 py-3 bg-white/10 hover:bg-white/20 text-slate-300 font-bold text-xs uppercase rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSchedulingMeeting}
                    className="px-6 py-3 bg-[#EE2C3C] hover:bg-[#d42332] text-white font-bold text-xs uppercase rounded-xl shadow-lg shadow-red-500/20 font-mono"
                  >
                    {isSchedulingMeeting ? "SAVING MEETING ENTRY..." : "ADD MEETING ENTRY & TURN LEAD ON"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* ================= NOMINATE COORDINATOR MODAL (BD) ================= */}
        {nominateModalLead && (
          <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-blue-500/40 w-full max-w-xl rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl text-white relative">
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <div className="inline-block px-3 py-1 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[10px] font-mono font-bold uppercase rounded-md mb-2">
                    ● PHASE 3 COMPLETE — NOMINATE SCHOOL COORDINATOR
                  </div>
                  <h3 className="text-xl md:text-2xl font-black uppercase text-white font-headline">
                    NOMINATE SCHOOL COORDINATOR
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    School: <span className="text-blue-400 font-bold">{nominateModalLead.school_name}</span> ({nominateModalLead.lead_id})
                  </p>
                </div>
                <button
                  onClick={() => setNominateModalLead(null)}
                  className="text-slate-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleNominateCoordinatorSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1">
                    Coordinator Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mrs. Anjali Deshmukh"
                    value={nominateForm.coordinator_name}
                    onChange={(e) => setNominateForm({ ...nominateForm, coordinator_name: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1">
                    Coordinator Official Email * (User Login ID)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. coordinator@sunriseschool.edu.in"
                    value={nominateForm.coordinator_email}
                    onChange={(e) => setNominateForm({ ...nominateForm, coordinator_email: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1">
                    Coordinator Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9822123456"
                    value={nominateForm.coordinator_phone}
                    onChange={(e) => setNominateForm({ ...nominateForm, coordinator_phone: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white font-mono focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="bg-blue-950/40 border border-blue-500/30 p-4 rounded-2xl text-xs text-blue-300 flex items-center gap-3 font-mono">
                  <span className="text-xl">🔑</span>
                  <span>
                    Submitting sends this nomination to the <strong>CEO for Approval</strong>. Once approved by CEO, user credentials will be auto-generated and emailed to the coordinator.
                  </span>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setNominateModalLead(null)}
                    className="px-5 py-3 bg-white/10 hover:bg-white/20 text-slate-300 font-bold text-xs uppercase rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isNominatingCoordinator}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-xl shadow-lg shadow-blue-500/20 font-mono"
                  >
                    {isNominatingCoordinator ? "SUBMITTING NOMINATION..." : "SUBMIT TO CEO FOR ACCOUNT CREATION 🔑"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= REJECT PHASE 4 DATA MODAL (BD) ================= */}
        {rejectModalLead && (
          <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-rose-500/40 w-full max-w-xl rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl text-white relative">
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <div className="inline-block px-3 py-1 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-mono font-bold uppercase rounded-md mb-2">
                    ● PHASE 4 DATA REJECTION & REVISION
                  </div>
                  <h3 className="text-xl md:text-2xl font-black uppercase text-white font-headline">
                    REQUEST DATA REVISION
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    School: <span className="text-rose-400 font-bold">{rejectModalLead.school_name}</span> ({rejectModalLead.lead_id})
                  </p>
                </div>
                <button
                  onClick={() => setRejectModalLead(null)}
                  className="text-slate-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1">
                    Rejection Reason & Required Revision Feedback *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Specify exact changes needed e.g. Student contact numbers are missing, timetable PDF link broken, or infrastructure power backup details incomplete..."
                    value={rejectionReasonInput}
                    onChange={(e) => setRejectionReasonInput(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div className="bg-rose-950/40 border border-rose-500/30 p-4 rounded-2xl text-xs text-rose-300 flex items-center gap-3 font-mono">
                  <span className="text-xl">⚠️</span>
                  <span>
                    Rejecting unlocks the Phase 4 form for the School Coordinator and displays your feedback banner when they log in to resubmit.
                  </span>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRejectModalLead(null)}
                    className="px-5 py-3 bg-white/10 hover:bg-white/20 text-slate-300 font-bold text-xs uppercase rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReviewPhase4(rejectModalLead, 'REJECT')}
                    disabled={isReviewingPhase4 || !rejectionReasonInput.trim()}
                    className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase rounded-xl shadow-lg shadow-rose-500/20 font-mono disabled:opacity-50"
                  >
                    {isReviewingPhase4 ? "SENDING REJECTION..." : "CONFIRM REJECTION & REQUEST REVISION ❌"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= WALL PHOTO INSPECTION MODAL ================= */}
        {previewWallPhoto && (
          <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-white/20 max-w-3xl w-full rounded-3xl p-6 space-y-4 shadow-2xl relative">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                    CLASSROOM INFRASTRUCTURE PHOTO INSPECTOR
                  </span>
                  <h3 className="text-xl font-black text-white font-mono uppercase">{previewWallPhoto.title}</h3>
                </div>
                <button
                  onClick={() => setPreviewWallPhoto(null)}
                  className="text-slate-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="relative max-h-[70vh] flex items-center justify-center bg-slate-950 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={previewWallPhoto.url}
                  alt={previewWallPhoto.title}
                  className="max-h-[65vh] w-auto object-contain rounded-xl"
                />
              </div>

              {previewWallPhoto.remarks && (
                <div className="bg-slate-950 p-3 rounded-xl border border-white/10 text-xs font-mono text-slate-300">
                  <span className="text-amber-400 font-bold uppercase block mb-1">Pillar & Structure Notes:</span>
                  <p>{previewWallPhoto.remarks}</p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setPreviewWallPhoto(null)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase rounded-xl font-mono"
                >
                  Close Photo Inspector
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
