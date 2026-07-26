"use client";

import { useState } from "react";
import { Navbar } from "@/components/demo-navbar";
import { Footer } from "@/components/demo-footer";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", entityType: "School", entityName: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        alert("Failed to send message: " + data.error);
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <section className="max-w-[1200px] mx-auto px-6 md:px-20 py-28">
          <div className="grid gap-16 lg:grid-cols-2 items-start">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1.5 bg-[#EE2C3C]/10 text-[#EE2C3C] text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                  Get in Touch
                </span>
                <h1 className="text-5xl md:text-6xl font-black text-[#1a1a2e] tracking-tight leading-[0.95]">
                  Let&apos;s <span className="text-[#EE2C3C]">Connect</span>
                </h1>
                <p className="text-lg text-[#1a1a2e]/50 font-light">Have a question about a course or interested in partnership? We&apos;d love to hear from you.</p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail, title: "Email Us", detail: "airgdatalab@gmail.com" },
                  { icon: Phone, title: "Call Us", detail: "+91 9860779172" },
                  { icon: MapPin, title: "Visit Us", detail: "Air Guruji International, The Capital, 106, Baner - Pashan Link Rd, Baner, Pune, Maharashtra 411045" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-[#EE2C3C]/5 text-[#EE2C3C] flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1a1a2e] text-sm">{item.title}</p>
                      <p className="text-[#1a1a2e]/40 text-sm">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#EE2C3C]/5 p-6 rounded-2xl border border-[#EE2C3C]/10 flex gap-4">
                <MessageSquare className="h-5 w-5 text-[#EE2C3C] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-[#1a1a2e]">Quick Tip:</p>
                  <p className="text-sm text-[#1a1a2e]/40 font-light">Check our Help Center first — 80% of questions are answered there instantly!</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-white p-10 rounded-2xl border border-black/5 shadow-xl min-h-[500px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-[#1a1a2e]/40 uppercase tracking-widest">First Name</label>
                          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" required
                            className="w-full h-12 bg-[#f8f8fa] rounded-xl px-4 text-sm border border-black/5 focus:outline-none focus:border-[#EE2C3C]/30" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-[#1a1a2e]/40 uppercase tracking-widest">Last Name</label>
                          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" required
                            className="w-full h-12 bg-[#f8f8fa] rounded-xl px-4 text-sm border border-black/5 focus:outline-none focus:border-[#EE2C3C]/30" />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-[#1a1a2e]/40 uppercase tracking-widest">Entity Type</label>
                          <select name="entityType" value={formData.entityType} onChange={handleChange} required
                            className="w-full h-12 bg-[#f8f8fa] rounded-xl px-4 text-sm border border-black/5 focus:outline-none focus:border-[#EE2C3C]/30">
                            <option value="School">School</option>
                            <option value="Institute">Institute</option>
                            <option value="Industry">Industry</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-[#1a1a2e]/40 uppercase tracking-widest">Organization Name</label>
                          <input name="entityName" value={formData.entityName} onChange={handleChange} placeholder="e.g. Greenwood High" required
                            className="w-full h-12 bg-[#f8f8fa] rounded-xl px-4 text-sm border border-black/5 focus:outline-none focus:border-[#EE2C3C]/30" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-[#1a1a2e]/40 uppercase tracking-widest">Email</label>
                        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required
                          className="w-full h-12 bg-[#f8f8fa] rounded-xl px-4 text-sm border border-black/5 focus:outline-none focus:border-[#EE2C3C]/30" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-[#1a1a2e]/40 uppercase tracking-widest">Subject</label>
                        <input name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" required
                          className="w-full h-12 bg-[#f8f8fa] rounded-xl px-4 text-sm border border-black/5 focus:outline-none focus:border-[#EE2C3C]/30" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-[#1a1a2e]/40 uppercase tracking-widest">Message</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more..." required
                          className="w-full bg-[#f8f8fa] rounded-xl p-4 text-sm border border-black/5 focus:outline-none focus:border-[#EE2C3C]/30 min-h-[130px] resize-none" />
                      </div>
                      <button type="submit" disabled={isSubmitting}
                        className="w-full py-4 bg-[#EE2C3C] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all glow-red flex items-center justify-center gap-2 disabled:opacity-60">
                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6 py-12">
                      <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <h2 className="text-3xl font-black text-[#1a1a2e]">Message Sent!</h2>
                      <p className="text-[#1a1a2e]/40 font-light max-w-sm mx-auto">
                        Thank you for reaching out. Our team will review it and get back to you within 24 hours.
                      </p>
                      <button onClick={() => { setIsSubmitted(false); setFormData({ firstName: "", lastName: "", email: "", entityType: "", entityName: "", subject: "", message: "" }); }}
                        className="px-8 py-3 border border-black/10 text-[#1a1a2e]/50 font-bold text-xs uppercase tracking-widest rounded-xl hover:border-[#EE2C3C]/30 transition-all">
                        Send Another Message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
