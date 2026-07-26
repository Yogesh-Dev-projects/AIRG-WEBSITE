"use client";

import { Navbar } from "@/components/demo-navbar";
import { Footer } from "@/components/demo-footer";
import { motion } from "framer-motion";
import {
  Target,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Zap,
  Heart,
  Globe,
  Award,
  Users,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We constantly push the boundaries of what's possible in online education using AI and interactive tech.",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    icon: Heart,
    title: "Student Centric",
    description: "Every feature we build and every course we curate is designed with the student's success as the priority.",
    gradient: "from-rose-500 to-pink-500"
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "We believe quality education should be accessible to anyone, anywhere, regardless of their background.",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We don't settle for 'good enough'. We strive for the highest quality in our content and platform experience.",
    gradient: "from-violet-500 to-purple-500"
  }
];

const stats = [
  { label: "Active Students", value: "1M+" },
  { label: "Expert Instructors", value: "500+" },
  { label: "Free Courses", value: "1,200+" },
  { label: "Countries Reached", value: "150+" }
];

const timeline = [
  { year: "2024", title: "Founded", desc: "AIR G INTERNATIONAL was born with a mission to democratize tech education." },
  { year: "2024", title: "100K Students", desc: "Reached our first major milestone within 6 months of launch." },
  { year: "2025", title: "Global Expansion", desc: "Launched innovation hubs across 15 countries with local partnerships." },
  { year: "2026", title: "1M+ Community", desc: "Crossed one million active learners and 500+ expert instructors." },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-[#EE2C3C]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-20 text-center space-y-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-4 py-1.5 bg-[#EE2C3C]/10 text-[#EE2C3C] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
                Established 2024
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-[#1a1a2e] tracking-tight leading-[0.95]">
                Empowering the<br />
                <span className="text-[#EE2C3C]">Next Generation</span>
              </h1>
              <p className="text-lg md:text-xl text-[#1a1a2e]/50 max-w-2xl mx-auto mt-6 leading-relaxed font-light">
                AIR G INTERNATIONAL is more than just a learning platform. We are a global movement dedicated to making world-class technical education free and accessible to everyone.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex justify-center gap-4 flex-wrap">
              <Link href="/#learning" className="px-10 py-4 bg-[#EE2C3C] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all glow-red">
                Start Learning Now
              </Link>
              <Link href="/contact" className="px-10 py-4 border-2 border-[#1a1a2e]/10 text-[#1a1a2e]/60 font-bold text-xs uppercase tracking-widest rounded-xl hover:border-[#EE2C3C]/40 hover:text-[#EE2C3C] transition-all">
                Partner with Us
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-black/5 bg-[#f8f8fa] py-16">
          <div className="max-w-[1200px] mx-auto px-6 md:px-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center space-y-2"
                >
                  <p className="text-4xl md:text-5xl font-black text-[#EE2C3C] tracking-tight">{stat.value}</p>
                  <p className="text-[9px] font-black text-[#1a1a2e]/30 uppercase tracking-[0.3em]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-20 py-28">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
              <div className="h-16 w-16 rounded-2xl bg-[#EE2C3C]/10 text-[#EE2C3C] flex items-center justify-center">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] tracking-tight leading-tight">
                Our Mission is<br /><span className="text-[#EE2C3C]">Universal Mastery.</span>
              </h2>
              <p className="text-lg text-[#1a1a2e]/50 leading-relaxed font-light">
                In a world rapidly evolving with AI and technology, the gap between those who can build and those who cannot is widening. Our mission is to close that gap by providing high-quality, project-based learning tracks in AI, Robotics, Web Development, and more.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  { icon: ShieldCheck, label: "Verified Content" },
                  { icon: Zap, label: "AI-Powered Learning" },
                  { icon: Users, label: "Global Community" },
                  { icon: Rocket, label: "Rapid Upskilling" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#EE2C3C]/5 text-[#EE2C3C] flex items-center justify-center">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold text-[#1a1a2e]/70">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-[3rem] bg-gradient-to-br from-[#EE2C3C]/5 to-blue-500/5 border border-black/5 p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1a1a2e 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                <div className="relative text-center space-y-6">
                  <div className="h-20 w-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto border border-black/5">
                    <Users className="h-10 w-10 text-[#EE2C3C]" />
                  </div>
                  <h3 className="text-3xl font-black text-[#1a1a2e]">Together we grow.</h3>
                  <p className="text-sm text-[#1a1a2e]/40 font-medium">Join 1,000,000+ learners across the globe.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-[#f8f8fa] py-28">
          <div className="max-w-[1200px] mx-auto px-6 md:px-20">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] tracking-tight">Our <span className="text-[#EE2C3C]">Journey</span></h2>
              <p className="text-lg text-[#1a1a2e]/40 max-w-xl mx-auto font-light">From a bold idea to a global movement in record time.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute top-6 left-0 w-full h-[2px] bg-[#EE2C3C]/10 hidden md:block" />
                  <div className="relative bg-white p-8 rounded-2xl border border-black/5 shadow-sm hover:shadow-xl hover:border-[#EE2C3C]/20 transition-all group">
                    <div className="h-12 w-12 rounded-full bg-[#EE2C3C] text-white flex items-center justify-center text-xs font-black mb-6 group-hover:scale-110 transition-transform">
                      {item.year}
                    </div>
                    <h4 className="text-xl font-black text-[#1a1a2e] mb-2">{item.title}</h4>
                    <p className="text-sm text-[#1a1a2e]/40 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-20 py-28">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] tracking-tight">Values that <span className="text-[#EE2C3C]">define</span> us.</h2>
            <p className="text-lg text-[#1a1a2e]/40 max-w-xl mx-auto font-light">Our culture is built on core principles that guide how we build our platform and serve our community.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-black/5 hover:shadow-xl hover:border-[#EE2C3C]/20 transition-all group"
              >
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black text-[#1a1a2e] mb-3">{value.title}</h3>
                <p className="text-sm text-[#1a1a2e]/40 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-20 pb-28">
          <div className="rounded-[3rem] bg-[#1a1a2e] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                Be part of the <span className="text-[#EE2C3C]">Future</span>.
              </h2>
              <p className="text-lg text-white/40 max-w-2xl mx-auto font-light">
                We are always looking for passionate instructors, developers, and partners to join our mission.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="px-10 py-4 bg-[#EE2C3C] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all glow-red flex items-center gap-2">
                  Join the Team <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/careers" className="px-10 py-4 border border-white/20 text-white/70 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">
                  View Openings
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
