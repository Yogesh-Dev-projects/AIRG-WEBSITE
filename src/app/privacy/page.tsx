"use client";

import { Navbar } from "@/components/demo-navbar";
import { Footer } from "@/components/demo-footer";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, FileText, Globe, Server, UserCheck } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: Eye, title: "1. Information We Collect",
    content: "We collect information you provide directly to us when you create an account, enroll in a course, or communicate with us. This includes your name, email address, learning progress, and device information used to access our services."
  },
  {
    icon: Lock, title: "2. How We Use Your Information",
    content: "We use your information to provide and improve our services, track your learning progress, issue certificates, personalize your experience through AI-powered recommendations, and communicate important updates about your courses."
  },
  {
    icon: Server, title: "3. Data Storage & Retention",
    content: "Your data is stored on secure, encrypted servers managed by industry-leading cloud providers. We retain your personal data only for as long as necessary to fulfill the purposes described in this policy, or as required by law."
  },
  {
    icon: ShieldCheck, title: "4. Data Security",
    content: "We implement industry-standard security measures including AES-256 encryption, TLS 1.3 for data in transit, regular security audits, and strict access controls to protect your personal information from unauthorized access."
  },
  {
    icon: Globe, title: "5. International Data Transfers",
    content: "If you access our services from outside India, your data may be transferred to and processed in India or other countries where our servers are located. We ensure appropriate safeguards are in place for all cross-border data transfers."
  },
  {
    icon: UserCheck, title: "6. Your Rights",
    content: "You have the right to access, correct, or delete your personal data at any time. You can manage most of these settings directly through your profile dashboard. You may also request a complete export of your data or opt-out of marketing communications."
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden bg-[#f8f8fa]">
          <div className="max-w-[900px] mx-auto px-6 md:px-20 text-center space-y-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="h-16 w-16 rounded-2xl bg-[#EE2C3C]/10 text-[#EE2C3C] flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-[#1a1a2e] tracking-tight">Privacy Policy</h1>
              <p className="text-[#1a1a2e]/40 mt-3 font-light">Last Updated: October 2024</p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-[900px] mx-auto px-6 md:px-20 py-20">
          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 rounded-2xl border border-black/5 bg-white hover:shadow-lg hover:border-[#EE2C3C]/10 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-[#EE2C3C]/5 text-[#EE2C3C] flex items-center justify-center shrink-0">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-black text-[#1a1a2e]">{section.title}</h2>
                </div>
                <p className="text-[#1a1a2e]/50 leading-relaxed font-light pl-[52px]">{section.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-[#EE2C3C]/5 p-8 rounded-2xl border border-[#EE2C3C]/10 text-center">
            <p className="font-bold text-[#1a1a2e]">Questions about your privacy?</p>
            <p className="text-[#1a1a2e]/40 mt-2 font-light">Contact our Data Protection Officer at <span className="text-[#EE2C3C] font-bold">privacy@airginternational.com</span></p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
