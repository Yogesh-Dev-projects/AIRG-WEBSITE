"use client";

import { Navbar } from "@/components/demo-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckoutModal } from "@/components/store/CheckoutModal";
import {
  Cpu, Sprout, Milestone, GraduationCap, Users, ShieldCheck,
  ArrowRight, Lightbulb, MapPin, Award, CheckCircle2, ChevronRight,
  TrendingUp, Globe, FileText, Settings, Calendar, DollarSign, Handshake
} from "lucide-react";

const prathamMedia = [
  { type: "image", url: "/pratham/PHOTO-2026-07-14-20-49-29.jpg" },
  { type: "image", url: "/pratham/PHOTO-2026-07-14-20-49-29 (1).jpg" },
  { type: "image", url: "/pratham/PHOTO-2026-07-14-20-49-30.jpg" },
  { type: "image", url: "/pratham/PHOTO-2026-07-14-20-49-30 (1).jpg" },
  { type: "image", url: "/pratham/PHOTO-2026-07-14-20-49-30 (2).jpg" },
  { type: "image", url: "/pratham/PHOTO-2026-07-14-20-49-31.jpg" },
  { type: "image", url: "/pratham/PHOTO-2026-07-14-20-49-32.jpg" },
  { type: "image", url: "/pratham/PHOTO-2026-07-14-20-50-11.jpg" },
  { type: "image", url: "/pratham/PHOTO-2026-07-14-20-50-11 (1).jpg" },
  { type: "video", url: "/pratham/VIDEO-2026-07-14-20-47-54.mp4" },
  { type: "video", url: "/pratham/VIDEO-2026-07-14-20-47-55.mp4" },
  { type: "video", url: "/pratham/VIDEO-2026-07-14-20-47-56.mp4" },
];

const PrathamMediaCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % prathamMedia.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + prathamMedia.length) % prathamMedia.length);
  };

  const currentItem = prathamMedia[currentIndex];

  return (
    <div className="w-full max-w-[280px] mt-4 flex flex-col items-center">
      <span className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.15em] mb-2 block w-full text-center">
        ACTIVITY PHOTOS & VIDEOS
      </span>
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-black/10 bg-black/5 shadow-md group">
        <AnimatePresence mode="wait">
          {currentItem.type === "image" ? (
            <motion.img
              key={currentItem.url}
              src={currentItem.url}
              alt={`Pratham Activities ${currentIndex + 1}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover select-none"
            />
          ) : (
            <motion.div
              key={currentItem.url}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <video
                src={currentItem.url}
                controls
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
          {currentIndex + 1} / {prathamMedia.length}
        </div>
      </div>
    </div>
  );
};

export default function GrampanchayatAILabPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<{ name: string; price: number; image?: string; category?: string } | null>(null);

  // States for new interactive components
  const [activeYearTab, setActiveYearTab] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    panchayat: "",
    state: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const names = formData.name.trim().split(" ");
      const firstName = names[0] || "Grampanchayat";
      const lastName = names.slice(1).join(" ") || "Inquirer";

      const payload = {
        firstName,
        lastName,
        email: formData.email,
        subject: `Gram Panchayat Lab Setup Proposal Request`,
        message: `Name: ${formData.name}\nPhone: ${formData.phone}\nGram Panchayat: ${formData.panchayat}\nState: ${formData.state}\n\nMessage/Requirements:\n${formData.message || "Interested in establishing an AI Lab in our Gram Panchayat."}`
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", email: "", panchayat: "", state: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const labImages = [
    "/pratham/PHOTO-2026-07-14-20-49-29.jpg",
    "/pratham/PHOTO-2026-07-14-20-49-30.jpg",
    "/pratham/PHOTO-2026-07-14-20-49-31.jpg",
    "/pratham/PHOTO-2026-07-14-20-49-32.jpg",
    "/pratham/PHOTO-2026-07-14-20-50-11.jpg",
    "/indian_pdet_lab.png"
  ];

  useEffect(() => {
    if (labImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % labImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [labImages.length]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-IN");
  };

  return (
    <main className="bg-[#FAFBFD] min-h-screen text-[#1a1a2e] relative overflow-x-hidden font-sans pt-20">
      <Navbar />

      {/* Decorative Grid and Ambient Glow Objects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-96 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

      {/* Dedicated Hero Section for Dhamner Lab */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 pt-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left relative">
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block rounded-full" />

            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Yashwant Grampanchayat Dhamner
            </span>
            
            <div className="space-y-2">
              <h1 className="font-headline text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[1.0] text-[#1a1a2e]">
                Smart AI Village <br />
                <span className="text-primary text-glow-red">Innovation Center</span>
              </h1>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-lg w-fit border border-black/5 mt-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Taluka: Koregaon, District: Satara, Maharashtra</span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#1a1a2e]/70 font-light leading-relaxed max-w-2xl">
              &ldquo;Transforming Villages into Intelligent Innovation Ecosystems&rdquo; &mdash; empowering rural communities by integrating Artificial Intelligence, Robotics, IoT, and Digital Skills directly into the village ecosystem.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                <Award className="w-4 h-4" />
                <span>Maharashtra's Pioneer AI Village</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1a1a2e]/60 bg-black/5 px-3 py-1.5 rounded-lg border border-black/5 hover:border-black/10 transition-colors">
                <Users className="w-4 h-4" />
                <span>1000+ Beneficiaries Targeted</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-[3.1rem] blur opacity-15" />
            <div className="glass-premium rounded-[3rem] border border-black/5 overflow-hidden p-3 shadow-2xl bg-white/70 relative">
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-900 group">
                <img
                  src={labImages[currentImageIndex]}
                  alt="Dhamner Smart AI Village Innovation Center Setup"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">Dhamner Lab Site</span>
                    <p className="text-sm font-bold text-white font-headline uppercase mt-0.5">Grassroots Innovation Hub</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Objectives Section */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-20 border-t border-black/5">
        <div className="space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Mission Blueprint</span>
            <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-[#1a1a2e]">
              Vision & Objectives
            </h2>
            <p className="text-sm sm:text-base text-[#1a1a2e]/60 font-light leading-relaxed">
              We aim to break technology barriers where they matter most, demonstrating that state-of-the-art technologies belong at the grassroots of our rural communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Develop Future-Ready Students",
                desc: "Equipping young minds in village schools with hands-on coding, computational thinking, and early exposure to AI models.",
                icon: GraduationCap,
                color: "from-red-500/10 to-red-600/5",
                borderColor: "group-hover:border-red-500/30",
                iconColor: "text-red-500"
              },
              {
                title: "Upskill Villagers",
                desc: "Introducing practical technology, digital literacy, and local-language AI assistants to help adults adapt to the digital age.",
                icon: Users,
                color: "from-blue-500/10 to-blue-600/5",
                borderColor: "group-hover:border-blue-500/30",
                iconColor: "text-blue-500"
              },
              {
                title: "Enable Grassroots Innovation",
                desc: "Fostering local, project-based development to build technology aids solving agriculture, resource, and governance issues.",
                icon: Lightbulb,
                color: "from-amber-500/10 to-amber-600/5",
                borderColor: "group-hover:border-amber-500/30",
                iconColor: "text-amber-500"
              },
              {
                title: "Pioneer Smart AI Village",
                desc: "Establishing a replicable model that positions Yashwant Grampanchayat Dhamner as Maharashtra's ideal Smart AI Village.",
                icon: Award,
                color: "from-emerald-500/10 to-emerald-600/5",
                borderColor: "group-hover:border-emerald-500/30",
                iconColor: "text-emerald-500"
              }
            ].map((obj, idx) => {
              const Icon = obj.icon;
              return (
                <div 
                  key={idx} 
                  className={`group bg-gradient-to-br ${obj.color} border border-black/5 rounded-[2rem] p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col ${obj.borderColor}`}
                >
                  <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center ${obj.iconColor} mb-5 shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-headline text-lg font-black uppercase tracking-tight text-[#1a1a2e] mb-2">{obj.title}</h3>
                  <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">{obj.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Structure & Execution Roadmap (3-Year Model) */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-20 border-t border-black/5">
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] rounded-[3.5rem] text-white overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(238,44,60,0.15),transparent_45%)]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

          <div className="p-8 sm:p-12 md:p-16 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-start justify-between mb-12">
              <div className="space-y-4 max-w-2xl text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  Program Structure
                </div>
                <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none">
                  3-Year Execution Model
                </h2>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Our comprehensive, project-based learning model includes <strong>12 workshops per year</strong> (2 days each, 6 dedicated to school students and 6 to villagers), reinforced by continuous onsite support.
                </p>
              </div>

              {/* Tab Toggles */}
              <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl w-full sm:w-auto self-center lg:self-start shrink-0">
                {[1, 2, 3].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setActiveYearTab(yr as 1 | 2 | 3)}
                    className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 ${
                      activeYearTab === yr 
                        ? "bg-primary text-white shadow-md" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Year {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content display with AnimatePresence */}
            <div className="min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeYearTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left"
                >
                  <div className="lg:col-span-7 space-y-6">
                    {activeYearTab === 1 && (
                      <>
                        <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest px-2.5 py-1 bg-primary/10 rounded-md border border-primary/20">
                          Phase 1: Foundation & Adoption Phase
                        </span>
                        <h3 className="font-headline text-2xl sm:text-3xl font-black uppercase">Establishing Basic Digital Literacy & Awareness</h3>
                        <p className="text-sm text-white/75 font-light leading-relaxed">
                          The launch phase focuses on introducing physical computing, AI literacy, and precision sensors. We build excitement and establish regular attendance patterns among students and village groups.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div className="flex items-start gap-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-xs font-bold font-mono text-white uppercase">12 PBL Workshops</h4>
                              <p className="text-[11px] text-white/50 font-light mt-0.5">Fully sponsored & FREE of charge to build initial community adoption.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-xs font-bold font-mono text-white uppercase">Dedicated Instructor</h4>
                              <p className="text-[11px] text-white/50 font-light mt-0.5">Onsite technology specialist available 2 full days per week for guidance.</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeYearTab === 2 && (
                      <>
                        <span className="text-xs font-mono font-bold text-[#4ade80] uppercase tracking-widest px-2.5 py-1 bg-[#4ade80]/15 rounded-md border border-[#4ade80]/20">
                          Phase 2: Skill Development Phase
                        </span>
                        <h3 className="font-headline text-2xl sm:text-3xl font-black uppercase">Deep Dive into Advanced Technical Engineering</h3>
                        <p className="text-sm text-white/75 font-light leading-relaxed">
                          Students transition from block visual coding to real microcontroller integration, robotics assembly, and basic wireless sensor telemetry. Villagers are trained in advanced utility apps and AI workflow aids.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div className="flex items-start gap-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <CheckCircle2 className="w-5 h-5 text-[#4ade80] shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-xs font-bold font-mono text-white uppercase">Advanced Curriculum</h4>
                              <p className="text-[11px] text-white/50 font-light mt-0.5">Hands-on drone simulators, automation rules, and basic electronics logic.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <CheckCircle2 className="w-5 h-5 text-[#4ade80] shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-xs font-bold font-mono text-white uppercase">Real-World Projects</h4>
                              <p className="text-[11px] text-white/50 font-light mt-0.5">Applying coding and telemetry to solve actual challenges in local fields.</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeYearTab === 3 && (
                      <>
                        <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest px-2.5 py-1 bg-blue-400/10 rounded-md border border-blue-400/20">
                          Phase 3: Innovation & Sustainability Phase
                        </span>
                        <h3 className="font-headline text-2xl sm:text-3xl font-black uppercase">Fostering Local Startups & Self-Sufficiency</h3>
                        <p className="text-sm text-white/75 font-light leading-relaxed">
                          The final phase focuses on handing operations over to local leaders. Youth apply their robotics and data logic skills to seek vocational opportunities, build custom community tools, and maintain the lab independently.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div className="flex items-start gap-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-xs font-bold font-mono text-white uppercase">Livelihood & Careers</h4>
                              <p className="text-[11px] text-white/50 font-light mt-0.5">Certifications and digital skill pathways targeting regional tech jobs.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-xs font-bold font-mono text-white uppercase">Community Ownership</h4>
                              <p className="text-[11px] text-white/50 font-light mt-0.5">Establishing independent committees for lab maintenance and events.</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Highlights checklist side-cards */}
                  <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-4">
                    <h4 className="text-xs font-mono font-black uppercase text-primary tracking-wider">Curriculum Focus Areas</h4>
                    <ul className="space-y-3">
                      {[
                        { title: "AI & Digital Literacy", desc: "Understanding prompts, searching, and regional LLM engines." },
                        { title: "Robotics & Automation", desc: "Solderless breadboards, sensors, motors, and controllers." },
                        { title: "Practical Innovation Projects", desc: "Telemetry tracking, weather nodes, and automated systems." }
                      ].map((item, idx) => (
                        <li key={idx} className="flex gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-[10px] font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">{item.title}</span>
                            <span className="text-[10px] text-white/50 font-light">{item.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars of Grampanchayat AI Labs */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-16 text-left">
        <div className="space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Empowering Rural Minds</span>
            <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-[#1a1a2e]">
              How AIRG Teaches Children & Opens AI Labs in Villages
            </h2>
            <p className="text-sm sm:text-base text-[#1a1a2e]/60 font-light leading-relaxed max-w-3xl">
              By setting up physical AI and Robotics Labs inside Gram Panchayats, AIRG is bringing cutting-edge technology directly to rural schools. We empower local students with practical coding, hardware engineering, and automation skills to solve regional challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-black/5 hover:border-primary/20 p-6 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-lg font-black uppercase tracking-tight text-[#1a1a2e] mb-2">Bharat AI Engine</h3>
              <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">
                Rural kids interact with the Bharat AI Engine, learning generative AI concepts, coding logic, and regional language translation offline without requiring high-speed internet.
              </p>
            </div>

            <div className="bg-white border border-black/5 hover:border-primary/20 p-6 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-lg font-black uppercase tracking-tight text-[#1a1a2e] mb-2">Robotics & Robots</h3>
              <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">
                Students construct physical robots, wire microcontrollers like Arduino, and program smart motors to build automation models like automatic streetlights.
              </p>
            </div>

            <div className="bg-white border border-black/5 hover:border-primary/20 p-6 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-lg font-black uppercase tracking-tight text-[#1a1a2e] mb-2">Drones & Aviation</h3>
              <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">
                Introducing kids to aerodynamics, model glider assembly, and smart flight controllers. Students simulate drone mapping and crop survey runs.
              </p>
            </div>

            <div className="bg-white border border-black/5 hover:border-primary/20 p-6 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-lg font-black uppercase tracking-tight text-[#1a1a2e] mb-2">Hands-on IoT</h3>
              <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">
                Teaching kids how to interface soil moisture, weather sensors, and solar telemetry kits to build real precision farming aids for their own family fields.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rural AI Infrastructure Kit Showcase */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-20 border-t border-black/5 text-left bg-gradient-to-b from-transparent to-[#FAFBFD]">
        <div className="space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Physical Objects & Hardware</span>
            <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-[#1a1a2e]">
              Rural AI Infrastructure Kit
            </h2>
            <p className="text-sm sm:text-base text-[#1a1a2e]/60 font-light leading-relaxed max-w-3xl">
              Inside the Dhamner Smart AI Village Innovation Center, kids get hands-on access to custom hardware built specifically for offline, durable educational use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Object 1 */}
            <div className="group relative overflow-hidden rounded-[3rem] border border-black/5 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:border-primary/20 flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[2rem] overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-md border border-black/5 bg-slate-950 relative">
                <img
                  src="/extracted-images/bharat_ai_server.png"
                  alt="Bharat AI Engine Hardware"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">Offline Server Node</span>
                </div>
                <h3 className="font-headline text-xl font-black uppercase text-[#1a1a2e] group-hover:text-primary transition-colors">Bharat AI Engine™</h3>
                <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">
                  A high-durability local edge host serving interactive LMS, generative AI chat, and regional language models without requiring active internet connectivity.
                </p>
                <ul className="text-[11px] text-[#1a1a2e]/70 space-y-1 font-mono">
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Offline LLM Pipeline (Llama/Gemma)</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> MESH Network (Up to 20 client nodes)</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Voice-Activated Regional Translation</li>
                </ul>
              </div>
            </div>

            {/* Object 2 */}
            <div className="group relative overflow-hidden rounded-[3rem] border border-black/5 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:border-primary/20 flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[2rem] overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-md border border-black/5 bg-slate-900 relative">
                <img
                  src="/lab-robotics.png"
                  alt="AIR Robotics Base Board"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-500 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10">Tactile Assembly</span>
                </div>
                <h3 className="font-headline text-xl font-black uppercase text-[#1a1a2e] group-hover:text-blue-500 transition-colors">AIR Robotics Base Boards</h3>
                <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">
                  Tactile block connectors, microcontrollers (Arduino/Raspberry Pi compatible), smart stepper motor modules, and sensors for building autonomous robots.
                </p>
                <ul className="text-[11px] text-[#1a1a2e]/70 space-y-1 font-mono">
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Solderless Kids-Safe Connections</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Dual Arduino & Raspberry Pi Support</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Multi-Servo & Active Sensor Ports</li>
                </ul>
              </div>
            </div>

            {/* Object 3 */}
            <div className="group relative overflow-hidden rounded-[3rem] border border-black/5 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:border-primary/20 flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[2rem] overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-md border border-black/5 bg-slate-900 relative">
                <img
                  src="/lab-drone.png"
                  alt="Aviation Drone Kit"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-purple-500 bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/10">Aero Simulator</span>
                </div>
                <h3 className="font-headline text-xl font-black uppercase text-[#1a1a2e] group-hover:text-purple-500 transition-colors">Aviation & Flight Kits</h3>
                <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">
                  Aerodynamic wing configurations, high-density foam model gliders, and smart miniature flight controller boards to teach kids structural design and survey math.
                </p>
                <ul className="text-[11px] text-[#1a1a2e]/70 space-y-1 font-mono">
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Lightweight Aerodynamic Foam Gliders</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Wireless Flight Telemetry Tracking</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Rudder & Surface Servo Configurations</li>
                </ul>
              </div>
            </div>

            {/* Object 4 */}
            <div className="group relative overflow-hidden rounded-[3rem] border border-black/5 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:border-primary/20 flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[2rem] overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-md border border-black/5 bg-slate-950 relative">
                <img
                  src="/iot-kit.png"
                  alt="Smart Electronics & IoT Kit"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">Smart IoT Module</span>
                </div>
                <h3 className="font-headline text-xl font-black uppercase text-[#1a1a2e] group-hover:text-emerald-500 transition-colors">Smart Electronics & IoT</h3>
                <p className="text-xs text-[#1a1a2e]/60 font-light leading-relaxed">
                  Introducing kids to basic microelectronics, circuit prototyping, and programming wireless telemetry sensors to monitor and automate real-world environments.
                </p>
                <ul className="text-[11px] text-[#1a1a2e]/70 space-y-1 font-mono">
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Basic Circuit & Microelectronics Design</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Wireless Telemetry (Wi-Fi/Bluetooth Modules)</li>
                  <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Smart Automation & Environment Monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Roles & Responsibilities Section */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-20 border-t border-black/5 text-left">
        <div className="space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Cooperative Framework</span>
            <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-[#1a1a2e]">
              Roles & Responsibilities
            </h2>
            <p className="text-sm text-[#1a1a2e]/60 font-light leading-relaxed">
              We operate under a clear division of duties between the AIR G International team and the Local Gram Panchayat to ensure efficient delivery and sustainable support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AIR G International */}
            <div className="bg-white border border-black/5 p-8 rounded-[2.5rem] shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary shadow-sm shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-black uppercase tracking-tight text-[#1a1a2e]">AIR G International</h3>
                  <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-wider">Technology Partner</span>
                </div>
              </div>
              
              <ul className="space-y-3">
                {[
                  "Complete setup of the Smart AI Village Innovation Center",
                  "Provision of the hardware and tech tools ecosystem",
                  "Assigning and managing the local Technology Instructor",
                  "Instructor coordination, training, and ongoing quality control",
                  "Travel and accommodation costs for workshop experts",
                  "Continuous program execution, review, and telemetry monitoring"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs text-slate-700 font-light items-start">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gram Panchayat */}
            <div className="bg-white border border-black/5 p-8 rounded-[2.5rem] shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4ade80]/20 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                  <Handshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-black uppercase tracking-tight text-[#1a1a2e]">Gram Panchayat</h3>
                  <span className="text-[9px] font-mono text-emerald-600 font-bold uppercase tracking-wider">Local Administration</span>
                </div>
              </div>

              <ul className="space-y-3">
                {[
                  "Allocation of designated physical space for the Innovation Center",
                  "Arranging local accommodation and food for workshop experts",
                  "Mobilizing school students and local villagers for training modules",
                  "Facilitating necessary power supplies and local administrative approvals",
                  "Actively supporting operations for smooth day-to-day execution"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 text-xs text-slate-700 font-light items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Outcomes & Impact Vision Section */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-20 border-t border-black/5 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Impact Vision</span>
            <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-[#1a1a2e]">
              Key Outcomes & Long-Term Goals
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              This initiative is structured to turn Dhamner into a self-reliant tech hub, creating Maharashtra&apos;s first-ever model AI village and introducing future-ready careers to the rural youth.
            </p>

            <div className="space-y-4">
              {[
                { title: "Digital + AI Learning Hub", desc: "A vibrant center where students, teachers, and farmers learn side-by-side." },
                { title: "Rural Innovation Center", desc: "Developing localized software and sensor solutions to meet village needs." },
                { title: "Self-Sustainable Model", desc: "A program designed to run independently under local guidance by Year 3." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-slate-50 border border-black/5 rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs font-mono shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1a1a2e]">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 font-light mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-black/5 p-6 rounded-3xl shadow-sm space-y-1">
              <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-wider bg-primary/5 px-2 py-0.5 rounded">Trained Users</span>
              <div className="text-3xl font-black font-headline text-[#1a1a2e] mt-2">1,000+</div>
              <p className="text-[10px] text-slate-500 font-light">Active students and villagers completing learning workshops.</p>
            </div>
            
            <div className="bg-white border border-black/5 p-6 rounded-3xl shadow-sm space-y-1">
              <span className="text-[9px] font-mono text-[#4ade80] font-bold uppercase tracking-wider bg-[#4ade80]/10 px-2 py-0.5 rounded">Skill Level</span>
              <div className="text-3xl font-black font-headline text-slate-900 mt-2">AI-Ready</div>
              <p className="text-[10px] text-slate-500 font-light">Rural youth trained directly on local edge servers & code pipelines.</p>
            </div>

            <div className="bg-white border border-black/5 p-6 rounded-3xl shadow-sm space-y-1">
              <span className="text-[9px] font-mono text-[#4ade80] font-bold uppercase tracking-wider bg-[#4ade80]/10 px-2 py-0.5 rounded">Sensors</span>
              <div className="text-3xl font-black font-headline text-slate-900 mt-2">Active</div>
              <p className="text-[10px] text-slate-500 font-light">Soil and environmental telemetry active in local village fields.</p>
            </div>

            <div className="bg-white border border-black/5 p-6 rounded-3xl shadow-sm space-y-1">
              <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-wider bg-primary/5 px-2 py-0.5 rounded">Benchmark</span>
              <div className="text-3xl font-black font-headline text-primary mt-2">Model AI</div>
              <p className="text-[10px] text-slate-500 font-light">Recognized as Maharashtra's ideal Smart AI Village.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grassroots Activity Gallery Section */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-24 border-t border-black/5 text-left bg-gradient-to-b from-transparent to-slate-50/50">
        <div className="space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Grassroots Showcase</span>
            <h2 className="font-headline text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none text-[#1a1a2e]">
              Rural Lab Activity Gallery
            </h2>
            <p className="text-sm text-[#1a1a2e]/55 font-light leading-relaxed">
              Real-world documentation of children, mentors, and local leaders collaborating, creating, and learning in our Grampanchayat AI Labs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "/pratham/PHOTO-2026-07-14-20-49-29.jpg",
              "/pratham/PHOTO-2026-07-14-20-49-29 (1).jpg",
              "/pratham/PHOTO-2026-07-14-20-49-30.jpg",
              "/pratham/PHOTO-2026-07-14-20-49-30 (1).jpg",
              "/pratham/PHOTO-2026-07-14-20-49-30 (2).jpg",
              "/pratham/PHOTO-2026-07-14-20-49-31.jpg",
              "/pratham/PHOTO-2026-07-14-20-49-32.jpg",
              "/pratham/PHOTO-2026-07-14-20-50-11.jpg",
              "/pratham/PHOTO-2026-07-14-20-50-11 (1).jpg"
            ].map((img, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-[2.5rem] border border-black/5 bg-white p-2.5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-slate-900">
                  <img
                    src={img}
                    alt={`Rural Lab Activity ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: OUR NGO PARTNERS */}
      <section className="relative z-10 w-full bg-[#f8fafc] border-y border-black/5 py-24 text-left">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Grassroots Collaborations</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-[#1a1a2e] uppercase tracking-tighter leading-none mt-2">
              OUR NGO <span className="text-primary text-glow-red">PARTNERS</span>
            </h2>
            <p className="text-sm md:text-base text-[#1a1a2e]/55 font-light leading-relaxed max-w-2xl mx-auto">
              Partnering with leading organizations to deliver digital literacy, AI labs, and STEM education to rural communities.
            </p>
          </div>

          <div className="flex flex-col items-center gap-12 max-w-6xl mx-auto">
            {/* Row 1: Pratham */}
            <div className="w-full max-w-5xl flex justify-center">
              <div className="relative bg-gradient-to-br from-slate-50 to-white p-8 md:p-12 rounded-[2.5rem] border border-black/5 shadow-xl w-full overflow-hidden text-left">
                
                {/* Top Tagline */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-black/5">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-mono font-black text-[#1a1a2e] uppercase tracking-widest">Featured Strategic Partnership</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                  
                  {/* Left Column: Logo & Stats */}
                  <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-3 w-full">
                    <span className="text-[11px] font-mono font-extrabold text-primary uppercase tracking-[0.15em] text-center max-w-[280px] block w-full">
                      STEAM & TECHNOLOGY PARTNER
                    </span>
                    <div className="w-full aspect-square max-w-[280px] flex items-center justify-center p-6 bg-white rounded-3xl border-2 border-primary shadow-md hover:shadow-lg transition-all duration-300">
                      <img 
                        src="/logos/prratham_logo_original.webp" 
                        alt="Pratham Logo" 
                        className="max-w-full max-h-full object-contain scale-105"
                      />
                    </div>
                    <PrathamMediaCarousel />
                  </div>

                  {/* Right Column: Detailed Info */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="space-y-4 text-[#1a1a2e]/75 font-body text-sm leading-relaxed">
                      <p>
                        <strong>AIR G International</strong> is proud to partner with <strong>Pratham</strong> as its AI, STEAM, Robotics, and Emerging Technology Partner. This collaboration brings together Pratham&apos;s extensive educational reach and commitment to improving learning outcomes with AIR G International&apos;s expertise in future-ready technologies.
                      </p>
                      <p>
                        Together, we are empowering the next generation through hands-on, project-based learning in Artificial Intelligence (AI), Robotics, Coding, Internet of Things (IoT), Drone Technology, 3D Printing, Virtual Reality (VR), Electronics, and Design Thinking. Through this partnership, more than 10,000 students across India have already been introduced to emerging technologies, fostering innovation, critical thinking, creativity, and problem-solving skills that prepare them for the future workforce.
                      </p>
                      <p className="text-xs text-[#1a1a2e]/70 leading-relaxed border-l-2 border-primary/20 pl-4">
                        Pratham is one of the largest and most successful non-governmental organizations (NGOs) in India, specifically focusing on education. Operating across more than 25 states and union territories, it reaches and supports millions of children and youth annually through literacy, elementary education, and skill-building.
                      </p>
                    </div>

                    {/* Key Highlights Grid */}
                    <div className="pt-6 border-t border-black/5">
                      <h4 className="text-xs font-mono font-black text-[#1a1a2e] uppercase tracking-widest mb-4">Key Highlights</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm space-y-1">
                          <span className="text-[10px] font-mono text-primary font-black uppercase tracking-wider block">Reach</span>
                          <p className="text-xs text-[#1a1a2e]/60 font-light leading-normal">Impacts over 6-7 million children and young adults every year.</p>
                        </div>
                        <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm space-y-1">
                          <span className="text-[10px] font-mono text-primary font-black uppercase tracking-wider block">History</span>
                          <p className="text-xs text-[#1a1a2e]/60 font-light leading-normal">Established in 1995 in Mumbai to provide pre-school education in slums.</p>
                        </div>
                        <div className="bg-white border border-black/5 rounded-2xl p-4 shadow-sm space-y-1">
                          <span className="text-[10px] font-mono text-primary font-black uppercase tracking-wider block">Programs</span>
                          <p className="text-xs text-[#1a1a2e]/60 font-light leading-normal">Known for remedial learning (Read India) and the ASER report.</p>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* Row 2: Remaining 4 Partners */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
              {[
                { 
                  name: "Pravich Welfare Foundation", 
                  logo: "/logos/pravich_logo.png",
                  desc: "Focuses on rural digital literacy, youth skill development, and community welfare initiatives."
                },
                { 
                  name: "Sunjyot Bahuuddeshiya Sanstha", 
                  logo: "/logos/sanjyot_logo.png",
                  desc: "Supports elementary education assistance, social support programs, and rural vocational training." 
                },
                { 
                  name: "Suprabhat Mahila Mandal", 
                  logo: "/logos/suprabhat_logo.png",
                  desc: "Dedicated to empowering women, child welfare projects, and conducting rural health awareness camps."
                },
                { 
                  name: "Yashwant Bahuuddeshiya Samajik Sanstha", 
                  logo: "/logos/yashwant_logo.png",
                  desc: "Promotes rural development, environmental preservation campaigns, and youth guidance seminars."
                }
              ].map((ngo, idx) => (
                <div key={idx} className="group relative bg-white p-6 rounded-[2rem] border border-primary/20 hover:border-primary/50 hover:shadow-lg transition-all duration-500 flex flex-col items-center text-center">
                  <div className="w-32 h-32 flex items-center justify-center p-2 bg-slate-50 rounded-2xl border border-black/5 mb-4 group-hover:scale-105 transition-transform duration-300 shrink-0 shadow-sm">
                    <img 
                      src={ngo.logo} 
                      alt={ngo.name} 
                      className="max-w-[90%] max-h-[90%] object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src.includes(".jpg")) {
                          target.src = target.src.replace(".jpg", ".png");
                        } else if (target.src.includes(".png")) {
                          target.src = target.src.replace(".png", ".jpg");
                        }
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-headline text-lg font-black text-[#1a1a2e] uppercase tracking-tight">{ngo.name}</h4>
                    <p className="text-xs text-[#1a1a2e]/55 font-light leading-relaxed">
                      {ngo.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Establish Lab Contact CTA Section */}
      <section className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-20 py-24 border-t border-black/5 text-left bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-black text-primary uppercase tracking-widest">Bring AI to Your Village</span>
            <h2 className="font-headline text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-[#1a1a2e]">
              Start an AI Lab in Your Gram Panchayat
            </h2>
            <p className="text-sm text-[#1a1a2e]/60 font-light leading-relaxed">
              Are you an administrator, panchayat member, or community leader looking to establish a state-of-the-art AI & Robotics Lab? 
            </p>
            <p className="text-xs text-[#1a1a2e]/55 font-light leading-relaxed">
              Submit your request, and our development team will prepare a customized setup proposal, feasibility report, and implementation schedule for your local administration.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-premium rounded-[3rem] border border-black/5 p-8 sm:p-10 bg-slate-50/50 shadow-xl relative">
              {submitStatus === "success" ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a2e]">Request Received!</h3>
                  <p className="text-sm text-[#1a1a2e]/60 max-w-md mx-auto">
                    Thank you! Our community development specialists will review your panchayat proposal and contact you via email or phone shortly.
                  </p>
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
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">Gram Panchayat Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shirwal Panchayat"
                        value={formData.panchayat}
                        onChange={(e) => setFormData({ ...formData, panchayat: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-white text-sm focus:outline-none focus:border-primary/45 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">State / Region</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maharashtra"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-white text-sm focus:outline-none focus:border-primary/45 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="admin@panchayat.gov.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-white text-sm focus:outline-none focus:border-primary/45 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1a1a2e]/60">Requirements / Message (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Any specific school names, student counts, or special requests..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-black/5 bg-white text-sm focus:outline-none focus:border-primary/45 transition-colors resize-none"
                    />
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-xs font-mono text-red-500">Something went wrong. Please try again or email us directly.</p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-grow py-4 px-6 rounded-2xl bg-[#1a1a2e] text-white hover:bg-[#1a1a2e]/90 font-bold text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-50 text-center"
                    >
                      {isSubmitting ? "Submitting..." : "Submit via Email"}
                    </button>
                    
                    <a
                      href="https://wa.me/919860779172?text=Hello%2C%20I%20am%20interested%20in%20establishing%20an%20AIR%20G%20AI%20Lab%20in%20our%20Gram%20Panchayat.%20Please%20share%20the%20details%20and%20proposal."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow py-4 px-6 rounded-2xl bg-[#25D366] text-white hover:bg-[#20ba56] font-bold text-xs uppercase tracking-widest transition-all duration-300 text-center flex items-center justify-center gap-2 hover:scale-[1.02]"
                      style={{ color: '#ffffff' }}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Chat on WhatsApp
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Print receipt template (hidden on screen) */}
      <div id="pdet-receipt-print-root" className="hidden print:block p-8 bg-white max-w-[800px] mx-auto">
        <style dangerouslySetInnerHTML={{
          __html: `
          @media print {
            body {
              background: white !important;
              color: black !important;
            }
            #pdet-receipt-print-root {
              display: block !important;
              color: black !important;
              font-family: Arial, Helvetica, sans-serif !important;
              font-size: 11px !important;
              line-height: 1.5 !important;
            }
            #pdet-receipt-print-root * {
              color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        `}} />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '3px solid #EE2C3C', paddingBottom: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#EE2C3C', letterSpacing: '-0.5px' }}>AIR G INTERNATIONAL</div>
            <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Yashwant Grampanchayat Dhamner Setup Proposal</div>
            <div style={{ fontSize: '10px', color: '#666' }}>Official 3-Year Infrastructure & Operations Cost Estimate</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#333' }}>ESTIMATE / PROPOSAL</div>
            <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Date: {new Date().toLocaleDateString("en-IN")}</div>
          </div>
        </div>

        {/* Infrastructure Cost */}
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#EE2C3C', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '8px' }}>
            1. Infrastructure Setup Cost (One-Time)
          </div>
          <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '6px 0', color: '#333' }}>Smart AI Village Innovation Center Setup</td>
                <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>₹{formatCurrency(650000)}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '6px 0', color: '#333' }}>GST (18%)</td>
                <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>₹{formatCurrency(117000)}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', color: '#333', fontWeight: 700 }}>Total Setup Cost</td>
                <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 700, color: '#EE2C3C' }}>₹{formatCurrency(767000)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Operational Cost */}
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#EE2C3C', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '8px' }}>
            2. Year-wise Operational Cost
          </div>
          <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <th style={{ textAlign: 'left', paddingBottom: '6px', color: '#555' }}>Year</th>
                <th style={{ textAlign: 'left', paddingBottom: '6px', color: '#555' }}>Workshops Cost</th>
                <th style={{ textAlign: 'left', paddingBottom: '6px', color: '#555' }}>Instructor Cost</th>
                <th style={{ textAlign: 'left', paddingBottom: '6px', color: '#555' }}>GST (18%)</th>
                <th style={{ textAlign: 'right', paddingBottom: '6px', color: '#555' }}>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '6px 0', color: '#333' }}>Year 1</td>
                <td style={{ padding: '6px 0', color: '#333' }}>₹0 (Sponsored)</td>
                <td style={{ padding: '6px 0', color: '#333' }}>₹2,40,000</td>
                <td style={{ padding: '6px 0', color: '#333' }}>₹43,200</td>
                <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>₹2,83,200</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '6px 0', color: '#333' }}>Year 2</td>
                <td style={{ padding: '6px 0', color: '#333' }}>₹60,000</td>
                <td style={{ padding: '6px 0', color: '#333' }}>₹2,40,000</td>
                <td style={{ padding: '6px 0', color: '#333' }}>₹54,000</td>
                <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>₹3,54,000</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '6px 0', color: '#333' }}>Year 3</td>
                <td style={{ padding: '6px 0', color: '#333' }}>₹60,000</td>
                <td style={{ padding: '6px 0', color: '#333' }}>₹2,40,000</td>
                <td style={{ padding: '6px 0', color: '#333' }}>₹54,000</td>
                <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>₹3,54,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Grand Total */}
        <div style={{ marginTop: '24px', borderTop: '3px solid #EE2C3C', paddingTop: '20px' }}>
          <table style={{ width: '100%', fontSize: '12px' }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, fontSize: '16px', color: '#111' }}>3-YEAR PROJECT GRAND TOTAL</td>
                <td style={{ textAlign: 'right', fontWeight: 900, fontSize: '28px', color: '#EE2C3C', letterSpacing: '-1px' }}>
                  ₹{formatCurrency(1758200)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          item={checkoutItem}
        />
      )}
    </main>
  );
}
