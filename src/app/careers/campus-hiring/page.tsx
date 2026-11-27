"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/demo-navbar";
import { Footer } from "@/components/demo-footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Briefcase, Code, Cpu, Palette, Video,
  Smartphone, Users, CheckCircle2, AlertCircle, FileText,
  Upload, X, ArrowRight, Sparkles, Star, Rocket, Award,
  Building2, Phone, Mail, Globe, Clock, ChevronRight
} from "lucide-react";

const CAMPUS_POSITIONS = [
  { id: "AI Instructor", label: "AI Instructor", icon: Cpu, color: "from-blue-500/10 to-blue-600/5", iconColor: "text-blue-500", desc: "Teach AI & coding to students" },
  { id: "Electronics Instructor", label: "Electronics Instructor", icon: Briefcase, color: "from-orange-500/10 to-orange-600/5", iconColor: "text-orange-500", desc: "Teach electronics & circuits" },
  { id: "AI Developer", label: "AI Developer", icon: Code, color: "from-purple-500/10 to-purple-600/5", iconColor: "text-purple-500", desc: "Build AI-powered applications" },
  { id: "Electronic Engineer", label: "Electronic Engineer", icon: Cpu, color: "from-green-500/10 to-green-600/5", iconColor: "text-green-500", desc: "Hardware & embedded systems" },
  { id: "UI/UX Designer", label: "UI/UX Designer", icon: Palette, color: "from-pink-500/10 to-pink-600/5", iconColor: "text-pink-500", desc: "Design user interfaces & experiences" },
  { id: "Social Media Intern / Video Editor", label: "Social Media Intern / Video Editor", icon: Video, color: "from-red-500/10 to-red-600/5", iconColor: "text-red-500", desc: "Content creation & video editing" },
  { id: "Software Developer", label: "Software Developer", icon: Smartphone, color: "from-cyan-500/10 to-cyan-600/5", iconColor: "text-cyan-500", desc: "Full-stack software development" },
  { id: "Other", label: "Other Position", icon: Users, color: "from-slate-500/10 to-slate-600/5", iconColor: "text-slate-500", desc: "Specify your own role" },
];

const EXPERIENCE_OPTIONS = [
  "Fresher (0 years)",
  "Less than 6 months",
  "6 months – 1 year",
  "1 – 2 years",
  "2 – 3 years",
  "3+ years",
  "Other"
];

const NATIONALITY_OPTIONS = [
  "Indian",
  "NRI (Non-Resident Indian)",
  "Other"
];

