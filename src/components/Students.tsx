"use client";

import { motion } from "framer-motion";
import { Users, Lightbulb, Target, Rocket, GraduationCap, Layout, Globe, Cpu } from "lucide-react";

const Students = () => {
  const activities = [
    { title: "STEM Innovation", icon: Lightbulb, desc: "Hands-on projects focused on solving real-world challenges." },
    { title: "Collaborative Labs", icon: Users, desc: "Dynamic team-based learning in high-tech environments." },
    { title: "Mission Projects", icon: Target, desc: "Goal-oriented technical missions to build core competency." },
    { title: "Future Ready", icon: Rocket, desc: "Mastering the digital skills needed for the next generation." },
  ];

  return (
    <section id="students" className="py-40 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          
          {/* Left: Content */}
          <div className="flex-1">
            <motion.h4 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-primary font-bold tracking-[0.4em] text-[10px] mb-8 uppercase"
            >
              The Student Experience
            </motion.h4>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-7xl font-heading font-bold tracking-tight mb-10 leading-[1.1]"
            >
              Innovation <br />
              <span className="text-gradient">Learning Hub</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-lg text-slate-400 mb-14 leading-relaxed font-medium"
            >
              Experience a new era of education where creativity meets technical mastery. Our student-centric environment is designed for inventors and future leaders.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               {activities.map((item, i) => (
                 <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                       <item.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* Right: Immersive Visual */}
          <div className="flex-1 w-full max-w-[650px]">
             <div className="relative aspect-square w-full rounded-[4rem] overflow-hidden border border-white/5 glass shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 opacity-60 group-hover:opacity-100" 
                  alt="Student Innovation" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-transparent opacity-80" />
                
                {/* Floating Overlay Card */}
                <div className="absolute bottom-12 left-12 right-12 p-8 glass rounded-[2.5rem] border border-white/10 shadow-2xl">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/40">
                         <GraduationCap size={28} />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Global Network</p>
                         <p className="text-xl font-bold">12,000+ Inventors</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Students;
