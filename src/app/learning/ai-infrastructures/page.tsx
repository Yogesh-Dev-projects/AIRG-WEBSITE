"use client";

import { Navbar } from "@/components/demo-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckoutModal } from "@/components/store/CheckoutModal";
import Link from "next/link";

export default function AIInfrastructuresB2BPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    email: "",
    phone: "",
    requirements: ""
  });

  const [zones, setZones] = useState([
    {
      name: "Bharat AI Engine",
      icon: "dns",
      image: "/extracted-images/bharat_ai_engine_v4.png",
      description: "BHARAT AI ENGINE™ is a device-grade Edge AI infrastructure system designed to convert existing computers into a full-fledged AI Ecosystem — without replacing computers, without cloud dependency, and without complex installations. It operates as a central AI engine that delivers real-time artificial intelligence capabilities to multiple computers simultaneously over a local network.",
      stats: { type: "Edge AI", network: "Local MESH", setup: "Zero Cloud" },
      items: [
        { name: "BHARAT AI ENGINE™ Edge Node (Includes SIA Private Workspace)", qty: 0, unitCost: 150000, isLot: false },
        { name: "Dedicated GPU Compute Accelerator (Ampere/Orin)", qty: 0, unitCost: 65000, isLot: false },
        { name: "High-Speed Local Hub Router & Connectors", qty: 0, unitCost: 15000, isLot: false },
        { name: "Offline LLM Models & AI Pipeline Packages (SIA Interface)", qty: 0, unitCost: 50000, isLot: true }
      ]
    }
  ]);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<{ name: string; price: number; image?: string; category?: string } | null>(null);

  // Lightbox and Media States
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>("");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const BHARAT_AI_3_PHOTOS = [
    "/intl_student_1.jpg",
    "/intl_student_2.jpg",
    "/images/bharat-ai-3/PHOTO-2026-07-15-11-22-57.jpg",
    "/images/bharat-ai-3/PHOTO-2026-07-15-11-30-26.jpg",
    "/images/bharat-ai-3/PHOTO-2026-07-15-11-31-39.jpg",
    "/images/bharat-ai-3/PHOTO-2026-07-15-11-31-39(1).jpg",
    "/images/bharat-ai-3/PHOTO-2026-07-15-11-35-37.jpg",
    "/images/bharat-ai-3/PHOTO-2026-07-15-11-35-37(1).jpg",
    "/images/bharat-ai-3/PHOTO-2026-07-15-11-35-37(2).jpg"
  ];

  const updateQuantity = (zoneIdx: number, itemIdx: number, delta: number) => {
    setZones(prevZones => {
      const newZones = JSON.parse(JSON.stringify(prevZones));
      const item = newZones[zoneIdx].items[itemIdx];
      item.qty = Math.max(0, item.qty + delta);
      return newZones;
    });
  };

  const calculateZoneTotal = (zoneIdx: number) => {
    return zones[zoneIdx].items.reduce((sum, item) => sum + (item.qty * item.unitCost), 0);
  };

  const calculateGrandTotal = () => {
    return zones.reduce((sum, _, zoneIdx) => sum + calculateZoneTotal(zoneIdx), 0);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-IN");
  };

  useEffect(() => {
    fetch("/api/copy-pdet-image").catch(() => { });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const names = formData.name.trim().split(" ");
      const firstName = names[0] || "B2B";
      const lastName = names.slice(1).join(" ") || "Partner";

      const payload = {
        firstName,
        lastName,
        email: formData.email,
        subject: `B2B Lab Request: ${formData.institution}`,
        message: `Institution: ${formData.institution}\nPhone: ${formData.phone}\n\nRequirements:\n${formData.requirements || "None specified."}`
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", institution: "", email: "", phone: "", requirements: "" });
      } else {
        setSubmitStatus("error");
        alert("Failed to submit request: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white selection:bg-primary/20 selection:text-primary overflow-x-hidden text-[#1a1a2e] font-sans">
      <Navbar />

      <div id="pdet-page-content-wrapper" className="print:hidden overflow-x-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(238,44,60,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(238,44,60,0.015)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="absolute top-[10%] left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[30%] right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[180px] pointer-events-none" />


      {/* Hero Section */}
      <div className="pt-36 pb-12 relative overflow-hidden bg-gradient-to-b from-[#f8f8fb] via-white to-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">

            {/* Left Column: Big Bold Typography */}
            <div className="w-full lg:w-[50%] text-left shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Institutional Collaboration
              </motion.div>

              <div className="relative mb-8 text-left">
                {/* Subtle Ambient Red Glow */}
                <div className="absolute -left-6 -top-6 w-96 h-48 bg-[#EE2C3C]/10 rounded-full blur-[100px] pointer-events-none" />

                <h1 className="font-headline tracking-tighter leading-[0.93] uppercase text-left text-[#0a0a14] relative z-10 space-y-1">
                  {/* Line 1: BUILD AI */}
                  <div className="overflow-hidden py-1">
                    <motion.span
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="block text-4xl sm:text-6xl lg:text-[72px] font-black"
                    >
                      BUILD <span className="text-[#EE2C3C]">AI</span>
                    </motion.span>
                  </div>

                  {/* Line 2: INFRASTRUCTURE */}
                  <div className="overflow-hidden py-1">
                    <motion.span
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                      className="block text-3xl sm:text-5xl lg:text-[58px] font-black text-[#0a0a14] tracking-[-0.05em]"
                    >
                      INFRASTRUCTURE
                    </motion.span>
                  </div>

                  {/* Line 3: AT YOUR PREMISES */}
                  <div className="overflow-hidden py-1">
                    <motion.span
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                      className="block text-3xl sm:text-5xl lg:text-[62px] font-black text-[#EE2C3C] tracking-tight"
                    >
                      AT YOUR PREMISES
                    </motion.span>
                  </div>
                </h1>
              </div>

              <div className="overflow-hidden mb-10 max-w-xl">
                <motion.p
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                  className="text-xl text-[#1a1a2e]/60 font-medium leading-relaxed text-left"
                >
                  Equip your college, university, or corporate campus with state-of-the-art AI infrastructure centered around the Bharat AI Engine, designed to future-proof your students and workforce with next-generation AI capabilities.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => document.getElementById("proposal-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-10 py-4 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#d42535] transition-all duration-300 shadow-lg shadow-primary/25 hover:scale-[1.03] active:scale-95"
                >
                  Get A Proposal
                </button>
                <button
                  onClick={() => document.getElementById("facility-showcase")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-10 py-4 bg-[#1a1a2e] text-white font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-[#252542] transition-all duration-300 shadow-lg shadow-black/10 hover:scale-[1.03] active:scale-95"
                >
                  Setup Configurator
                </button>
              </motion.div>
            </div>

            {/* Right Column: Dynamic Abstract Layout (Larger Picture) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-[50%] relative shrink-0"
            >
              <div className="relative p-[2px] rounded-[2.5rem] bg-gradient-to-tr from-blue-600/30 via-blue-400/10 to-cyan-500/40 shadow-2xl hover:scale-[1.01] transition-transform duration-500">
                <div className="aspect-[1536/871] rounded-[2.4rem] overflow-hidden relative bg-white border border-black/5">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent mix-blend-overlay z-10 pointer-events-none" />
                  <img
                    src="/extracted-images/bharat_ai_engine_v4.png"
                    alt="Bharat AI Engine"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Visual Section Divider */}
      <div className="w-full relative z-20 my-6">
        <div className="w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent h-[2px]"></div>
      </div>

      {/* ========== SECTION: THREE POWERFUL EDITIONS (Slide 5) ========== */}
      <div className="pt-20 pb-24 bg-white relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">


          <div className="text-center mb-16 space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-[0.2em]">
              OUR SOLUTIONS
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] tracking-tight uppercase font-headline">
              Three Powerful Editions. <span className="text-primary">One Secure Ecosystem.</span>
            </h2>
            <p className="text-[#1a1a2e]/55 text-lg font-medium max-w-3xl mx-auto">
              Custom-built setups optimized for education, institutes, and industry deployment.
            </p>
          </div>

          {/* 3-Column Detailed Editions Grid (Bharat AI 1.0, 2.0, 3.0) */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-[1500px] mx-auto text-left mt-8">
            {/* Bharat AI 1.0 - School Edition */}
            <div className="group relative glass-premium p-8 rounded-[2.5rem] border border-black/5 hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(238,44,60,0.08)] bg-white/60 backdrop-blur-md transition-all duration-500 flex flex-col justify-between h-full overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3.5 py-1 bg-red-50 border border-red-200 rounded-full text-[9px] font-black font-mono text-red-700 uppercase tracking-widest">
                    Education Edition
                  </span>
                  <span className="text-sm font-black font-mono text-[#1a1a2e]/30">V1.0</span>
                </div>
                
                <h3 className="font-headline text-2xl font-black text-[#1a1a2e] uppercase tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">
                  Bharat AI 1.0
                </h3>
                <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-[#1a1a2e]/50 mb-6 font-bold">
                  AI Innovation Lab Engine
                </h4>
                
                <p className="text-sm text-[#1a1a2e]/60 leading-relaxed mb-8 font-light">
                  Most suitable for <strong className="font-bold text-[#1a1a2e]">schools and institutes</strong>. An offline-first local system enabling students to access interactive AI chatbots, programming labs, and computer vision models completely without internet.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { label: "Aira Teacher (AI Chatbot)", desc: "Offline conversational AI assistant that talks, listens, and teaches coding/AI in 20+ languages.", icon: "chat" },
                    { label: "AI Research Lab", desc: "Ready-to-run local AI modules like Face Detection, Object Detection, and Handwriting AI.", icon: "visibility" },
                    { label: "Developer Studio", desc: "Local Python Sandbox, Jupyter Lab Studio, and Scratch block coding for hands-on programming.", icon: "code" },
                    { label: "AI Training Lab", desc: "A visual local pipeline for students to collect custom data, train ML models, and evaluate offline.", icon: "model_training" },
                    { label: "Interactive Graphs", desc: "Learn data science by editing Python visualization scripts and rendering real-time charts.", icon: "bar_chart" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined text-base">{item.icon}</span>
                      </div>
                      <div>
                        <h5 className="font-bold text-[#1a1a2e] text-xs uppercase tracking-wider">{item.label}</h5>
                        <p className="text-[#1a1a2e]/50 text-[10px] leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Fixed Section (Thumbnail + Button) */}
              <div className="mt-auto pt-4">
                {/* Video Preview Thumbnail */}
                <div 
                  onClick={() => {
                    setActiveVideoUrl("/video/bharat_ai_1.mp4");
                    setActiveVideoTitle("Bharat AI 1.0 Version Overview");
                  }}
                  className="mb-6 relative aspect-video rounded-2xl overflow-hidden border border-black/5 hover:border-primary/30 shadow-sm cursor-pointer group/video z-10"
                >
                  <img 
                    src="/bharat_ai_1_thumb.png" 
                    alt="Bharat AI 1.0 Video Preview" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-2xl group-hover/video:scale-110 group-hover/video:bg-primary group-hover/video:text-[#1a1a2e] group-hover/video:border-transparent transition-all duration-300">
                      <span className="material-symbols-outlined text-3xl font-bold">play_arrow</span>
                    </div>
                  </div>
                  {/* Top-Left Bharat AI branding */}
                  <div className="absolute top-3 left-3 z-20 select-none bg-black/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/20">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white font-mono">BHARAT AI 1.0</span>
                  </div>
                  {/* Bottom-Left Watch badge */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5 z-20">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-[9px] font-black uppercase tracking-wider text-white">Watch Version Info</span>
                  </div>
                </div>

                {/* Professional Consultation Button */}
                <a 
                  href="https://wa.me/919860779172?text=Hello%2C%20I%20would%20like%20to%20request%20an%20official%20consultation%20for%20Bharat%20AI%201.0%20(Education%20Edition)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 rounded-xl bg-primary hover:bg-[#d42535] text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
                >
                  <span className="material-symbols-outlined text-base">forum</span>
                  Request Official Consultation
                </a>
              </div>
            </div>

            {/* Bharat AI 2.0 - Professional Edition */}
            <div className="group relative glass-premium p-8 rounded-[2.5rem] border border-black/5 hover:border-[#1e293b]/40 hover:shadow-[0_20px_50px_rgba(30,41,59,0.08)] bg-white/60 backdrop-blur-md transition-all duration-500 flex flex-col justify-between h-full overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1e293b]/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3.5 py-1 bg-[#1e293b]/10 border border-[#1e293b]/20 rounded-full text-[9px] font-black font-mono text-[#1e293b] uppercase tracking-widest">
                    Professional Edition
                  </span>
                  <span className="text-sm font-black font-mono text-[#1a1a2e]/30">V2.0</span>
                </div>
                
                <h3 className="font-headline text-2xl font-black text-[#1a1a2e] uppercase tracking-tight mb-2 group-hover:text-[#1e293b] transition-colors duration-300">
                  Bharat AI 2.0
                </h3>
                <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-[#1a1a2e]/50 mb-6 font-bold">
                  SIA Workspace System
                </h4>
                
                <p className="text-sm text-[#1a1a2e]/60 leading-relaxed mb-8 font-light">
                  Most suitable for <strong className="font-bold text-[#1a1a2e]">professionals, consultants, CAs, and firms</strong>. Empower teams with private local assistants to boost productivity and query knowledge bases with confidentiality.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { label: "Private AI (Local GPT)", desc: "Interact with private AI models locally without subscription fees or data leaks.", icon: "chat" },
                    { label: "Secure Document AI", desc: "Index and extract key details from internal PDF, Excel, and doc repositories.", icon: "description" },
                    { label: "Smart Q&A Node", desc: "Instant contextual answers backed strictly by local corporate documents.", icon: "quiz" },
                    { label: "Knowledge Retrieval", desc: "High-speed semantic search indexing for large institutional archives.", icon: "database" },
                    { label: "AI-Powered Drafting", desc: "Secure assistant to compose letters, reports, and code blocks in privacy.", icon: "edit_document" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1e293b]/5 border border-[#1e293b]/10 flex items-center justify-center text-[#1e293b] shrink-0">
                        <span className="material-symbols-outlined text-base">{item.icon}</span>
                      </div>
                      <div>
                        <h5 className="font-bold text-[#1a1a2e] text-xs uppercase tracking-wider">{item.label}</h5>
                        <p className="text-[#1a1a2e]/50 text-[10px] leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Fixed Section (Thumbnail + Button) */}
              <div className="mt-auto pt-4">
                {/* Booklet Preview Thumbnail */}
                <a 
                  href="/booklet_bharat_ai_2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-6 block relative aspect-video rounded-2xl overflow-hidden border border-black/5 hover:border-[#1e293b]/30 shadow-sm cursor-pointer group/video z-10"
                >
                  <img 
                    src="/bharat_ai_2_booklet_cover.png" 
                    alt="Bharat AI 2.0 Booklet Preview" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-2xl group-hover/video:scale-110 group-hover/video:bg-[#1e293b] group-hover/video:text-white group-hover/video:border-transparent transition-all duration-300">
                      <span className="material-symbols-outlined text-3xl font-bold">menu_book</span>
                    </div>
                  </div>
                  {/* Top-Left Bharat AI branding */}
                  <div className="absolute top-3 left-3 z-20 select-none bg-black/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/20">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white font-mono">BHARAT AI 2.0</span>
                  </div>
                  {/* Bottom-Left Download badge */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5 z-20">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                    <span className="text-[9px] font-black uppercase tracking-wider text-white">Download Booklet</span>
                  </div>
                </a>

                {/* Professional Consultation Button */}
                <a 
                  href="https://wa.me/919860779172?text=Hello%2C%20I%20would%20like%20to%20request%20an%20official%20consultation%20for%20Bharat%20AI%202.0%20(Professional%20Edition)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 rounded-xl bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
                >
                  <span className="material-symbols-outlined text-base">forum</span>
                  Request Official Consultation
                </a>
              </div>
            </div>

            {/* Bharat AI 3.0 - Enterprise Edition */}
            <div className="group relative glass-premium p-8 rounded-[2.5rem] border border-black/5 hover:border-emerald-500/40 hover:shadow-[0_20px_50px_rgba(16,185,129,0.08)] bg-white/60 backdrop-blur-md transition-all duration-500 flex flex-col justify-between h-full overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-black font-mono text-emerald-600 uppercase tracking-widest">
                    Industry Edition
                  </span>
                  <span className="text-sm font-black font-mono text-[#1a1a2e]/30">V3.0</span>
                </div>
                
                <h3 className="font-headline text-2xl font-black text-[#1a1a2e] uppercase tracking-tight mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                  Bharat AI 3.0
                </h3>
                <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-[#1a1a2e]/50 mb-6 font-bold">
                  Private AI Infrastructure Platform
                </h4>
                
                <p className="text-sm text-[#1a1a2e]/60 leading-relaxed mb-8 font-light">
                  Most suitable for <strong className="font-bold text-[#1a1a2e]">MNCs, industries, and government</strong>. A high-capacity cluster engineered for complete data sovereignty, air-gapped security, and specialized R&D facilities.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { label: "AI Automation Node", desc: "Automate complex enterprise pipelines offline using custom local triggers.", icon: "bolt" },
                    { label: "High-Speed AI Workflows", desc: "Multi-agent systems executing high-throughput queries concurrently.", icon: "insights" },
                    { label: "Custom Model Training", desc: "Securely fine-tune large models on local specialized server hardware nodes.", icon: "terminal" },
                    { label: "Private Analytics", desc: "Run intelligence synthesis over internal datasets with zero external sync.", icon: "assessment" },
                    { label: "Air-Gapped Security", desc: "Absolute privacy shielding for sensitive state or proprietary IP archives.", icon: "gpp_good" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                        <span className="material-symbols-outlined text-base">{item.icon}</span>
                      </div>
                      <div>
                        <h5 className="font-bold text-[#1a1a2e] text-xs uppercase tracking-wider">{item.label}</h5>
                        <p className="text-[#1a1a2e]/50 text-[10px] leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Fixed Section (Thumbnail + Button) */}
              <div className="mt-auto pt-4">
                {/* Video Preview Thumbnail */}
                <div 
                  onClick={() => {
                    setActiveVideoUrl("/video/bharat_ai_3.mp4");
                    setActiveVideoTitle("Bharat AI 3.0 Version Overview");
                  }}
                  className="mb-6 relative aspect-video rounded-2xl overflow-hidden border border-black/5 hover:border-emerald-500/30 shadow-sm cursor-pointer group/video z-10"
                >
                  <img 
                    src="/bharat_ai_3_thumb.png" 
                    alt="Bharat AI 3.0 Video Preview" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-2xl group-hover/video:scale-110 group-hover/video:bg-emerald-500 group-hover/video:text-white group-hover/video:border-transparent transition-all duration-300">
                      <span className="material-symbols-outlined text-3xl font-bold">play_arrow</span>
                    </div>
                  </div>
                  {/* Top-Left Bharat AI branding */}
                  <div className="absolute top-3 left-3 z-20 select-none bg-black/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/20">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white font-mono">BHARAT AI 3.0</span>
                  </div>
                  {/* Bottom-Left Watch badge */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5 z-20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[9px] font-black uppercase tracking-wider text-white">Watch Version Info</span>
                  </div>
                </div>

                {/* Professional Consultation Button */}
                <a 
                  href="https://wa.me/919860779172?text=Hello%2C%20I%20would%20like%20to%20request%20an%20official%20consultation%20for%20Bharat%20AI%203.0%20(Industry%20Edition)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 rounded-xl bg-primary hover:bg-[#d42535] text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
                >
                  <span className="material-symbols-outlined text-base">forum</span>
                  Request Official Consultation
                </a>
              </div>
            </div>
          </div>

          {/* Sleek Custom AI Builds & Consultation CTA block */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-6 p-6 sm:p-8 rounded-[2rem] border border-black/5 bg-white/50 backdrop-blur-md max-w-5xl mx-auto shadow-sm relative overflow-hidden">
              <div className="text-left space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-primary text-white text-[10px] font-mono font-black uppercase tracking-widest shadow-sm">
                    CUSTOM AI BUILDS AVAILABLE
                  </span>
                  <span className="text-[10px] font-mono text-[#1a1a2e]/40 font-bold uppercase">v1.0 · v2.0 · v3.0</span>
                </div>
                <h4 className="text-lg font-black text-[#1a1a2e] uppercase font-headline">Need Custom AI Builds or Help Choosing the Right Version?</h4>
                <p className="text-sm text-[#1a1a2e]/60 font-medium max-w-2xl">
                  We engineer tailored offline AI models, custom dataset training, and specialized hardware setups for Bharat AI 1.0, 2.0, and 3.0. Speak directly with our infrastructure team.
                </p>
              </div>
              <a
                href="https://wa.me/919860779172?text=Hello%2C%20I%20want%20to%20discuss%20Custom%20AI%20Builds%20for%20Bharat%20AI%20(1.0%20%2F%202.0%20%2F%203.0)"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-[#d42535] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-primary/25 shrink-0 flex items-center gap-2 whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-base">forum</span>
                Request Custom AI Build
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Section Divider */}
      <div className="w-full relative z-20 my-6">
        <div className="w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent h-[2px]"></div>
      </div>

      {/* ========== SECTION: GOVERNMENT ENDORSEMENT & VISION (Slide 19) ========== */}
      <div className="pt-24 pb-28 bg-[#090a10] text-white relative overflow-hidden">
        {/* Soft patriotic ambient backdrops */}
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[160px] pointer-events-none" />
        
        {/* Fine grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-20 space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-xs font-bold uppercase tracking-[0.2em] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              National Pride & Collaborations
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase font-headline">
              Government Partnerships & <span className="text-primary text-glow-red">Vision</span>
            </h2>
            <div className="w-36 h-[3px] bg-gradient-to-r from-orange-500 via-white to-emerald-500 mx-auto rounded-full mt-4" />
            <div className="pt-2 pb-1">
              <span className="inline-block italic text-[#FF9933] text-xl md:text-2xl font-serif font-semibold tracking-wide border-x border-[#FF9933]/30 px-6 py-1 bg-amber-500/5 rounded-lg">
                “On the mission to build Indigenous AI Infrastructure.”
              </span>
            </div>
            <p className="text-slate-400 text-lg font-light max-w-3xl mx-auto pt-1">
              Privileged to collaborate with senior governance nodes and education leaders to scale advanced technical learning facilities nationally.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-center text-left">
            
            {/* Left side text and awards */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-sm font-bold font-mono text-primary tracking-wider uppercase block">NATIONWIDE IMPACT</span>
                <h3 className="text-3xl md:text-4.5xl font-black text-white uppercase font-headline leading-none">
                  50,000+ <br />
                  <span className="text-slate-400">Students Impacted</span>
                </h3>
                <p className="text-slate-400 text-base leading-relaxed font-light pt-2">
                  AIR G International is in active discussions and operational deployments with state government departments, police forces, and CM secretariats to scale offline AI and electronics education frameworks.
                </p>
              </div>
              
              {/* Premium Gold Border Recognition Box */}
              <div className="relative rounded-[2rem] border border-amber-500/20 bg-amber-500/[0.02] p-8 space-y-4 overflow-hidden shadow-[inset_0_0_30px_rgba(245,158,11,0.02)]">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-400 text-2xl">workspace_premium</span>
                  <span className="text-xs font-mono text-amber-400 uppercase font-black tracking-widest block">Institutional Recognition</span>
                </div>
                <div className="space-y-3 border-l-2 border-amber-500/20 pl-4">
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">Ministry of Education</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Government of India</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">Hon. Education Minister of India</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Official Acknowledgment & Scaling Support</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {["Best AI Education Innovation", "EdTech Excellence", "National Innovation Award"].map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1.5 bg-[#1e293b] border border-slate-700 text-slate-300 text-[9px] sm:text-[10px] font-mono uppercase font-bold rounded-lg hover:border-primary/40 transition-colors duration-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side government photos - Structured like a prestigious gallery */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-6 md:gap-8">
              
              {/* Photo 1: DGP Discussion */}
              <div className="group relative rounded-[2.5rem] overflow-hidden border border-slate-800 hover:border-amber-500/30 shadow-2xl transition-all duration-500 bg-slate-900 aspect-[3/4]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#090a10] via-transparent to-transparent z-10 pointer-events-none" />
                <img 
                  src="/extracted-images/page_19_img_1_105.jpeg" 
                  alt="Government discussion with DGP Sadanand Date and Chief Minister OSD Chandrashekhar Vaze" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest">SECURITY COLLABORATION</div>
                  <h4 className="text-white font-extrabold text-sm md:text-base mt-0.5 leading-snug">Hon. Sadanand Date, DGP Maharashtra</h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">In discussion on state police & cyber-security infrastructure integrations.</p>
                </div>
              </div>

              {/* Photo 2: CM Devendra Fadnavis */}
              <div className="group relative rounded-[2.5rem] overflow-hidden border border-slate-800 hover:border-amber-500/30 shadow-2xl transition-all duration-500 bg-slate-900 aspect-[3/4]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#090a10] via-transparent to-transparent z-10 pointer-events-none" />
                <img 
                  src="/extracted-images/page_19_img_2_106.png" 
                  alt="Government consultation with Chief Minister Devendra Fadnavis" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest">GOVERNMENT BRIEFING</div>
                  <h4 className="text-white font-extrabold text-sm md:text-base mt-0.5 leading-snug">Hon. Devendra Fadnavis</h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">Reviewing the blueprint of Bharat AI Engine implementation for schools, institutes, and industries.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Visual Section Divider */}
      <div className="w-full relative z-20 my-6">
        <div className="w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent h-[2px]"></div>
      </div>

      {/* Why Build an AIR Lab */}
      <div className="pt-20 pb-24 bg-[#090a12] text-white relative overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        {/* Neon glow backdrops */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
        <div className="absolute -bottom-10 right-10 w-[300px] h-[300px] bg-red-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
          <div className="text-left mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              INNOVATION EDGE
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase font-headline">Why Partner With AIR G?</h2>
            <div className="w-32 h-[3px] bg-gradient-to-r from-primary to-[#ff4b5c] mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Future-Proof AI Curriculum",
                desc: "Integrate next-generation AI modules and edge-computing practices directly into your educational framework.",
                icon: "school"
              },
              {
                title: "Local Edge AI Compute",
                desc: "Provide students and researchers with the physical Bharat AI Engine to run local models without cloud dependency.",
                icon: "dns"
              },
              {
                title: "Indigenous AI Ecosystem",
                desc: "Convert existing computers into a local AI cluster, creating a sustainable tech ecosystem.",
                icon: "hub"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] hover:border-primary/40 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-primary/5 rounded-[2rem] p-10 transition-all duration-300 group text-left relative overflow-hidden"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/25 transition-all duration-300">
                  <span className="material-symbols-outlined text-3xl" style={{ color: '#eb0028' }}>{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-tight text-white font-headline">{feature.title}</h3>
                <p className="text-slate-300/80 leading-relaxed font-medium text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Section Divider */}
      <div className="w-full relative z-20 my-6">
        <div className="w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent h-[2px]"></div>
      </div>

      {/* ========== SECTION: THE SECURITY PROBLEM ========== */}
      <div className="pt-20 pb-24 bg-white relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-[0.2em]">
              THE SECURITY PROBLEM
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] tracking-tight uppercase font-headline">
              The AI Revolution Has a <span className="text-primary">Security Problem</span>
            </h2>
            <p className="text-[#1a1a2e]/55 text-lg font-medium max-w-3xl mx-auto">
              Organizations want AI power, but not at the cost of losing control of their data, privacy, and business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* The Old Way: Public AI Platforms */}
            <div className="bg-red-50/50 rounded-[2.5rem] border border-red-100 p-8 md:p-12 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-red-600 text-3xl">gpp_maybe</span>
                  <h3 className="text-2xl font-black text-red-900 uppercase font-headline">Public AI Platforms</h3>
                </div>
                <p className="text-red-700/80 text-sm font-medium mb-8">
                  Cloud-dependent platforms store, analyze, and use your sensitive data to train their models.
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Not User Data Oriented", desc: "Data is generalized, risking public leakage." },
                    { label: "Wrong or Generic Answers", desc: "Hallucinations and lack of specific institutional knowledge." },
                    { label: "Shared Data with Third Parties", desc: "No true boundaries for corporate or student privacy." },
                    { label: "Data Privacy at Risk", desc: "Cloud servers store chat logs and private uploads indefinitely." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <span className="material-symbols-outlined text-red-500 mt-0.5">cancel</span>
                      <div>
                        <h4 className="font-bold text-red-950 text-sm">{item.label}</h4>
                        <p className="text-red-700/70 text-xs font-light mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 p-5 rounded-2xl bg-red-100/50 border border-red-200 text-red-900 text-xs font-bold flex gap-3 items-center">
                <span className="material-symbols-outlined shrink-0 text-red-600">warning</span>
                <span>Warning: Your institutional documents may be crawled and exposed in future public training cycles.</span>
              </div>
            </div>

            {/* The New Way: Bharat AI Engine */}
            <div className="bg-[#1a1a2e] text-white rounded-[2.5rem] border border-[#2d2d4d] p-8 md:p-12 flex flex-col justify-between text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                  <h3 className="text-2xl font-black text-white uppercase font-headline">Bharat AI Engine</h3>
                </div>
                <p className="text-slate-300/80 text-sm font-medium mb-8">
                  Private. Secure. Yours. A fully on-premise localized AI infrastructure cluster.
                </p>
                <div className="space-y-4">
                  {[
                    { label: "100% Data Sovereignty", desc: "All data stays inside India, completely under your physical control." },
                    { label: "On-Premise Private AI Engine", desc: "Run powerful offline LLMs and pipelines with zero cloud reliance." },
                    { label: "Private & Secure by Design", desc: "Local documents and research data are encrypted and locked." },
                    { label: "Full Enterprise Control", desc: "Allows fine-tuning on custom databases without external leaks." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                      <div>
                        <h4 className="font-bold text-white text-sm">{item.label}</h4>
                        <p className="text-slate-400 text-xs font-light mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 p-5 rounded-2xl bg-[#252542] border border-[#3b3b61] text-xs font-bold flex gap-3 items-center">
                <span className="material-symbols-outlined shrink-0 text-primary">security</span>
                <span className="text-slate-200">Result: Absolute security. No data leaves. No compromise.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Section Divider */}
      <div className="w-full relative z-20 my-6">
        <div className="w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent h-[2px]"></div>
      </div>

      {/* ========== SECTION: BHARAT AI SPECIFICATIONS (Slide 17) ========== */}
      <div className="pt-20 pb-24 bg-[#f8f8fb] relative">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 z-10 relative">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left Content */}
            <div className="flex-1 text-left space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">
                // SYSTEM ARCHITECTURE
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] font-headline uppercase leading-tight">
                Inside the Bharat AI <span className="text-primary">Engine</span>
              </h2>
              <p className="text-[#1a1a2e]/65 text-base leading-relaxed font-light">
                An industrial-grade localized server node precision-built to run intensive artificial intelligence workflows on-premise without cloud latency, subscription fees, or data leak risks.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {[
                  { title: "Runs AI at the Edge", desc: "No internet required. Operates completely offline." },
                  { title: "SIA Workspace Pre-installed", desc: "Built-in private interface for chat, document analysis, and tools." },
                  { title: "Uses School/Office PCs", desc: "Leverage existing infrastructure via Gigabit MESH." },
                  { title: "128GB NVMe SSD", desc: "High-speed cache memory for localized large language models." },
                  { title: "Gigabit Ethernet Switch", desc: "Handles multiple high-bandwidth active query streams." },
                  { title: "Dual AI Cameras Included", desc: "For computer vision, face tracking, and live sensing labs." }
                ].map((spec, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0">check_circle</span>
                    <div>
                      <h4 className="font-bold text-[#1a1a2e] text-sm">{spec.title}</h4>
                      <p className="text-[#1a1a2e]/55 text-xs font-medium mt-0.5">{spec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image - Detailed Server closeup */}
            <div className="flex-1 w-full">
              <div className="rounded-[2.5rem] overflow-hidden border border-black/5 shadow-2xl relative bg-[#090a12] aspect-[4/3]">
                <img 
                  src="/extracted-images/bharat_ai_server.png" 
                  alt="Bharat AI Engine Hardware closeup" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Section Divider */}
      <div className="w-full relative z-20 my-6">
        <div className="w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent h-[2px]"></div>
      </div>

      {/* ========== SECTION: SIA INTERFACE SHOWCASE (Slides 15 & 16) ========== */}
      <div className="pt-20 pb-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left Column: SIA workspace preview image */}
            <div className="flex-1 w-full order-2 lg:order-1">
              <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative bg-[#090a12] aspect-[4/3]">
                <img 
                  src="/extracted-images/page_16_img_1_91.jpeg" 
                  alt="SIA Smart Intelligent Assistant Workspace login" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column: SIA Details */}
            <div className="flex-1 text-left space-y-6 order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                // PRIVACY-FIRST WORKSPACE (POWERED BY BHARAT AI)
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white font-headline uppercase leading-tight">
                SIA: Smart Intelligent <span className="text-primary text-glow-red">Assistant</span>
              </h2>
              <p className="text-slate-300/80 text-base leading-relaxed font-light">
                SIA is the secure, private AI application interface running locally inside the <strong>Bharat AI Engine</strong>. Powering secure, on-premise business and academic operations, SIA provides direct access to your secure AI workspace with 100% private models, end-to-end local encryption, and role-based clearance.
              </p>
              
              <div className="space-y-4 pt-4">
                {[
                  { label: "Local AI Server Connected", desc: "No connections, queries, or logs exit your local office building." },
                  { label: "Data Encryption Active", desc: "All system queries, vectors, and weights are encrypted locally." },
                  { label: "Organization Workspace Secured", desc: "Dedicated student and employee workspace hubs under total IT control." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0">check_circle</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">{item.label}</h4>
                      <p className="text-slate-400 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* B2B Partnership proposal form */}
      <div id="proposal-section" className="pt-16 pb-20 bg-white relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, rgba(238,44,60,0.12) 1px, transparent 1px), 
                            linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)`,
          backgroundSize: '24px 24px, 48px 48px, 48px 48px'
        }}></div>

        <div className="max-w-[900px] mx-auto px-6 relative z-10 text-left">
          <div className="border border-primary/10 bg-[#fafafa] backdrop-blur-sm p-10 md:p-16 rounded-[3.5rem] relative overflow-hidden shadow-xl shadow-primary/5 hover:border-primary/20 transition-all duration-300">


            <div className="mb-10 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a2e] tracking-tight uppercase font-headline mb-3">Partner With Us</h2>
              <p className="text-[#1a1a2e]/45 font-light text-sm md:text-base">Fill out the form below to request a customized proposal and lab blueprint for your campus.</p>
            </div>

            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-black text-[#1a1a2e] mb-2 uppercase font-headline">Request Received!</h3>
                <p className="text-[#1a1a2e]/50 font-light">Our partnership director will contact you within 24 hours to schedule a consultation.</p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-8 px-6 py-2 border border-black/10 rounded-lg hover:bg-black/5 transition-colors font-semibold uppercase text-xs tracking-wider text-[#1a1a2e]"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#1a1a2e]/35 uppercase tracking-wider block">Full Name</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-[#1a1a2e] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-bold text-sm" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#1a1a2e]/35 uppercase tracking-wider block">Institution / Company</label>
                    <input required type="text" value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-[#1a1a2e] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-bold text-sm" placeholder="University Name" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#1a1a2e]/35 uppercase tracking-wider block">Email Address</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-[#1a1a2e] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-bold text-sm" placeholder="john@university.edu" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#1a1a2e]/35 uppercase tracking-wider block">Phone Number</label>
                    <input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-[#1a1a2e] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-bold text-sm" placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-[#1a1a2e]/35 uppercase tracking-wider block">Additional Requirements (Optional)</label>
                  <textarea rows={4} value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3.5 text-[#1a1a2e] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-bold text-sm" placeholder="Tell us about your campus size, student count, or specific technology interests..." />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-[#d42535] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Request Proposal"
                  )}
                </button>
              </form>
            )}

            {/* Bottom Accent line */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
        </div>
      </div>

      </div>

      {/* Custom scrollbar hide utility */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => {
            setIsCheckoutOpen(false);
            setCheckoutItem(null);
          }}
          item={checkoutItem}
          type="product"
        />
      )}

      {/* PRINT-ONLY RECEIPT COMPONENT */}
      <div id="pdet-receipt-print-root" style={{ display: 'none' }}>
        <style dangerouslySetInnerHTML={{__html: `
          @page {
            size: A4;
            margin: 15mm;
          }
          @media print {
            #pdet-page-content-wrapper,
            nav,
            .print\\:hidden {
              display: none !important;
            }
            #pdet-receipt-print-root {
              display: block !important;
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              background: white !important;
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
            <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Advanced Artificial Intelligence Infrastructure</div>
            <div style={{ fontSize: '10px', color: '#666' }}>Official Setup & Integration Quotation</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#333' }}>ESTIMATE / QUOTATION</div>
            <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Date: {new Date().toLocaleDateString("en-IN")}</div>
          </div>
        </div>

        {/* Zone Tables */}
        {zones.map((zone, zIdx) => {
          const selectedItems = zone.items.filter(item => item.qty > 0);
          if (selectedItems.length === 0) return null;

          return (
            <div key={zIdx} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px', marginBottom: '16px', pageBreakInside: 'avoid' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#EE2C3C', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '8px' }}>
                System Module: {zone.name}
              </div>
              <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ccc' }}>
                    <th style={{ textAlign: 'left', paddingBottom: '6px', color: '#555', fontWeight: 600 }}>Equipment Item</th>
                    <th style={{ width: '60px', textAlign: 'center', paddingBottom: '6px', color: '#555', fontWeight: 600 }}>Qty</th>
                    <th style={{ width: '100px', textAlign: 'right', paddingBottom: '6px', color: '#555', fontWeight: 600 }}>Unit Price</th>
                    <th style={{ width: '110px', textAlign: 'right', paddingBottom: '6px', color: '#555', fontWeight: 600 }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item, iIdx) => (
                    <tr key={iIdx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '6px 0', color: '#333' }}>{item.name}</td>
                      <td style={{ padding: '6px 0', textAlign: 'center', color: '#444' }}>{item.isLot ? `${item.qty} Lot` : item.qty}</td>
                      <td style={{ padding: '6px 0', textAlign: 'right', color: '#444' }}>₹{formatCurrency(item.unitCost)}</td>
                      <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600, color: '#222' }}>₹{formatCurrency(item.qty * item.unitCost)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ textAlign: 'right', marginTop: '8px', fontSize: '12px', fontWeight: 700, color: '#333' }}>
                Subtotal: ₹{formatCurrency(calculateZoneTotal(zIdx))}
              </div>
            </div>
          );
        })}

        {/* ═══════ GRAND TOTAL ═══════ */}
        <div style={{ marginTop: '24px', borderTop: '3px solid #EE2C3C', paddingTop: '20px', pageBreakInside: 'avoid' }}>
          <table style={{ width: '100%', fontSize: '12px' }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, fontSize: '16px', color: '#111' }}>GRAND TOTAL COST</td>
                <td style={{ textAlign: 'right', fontWeight: 900, fontSize: '28px', color: '#EE2C3C', letterSpacing: '-1px' }}>
                  ₹{formatCurrency(calculateGrandTotal())}
                </td>
              </tr>
              <tr>
                <td style={{ color: '#888', fontSize: '10px' }}>All configured infrastructure options included</td>
                <td style={{ textAlign: 'right', color: '#888', fontSize: '10px' }}>Excludes local taxes & duties</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Terms & Footer */}
        <div style={{ marginTop: '24px', paddingTop: '12px', borderTop: '1px solid #eee', fontSize: '9px', color: '#999', pageBreakInside: 'avoid' }}>
          <div style={{ fontWeight: 700, color: '#555', marginBottom: '4px' }}>Terms & Conditions:</div>
          <div>1. This PDF estimate is generated based on selected lab customizations.</div>
          <div>2. Final pricing is subject to shipping, taxes, and installation logistics.</div>
          <div>3. Standard setup is fully managed and deployed by certified AIR G International engineers.</div>
          <div>4. Valid for 30 days from generation date.</div>
        </div>

        <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #eee', textAlign: 'center', fontSize: '9px', color: '#aaa' }}>
          <div>AIR G International — Designing, Building, and Empowering Industry 4.0 Ecosystems Globally.</div>
          <div style={{ marginTop: '2px' }}>For support or proposal requests, contact: support@airg.international</div>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          >
            <div className="relative w-full max-w-4xl bg-[#0b0f19] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-wider text-white">{activeVideoTitle}</span>
                <button 
                  onClick={() => setActiveVideoUrl(null)}
                  className="text-white/60 hover:text-white transition-colors cursor-pointer w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
              <div className="aspect-video w-full">
                <video 
                  src={activeVideoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 select-none"
          >
            <div className="relative w-full max-w-5xl bg-[#0b0f19] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col h-[85vh]">
              <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0">
                <span className="text-sm font-bold uppercase tracking-wider text-white">
                  Bharat AI 3.0 Photo Gallery ({activePhotoIdx + 1} of {BHARAT_AI_3_PHOTOS.length})
                </span>
                <button 
                  onClick={() => setIsGalleryOpen(false)}
                  className="text-white/60 hover:text-white transition-colors cursor-pointer w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
              
              <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden p-6">
                {/* Main Image */}
                <img 
                  src={BHARAT_AI_3_PHOTOS[activePhotoIdx]} 
                  alt={`Bharat AI 3.0 Photo ${activePhotoIdx + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-300"
                />

                {/* Navigation Arrows */}
                <button 
                  onClick={() => setActivePhotoIdx(prev => (prev === 0 ? BHARAT_AI_3_PHOTOS.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all border border-white/5"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button 
                  onClick={() => setActivePhotoIdx(prev => (prev === BHARAT_AI_3_PHOTOS.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all border border-white/5"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>

              {/* Thumbnails list at the bottom */}
              <div className="p-4 bg-[#070a10] border-t border-white/5 overflow-x-auto flex gap-3 justify-center shrink-0">
                {BHARAT_AI_3_PHOTOS.map((photo, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`relative w-20 aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      idx === activePhotoIdx ? "border-emerald-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