export default function CampusHiringPage() {
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [otherPosition, setOtherPosition] = useState("");
  const [otherNationality, setOtherNationality] = useState("");
  const [otherExperience, setOtherExperience] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    college_name: "",
    contact_number: "",
    email: "",
    nationality: "Indian",
    experience: "",
    skills: "",
    why_hire: ""
  });
  const [cvMethod, setCvMethod] = useState<"file" | "link">("file");
  const [cvFile, setCvFile] = useState<{ name: string; type: string; base64: string } | null>(null);
  const [cvLink, setCvLink] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [applicationId, setApplicationId] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [studentEmailSent, setStudentEmailSent] = useState(true);

  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Campus Hiring (Internship Program) | AIR G International";
  }, []);

  const handlePositionSelect = (posId: string) => {
    setSelectedPosition(posId);
    setOtherPosition("");
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      setFileError("File size exceeds 4MB. Please upload a smaller file or use a Drive link.");
      return;
    }
    const allowed = ["pdf", "doc", "docx"];
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!allowed.includes(ext)) {
      setFileError("Only PDF, DOC, or DOCX formats are supported.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setCvFile({ name: file.name, type: file.type, base64: reader.result as string });
    };
    reader.onerror = () => setFileError("Error reading file. Please try again.");
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedPosition) { alert("Please select a position first."); return; }
    if (cvMethod === "file" && !cvFile) {
      setFileError("Please upload your CV or switch to provide a link.");
      return;
    }
    if (selectedPosition === "Other" && !otherPosition.trim()) {
      alert("Please specify your position in the 'Other Position' field.");
      return;
    }
    if (formData.nationality === "Other" && !otherNationality.trim()) {
      alert("Please specify your nationality.");
      return;
    }
    if (formData.experience === "Other" && !otherExperience.trim()) {
      alert("Please specify your experience.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const targetEmail = formData.email.trim();
      const payload = {
        ...formData,
        email: targetEmail,
        nationality: formData.nationality === "Other" ? otherNationality.trim() : formData.nationality,
        experience: formData.experience === "Other" ? otherExperience.trim() : formData.experience,
        position_applied: selectedPosition,
        other_position: selectedPosition === "Other" ? otherPosition.trim() : undefined,
        cv_submit_method: cvMethod,
        cv_file: cvMethod === "file" ? cvFile : null,
        cv_link: cvMethod === "link" ? cvLink.trim() : ""
      };

      const res = await fetch("/api/campus-hiring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setApplicationId(data.application_id);
        setSubmittedEmail(targetEmail);
        setStudentEmailSent(data.studentEmailSent !== false);
        setSubmitStatus("success");
        setFormData({ full_name: "", college_name: "", contact_number: "", email: "", nationality: "Indian", experience: "", skills: "", why_hire: "" });
        setOtherPosition("");
        setOtherNationality("");
        setOtherExperience("");
        setCvFile(null);
        setCvLink("");
        setSelectedPosition("");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFBFD] text-[#1a1a2e]">
      <Navbar />
      <main className="flex-1 pt-20 relative overflow-x-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
        <div className="absolute top-96 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

        {/* ─── Hero ─────────────────────────────────────────────── */}
        <section className="relative pt-24 pb-16 overflow-hidden text-center max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="relative z-10 space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-bold uppercase tracking-widest">
              <GraduationCap className="w-3.5 h-3.5" />
              Campus Hiring — Internship Program
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] text-[#1a1a2e]">
              Launch Your Career<br />
              <span className="text-primary text-glow-red">With AIR G</span>
            </h1>
            <p className="text-base sm:text-xl text-[#1a1a2e]/60 font-light leading-relaxed max-w-2xl mx-auto">
              We visit colleges to find passionate students ready to shape the future of AI, technology & education. Select your desired role and apply below.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              {[
                { icon: Clock, text: "Paid Internship" },
                { icon: Star, text: "Learn & Grow" },
                { icon: Rocket, text: "Real Projects" },
                { icon: Award, text: "Certificate Provided" }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <span key={i} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-black/5 text-xs font-semibold text-[#1a1a2e]/70 shadow-sm">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    {item.text}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Position Cards ────────────────────────────────────── */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-20 pb-16">
          <div className="mb-10 text-center space-y-2">
            <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Step 1 — Choose Your Role</span>
            <h2 className="font-headline text-3xl font-black uppercase text-[#1a1a2e]">Open Internship Positions</h2>
            <p className="text-xs text-[#1a1a2e]/50">Click on a position to apply. You can also specify your own role at the bottom.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CAMPUS_POSITIONS.map((pos) => {
              const Icon = pos.icon;
              const isSelected = selectedPosition === pos.id;
              return (
                <motion.button
                  key={pos.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePositionSelect(pos.id)}
                  className={`relative group text-left p-6 rounded-3xl border transition-all duration-300 cursor-pointer w-full ${
                    isSelected
                      ? "border-primary/60 ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg shadow-primary/10"
                      : "border-black/5 bg-white hover:border-primary/20 hover:shadow-md shadow-sm"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${pos.color} border border-black/5 flex items-center justify-center mb-4 ${pos.iconColor} shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`font-headline text-sm font-black uppercase tracking-tight leading-tight mb-1.5 transition-colors ${isSelected ? "text-primary" : "text-[#1a1a2e] group-hover:text-primary"}`}>
                    {pos.label}
                  </h3>
                  <p className="text-[11px] text-[#1a1a2e]/50 font-light leading-relaxed">{pos.desc}</p>
                  <div className={`mt-4 flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors ${isSelected ? "text-primary" : "text-slate-400 group-hover:text-primary"}`}>
                    {isSelected ? "Selected ✓" : "Apply Now"}
                    {!isSelected && <ChevronRight className="w-3 h-3" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* ─── Application Form ──────────────────────────────────── */}
        <section ref={formRef} className="max-w-[1440px] mx-auto px-6 md:px-20 py-16 border-t border-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Info Panel */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Step 2 — Fill Your Details</span>
              <h2 className="font-headline text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none text-[#1a1a2e]">
                Submit Your Application
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                Fill in your academic and personal details. Upload your CV and tell us why you are the right fit. We will get back to you within 5–7 working days.
              </p>

              {/* Selected position badge */}
              {selectedPosition && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-primary/5 border border-primary/20 rounded-2xl"
                >
                  <span className="text-[9px] font-mono text-primary/70 uppercase tracking-widest block mb-1">Applying For</span>
                  <span className="font-headline font-black text-sm uppercase text-primary">
                    {selectedPosition === "Other" && otherPosition ? otherPosition : selectedPosition}
                  </span>
                </motion.div>
              )}

              <div className="bg-slate-100 p-5 rounded-2xl border border-black/5 text-xs text-slate-500 space-y-2 leading-relaxed font-light font-mono">
                <p className="font-semibold text-slate-700 flex items-center gap-1.5 font-sans text-xs">
                  <AlertCircle className="w-4 h-4 text-primary shrink-0" /> Submission Rules:
                </p>
                <p>&bull; Allowed formats: <strong>PDF, DOC, DOCX</strong>.</p>
                <p>&bull; Maximum file size: <strong>4 MB</strong>.</p>
                <p>&bull; Google Drive link must be set to <strong>&ldquo;Anyone with link can view&rdquo;</strong>.</p>
                <p>&bull; You will receive a confirmation email after submission.</p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Need Help?</p>
                <a href="mailto:hr@gurujiair.com" className="flex items-center gap-2 text-xs text-slate-600 hover:text-primary transition-colors font-medium">
                  <Mail className="w-4 h-4 text-primary" /> hr@gurujiair.com
                </a>
                <a href="tel:+918446534087" className="flex items-center gap-2 text-xs text-slate-600 hover:text-primary transition-colors font-medium">
                  <Phone className="w-4 h-4 text-primary" /> +91 8446534087
                </a>
              </div>
            </div>

            {/* Form Panel */}
            <div className="lg:col-span-8">
              <div className="rounded-[2.5rem] border border-black/5 p-8 sm:p-10 bg-white shadow-xl relative">

                {/* Success State */}
                {submitStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 space-y-5"
                  >
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-headline font-black uppercase text-[#1a1a2e]">Application Submitted!</h3>
                    <div className="inline-block bg-slate-100 border border-black/5 rounded-xl px-6 py-3">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Your Application ID</span>
                      <span className="text-lg font-black font-mono text-primary">{applicationId}</span>
                    </div>
                    <p className="text-sm text-slate-600 max-w-md mx-auto font-light leading-relaxed">
                      {studentEmailSent ? (
                        <>
                          Thank you for applying! A confirmation email has been sent to <strong className="text-[#1a1a2e]">{submittedEmail}</strong>. Our team will review your application and contact you within <strong>5–7 working days</strong>.
                        </>
                      ) : (
                        <>
                          Thank you for applying! Your application has been saved successfully. Our team will review your application and contact you within <strong>5–7 working days</strong>.
                        </>
                      )}
                    </p>
                    <p className="text-xs text-slate-400 font-mono">Please save your Application ID for reference.</p>
                    <button
                      onClick={() => { setSubmitStatus("idle"); setSelectedPosition(""); }}
                      className="mt-2 px-6 py-2.5 border border-black/10 hover:bg-black/5 rounded-xl text-xs font-mono font-bold uppercase transition-colors"
                    >
                      Apply for Another Position
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Position selector inside form */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">
                        Position Applied For <span className="text-primary">*</span>
                      </label>
                      <select
                        value={selectedPosition}
                        onChange={(e) => { setSelectedPosition(e.target.value); setOtherPosition(""); }}
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-slate-50 text-sm focus:outline-none focus:border-primary/45 transition-colors"
                      >
                        <option value="">— Select a position —</option>
                        {CAMPUS_POSITIONS.map((p) => (
                          <option key={p.id} value={p.id}>{p.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Other Position Input */}
                    <AnimatePresence>
                      {selectedPosition === "Other" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">
                            Specify Your Position <span className="text-primary">*</span>
                          </label>
                          <input
                            type="text"
                            required={selectedPosition === "Other"}
                            value={otherPosition}
                            onChange={(e) => setOtherPosition(e.target.value)}
                            placeholder="e.g. Marketing Intern, Data Analyst..."
                            className="w-full px-4 py-3.5 rounded-xl border border-primary/30 bg-primary/5 text-sm focus:outline-none focus:border-primary/60 transition-colors"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="border-t border-black/5 pt-6">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/40 mb-4">Personal & Academic Information</p>

                      {/* Row 1: Name + College */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">
                            Full Name <span className="text-primary">*</span>
                          </label>
                          <input
                            type="text" required placeholder="e.g. Priya Sharma"
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-slate-50 text-sm focus:outline-none focus:border-primary/45 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">
                            College / Institute Name <span className="text-primary">*</span>
                          </label>
                          <input
                            type="text" required placeholder="e.g. MIT College of Engineering"
                            value={formData.college_name}
                            onChange={(e) => setFormData({ ...formData, college_name: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-slate-50 text-sm focus:outline-none focus:border-primary/45 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Row 2: Phone + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">
                            Contact Number <span className="text-primary">*</span>
                          </label>
                          <input
                            type="tel" required placeholder="+91 98765 43210"
                            value={formData.contact_number}
                            onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-slate-50 text-sm focus:outline-none focus:border-primary/45 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">
                            Email Address <span className="text-primary">*</span>
                          </label>
                          <input
                            type="email" required placeholder="yourname@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-slate-50 text-sm focus:outline-none focus:border-primary/45 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Row 3: Nationality + Experience */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">
                            Nationality <span className="text-primary">*</span>
                          </label>
                          <select
                            value={formData.nationality}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData({ ...formData, nationality: val });
                              if (val !== "Other") setOtherNationality("");
                            }}
                            required
                            className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-slate-50 text-sm focus:outline-none focus:border-primary/45 transition-colors"
                          >
                            {NATIONALITY_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
                          </select>
                          <AnimatePresence>
                            {formData.nationality === "Other" && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pt-1 space-y-1.5"
                              >
                                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60 block">
                                  Specify Your Nationality <span className="text-primary">*</span>
                                </label>
                                <input
                                  type="text"
                                  required={formData.nationality === "Other"}
                                  value={otherNationality}
                                  onChange={(e) => setOtherNationality(e.target.value)}
                                  placeholder="e.g. Nepalese, American, Bangladeshi..."
                                  className="w-full px-4 py-3 rounded-xl border border-primary/30 bg-primary/5 text-sm focus:outline-none focus:border-primary/60 transition-colors"
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">
                            Experience <span className="text-primary">*</span>
                          </label>
                          <select
                            value={formData.experience}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData({ ...formData, experience: val });
                              if (val !== "Other") setOtherExperience("");
                            }}
                            required
                            className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-slate-50 text-sm focus:outline-none focus:border-primary/45 transition-colors"
                          >
                            <option value="">— Select experience —</option>
                            {EXPERIENCE_OPTIONS.map((exp) => <option key={exp} value={exp}>{exp}</option>)}
                          </select>
                          <AnimatePresence>
                            {formData.experience === "Other" && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pt-1 space-y-1.5"
                              >
                                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60 block">
                                  Specify Your Experience <span className="text-primary">*</span>
                                </label>
                                <input
                                  type="text"
                                  required={formData.experience === "Other"}
                                  value={otherExperience}
                                  onChange={(e) => setOtherExperience(e.target.value)}
                                  placeholder="e.g. 2 internships, Freelance projects..."
                                  className="w-full px-4 py-3 rounded-xl border border-primary/30 bg-primary/5 text-sm focus:outline-none focus:border-primary/60 transition-colors"
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-2 mb-5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">
                          Skills <span className="text-primary">*</span>
                        </label>
                        <textarea
                          rows={3} required
                          placeholder="e.g. Python, Machine Learning, TensorFlow, Circuit Design, Adobe Premiere Pro..."
                          value={formData.skills}
                          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-slate-50 text-sm focus:outline-none focus:border-primary/45 transition-colors resize-none"
                        />
                      </div>

                      {/* Why Hire */}
                      <div className="space-y-2 mb-6">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">
                          Why Should We Hire You? <span className="text-primary">*</span>
                        </label>
                        <textarea
                          rows={4} required
                          placeholder="Tell us about your passion, achievements, relevant projects, and what makes you stand out for this role..."
                          value={formData.why_hire}
                          onChange={(e) => setFormData({ ...formData, why_hire: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-slate-50 text-sm focus:outline-none focus:border-primary/45 transition-colors resize-none"
                        />
                      </div>
                    </div>

                    {/* CV Upload Section */}
                    <div className="border-t border-black/5 pt-6 space-y-4">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/40">CV / Resume</p>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60 block">Submission Method</label>
                        <div className="flex bg-slate-100 p-1 rounded-xl border border-black/5 w-fit">
                          {(["file", "link"] as const).map((m) => (
                            <button
                              key={m} type="button"
                              onClick={() => { setCvMethod(m); setFileError(null); }}
                              className={`px-5 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                                cvMethod === m ? "bg-white text-[#1a1a2e] shadow-sm" : "text-slate-500 hover:text-slate-800"
                              }`}
                            >
                              {m === "file" ? "Upload File" : "Provide Link"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {cvMethod === "file" ? (
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60 block">
                            Upload CV from Device <span className="text-primary">*</span>
                          </label>
                          {cvFile ? (
                            <div className="flex items-center justify-between p-4 bg-white border border-primary/20 rounded-xl shadow-sm">
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-10 h-10 bg-primary/5 text-primary flex items-center justify-center rounded-lg shrink-0">
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div className="overflow-hidden">
                                  <span className="text-xs font-semibold text-slate-800 block truncate">{cvFile.name}</span>
                                  <span className="text-[10px] text-slate-400 font-mono">{cvFile.name.split(".").pop()?.toUpperCase()}</span>
                                </div>
                              </div>
                              <button type="button" onClick={() => { setCvFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-500 transition-colors shrink-0">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              className="border-2 border-dashed border-black/10 bg-slate-50 hover:border-primary/45 hover:bg-primary/5 rounded-2xl p-8 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 group"
                            >
                              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.doc,.docx" className="hidden" />
                              <div className="w-12 h-12 bg-white text-slate-400 group-hover:text-primary group-hover:bg-primary/10 flex items-center justify-center rounded-xl transition-colors shadow-sm">
                                <Upload className="w-6 h-6" />
                              </div>
                              <span className="text-sm font-semibold text-slate-700 mt-1">Click to upload your CV</span>
                              <span className="text-[11px] text-slate-400 font-mono">Supports PDF, DOC, DOCX — Max 4MB</span>
                            </div>
                          )}
                          {fileError && (
                            <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
                              <AlertCircle className="w-4 h-4 shrink-0" /><span>{fileError}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">
                            CV Link (Google Drive / Public URL) <span className="text-primary">*</span>
                          </label>
                          <div className="relative">
                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="url" required={cvMethod === "link"}
                              placeholder="https://drive.google.com/file/d/..."
                              value={cvLink}
                              onChange={(e) => setCvLink(e.target.value)}
                              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-black/5 bg-slate-50 text-sm focus:outline-none focus:border-primary/45 transition-colors"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {submitStatus === "error" && (
                      <p className="text-xs font-mono text-red-500 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        Something went wrong. Please try again or email us at <strong>hr@gurujiair.com</strong>.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-2xl bg-[#1a1a2e] text-white hover:bg-primary font-headline font-black text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer shadow-md group"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

