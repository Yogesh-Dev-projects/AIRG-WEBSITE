"use client";

import { Navbar } from "@/components/demo-navbar";
import { Footer } from "@/components/demo-footer";
import { motion } from "framer-motion";
import { Users, Video, Zap, Award, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const benefits = [
  { icon: Users, title: "Reach Millions", desc: "Share your knowledge with a global community of over 1 million eager learners.", gradient: "from-blue-500 to-cyan-500" },
  { icon: Award, title: "Earn Revenue", desc: "Get paid for every student who enrolls in your premium content or mentorship sessions.", gradient: "from-emerald-500 to-teal-500" },
  { icon: Zap, title: "AI Tools", desc: "Use our proprietary AI tools to generate transcripts, quizzes, and course outlines in seconds.", gradient: "from-violet-500 to-purple-500" },
  { icon: ShieldCheck, title: "Build Authority", desc: "Establish yourself as a thought leader in the tech industry and grow your professional brand.", gradient: "from-amber-500 to-orange-500" },
];

const steps = [
  { step: "01", title: "Apply", desc: "Fill out our simple application and tell us about your expertise." },
  { step: "02", title: "Plan your course", desc: "Use our AI tools to outline your curriculum and define learning goals." },
  { step: "03", title: "Record & Upload", desc: "Upload your videos. Our system automatically handles transcripts and translations." },
  { step: "04", title: "Launch & Earn", desc: "Go live to 1M+ students and start earning revenue immediately." },
];

export default function InstructorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[5%] left-[10%] w-[400px] h-[400px] bg-[#EE2C3C]/5 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <span className="inline-block px-4 py-1.5 bg-[#EE2C3C]/10 text-[#EE2C3C] text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                  Teach the World
                </span>
                <h1 className="text-5xl md:text-7xl font-black text-[#1a1a2e] tracking-tight leading-[0.95]">
                  Turn your<br /><span className="text-[#EE2C3C]">Expertise</span><br />into Impact.
                </h1>
                <p className="text-lg text-[#1a1a2e]/50 leading-relaxed font-light max-w-lg">
                  Join AIR G INTERNATIONAL as an instructor and help us build the world's most accessible technical learning platform.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="px-10 py-4 bg-[#EE2C3C] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all glow-red">
                    Apply Now
                  </Link>
                  <button className="px-10 py-4 border-2 border-[#1a1a2e]/10 text-[#1a1a2e]/60 font-bold text-xs uppercase tracking-widest rounded-xl hover:border-[#EE2C3C]/40 hover:text-[#EE2C3C] transition-all">
                    View Guide
                  </button>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-[#EE2C3C] to-blue-600 p-1 shadow-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1475721027187-402ec7570490?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay" />
                  <div className="relative h-full flex items-center justify-center text-center text-white space-y-4">
                    <div>
                      <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">
                        <Video className="h-10 w-10" />
                      </div>
                      <h3 className="text-3xl font-black">10,000+ Instructors</h3>
                      <p className="text-white/60 font-bold mt-2">Already making an impact.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-20 py-28">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] tracking-tight">Why teach with <span className="text-[#EE2C3C]">Us?</span></h2>
            <p className="text-lg text-[#1a1a2e]/40 max-w-xl mx-auto font-light">We empower our instructors with cutting-edge technology and a massive audience.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-black/5 hover:shadow-xl hover:border-[#EE2C3C]/20 transition-all group">
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${b.gradient} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                  <b.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black text-[#1a1a2e] mb-3">{b.title}</h3>
                <p className="text-sm text-[#1a1a2e]/40 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process Steps + Application Form */}
        <section className="bg-[#f8f8fa] py-28">
          <div className="max-w-[1200px] mx-auto px-6 md:px-20">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-12">
                <h2 className="text-4xl font-black text-[#1a1a2e] tracking-tight leading-tight">
                  Your journey to<br /><span className="text-[#EE2C3C]">Expert</span> status.
                </h2>
                <div className="space-y-8">
                  {steps.map((s, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="text-4xl font-black text-[#EE2C3C]/15 leading-none">{s.step}</div>
                      <div>
                        <h4 className="text-xl font-black text-[#1a1a2e] mb-1">{s.title}</h4>
                        <p className="text-[#1a1a2e]/40 font-light">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-10 rounded-2xl border border-black/5 shadow-xl">
                <h3 className="text-2xl font-black text-[#1a1a2e] mb-2">Ready to Start?</h3>
                <p className="text-[#1a1a2e]/40 text-sm mb-8 font-light">Our instructor success team will reach out within 48 hours.</p>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-[#1a1a2e]/40 uppercase tracking-widest">First Name</label>
                      <input className="w-full h-12 bg-[#f8f8fa] rounded-xl px-4 text-sm border border-black/5 focus:outline-none focus:border-[#EE2C3C]/30" placeholder="John" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-[#1a1a2e]/40 uppercase tracking-widest">Last Name</label>
                      <input className="w-full h-12 bg-[#f8f8fa] rounded-xl px-4 text-sm border border-black/5 focus:outline-none focus:border-[#EE2C3C]/30" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-[#1a1a2e]/40 uppercase tracking-widest">Email</label>
                    <input className="w-full h-12 bg-[#f8f8fa] rounded-xl px-4 text-sm border border-black/5 focus:outline-none focus:border-[#EE2C3C]/30" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-[#1a1a2e]/40 uppercase tracking-widest">Your Expertise</label>
                    <select className="w-full h-12 bg-[#f8f8fa] rounded-xl px-4 text-sm border border-black/5 focus:outline-none focus:border-[#EE2C3C]/30">
                      <option>Web Development</option>
                      <option>Artificial Intelligence</option>
                      <option>Data Science</option>
                      <option>Design</option>
                    </select>
                  </div>
                  <button className="w-full py-4 bg-[#EE2C3C] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all glow-red flex items-center justify-center gap-2">
                    Submit Application <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
