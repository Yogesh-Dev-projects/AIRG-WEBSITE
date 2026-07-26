"use client";

import { Navbar } from "@/components/demo-navbar";
import { Footer } from "@/components/demo-footer";
import { motion } from "framer-motion";
import { Quote, Star, Play, Briefcase, GraduationCap, Zap, TrendingUp, Heart } from "lucide-react";
import Link from "next/link";

const stories = [
  {
    name: "Rohan Sharma", role: "AI Engineer at Google",
    story: "I started with zero knowledge of AI. The 'Class 10 AI Mastery' course on AIR G INTERNATIONAL gave me the foundations I needed. Now, I work at my dream company.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80",
    stats: "Moved from Sales to Tech"
  },
  {
    name: "Priya Patel", role: "Full Stack Developer",
    story: "As a student from a small town, I couldn't afford expensive bootcamps. AIR G's free courses on Next.js were a lifesaver. The project-based approach is real.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    stats: "Landed 3 Job Offers"
  },
  {
    name: "Amit Kumar", role: "Electronics Hobbyist",
    story: "The Robotics and Drone courses are incredible. I built my first autonomous drone using the materials provided here. The community support is amazing.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    stats: "Built 5 IoT Projects"
  }
];

const impactStats = [
  { icon: GraduationCap, val: "1M+", label: "Successful Grads" },
  { icon: Briefcase, val: "85%", label: "Salary Increase" },
  { icon: Zap, val: "5M+", label: "Hours Learned" },
  { icon: Heart, val: "98%", label: "Happy Students" },
];

export default function StudentStoriesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden bg-[#f8f8fa]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-20 text-center space-y-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block px-4 py-1.5 bg-[#EE2C3C]/10 text-[#EE2C3C] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
                Success Stories
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-[#1a1a2e] tracking-tight leading-[0.95]">
                Real <span className="text-[#EE2C3C]">Stories</span>, Real Impact.
              </h1>
              <p className="text-lg text-[#1a1a2e]/50 max-w-3xl mx-auto mt-6 leading-relaxed font-light">
                See how millions of students are using AIR G INTERNATIONAL to master new skills, build incredible projects, and transform their careers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Video Spotlight */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-20 -mt-8 mb-20">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-video max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-pointer border border-black/5">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" alt="Success Story"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-[#EE2C3C] text-white flex items-center justify-center shadow-2xl ring-8 ring-white/20 group-hover:scale-110 transition-transform">
                <Play className="h-8 w-8 fill-current" />
              </div>
            </div>
            <div className="absolute bottom-8 left-8 text-white space-y-2">
              <span className="px-3 py-1 bg-white text-[#1a1a2e] text-[9px] font-black uppercase tracking-widest rounded-full">Watch Featured Story</span>
              <h3 className="text-2xl font-black">&ldquo;AIR G changed my life.&rdquo;</h3>
              <p className="text-white/60 font-bold text-sm">— Maria S., Senior Developer</p>
            </div>
          </motion.div>
        </section>

        {/* Stories Grid */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-20 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl border border-black/5 hover:shadow-xl hover:border-[#EE2C3C]/20 transition-all overflow-hidden flex flex-col">
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, j) => (<Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />))}</div>
                      <Quote className="h-6 w-6 text-[#EE2C3C]/10" />
                    </div>
                    <p className="text-[#1a1a2e]/70 leading-relaxed">&ldquo;{s.story}&rdquo;</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-black/5 flex items-center gap-4">
                    <img src={s.avatar} alt={s.name} className="h-12 w-12 rounded-xl object-cover border border-black/5" />
                    <div>
                      <p className="font-black text-[#1a1a2e]">{s.name}</p>
                      <p className="text-xs text-[#1a1a2e]/40 font-medium">{s.role}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#EE2C3C]/5 px-8 py-4 flex items-center justify-between">
                  <span className="text-[9px] font-black text-[#EE2C3C] uppercase tracking-widest">{s.stats}</span>
                  <TrendingUp className="h-4 w-4 text-[#EE2C3C]" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Impact Numbers */}
        <section className="bg-[#f8f8fa] py-28">
          <div className="max-w-[1200px] mx-auto px-6 md:px-20 text-center space-y-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] tracking-tight">Our impact in <span className="text-[#EE2C3C]">Numbers</span>.</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {impactStats.map((st, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="space-y-3">
                  <div className="h-16 w-16 bg-white rounded-2xl shadow-sm border border-black/5 flex items-center justify-center mx-auto text-[#EE2C3C]">
                    <st.icon className="h-8 w-8" />
                  </div>
                  <p className="text-4xl font-black text-[#EE2C3C]">{st.val}</p>
                  <p className="text-[9px] font-black text-[#1a1a2e]/30 uppercase tracking-[0.3em]">{st.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-20 py-28">
          <div className="rounded-[3rem] bg-[#1a1a2e] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                Your success story<br />starts <span className="text-[#EE2C3C]">here</span>.
              </h2>
              <p className="text-lg text-white/40 max-w-2xl mx-auto font-light">
                Don&apos;t just watch from the sidelines. Join 1 million+ students who are already building their futures.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/#learning" className="px-10 py-4 bg-[#EE2C3C] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all glow-red">
                  Start Your Quest
                </Link>
                <button className="px-10 py-4 border border-white/20 text-white/60 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">
                  Share Your Story
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
