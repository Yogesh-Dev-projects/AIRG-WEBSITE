"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Navbar } from "@/components/demo-navbar";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────
interface BookingForm {
  organizationName: string;
  contactPerson: string;
  designation: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  sessionType: "workshop" | "guest-lecture" | "";
  duration: string;
  preferredDate: string;
  participantCount: string;
  department: string;
  industry: string;
  specialRequirements: string;
}

const emptyForm: BookingForm = {
  organizationName: "",
  contactPerson: "",
  designation: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  sessionType: "",
  duration: "",
  preferredDate: "",
  participantCount: "",
  department: "",
  industry: "",
  specialRequirements: "",
};

// ─── Duration Options ──────────────────────────────────────
const guestLectureDurations = ["1 Hour", "2 Hours", "4 Hours", "8 Hours", "1 Day", "3 Days"];
const schoolWorkshopDurations = ["1 Day", "3 Days", "1 Week", "1 Month"];
const collegeWorkshopDurations = ["3 Days", "1 Week", "2 Weeks", "1 Month"];
const corporateGuestLectureDurations = ["1 Hour", "2 Hours", "4 Hours", "8 Hours", "1 Day", "3 Days"];
const corporateWorkshopDurations = ["1 Day", "3 Days", "1 Week", "1 Month"];

// ─── Section Data ──────────────────────────────────────────
const sections = [
  {
    id: "school",
    badge: "🏫 SCHOOL WORKSHOP",
    badgeColor: "bg-blue-50 border-blue-200 text-blue-700",
    accentColor: "#2563EB",
    accentLight: "rgba(37,99,235,0.08)",
    title: "Workshops for Schools",
    subtitle: "Igniting Curiosity in Young Minds",
    description:
      "AIRG International brings cutting-edge technology directly to school campuses. Our expert trainers conduct immersive, hands-on workshops tailored for students at every level — making AI, Robotics, and STEM not just understandable, but exciting.",
    orgLabel: "Name of School",
    contactLabel: "Contact Person (Principal / Teacher)",
    designationShow: false,
    departmentShow: false,
    industryShow: false,
    participantLabel: "Number of Students (approx.)",
    workshopDurations: schoolWorkshopDurations,
    offerings: [
      {
        icon: "smart_toy",
        title: "Robotics & Electronics",
        desc: "Hands-on building of simple robots, circuits and sensors — students learn by doing.",
      },
      {
        icon: "code",
        title: "AI & Coding for Beginners",
        desc: "Python basics, block-based coding, and introduction to machine learning concepts.",
      },
      {
        icon: "science",
        title: "STEM Innovation Activities",
        desc: "Science experiments integrated with technology for an engaging learning experience.",
      },
      {
        icon: "flight",
        title: "Drone Technology Intro",
        desc: "Basic drone assembly, flight principles, and safety — perfect for young innovators.",
      },
      {
        icon: "view_in_ar",
        title: "3D Printing & Design",
        desc: "Basics of 3D modeling and printing — students design and see their ideas come to life.",
      },
      {
        icon: "emoji_events",
        title: "Hackathon Preparation",
        desc: "Guiding students for Smart India Hackathon and other national-level competitions.",
      },
    ],
  },
  {
    id: "college",
    badge: "🎓 COLLEGE & INSTITUTE WORKSHOP",
    badgeColor: "bg-purple-50 border-purple-200 text-purple-700",
    accentColor: "#7C3AED",
    accentLight: "rgba(124,58,237,0.08)",
    title: "Workshops for Colleges & Institutes",
    subtitle: "Building Industry-Ready Professionals",
    description:
      "Designed for engineering colleges, polytechnics, management institutes, and universities — AIRG delivers advanced, curriculum-aligned workshops and bootcamps that bridge the gap between academic learning and real-world industry skills.",
    orgLabel: "Name of College / Institute",
    contactLabel: "Contact Person (HOD / Principal / Coordinator)",
    designationShow: true,
    departmentShow: true,
    industryShow: false,
    participantLabel: "Number of Students (approx.)",
    workshopDurations: collegeWorkshopDurations,
    offerings: [
      {
        icon: "psychology",
        title: "Advanced AI & Machine Learning",
        desc: "Deep learning, neural networks, and real project building with industry-grade tools.",
      },
      {
        icon: "memory",
        title: "Robotics & Embedded Systems",
        desc: "Arduino, Raspberry Pi, IoT projects — practical and curriculum-aligned.",
      },
      {
        icon: "flight_takeoff",
        title: "Drone Technology & UAV Systems",
        desc: "Advanced drone programming, applications in agriculture, surveillance, and delivery.",
      },
      {
        icon: "precision_manufacturing",
        title: "Industry 4.0 & Smart Manufacturing",
        desc: "Automation, PLC, SCADA basics — preparing students for modern manufacturing.",
      },
      {
        icon: "rocket_launch",
        title: "Research & Innovation Bootcamps",
        desc: "Intensive 3-day or 1-week hands-on bootcamps for teams and project groups.",
      },
      {
        icon: "work",
        title: "Placement Ready Skills",
        desc: "Resume building, portfolio development, and industry-readiness through project work.",
      },
    ],
  },
  {
    id: "corporate",
    badge: "🏭 CORPORATE & INDUSTRY WORKSHOP",
    badgeColor: "bg-orange-50 border-orange-200 text-orange-700",
    accentColor: "#EA580C",
    accentLight: "rgba(234,88,12,0.08)",
    title: "Workshops for Corporate & Industry",
    subtitle: "Transforming Businesses Through Technology",
    description:
      "AIRG International partners with companies, government bodies, and enterprises to deliver bespoke technology training programs. From keynote sessions to month-long transformation workshops — we equip your teams with the skills to lead in the AI-first world.",
    orgLabel: "Company / Organization Name",
    contactLabel: "Contact Person Name",
    designationShow: true,
    departmentShow: false,
    industryShow: true,
    participantLabel: "Team Size (approx.)",
    workshopDurations: corporateWorkshopDurations,
    offerings: [
      {
        icon: "hub",
        title: "AI Implementation for Business",
        desc: "How to integrate AI into existing business workflows and decision-making processes.",
      },
      {
        icon: "settings",
        title: "Robotics & Automation for Industry",
        desc: "Practical training for factory and production teams on modern automation technology.",
      },
      {
        icon: "transform",
        title: "Digital Transformation Workshop",
        desc: "Transitioning traditional businesses to tech-first with structured transformation roadmaps.",
      },
      {
        icon: "analytics",
        title: "Data Analytics & Decision Making",
        desc: "Using data and AI for smarter business decisions — from dashboards to predictive models.",
      },
      {
        icon: "record_voice_over",
        title: "Innovation Keynote & TED-Style Talks",
        desc: "Inspiring guest lectures and keynote sessions to ignite innovation culture in teams.",
      },
      {
        icon: "biotech",
        title: "R&D Lab Setup Consultation",
        desc: "AIRG helps companies design and set up internal innovation and AI labs.",
      },
    ],
  },
];

