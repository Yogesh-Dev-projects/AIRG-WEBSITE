"use client";

import { Navbar } from "@/components/demo-navbar";
import { Footer } from "@/components/demo-footer";
import { motion } from "framer-motion";
import { Scale, CheckCircle2, AlertCircle, FileText, Ban, RefreshCcw } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: CheckCircle2, title: "1. Acceptance of Terms",
    content: "By accessing or using AIR G INTERNATIONAL's platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to update these terms at any time."
  },
  {
    icon: FileText, title: "2. User Conduct",
    content: "Users are responsible for maintaining the confidentiality of their account and password. You agree to use the platform only for lawful purposes and in a way that does not infringe the rights of others. Any form of harassment, hate speech, or disruptive behavior will result in immediate account suspension."
  },
  {
    icon: Scale, title: "3. Intellectual Property",
    content: "All course content, videos, materials, branding, and platform code provided on AIR G INTERNATIONAL are the intellectual property of AIR G INTERNATIONAL or its content providers and are protected by international copyright laws. Unauthorized reproduction is strictly prohibited."
  },
  {
    icon: RefreshCcw, title: "4. Refund & Cancellation Policy",
    content: "For premium courses, refund requests can be made within 7 days of purchase if less than 20% of the course has been completed. Free courses are provided as-is. Subscription cancellations take effect at the end of the current billing cycle."
  },
  {
    icon: Ban, title: "5. Prohibited Activities",
    content: "Users may not: reverse engineer any part of the platform, share account credentials with third parties, scrape or crawl content using automated tools, upload malicious code, or attempt to gain unauthorized access to other users' accounts or our servers."
  },
  {
    icon: AlertCircle, title: "6. Termination",
    content: "We reserve the right to terminate or suspend your account and access to the services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties."
  },
];

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden bg-[#f8f8fa]">
          <div className="max-w-[900px] mx-auto px-6 md:px-20 text-center space-y-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="h-16 w-16 rounded-2xl bg-[#EE2C3C]/10 text-[#EE2C3C] flex items-center justify-center mx-auto mb-6">
                <Scale className="h-8 w-8" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-[#1a1a2e] tracking-tight">Terms of Service</h1>
              <p className="text-[#1a1a2e]/40 mt-3 font-light">Effective Date: October 2024</p>
            </motion.div>
          </div>
        </section>

        {/* Warning Banner */}
        <section className="max-w-[900px] mx-auto px-6 md:px-20 pt-12">
          <div className="p-5 bg-amber-50 border border-amber-200/50 rounded-2xl flex gap-4 items-start">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 font-medium leading-relaxed">
              Please read these terms carefully before using our platform. By accessing or using our services, you agree to be bound by these terms.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-[900px] mx-auto px-6 md:px-20 py-12">
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

          <div className="mt-16 bg-[#f8f8fa] p-8 rounded-2xl border border-black/5 text-center space-y-3">
            <p className="font-bold text-[#1a1a2e]">Have questions about our terms?</p>
            <p className="text-[#1a1a2e]/40 font-light">Contact our legal team at <span className="text-[#EE2C3C] font-bold">legal@airginternational.com</span></p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
