"use client";

import { useState } from "react";
import { Navbar } from "@/components/demo-navbar";
import { Footer } from "@/components/demo-footer";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ExternalLink, Eye, X, BookOpen, Download, Sparkles, CheckCircle2 } from "lucide-react";

interface ProjectBook {
  id: string;
  grade: string;
  level: string;
  name: string;
  codeName: string;
  description: string;
  pdfUrl: string;
  fileSize: string;
  topics: string[];
  gradient: string;
  accentColor: string;
}

const projectBooks: ProjectBook[] = [
  {
    id: "class-6",
    grade: "Grade 6",
    level: "Level-6",
    name: "AIR G Utkarsha Level-6",
    codeName: "AIR G Utkarsha",
    description: "Foundational STEM & Robotics curriculum introducing basic electronics, block coding, sensors, and practical innovation projects for Class 6th students.",
    pdfUrl: "/docs/utkarsha-level-6.pdf",
    fileSize: "4.1 MB",
    topics: ["Basic Electronics", "Block Programming", "Sensors & Actuators", "Hands-on Projects"],
    gradient: "from-red-600/30 via-red-900/10 to-transparent",
    accentColor: "#EB0028"
  },
  {
    id: "class-7",
    grade: "Grade 7",
    level: "Level-7",
    name: "AIR G Prerana Level-7",
    codeName: "AIR G Prerana",
    description: "Intermediate Robotics and Smart Automation guide covering microcontrollers, IoT fundamentals, logic circuit design, and interactive prototypes for Class 7th students.",
    pdfUrl: "/docs/prerana-level-7.pdf",
    fileSize: "4.1 MB",
    topics: ["Microcontrollers", "Smart Automation", "IoT Fundamentals", "Circuit Logic"],
    gradient: "from-rose-600/30 via-rose-900/10 to-transparent",
    accentColor: "#E63946"
  },
  {
    id: "class-8",
    grade: "Grade 8",
    level: "Level-8",
    name: "AIR G Vistaar Level-8",
    codeName: "AIR G Vistaar",
    description: "Advanced Innovation Study course introducing AI algorithms, autonomous systems, embedded C/Python, and real-world engineering projects for Class 8th students.",
    pdfUrl: "/docs/vistaar-level-8.pdf",
    fileSize: "4.2 MB",
    topics: ["Autonomous Robotics", "AI & Data Basics", "Embedded Systems", "Capstone Projects"],
    gradient: "from-amber-600/30 via-red-900/10 to-transparent",
    accentColor: "#FF2E63"
  }
];

