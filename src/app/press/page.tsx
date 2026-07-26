"use client";

import { Navbar } from "@/components/demo-navbar";
import { Footer } from "@/components/demo-footer";
import { motion } from "framer-motion";
import { Newspaper, Download, ExternalLink, Mail, FileText, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

const pressReleases = [
  {
    title: "AIR G INTERNATIONAL Reaches 1 Million Students Milestone",
    date: "April 24, 2024", location: "Bangalore",
    excerpt: "The platform's rapid growth highlights the global demand for free, high-quality technical education in the AI era."
  },
  {
    title: "Introducing the 'Challenge Zone': Gamified Learning at Scale",
    date: "April 15, 2024", location: "Silicon Valley",
    excerpt: "New features allow students to compete in real-time coding battles and earn verified skill badges."
  },
  {
    title: "Partnership Announced with Harvard CS50 for AI Open Access",
    date: "March 28, 2024", location: "Cambridge, MA",
    excerpt: "Strategic collaboration aims to bring world-class computer science curriculum to underserved regions."
  }
];

export default function PressPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-[#1a1a2e]">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-20 text-center space-y-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block px-4 py-1.5 bg-[#EE2C3C]/20 text-[#EE2C3C] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
                Newsroom
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">Press & Media</h1>
              <p className="text-lg text-white/40 max-w-2xl mx-auto mt-4 font-light">
                Official announcements, media assets, and resources for journalists.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 md:px-20 py-20">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Press Releases */}
            <div className="lg:col-span-2 space-y-10">
              <div className="flex items-center gap-3 mb-4">
                <Newspaper className="h-6 w-6 text-[#EE2C3C]" />
                <h2 className="text-2xl font-black text-[#1a1a2e]">Latest News</h2>
              </div>
              <div className="space-y-6">
                {pressReleases.map((release, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group p-8 rounded-2xl bg-white border border-black/5 hover:shadow-xl hover:border-[#EE2C3C]/20 transition-all cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="md:w-28 shrink-0 space-y-1">
                        <p className="text-[9px] font-black text-[#1a1a2e]/30 uppercase tracking-widest">{release.date}</p>
                        <p className="text-sm font-black text-[#EE2C3C]">{release.location}</p>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-black text-[#1a1a2e] leading-tight group-hover:text-[#EE2C3C] transition-colors">{release.title}</h3>
                        <p className="text-[#1a1a2e]/40 leading-relaxed font-light">{release.excerpt}</p>
                        <span className="text-[#EE2C3C] font-bold text-xs flex items-center gap-1">
                          Read Full Release <ExternalLink className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#f8f8fa] rounded-2xl p-8 space-y-6 border border-black/5">
                <h3 className="text-lg font-black text-[#1a1a2e] flex items-center gap-2">
                  <Download className="h-5 w-5" /> Media Kit
                </h3>
                <p className="text-sm text-[#1a1a2e]/40">Download official logos, brand guidelines, and high-res photos.</p>
                <div className="space-y-2">
                  {[
                    { icon: ImageIcon, label: "Brand Logos (.svg)" },
                    { icon: FileText, label: "Company Fact Sheet" },
                    { icon: ImageIcon, label: "Platform Screenshots" }
                  ].map((item, i) => (
                    <button key={i} className="w-full flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-black/5 text-sm font-bold text-[#1a1a2e]/60 hover:border-[#EE2C3C]/20 hover:text-[#EE2C3C] transition-all">
                      <item.icon className="h-4 w-4" /> {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#EE2C3C]/5 rounded-2xl p-8 space-y-4 border border-[#EE2C3C]/10">
                <h3 className="text-lg font-black text-[#1a1a2e] flex items-center gap-2">
                  <Mail className="h-5 w-5" /> Media Contact
                </h3>
                <p className="text-sm text-[#1a1a2e]/40">For interview requests or additional media information.</p>
                <div className="p-4 rounded-xl bg-white border border-[#EE2C3C]/10 text-center">
                  <p className="text-[9px] font-black text-[#1a1a2e]/30 uppercase tracking-widest mb-1">Email for Press</p>
                  <p className="font-bold text-[#EE2C3C]">press@airginternational.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured In */}
        <section className="bg-[#f8f8fa] py-20 border-t border-black/5">
          <div className="max-w-[1200px] mx-auto px-6 md:px-20 text-center">
            <p className="text-[9px] font-black text-[#1a1a2e]/30 uppercase tracking-[0.3em] mb-10">As Featured In</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-30">
              {["TechCrunch", "Wired", "Forbes", "The Verge", "Reuters"].map((name) => (
                <span key={name} className="text-2xl font-black text-[#1a1a2e]">{name}</span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
