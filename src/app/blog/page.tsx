"use client";

import { Navbar } from "@/components/demo-navbar";
import { Footer } from "@/components/demo-footer";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

const featuredPost = {
  title: "The AI Revolution in the Classroom",
  excerpt: "How adaptive learning algorithms are creating personalized paths for millions of students worldwide, and why the human teacher is more important than ever.",
  author: "Dr. Sarah Chen",
  authorRole: "Chief AI Officer",
  date: "April 24, 2024",
  readTime: "8 min read",
  image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80"
};

const blogPosts = [
  {
    title: "The Future of AI in Education: Beyond the Hype",
    excerpt: "Exploring how Large Language Models are transforming the classroom and what it means for students and teachers.",
    category: "AI", author: "Dr. Sarah Chen", date: "April 24, 2024", readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80"
  },
  {
    title: "Why Project-Based Learning is the Key to Mastery",
    excerpt: "Learn why building real-world projects is more effective than passive video watching for long-term skill retention.",
    category: "Learning", author: "Marco Rossi", date: "April 22, 2024", readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
  },
  {
    title: "10 Next.js Features You Should Be Using Today",
    excerpt: "A deep dive into Server Actions, App Router optimizations, and the new metadata API.",
    category: "Web Dev", author: "Alex Rivera", date: "April 20, 2024", readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80"
  },
  {
    title: "Building Your First Robotics Project on a Budget",
    excerpt: "You don't need thousands of dollars to start in robotics. Here's a list of affordable components.",
    category: "Robotics", author: "James Wilson", date: "April 18, 2024", readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
  }
];

const categories = ["All", "AI", "Web Dev", "Robotics", "Learning", "Career"];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Featured Post */}
        <section className="relative pt-28 pb-20 overflow-hidden bg-[#f8f8fa]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#EE2C3C] text-white text-[9px] font-black uppercase tracking-widest rounded-full">Featured</span>
                  <span className="text-[#1a1a2e]/40 text-xs font-bold flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Trending</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-[#1a1a2e] tracking-tight leading-tight">
                  The <span className="text-[#EE2C3C]">AI Revolution</span> in the Classroom.
                </h1>
                <p className="text-lg text-[#1a1a2e]/50 leading-relaxed font-light">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-6 py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#EE2C3C]/10 border-2 border-[#EE2C3C]/20" />
                    <div>
                      <p className="font-bold text-sm text-[#1a1a2e]">{featuredPost.author}</p>
                      <p className="text-xs text-[#1a1a2e]/40">{featuredPost.authorRole}</p>
                    </div>
                  </div>
                  <span className="text-sm text-[#1a1a2e]/30 flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {featuredPost.date}</span>
                </div>
                <button className="px-8 py-4 bg-[#EE2C3C] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all glow-red flex items-center gap-2">
                  Read Full Story <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-xl border border-black/5">
                  <img src={featuredPost.image} alt="Featured" className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="sticky top-[80px] z-30 bg-white/90 backdrop-blur-md border-b border-black/5">
          <div className="max-w-[1200px] mx-auto px-6 md:px-20 py-4">
            <div className="flex items-center gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    cat === "All"
                      ? "bg-[#EE2C3C] text-white"
                      : "bg-[#f8f8fa] text-[#1a1a2e]/40 hover:bg-[#EE2C3C]/10 hover:text-[#EE2C3C]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-20 py-20">
          <div className="grid md:grid-cols-2 gap-12">
            {blogPosts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-black/5">
                  <img src={post.image} alt={post.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 text-[#1a1a2e] backdrop-blur-sm text-[9px] font-black uppercase tracking-widest rounded-full">{post.category}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-[9px] font-black text-[#1a1a2e]/30 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#1a1a2e] leading-tight group-hover:text-[#EE2C3C] transition-colors">{post.title}</h3>
                  <p className="text-[#1a1a2e]/40 leading-relaxed font-light">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#f8f8fa]" />
                      <span className="font-bold text-sm text-[#1a1a2e]/60">{post.author}</span>
                    </div>
                    <span className="text-[#EE2C3C] font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-20 text-center">
            <button className="px-10 py-4 border-2 border-[#1a1a2e]/10 text-[#1a1a2e]/50 font-bold text-xs uppercase tracking-widest rounded-xl hover:border-[#EE2C3C]/40 hover:text-[#EE2C3C] transition-all">
              Load More Articles
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
