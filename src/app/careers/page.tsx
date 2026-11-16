"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/demo-navbar";
import { Footer } from "@/components/demo-footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, MapPin, ArrowRight, CheckCircle2, ChevronDown, ChevronUp,
  Mail, Phone, Award, Star, Search, Rocket, Sparkles, AlertCircle, FileText, Upload, X
} from "lucide-react";

interface Job {
  title: string;
  category: string;
  location: string;
  type: string;
  salary: string;
  hours?: string;
  qualification?: string;
  tools?: string[];
  responsibilities: string[];
  skills?: string[];
  offers?: string[];
  whyJoin?: string[];
  contactEmail: string;
  contactPhone: string;
}

const jobsData: Job[] = [
  {
    title: "MBA HR Intern",
    category: "Human Resources",
    location: "Pune / Hybrid",
    type: "Full-Time Internship",
    salary: "Competitive Stipend",
    qualification: "MBA in Human Resources (HR) or related stream",
    responsibilities: [
      "Assist in end-to-end recruitment and onboarding processes",
      "Support daily HR operations, employee queries, and general documentation",
      "Coordinate training sessions and development activities",
      "Maintain and update employee records and HR databases",
      "Work on strategic HR projects and organizational initiatives",
      "Collaborate and grow with a dynamic and expanding HR team"
    ],
    offers: [
      "Hands-on HR experience and direct industry exposure",
      "Professional mentorship and career guidance from seniors",
      "Opportunities for learning and professional growth",
      "Collaborative and premium work environment",
      "Potential for a full-time job opportunity (PPO)"
    ],
    contactEmail: "hr@gurujiair.com",
    contactPhone: "8446534087"
  },
  {
    title: "Video Editor",
    category: "Design & Media",
    location: "Pune, Baner",
    type: "Full-Time | In Office",
    salary: "₹20,000 to ₹25,000 / Month",
    hours: "8 Hours / Day",
    tools: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Adobe Photoshop"],
    responsibilities: [
      "Edit and produce high-quality video content for digital platforms, marketing, and courses",
      "Add graphics, text layers, transitions, sound effects, and motion elements to enhance visual storytelling",
      "Manage and organize all video projects, raw footage, assets, and export folders",
      "Collaborate closely with the creative team to understand content requirements and deliver on schedule"
    ],
    skills: [
      "Proficient in industry-standard video editing tools (Premiere Pro, After Effects, DaVinci Resolve, Photoshop)",
      "Basic understanding of motion graphics, video pacing, and animations",
      "Strong sense of timing, video transitions, and creative storytelling flow",
      "Creative thinking, attention to detail, and visual alignment",
      "Ability to work independently, manage assets, and meet strict deadlines"
    ],
    contactEmail: "gurujiairlab@gmail.com",
    contactPhone: "7499612379"
  },
  {
    title: "AI Instructor",
    category: "Education & Tech",
    location: "Pune",
    type: "Full-Time",
    salary: "₹15,000 - ₹22,000 / Month",
    qualification: "B.Tech / BE (Bachelor) in Computer Science, Electronics or related field",
    responsibilities: [
      "Teach coding, artificial intelligence, and physical computing concepts to school students",
      "Create engaging, practical, and effective educational content and learning resources",
      "Guide students in building hands-on AI project models and hardware integrations",
      "Track and assess student learning progress to improve training outcomes"
    ],
    whyJoin: [
      "Work alongside a team of highly passionate educators",
      "Impact thousands of students directly at the school level",
      "Grow your technical skills and training career in the emerging AI landscape",
      "Work in an innovative, encouraging, and supportive team environment"
    ],
    contactEmail: "hr@gurujiair.com",
    contactPhone: "8999258698"
  },
  {
    title: "Artificial Intelligence & Electronics Trainer",
    category: "Education & Trainer",
    location: "Tasgaon, Sangli",
    type: "Full-Time | Freshers & Experienced Can Apply",
    hours: "8 Hours / Day",
    salary: "₹18,000 - ₹22,000 / Month",
    qualification: "B.Tech (CS, AI, DS, ENTC, Electronics, Mechanical) | BCA / MCA | B.Sc. CS | Polytechnic (CS/IT)",
    responsibilities: [
      "Teach Artificial Intelligence and Electronics concepts to school students",
      "Conduct practical, hands-on sessions using breadboards, sensors, and electronic components",
      "Handle general office administration and documentation for school coordination",
      "Coordinate with school authorities and the core team for smooth program delivery",
      "Perform additional project-related tasks and support as assigned by the lead"
    ],
    skills: [
      "Basic knowledge of Artificial Intelligence concepts and trends",
      "Basic knowledge of Electronics, circuit assembly, and hardware",
      "Basic programming skills in languages like Python, C, C++, or similar",
      "Good communication, presentation, and classroom management skills"
    ],
    contactEmail: "gurujiairlab@gmail.com",
    contactPhone: "7499612379"
  }
];

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedJobIndex, setExpandedJobIndex] = useState<number | null>(null);
  const [selectedJobForForm, setSelectedJobForForm] = useState("MBA HR Intern");

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeLink: "",
    coverLetter: ""
  });
  
  // File Upload States
  const [resumeSubmitMethod, setResumeSubmitMethod] = useState<"file" | "link">("file");
  const [resumeFile, setResumeFile] = useState<{ name: string; type: string; base64: string } | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const formRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Careers | AIR GURUJI INTERNATIONAL";
  }, []);

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJobForForm(jobTitle);
    setSubmitStatus("idle");
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (4MB limit)
    if (file.size > 4 * 1024 * 1024) {
      setFileError("File size exceeds 4MB limit. Please upload a smaller file or provide a Google Drive link.");
      return;
    }

    // Validate format
    const allowedExtensions = ["pdf", "doc", "docx"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
    if (!allowedExtensions.includes(fileExtension)) {
      setFileError("Only PDF, DOC, or DOCX formats are supported.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setResumeFile({
        name: file.name,
        type: file.type,
        base64: reader.result as string
      });
    };
    reader.onerror = () => {
      setFileError("Error reading file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const removeSelectedFile = () => {
    setResumeFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Additional validation
    if (resumeSubmitMethod === "file" && !resumeFile) {
      setFileError("Please upload a resume file or switch to provide a resume link.");
      return;
    }
    if (resumeSubmitMethod === "link" && !formData.resumeLink) {
      return; // standard validation takes care
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: selectedJobForForm,
        coverLetter: formData.coverLetter,
        resumeLink: resumeSubmitMethod === "link" ? formData.resumeLink : "",
        resumeFile: resumeSubmitMethod === "file" ? resumeFile : null
      };

      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", resumeLink: "", coverLetter: "" });
        setResumeFile(null);
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredJobs = jobsData.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFBFD] text-[#1a1a2e]">
      <Navbar />

      <main className="flex-1 pt-20 relative overflow-x-hidden">
        {/* Background Grids and Decorative Glows */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
        <div className="absolute top-96 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden text-center max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="relative z-10 space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Join the Innovators
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] text-[#1a1a2e]">
              Shape the Future<br />
              <span className="text-primary text-glow-red">With AIR G</span>
            </h1>
            <p className="text-base sm:text-xl text-[#1a1a2e]/60 font-light leading-relaxed max-w-2xl mx-auto">
              Empower the next generation by teaching AI, robotics, coding, and design thinking. Explore our open roles and find your path.
            </p>
          </div>
        </section>

        {/* Perks Section */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-20 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: Rocket, 
                title: "Emerging Tech Exposure", 
                desc: "Work hands-on with edge servers, AI pipelines, microelectronics, drones, and telemetry kits.", 
                color: "from-red-500/10 to-red-600/5", 
                iconColor: "text-red-500" 
              },
              { 
                icon: Star, 
                title: "Accelerated Growth", 
                desc: "Gain deep technical mentorship, real-world ownership, and accelerated career paths.", 
                color: "from-blue-500/10 to-blue-600/5", 
                iconColor: "text-blue-500" 
              },
              { 
                icon: Award, 
                title: "Grassroots Impact", 
                desc: "Directly educate hundreds of rural and semi-urban school children, shaping modern India's tech landscape.", 
                color: "from-emerald-500/10 to-emerald-600/5", 
                iconColor: "text-emerald-500" 
              }
            ].map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${perk.color} p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-all duration-300`}
                >
                  <div className={`h-12 w-12 rounded-2xl bg-white flex items-center justify-center mb-5 ${perk.iconColor} shadow-sm`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-headline text-lg font-black uppercase text-[#1a1a2e] tracking-tight mb-2">{perk.title}</h3>
                  <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Job Listings Section */}
        <section className="py-20 border-t border-black/5 bg-slate-50/50">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20 text-left">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Active Openings</span>
                <h2 className="font-headline text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1a1a2e]">Open Roles</h2>
                <p className="text-xs text-[#1a1a2e]/55 font-light">Explore requirements and click to expand full descriptions.</p>
              </div>
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1a2e]/30" />
                <input 
                  type="text" 
                  placeholder="Search roles or locations..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-white border border-black/5 text-sm focus:outline-none focus:border-primary/45 transition-colors" 
                />
              </div>
            </div>

            {/* List */}
            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12 bg-white border border-black/5 rounded-3xl">
                  <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-600">No matching roles found.</p>
                  <p className="text-xs text-slate-400 mt-1">Try resetting your search query.</p>
                </div>
              ) : (
                filteredJobs.map((job, idx) => {
                  const isExpanded = expandedJobIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`group bg-white rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
                        isExpanded ? "border-primary/20 ring-1 ring-primary/5" : ""
                      }`}
                    >
                      {/* Accordion Trigger Header */}
                      <div
                        onClick={() => setExpandedJobIndex(isExpanded ? null : idx)}
                        className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 cursor-pointer select-none"
                      >
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-mono font-bold uppercase tracking-wider rounded border border-black/5">
                              {job.category}
                            </span>
                            <span className="px-2.5 py-0.5 bg-primary/5 text-primary text-[9px] font-mono font-bold uppercase tracking-wider rounded border border-primary/10">
                              {job.type}
                            </span>
                          </div>
                          <h3 className="font-headline text-xl sm:text-2xl font-black uppercase text-[#1a1a2e] group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-[#1a1a2e]/60 font-light">
                            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-primary shrink-0" /> {job.location}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:inline" />
                            <span>Salary: <strong className="font-bold text-slate-800">{job.salary}</strong></span>
                            {job.hours && (
                              <>
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:inline" />
                                <span>Hours: <strong className="font-bold text-slate-800">{job.hours}</strong></span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-black/5 sm:border-0 pt-4 sm:pt-0">
                          <span className="text-xs font-mono font-black text-primary uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            {isExpanded ? "Close Details" : "View Details"}
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </span>
                        </div>
                      </div>

                      {/* Accordion Expandable Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-black/5 bg-[#FAFBFD]"
                          >
                            <div className="p-6 sm:p-8 space-y-6 text-sm">
                              {/* Meta specs */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-black/5">
                                {job.qualification && (
                                  <div>
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Min. Qualification Required</span>
                                    <span className="font-semibold text-xs text-[#1a1a2e] block mt-1">{job.qualification}</span>
                                  </div>
                                )}
                                {job.tools && (
                                  <div>
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Required Tools</span>
                                    <span className="font-mono text-xs text-primary font-bold block mt-1">{job.tools.join(" • ")}</span>
                                  </div>
                                )}
                              </div>

                              {/* Responsibilities */}
                              <div className="space-y-3">
                                <h4 className="font-headline text-xs font-black uppercase text-[#1a1a2e] tracking-wider">Key Responsibilities</h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {job.responsibilities.map((resp, rIdx) => (
                                    <li key={rIdx} className="flex gap-2 bg-white p-3 rounded-xl border border-black/5 text-xs text-slate-700 leading-relaxed font-light">
                                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                      <span>{resp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Skills / Offers / Why Join */}
                              {job.skills && (
                                <div className="space-y-3">
                                  <h4 className="font-headline text-xs font-black uppercase text-[#1a1a2e] tracking-wider">Required Skills</h4>
                                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {job.skills.map((skill, sIdx) => (
                                      <li key={sIdx} className="flex gap-2 bg-white p-3 rounded-xl border border-black/5 text-xs text-slate-700 leading-relaxed font-light">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                        <span>{skill}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {job.offers && (
                                <div className="space-y-3">
                                  <h4 className="font-headline text-xs font-black uppercase text-[#1a1a2e] tracking-wider">What We Offer</h4>
                                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {job.offers.map((offer, oIdx) => (
                                      <li key={oIdx} className="flex gap-2 bg-white p-3 rounded-xl border border-black/5 text-xs text-slate-700 leading-relaxed font-light">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                        <span>{offer}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {job.whyJoin && (
                                <div className="space-y-3">
                                  <h4 className="font-headline text-xs font-black uppercase text-[#1a1a2e] tracking-wider">Why Join Us</h4>
                                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {job.whyJoin.map((wj, wIdx) => (
                                      <li key={wIdx} className="flex gap-2 bg-white p-3 rounded-xl border border-black/5 text-xs text-slate-700 leading-relaxed font-light">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                        <span>{wj}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Action Bar */}
                              <div className="pt-5 border-t border-black/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono">
                                  <span className="flex items-center gap-1"><Mail className="w-4 h-4 text-slate-400" /> {job.contactEmail}</span>
                                  <span className="flex items-center gap-1"><Phone className="w-4 h-4 text-slate-400" /> {job.contactPhone}</span>
                                </div>
                                <button
                                  onClick={() => handleApplyClick(job.title)}
                                  className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-headline text-xs font-black uppercase tracking-widest rounded-xl hover:bg-primary/95 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/10"
                                >
                                  Apply Now <ArrowRight className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* Interactive Application Form */}
        <section ref={formRef} className="max-w-[1440px] mx-auto px-6 md:px-20 py-24 border-t border-black/5 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Job Application</span>
              <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-[#1a1a2e]">
                Submit Your Application
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                Ready to make an impact? Select a position, fill in your details, and provide your resume either by uploading it directly from your computer/mobile or sharing a Google Drive link.
              </p>
              <div className="bg-slate-100 p-5 rounded-2xl border border-black/5 text-xs text-slate-500 space-y-2 leading-relaxed font-light font-mono">
                <p className="font-semibold text-slate-700 flex items-center gap-1.5 font-sans"><AlertCircle className="w-4 h-4 text-primary shrink-0" /> Submission Rules:</p>
                <p>&bull; Allowed formats for device upload: <strong>PDF, DOC, DOCX</strong>.</p>
                <p>&bull; Maximum file size: <strong>4 MB</strong>.</p>
                <p>&bull; If using Google Drive link, set sharing permissions to <strong>&ldquo;Anyone with link can view&rdquo;</strong>.</p>
                <p>&bull; Submissions are securely delivered to <strong>gurujiairlab@gmail.com</strong>.</p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="glass-premium rounded-[3rem] border border-black/5 p-8 sm:p-10 bg-slate-50/50 shadow-xl relative">
                {submitStatus === "success" ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-headline font-black uppercase text-[#1a1a2e]">Application Sent!</h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto font-light">
                      Thank you for applying. Your application was successfully emailed to our recruitment managers. We will review your profile and get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitStatus("idle")}
                      className="mt-4 px-6 py-2 border border-black/10 hover:bg-black/5 rounded-xl text-xs font-mono font-bold uppercase transition-colors"
                    >
                      Apply for Another Position
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-white text-sm focus:outline-none focus:border-primary/45 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-white text-sm focus:outline-none focus:border-primary/45 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="johndoe@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-white text-sm focus:outline-none focus:border-primary/45 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">Position Applied For</label>
                        <select
                          value={selectedJobForForm}
                          onChange={(e) => setSelectedJobForForm(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-white text-sm focus:outline-none focus:border-primary/45 transition-colors"
                        >
                          <option value="MBA HR Intern">MBA HR Intern</option>
                          <option value="Video Editor">Video Editor</option>
                          <option value="AI Instructor">AI Instructor</option>
                          <option value="Artificial Intelligence & Electronics Trainer">Artificial Intelligence & Electronics Trainer</option>
                          <option value="Other (General Talent Pool)">Other (General Talent Pool)</option>
                        </select>
                      </div>
                    </div>

                    {/* Resume submit method tabs */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60 block">Resume Submission Method</label>
                      <div className="flex bg-slate-100 p-1 rounded-xl border border-black/5 w-fit">
                        <button
                          type="button"
                          onClick={() => {
                            setResumeSubmitMethod("file");
                            setFileError(null);
                          }}
                          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                            resumeSubmitMethod === "file"
                              ? "bg-white text-[#1a1a2e] shadow-sm"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          Upload File
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setResumeSubmitMethod("link");
                            setFileError(null);
                          }}
                          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                            resumeSubmitMethod === "link"
                              ? "bg-white text-[#1a1a2e] shadow-sm"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          Provide Link
                        </button>
                      </div>
                    </div>

                    {/* Resume Upload Box */}
                    {resumeSubmitMethod === "file" ? (
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60 block">Upload Resume from Device</label>
                        
                        {resumeFile ? (
                          // File selected UI
                          <div className="flex items-center justify-between p-4 bg-white border border-primary/20 rounded-xl shadow-sm">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className="w-10 h-10 bg-primary/5 text-primary flex items-center justify-center rounded-lg shrink-0">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div className="overflow-hidden">
                                <span className="text-xs font-semibold text-slate-800 block truncate">{resumeFile.name}</span>
                                <span className="text-[10px] text-slate-400 font-mono">Format: {resumeFile.name.split(".").pop()?.toUpperCase()}</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={removeSelectedFile}
                              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-500 transition-colors shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          // Dropzone file selector
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-black/10 bg-white hover:border-primary/45 rounded-2xl p-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 group"
                          >
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                            />
                            <div className="w-10 h-10 bg-slate-50 text-slate-400 group-hover:text-primary group-hover:bg-primary/5 flex items-center justify-center rounded-xl transition-colors">
                              <Upload className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-semibold text-slate-700 block mt-1">Click to select file from device</span>
                            <span className="text-[10px] text-slate-400 font-mono">Supports PDF, DOC, DOCX (Max 4MB)</span>
                          </div>
                        )}
                        
                        {fileError && (
                          <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1 font-medium">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{fileError}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Resume Link Input
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">Resume Link (Google Drive / Public URL)</label>
                        <div className="relative">
                          <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="url"
                            required
                            placeholder="https://drive.google.com/file/d/..."
                            value={formData.resumeLink}
                            onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-black/5 bg-white text-sm focus:outline-none focus:border-primary/45 transition-colors"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">Cover Letter / Message (Optional)</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about yourself, your background, and why you are interested in this position..."
                        value={formData.coverLetter}
                        onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-white text-sm focus:outline-none focus:border-primary/45 transition-colors resize-none"
                      />
                    </div>

                    {submitStatus === "error" && (
                      <p className="text-xs font-mono text-red-500">Something went wrong. Please try again or email us directly at <strong>gurujiairlab@gmail.com</strong>.</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-2xl bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90 font-headline font-black text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-50 text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
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