export default function ProjectCodesPage() {
  const [selectedPdf, setSelectedPdf] = useState<ProjectBook | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredBooks = activeFilter === "all" 
    ? projectBooks 
    : projectBooks.filter(b => b.id === activeFilter);

  return (
    <div className="min-h-screen bg-[#05050c] text-white flex flex-col font-sans selection:bg-[#EB0028] selection:text-white">
      {/* Header Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-white/5">
        {/* Background Ambient Glows & Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#EB0028]/15 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EB0028]/10 border border-[#EB0028]/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#EB0028]" />
            <span className="text-xs font-mono font-bold tracking-wider text-[#EB0028] uppercase">
              // OFFICIAL CURRICULUM & SYLLABUS PUBLICATIONS
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500"
          >
            PROJECT CODES
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-neutral-400 text-base md:text-lg leading-relaxed mb-10"
          >
            Access official AIR G Innovation Study books and curriculum publications for Grade 6th, 7th, and 8th. Click to view or download full PDF project handbooks.
          </motion.p>

          {/* Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-4"
          >
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === "all"
                  ? "bg-[#EB0028] text-white shadow-[0_0_25px_rgba(235,0,40,0.5)] scale-105"
                  : "bg-white/5 text-neutral-400 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              All Publications
            </button>
            <button
              onClick={() => setActiveFilter("class-6")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === "class-6"
                  ? "bg-[#EB0028] text-white shadow-[0_0_25px_rgba(235,0,40,0.5)] scale-105"
                  : "bg-white/5 text-neutral-400 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              AIR G Utkarsha Level-6
            </button>
            <button
              onClick={() => setActiveFilter("class-7")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === "class-7"
                  ? "bg-[#EB0028] text-white shadow-[0_0_25px_rgba(235,0,40,0.5)] scale-105"
                  : "bg-white/5 text-neutral-400 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              AIR G Prerana Level-7
            </button>
            <button
              onClick={() => setActiveFilter("class-8")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === "class-8"
                  ? "bg-[#EB0028] text-white shadow-[0_0_25px_rgba(235,0,40,0.5)] scale-105"
                  : "bg-white/5 text-neutral-400 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              AIR G Vistaar Level-8
            </button>
          </motion.div>
        </div>
      </section>

      {/* Books Display Section - Styled directly like Screenshot 4 */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full flex-1">
        <div className="space-y-24">
          {filteredBooks.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative bg-gradient-to-b from-[#0c0d1b] to-[#070712] border border-white/10 rounded-3xl p-6 md:p-12 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] group hover:border-[#EB0028]/40 transition-all duration-500"
            >
              {/* Background Accent Glow */}
              <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${book.gradient} blur-3xl pointer-events-none rounded-full`} />

              {/* Sub-header tag matching screenshot 4 */}
              <div className="mb-8">
                <p className="text-xs font-mono font-bold text-[#EB0028] tracking-widest uppercase mb-1">
                  // STANDARD SYLLABUS PROFILE
                </p>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
                  {book.grade.toUpperCase()} PUBLICATIONS
                </h2>
                <h3 className="text-xl md:text-2xl font-bold text-[#EB0028] mt-2">
                  {book.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* 3D Book Graphic Card Display (Centerpiece matching screenshot 4) */}
                <div className="lg:col-span-6 flex justify-center items-center py-4">
                  <div className="relative group/book cursor-pointer" onClick={() => window.open(book.pdfUrl, '_blank')}>
                    {/* Outer Glow */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#EB0028]/30 via-red-600/20 to-purple-600/30 rounded-3xl blur-2xl opacity-60 group-hover/book:opacity-100 transition duration-500" />
                    
                    {/* 3D Book Cover Frame */}
                    <div className="relative w-[280px] sm:w-[320px] h-[400px] sm:h-[440px] bg-[#0d0e1c] rounded-2xl border-2 border-red-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 flex flex-col justify-between overflow-hidden transform group-hover/book:scale-105 group-hover/book:-rotate-1 transition-all duration-500">
                      
                      {/* Grid Line overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(#EB0028_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

                      {/* Top Branding */}
                      <div className="relative z-10 text-center space-y-1 pt-2">
                        <p className="text-xs font-mono font-bold tracking-[0.2em] text-[#EB0028] uppercase">
                          AIR G LABS
                        </p>
                        <p className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                          OFFICIAL CURRICULUM
                        </p>
                      </div>

                      {/* Center Book Title Display */}
                      <div className="relative z-10 text-center my-auto py-6 px-4 bg-gradient-to-r from-red-950/40 via-red-900/60 to-red-950/40 border-y border-red-500/30 backdrop-blur-sm">
                        <p className="text-[10px] font-mono text-red-400 tracking-widest uppercase mb-1">
                          INNOVATION STUDY
                        </p>
                        <h4 className="text-2xl sm:text-3xl font-black tracking-tighter text-white uppercase leading-tight drop-shadow-md">
                          {book.codeName.replace("AIR G ", "")}
                        </h4>
                        <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-[10px] font-mono bg-[#EB0028]/30 border border-[#EB0028]/60 text-white font-bold">
                          {book.level}
                        </span>
                      </div>

                      {/* Cyber Atom / Circuit Diagram Icon */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                        <div className="w-48 h-48 border border-red-500/40 rounded-full animate-spin-slow flex items-center justify-center">
                          <div className="w-32 h-32 border border-dashed border-red-400/60 rounded-full" />
                        </div>
                      </div>

                      {/* Bottom Book Metadata */}
                      <div className="relative z-10 flex justify-between items-end text-[9px] font-mono text-neutral-400 border-t border-white/10 pt-3">
                        <div>
                          <p className="text-neutral-500">SUBJECT: ROBOTICS & AI</p>
                          <p className="text-neutral-500">TERM: ACADEMIC 2026</p>
                        </div>
                        <div className="px-2 py-1 rounded bg-[#EB0028]/20 border border-[#EB0028]/50 text-[#EB0028] font-bold">
                          ACTIVE
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details & CTA Column */}
                <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {book.name}
                    </h3>
                    <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  {/* Key Topics Badges */}
                  <div>
                    <p className="text-xs font-mono text-neutral-400 uppercase mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#EB0028]" /> Key Curriculum Modules:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {book.topics.map((t, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-neutral-300">
                          <CheckCircle2 className="w-3 h-3 text-[#EB0028]" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* PDF Specifications */}
                  <div className="flex items-center gap-6 py-2 text-xs font-mono text-neutral-400 border-y border-white/5">
                    <span>FORMAT: <strong className="text-white">OFFICIAL PDF</strong></span>
                    <span>SIZE: <strong className="text-white">{book.fileSize}</strong></span>
                    <span>ACCESS: <strong className="text-emerald-400">VERIFIED PUBLIC</strong></span>
                  </div>

                  {/* Action Buttons matching screenshot 4 */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href={book.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#EB0028] hover:bg-[#c90022] text-white font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(235,0,40,0.5)] transition-all duration-300 hover:scale-105 cursor-pointer active:scale-95"
                    >
                      <FileText className="w-5 h-5" />
                      VIEW {book.grade.toUpperCase()} BOOK (PDF)
                      <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
                    </a>

                    <button
                      onClick={() => setSelectedPdf(book)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-[#EB0028]" />
                      Quick Preview
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PDF Modal Viewer for Quick Preview */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedPdf(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[88vh] bg-[#0c0d1c] border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070712]">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#EB0028]" />
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      {selectedPdf.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono">
                      Official PDF Document Preview
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedPdf.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#EB0028] text-white font-bold text-xs uppercase tracking-wider hover:bg-red-700 transition"
                  >
                    Open in New Tab <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setSelectedPdf(null)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* PDF Embed Frame */}
              <div className="flex-1 bg-[#1a1a2e] relative">
                <iframe
                  src={`${selectedPdf.pdfUrl}#toolbar=1`}
                  className="w-full h-full border-0"
                  title={selectedPdf.name}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
