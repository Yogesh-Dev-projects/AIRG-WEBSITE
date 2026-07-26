"use client";

import { useState } from "react";
import { Navbar } from "@/components/demo-navbar";
import { Footer } from "@/components/demo-footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, BookOpen, PlayCircle, ArrowRight, LifeBuoy,
  Zap, ShieldCheck, Globe, Trophy, Users, ExternalLink, ChevronDown, X
} from "lucide-react";
import Link from "next/link";

const faqs = [
  { id: "faq-1", question: "How do I start a course?", answer: "Browse our catalog, pick a path that interests you, and click 'Start Your Quest'. If you're not logged in, you'll be prompted to create an account.", category: "Getting Started" },
  { id: "faq-3", question: "Can I learn at my own pace?", answer: "Yes! All our courses are self-paced, allowing you to learn whenever and wherever it suits you.", category: "Getting Started" },
  { id: "faq-6", question: "Is there a mobile app?", answer: "Our website is fully responsive and works perfectly on all mobile browsers. We are currently developing a dedicated iOS and Android app, coming soon!", category: "Getting Started" },
  { id: "faq-7", question: "How do I reset my password?", answer: "You can reset your password by clicking 'Forgot Password' on the login page. We will send a reset link to your registered email address.", category: "Getting Started" },
  { id: "faq-2", question: "Are the certificates recognized?", answer: "Our certificates are verified by AIR G INTERNATIONAL and showcase your mastery of specific technical skills to potential employers.", category: "Course Materials" },
  { id: "faq-4", question: "How do I access transcripts?", answer: "Transcripts are available on the course detail page under the 'Description' section for most of our video content.", category: "Course Materials" },
  { id: "faq-13", question: "Are the courses legit?", answer: "Yes, 100%! All our courses are curated from world-class institutions. Every course is vetted for quality and accuracy.", category: "Course Materials" },
  { id: "faq-5", question: "Is there a student community?", answer: "Absolutely! You can join our Discord server or participate in the discussion forums. We have over 50,000 active students sharing their journey.", category: "Community & Support" },
  { id: "faq-10", question: "How do I contact a mentor?", answer: "Premium students have access to 1-on-1 mentor support. You can schedule a session through your student dashboard.", category: "Community & Support" },
  { id: "faq-11", question: "How long does support take?", answer: "Our typical response time is under 4 hours. Technical queries for premium students are usually answered within 30 minutes.", category: "Community & Support" },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const filteredFaqs = faqs.filter(faq => {
    const searchLower = searchQuery.toLowerCase().trim();
    if (!searchLower) return activeCategory ? faq.category === activeCategory : true;
    return faq.question.toLowerCase().includes(searchLower) || faq.answer.toLowerCase().includes(searchLower);
  });

  const categories = [
    { name: "Getting Started", icon: PlayCircle, color: "from-blue-500 to-cyan-500" },
    { name: "Course Materials", icon: BookOpen, color: "from-emerald-500 to-teal-500" },
    { name: "Community & Support", icon: Users, color: "from-violet-500 to-purple-500" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-[#EB0028]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[5%] left-[10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-20 text-center space-y-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EB0028]/10 text-[#EB0028] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
                <Zap className="h-3 w-3" /> Support Center
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-[#1a1a2e] tracking-tight leading-[0.95]">
                We&apos;re here to<br /><span className="text-[#EB0028]">guide</span> you.
              </h1>
              <p className="text-lg text-[#1a1a2e]/50 max-w-2xl mx-auto mt-6 font-light">
                Find answers, connect with experts, and master your learning journey.
              </p>
            </motion.div>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a1a2e]/30 h-5 w-5" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask a question or enter a keyword..."
                className="w-full h-16 pl-14 pr-6 rounded-2xl border border-black/5 shadow-xl bg-white text-lg focus:outline-none focus:border-[#EB0028]/30 transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Quick Actions + Category Cards */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-20 py-12">
          <div className="grid md:grid-cols-12 gap-6">
            {/* Quick Support */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-4 space-y-4">
              <div className="bg-[#EB0028] rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 bg-white/10 rounded-full blur-3xl" />
                <h3 className="text-xl font-black mb-4">Quick Support</h3>
                <p className="text-white/60 text-sm mb-6">Most used actions, just a click away.</p>
                <div className="space-y-2">
                  {[
                    { icon: ShieldCheck, label: "Reset Password" },
                    { icon: Globe, label: "Language Issues" },
                    { icon: Trophy, label: "Verify Certificate" },
                  ].map((item, i) => (
                    <Link key={i} href="/contact" className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-sm font-bold text-white/90 hover:bg-white/20 transition-all">
                      <item.icon className="h-4 w-4" /> {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Category Cards */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-8 grid sm:grid-cols-3 gap-4">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left group ${
                    activeCategory === cat.name
                      ? "border-[#EB0028] shadow-xl bg-[#EB0028]/5"
                      : "border-black/5 bg-white hover:shadow-lg hover:border-[#EB0028]/20"
                  }`}
                >
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform`}>
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-black text-[#1a1a2e]">{cat.name}</h4>
                  <p className="text-xs text-[#1a1a2e]/30 mt-1">View questions →</p>
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-[900px] mx-auto px-6 md:px-20 py-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-black text-[#1a1a2e] tracking-tight">
                {searchQuery ? `Results (${filteredFaqs.length})` : (activeCategory || "General Knowledge")}
              </h2>
              <p className="text-[#1a1a2e]/40 mt-1 font-light text-sm">
                {searchQuery ? `Matching "${searchQuery}"` : "The most frequent questions from our community."}
              </p>
            </div>
            {(searchQuery || activeCategory) && (
              <button onClick={() => { setSearchQuery(""); setActiveCategory(null); }}
                className="px-4 py-2 border border-black/10 rounded-xl text-xs font-bold text-[#1a1a2e]/50 hover:border-[#EB0028]/30 hover:text-[#EB0028] transition-all flex items-center gap-2">
                Clear Filters <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {filteredFaqs.length > 0 ? (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className={`border rounded-2xl transition-all ${openFaq === faq.id ? "border-[#EB0028]/20 shadow-lg bg-white" : "border-black/5 bg-white hover:border-[#EB0028]/10"}`}>
                    <button
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                      className="w-full text-left px-8 py-6 flex items-center justify-between"
                    >
                      <span className="font-bold text-[#1a1a2e] text-lg pr-4">{faq.question}</span>
                      <ChevronDown className={`h-5 w-5 text-[#1a1a2e]/30 shrink-0 transition-transform ${openFaq === faq.id ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === faq.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="px-8 pb-6">
                            <p className="text-[#1a1a2e]/50 leading-relaxed font-light">{faq.answer}</p>
                            <div className="mt-4 flex items-center gap-4 text-[9px] font-black text-[#EB0028] uppercase tracking-widest">
                              <span>{faq.category}</span>
                              <span className="h-1 w-1 bg-[#1a1a2e]/20 rounded-full" />
                              <button className="flex items-center gap-1 hover:underline">Was this helpful? <Zap className="h-3 w-3" /></button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center space-y-6 bg-[#f8f8fa] rounded-2xl border-2 border-dashed border-black/10">
                <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center mx-auto border border-black/5">
                  <LifeBuoy className="h-10 w-10 text-[#1a1a2e]/20" />
                </div>
                <h3 className="text-2xl font-black text-[#1a1a2e]">No results for &ldquo;{searchQuery}&rdquo;</h3>
                <p className="text-[#1a1a2e]/40 font-light max-w-md mx-auto">Try simpler keywords or contact our support team directly.</p>
                <div className="flex justify-center gap-4">
                  <Link href="/contact" className="px-8 py-3 bg-[#EB0028] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all flex items-center gap-2">
                    Ask Support <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button onClick={() => setSearchQuery("")} className="px-8 py-3 border border-black/10 text-[#1a1a2e]/50 font-bold text-xs uppercase tracking-widest rounded-xl hover:border-[#EB0028]/30 transition-all">
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* CTA */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-20 pb-28">
          <div className="rounded-[3rem] bg-[#1a1a2e] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Still stuck? No problem.</h2>
              <p className="text-lg text-white/40 max-w-2xl mx-auto font-light">
                Our community of 50,000+ students and technical mentors are ready to help you overcome any obstacle.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="px-10 py-4 bg-[#EB0028] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all glow-red">
                  Open a Ticket
                </Link>
                <button className="px-10 py-4 border border-white/20 text-white/60 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                  Discord Community <ExternalLink className="h-4 w-4" />
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
