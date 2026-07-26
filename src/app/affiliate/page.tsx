"use client";

import { Navbar } from "@/components/demo-navbar";
import { Footer } from "@/components/demo-footer";
import { motion } from "framer-motion";
import { Percent, BarChart3, Wallet, ArrowRight, Globe } from "lucide-react";
import Link from "next/link";

const perks = [
  { icon: Percent, title: "High Commissions", desc: "Earn 30% on every premium course sale and subscription signup.", gradient: "from-emerald-500 to-teal-500" },
  { icon: BarChart3, title: "Real-time Tracking", desc: "Access our advanced dashboard to track your clicks, conversions, and earnings in real-time.", gradient: "from-blue-500 to-cyan-500" },
  { icon: Wallet, title: "Monthly Payouts", desc: "Get paid automatically every month via PayPal, Stripe, or direct bank transfer.", gradient: "from-violet-500 to-purple-500" },
];

const steps = [
  { step: "01", title: "Sign Up", desc: "Apply for our program and get your unique affiliate link in minutes." },
  { step: "02", title: "Promote", desc: "Share AIR G INTERNATIONAL with your audience through blog posts, social media, or email." },
  { step: "03", title: "Earn", desc: "When someone signs up through your link, we credit you the commission instantly." },
];

export default function AffiliatePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-[#1a1a2e]">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-[#EE2C3C]/10 rounded-full blur-[150px]" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-20 text-center space-y-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block px-4 py-1.5 bg-white/10 text-[#EE2C3C] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
                Partner with us
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[0.95]">
                Grow with <span className="text-[#EE2C3C]">Us</span>.
              </h1>
              <p className="text-lg text-white/40 max-w-2xl mx-auto mt-6 font-light leading-relaxed">
                Join our affiliate network and earn up to 30% commission on every student you refer to AIR G INTERNATIONAL.
              </p>
            </motion.div>
            <Link href="/contact" className="inline-block px-10 py-4 bg-[#EE2C3C] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all glow-red">
              Join Affiliate Program
            </Link>
          </div>
        </section>

        {/* Perks */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-20 py-28">
          <div className="grid md:grid-cols-3 gap-8">
            {perks.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-10 rounded-2xl bg-white border border-black/5 hover:shadow-xl hover:border-[#EE2C3C]/20 transition-all text-center group">
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform`}>
                  <p.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-[#1a1a2e] mb-4">{p.title}</h3>
                <p className="text-[#1a1a2e]/40 leading-relaxed font-light">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="bg-[#f8f8fa] py-28">
          <div className="max-w-[1200px] mx-auto px-6 md:px-20">
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] tracking-tight text-center mb-20">
              How it <span className="text-[#EE2C3C]">works</span>.
            </h2>
            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-8 left-[16%] w-[68%] h-[2px] bg-[#EE2C3C]/10" />
              {steps.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="text-center space-y-6 relative">
                  <div className="h-16 w-16 rounded-full bg-[#EE2C3C] text-white flex items-center justify-center mx-auto text-xl font-black shadow-lg ring-8 ring-[#f8f8fa]">
                    {s.step}
                  </div>
                  <h4 className="text-2xl font-black text-[#1a1a2e]">{s.title}</h4>
                  <p className="text-[#1a1a2e]/40 font-light">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-20 py-28">
          <div className="rounded-[3rem] bg-white p-12 md:p-20 border-2 border-dashed border-[#EE2C3C]/20 text-center space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
              <Globe className="h-64 w-64 text-[#1a1a2e]" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#1a1a2e] tracking-tight">
              Ready to start <span className="text-[#EE2C3C]">earning?</span>
            </h2>
            <p className="text-lg text-[#1a1a2e]/40 max-w-2xl mx-auto font-light">
              Join 5,000+ partners who are already helping us spread the word about free technical education.
            </p>
            <button className="px-10 py-4 bg-[#EE2C3C] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all glow-red flex items-center gap-2 mx-auto">
              Apply Now <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