// ─── Workshop Section Component ────────────────────────────
function WorkshopSection({ section, index }: { section: (typeof sections)[0]; index: number }) {
  const [form, setForm] = useState<BookingForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "sessionType") {
      setForm((prev) => ({ ...prev, [name]: value as BookingForm["sessionType"], duration: "" }));
    }
  };

  const getDurationOptions = () => {
    if (!form.sessionType) return [];
    if (form.sessionType === "guest-lecture") {
      return section.id === "corporate" ? corporateGuestLectureDurations : guestLectureDurations;
    }
    return section.workshopDurations;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/workshop-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionType: section.id, ...form }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setForm(emptyForm);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        id={section.id}
        className="group relative bg-white border border-black/10 rounded-[2rem] p-6 md:p-8 flex flex-col hover:border-black/20 hover:shadow-2xl transition-all duration-300"
      >
        {/* Badge */}
        <span
          className={`self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-[10px] font-black font-mono uppercase tracking-widest mb-6 ${section.badgeColor}`}
        >
          {section.badge}
        </span>
        
        {/* Title & Description */}
        <h2 className="font-headline text-3xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-tight mb-2">
          {section.title}
        </h2>
        <p className="text-sm font-bold mb-4" style={{ color: section.accentColor }}>
          {section.subtitle}
        </p>
        <p className="text-[#1a1a2e]/60 text-sm font-light leading-relaxed mb-8 border-l-2 pl-4" style={{ borderColor: section.accentColor }}>
          {section.description}
        </p>

        {/* Offerings List */}
        <div className="flex-1 space-y-4 mb-10">
          {section.offerings.map((item, i) => (
            <div key={i} className="flex gap-4 items-start group/item">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors" style={{ background: section.accentLight }}>
                <span className="material-symbols-outlined text-[18px]" style={{ color: section.accentColor }}>
                  {item.icon}
                </span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-[#1a1a2e] text-sm uppercase tracking-wide group-hover/item:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-[#1a1a2e]/50 text-xs leading-relaxed mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Book Now Button */}
        <button
          onClick={() => setFormVisible(true)}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
          style={{ background: section.accentColor }}
        >
          <span className="material-symbols-outlined text-lg">calendar_month</span>
          Book Session
        </button>
      </div>

      {/* Modal for Booking Form */}
      {formVisible && mounted && createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 md:px-8 flex items-center justify-between shrink-0" style={{ background: section.accentLight, borderBottom: `1px solid rgba(0,0,0,0.06)` }}>
              <div>
                <h3 className="font-headline font-black text-xl md:text-2xl text-[#1a1a2e] uppercase tracking-tight">
                  Book Your {section.id === "corporate" ? "Corporate Session" : section.title.replace("Workshops for ", "")}
                </h3>
                <p className="text-[#1a1a2e]/60 text-xs md:text-sm mt-1">
                  Fill the form below — our team will contact you within 24 hours.
                </p>
              </div>
              <button
                onClick={() => { setFormVisible(false); setSubmitted(false); setError(""); }}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/50 text-[#1a1a2e]/50 hover:text-[#1a1a2e] hover:bg-white transition-colors border border-black/5"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-6 md:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 md:py-20 text-center">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-sm mx-auto"
                    style={{ background: section.accentLight }}
                  >
                    <span className="material-symbols-outlined text-5xl" style={{ color: section.accentColor }}>
                      check_circle
                    </span>
                  </div>
                  <h4 className="font-headline font-black text-2xl text-[#1a1a2e] uppercase mb-3">
                    Booking Request Sent!
                  </h4>
                  <p className="text-[#1a1a2e]/50 max-w-md mb-8 mx-auto">
                    Thank you! Our team has received your request and will get in touch with you shortly to confirm the details.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormVisible(false); }}
                    className="px-10 py-4 font-bold text-sm uppercase tracking-widest rounded-xl text-white transition-all duration-300 hover:scale-[1.02]"
                    style={{ background: section.accentColor }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-black font-mono uppercase tracking-widest text-[#1a1a2e]/50 mb-2">
                      {section.orgLabel} <span className="text-red-500">*</span>
                    </label>
                    <input required name="organizationName" value={form.organizationName} onChange={handleChange} placeholder={section.orgLabel} className="w-full bg-[#f8f8fa] border border-black/8 rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm focus:outline-none focus:border-black/25 focus:bg-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black font-mono uppercase tracking-widest text-[#1a1a2e]/50 mb-2">
                      {section.contactLabel} <span className="text-red-500">*</span>
                    </label>
                    <input required name="contactPerson" value={form.contactPerson} onChange={handleChange} placeholder="Full Name" className="w-full bg-[#f8f8fa] border border-black/8 rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm focus:outline-none focus:border-black/25 focus:bg-white transition-colors" />
                  </div>
                  {section.designationShow ? (
                    <div>
                      <label className="block text-[11px] font-black font-mono uppercase tracking-widest text-[#1a1a2e]/50 mb-2">
                        Designation / Role
                      </label>
                      <input name="designation" value={form.designation} onChange={handleChange} placeholder="e.g. HOD, HR Manager" className="w-full bg-[#f8f8fa] border border-black/8 rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm focus:outline-none focus:border-black/25 focus:bg-white transition-colors" />
                    </div>
                  ) : <div />}
                  <div>
                    <label className="block text-[11px] font-black font-mono uppercase tracking-widest text-[#1a1a2e]/50 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input required type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="w-full bg-[#f8f8fa] border border-black/8 rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm focus:outline-none focus:border-black/25 focus:bg-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black font-mono uppercase tracking-widest text-[#1a1a2e]/50 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@example.com" className="w-full bg-[#f8f8fa] border border-black/8 rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm focus:outline-none focus:border-black/25 focus:bg-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black font-mono uppercase tracking-widest text-[#1a1a2e]/50 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input required name="city" value={form.city} onChange={handleChange} placeholder="Your City" className="w-full bg-[#f8f8fa] border border-black/8 rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm focus:outline-none focus:border-black/25 focus:bg-white transition-colors" />
                  </div>
                  {section.departmentShow && (
                    <div>
                      <label className="block text-[11px] font-black font-mono uppercase tracking-widest text-[#1a1a2e]/50 mb-2">
                        Department / Stream
                      </label>
                      <input name="department" value={form.department} onChange={handleChange} placeholder="e.g. CSE, Mechanical" className="w-full bg-[#f8f8fa] border border-black/8 rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm focus:outline-none focus:border-black/25 focus:bg-white transition-colors" />
                    </div>
                  )}
                  {section.industryShow && (
                    <div>
                      <label className="block text-[11px] font-black font-mono uppercase tracking-widest text-[#1a1a2e]/50 mb-2">
                        Industry / Domain
                      </label>
                      <input name="industry" value={form.industry} onChange={handleChange} placeholder="e.g. Manufacturing, IT" className="w-full bg-[#f8f8fa] border border-black/8 rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm focus:outline-none focus:border-black/25 focus:bg-white transition-colors" />
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-black font-mono uppercase tracking-widest text-[#1a1a2e]/50 mb-2">
                      Full Address / Venue <span className="text-red-500">*</span>
                    </label>
                    <input required name="address" value={form.address} onChange={handleChange} placeholder="Where should the session take place?" className="w-full bg-[#f8f8fa] border border-black/8 rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm focus:outline-none focus:border-black/25 focus:bg-white transition-colors" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-black font-mono uppercase tracking-widest text-[#1a1a2e]/50 mb-3">
                      Type of Session <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      {[
                        { value: "workshop", label: "Workshop" },
                        { value: "guest-lecture", label: section.id === "corporate" ? "Guest Lecture" : "Guest Lecture" },
                      ].map((opt) => (
                        <label key={opt.value} className={`flex items-center gap-2 cursor-pointer px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all duration-200 flex-1 justify-center ${form.sessionType === opt.value ? "border-transparent text-white" : "bg-[#f8f8fa] border-black/8 text-[#1a1a2e]/60 hover:border-black/20"}`} style={form.sessionType === opt.value ? { background: section.accentColor } : {}}>
                          <input type="radio" name="sessionType" value={opt.value} checked={form.sessionType === opt.value} onChange={handleChange} className="sr-only" />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-black font-mono uppercase tracking-widest text-[#1a1a2e]/50 mb-2">
                      Duration <span className="text-red-500">*</span>
                    </label>
                    <select required name="duration" value={form.duration} onChange={handleChange} disabled={!form.sessionType} className="w-full bg-[#f8f8fa] border border-black/8 rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm focus:outline-none focus:border-black/25 focus:bg-white transition-colors disabled:opacity-40">
                      <option value="">{form.sessionType ? "Select Duration" : "Select session type first"}</option>
                      {getDurationOptions().map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-black font-mono uppercase tracking-widest text-[#1a1a2e]/50 mb-2">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input required type="date" name="preferredDate" value={form.preferredDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className="w-full bg-[#f8f8fa] border border-black/8 rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm focus:outline-none focus:border-black/25 focus:bg-white transition-colors" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-black font-mono uppercase tracking-widest text-[#1a1a2e]/50 mb-2">
                      {section.participantLabel} <span className="text-red-500">*</span>
                    </label>
                    <input required type="number" name="participantCount" value={form.participantCount} onChange={handleChange} placeholder="e.g. 50" min="1" className="w-full bg-[#f8f8fa] border border-black/8 rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm focus:outline-none focus:border-black/25 focus:bg-white transition-colors" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-black font-mono uppercase tracking-widest text-[#1a1a2e]/50 mb-2">
                      Special Requirements / Message
                    </label>
                    <textarea name="specialRequirements" value={form.specialRequirements} onChange={handleChange} placeholder="Any specific topics, equipment needs, or additional information..." rows={3} className="w-full bg-[#f8f8fa] border border-black/8 rounded-xl px-4 py-3.5 text-[#1a1a2e] text-sm focus:outline-none focus:border-black/25 focus:bg-white transition-colors resize-none" />
                  </div>
                  {error && (
                    <div className="sm:col-span-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                      {error}
                    </div>
                  )}
                  <div className="sm:col-span-2 flex gap-4 pt-4 mt-2 border-t border-black/5">
                    <button type="button" onClick={() => { setFormVisible(false); setError(""); }} className="px-6 py-4 bg-[#f8f8fa] border border-black/8 text-[#1a1a2e]/60 font-bold text-sm uppercase tracking-widest rounded-xl hover:border-black/20 hover:text-[#1a1a2e] transition-all">
                      Cancel
                    </button>
                    <button type="submit" disabled={loading} className="flex-1 py-4 font-bold text-sm uppercase tracking-widest rounded-xl text-white transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2" style={{ background: section.accentColor }}>
                      {loading ? "Sending..." : "Submit Booking Request"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function WorkshopsPage() {
  return (
    <main className="w-full min-h-screen bg-white text-[#1a1a2e] overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px] opacity-60" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[130px] opacity-70" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "radial-gradient(rgba(235,0,40,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] text-[#1a1a2e]/30 font-mono tracking-widest uppercase mb-10">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">Workshops</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="relative">
              <div className="absolute left-[-20px] top-0 h-full w-[2.5px] bg-gradient-to-b from-[#EE2C3C] via-[#EE2C3C]/20 to-transparent">
                <div className="absolute top-0 left-[-5px] w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_12px_#EE2C3C]" />
              </div>
              <div className="mb-4">
                <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black font-mono text-primary uppercase tracking-widest">
                  ✦ AIRG Workshops & Guest Lectures
                </span>
              </div>
              <h1 className="font-headline text-5xl md:text-8xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none mb-6">
                Book a<br />
                <span className="text-[#EE2C3C]">Workshop</span>
              </h1>
              <p className="text-[#1a1a2e]/50 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                Empowering Schools, Colleges &amp; Industries with hands-on AI, Robotics, and
                Deep-Tech training programs. Choose your category below and book your session.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5 shrink-0">
              {[
                { num: "500+", label: "Workshops Conducted" },
                { num: "50K+", label: "Students Trained" },
                { num: "100+", label: "Cities Reached" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-5 rounded-2xl bg-[#f8f8fa] border border-black/5">
                  <div className="font-headline text-3xl font-black text-[#EE2C3C]">{stat.num}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#1a1a2e]/40 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Nav */}
          <div className="mt-14 flex flex-wrap gap-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group flex items-center gap-2 px-5 py-3 bg-[#f8f8fa] border border-black/6 rounded-xl text-xs font-bold uppercase tracking-widest text-[#1a1a2e]/60 hover:text-[#1a1a2e] hover:border-black/15 hover:bg-white transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>{s.badge}</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
                  arrow_downward
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Three Workshop Sections */}
      <section className="py-20 relative bg-[#f8f8fa]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[-100px] w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px]" />
          <div className="absolute bottom-[20%] right-[-100px] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <WorkshopSection key={section.id} section={section} index={index} />
          ))}
        </div>
      </section>

      {/* Experts Section */}
      <section className="py-24 bg-white border-t border-black/6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[150px] opacity-60" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-50 rounded-full blur-[130px] opacity-50" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-20 relative z-10">
          {/* Section Header — matches Advisory Board style */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-sm text-primary">groups</span>
            </div>
            <h2 className="font-headline text-xl md:text-2xl font-black text-[#1a1a2e] uppercase tracking-widest">
              Advisory Board &amp; Industry Experts
            </h2>
          </div>

          {/* Horizontal expert cards — 3 per row */}
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-6">
            {[
              {
                name: "Mr. Saptparishi Ghosh",
                title: "CEO, Symbiosis TBI",
                desc: "Incubation and startup ecosystem expert leading Symbiosis Technology Business Incubator.",
                photo: "/team/sapptarishi.png",
              },
              {
                name: "Mr. Aashish Banka",
                title: "CEO, Goosebumps.biz",
                desc: "Digital transformation leader driving experiential marketing and technology solutions.",
                photo: "/team/aashish.png",
              },
              {
                name: "Mr. Tushar Agarwal",
                title: "MD, Edelweiss Mutual",
                desc: "Financial services leader with deep expertise in fund management and strategic investments.",
                photo: "/team/tushar_a.png",
              },
              {
                name: "Mr. Tushar Suryawanshi",
                title: "Ex. COO, Microficial",
                desc: "Operations specialist with experience scaling technology hardware production and operations.",
                photo: "/team/tushar_s.png",
              },
              {
                name: "Mr. Vijay Trimbake",
                title: "CFO, Air G International",
                desc: "Overseeing financial strategy, budgeting, and fiscal operations across all AIRG global hubs.",
                photo: "/team/vijay.png",
              },
              {
                name: "Mr. Chakravarti Gupta",
                title: "Chief Technology Advisor",
                desc: "Senior technology strategist advising on AI infrastructure architecture and enterprise systems.",
                photo: "/team/chakravarti.png",
              },
              {
                name: "Mr. Suyash Patil",
                title: "Manager",
                desc: "Manager at AIR G International",
                photo: "/team/suyash.jpeg",
              },
              {
                name: "Mr. Prasad Shelke",
                title: "Associate Manager",
                desc: "Associate Manager at AIR G International",
                photo: "/team/prasad.jpeg",
              },
            ].map((expert, i) => (
              <div
                key={i}
                className="group flex items-start gap-4 bg-white border border-black/6 rounded-2xl p-5 hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Rectangular photo — left side */}
                <div className="w-[90px] h-[100px] rounded-xl overflow-hidden shrink-0 border border-black/6 group-hover:border-primary/20 transition-all duration-300">
                  <img
                    src={expert.photo}
                    alt={expert.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Text — right side */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-headline font-black text-[#1a1a2e] text-[13px] uppercase tracking-tight leading-tight mb-1">
                    {expert.name}
                  </h3>
                  <p className="text-[#EE2C3C] text-[10px] font-bold font-mono uppercase tracking-widest mb-2">
                    {expert.title}
                  </p>
                  <p className="text-[#1a1a2e]/50 text-xs leading-relaxed">
                    {expert.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="py-20 bg-[#f8f8fa] border-t border-black/6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px] opacity-50" />
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-red-50 rounded-full blur-[130px] opacity-60" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-20 relative z-10">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-sm text-primary">school</span>
            </div>
            <h2 className="font-headline text-xl md:text-2xl font-black text-[#1a1a2e] uppercase tracking-widest">
              Our Clients
            </h2>
          </div>
          <p className="text-[#1a1a2e]/40 text-sm mb-12 ml-11">
            Trusted by leading universities, colleges and institutions across India.
          </p>

          {/* College cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {[
              {
                name: "DY Patil University",
                logo: "/logos/dyp_new.jpg",
                scaleVal: 1.6,
              },
              {
                name: "Symbiosis Institute of Digital & Telecom Management",
                logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgSUotJpSSgR6u5Bx6_rNj-obsY0FuAHYKKLuEtCRFhg&s=10",
              },
              {
                name: "Shivnagar Vidya Prasarak Manda College",
                logo: "https://pharmacy.svpm.org.in/uploads/1751358429.png",
              },
              {
                name: "Government Polytechnic Pune",
                logo: "https://gppune.ac.in/images/gpnewlogo.png",
              },
              {
                name: "Symbiosis Centre for Entrepreneurship & Innovation",
                logo: "/logos/scei_new.png",
              },
              {
                name: "Indira College of Engineering & Management, Pune",
                logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlyOgfkrZHicoHyasNcEFk57DqssLm9wEnu5EHn_gWKw&s",
                scaleVal: 1.5,
              },
              {
                name: "COEP Technological University",
                logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI2tvDsfTZuEF_mE2GXD9Jb8pPDO_dfYjMXB2BSzGJJg&s=10",
              },
            ].map((client, i) => (
              <div
                key={i}
                className="group bg-white border border-black/6 rounded-2xl p-5 flex flex-col items-center text-center gap-4 hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Logo */}
                <div className="w-full h-20 sm:h-24 flex items-center justify-center p-2 overflow-visible">
                  <img
                    src={client.logo}
                    alt={client.name}
                    style={client.scaleVal ? { transform: `scale(${client.scaleVal})` } : {}}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                {/* Name */}
                <p className="text-[#1a1a2e] text-[11px] font-bold uppercase tracking-wide leading-tight">
                  {client.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}

      <section className="py-20 bg-white border-t border-black/6">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border border-primary/15 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-headline text-3xl md:text-4xl font-black text-[#1a1a2e] uppercase tracking-tight mb-3">
                Have a Custom Requirement?
              </h3>
              <p className="text-[#1a1a2e]/40 text-base font-light max-w-lg">
                Contact us directly for customized training programs, bulk bookings, or any specific queries about our workshops.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="https://wa.me/919860779172"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all"
              >
                <span className="material-symbols-outlined text-lg">mail</span>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
