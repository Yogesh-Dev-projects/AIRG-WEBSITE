"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BarChart, X, Info } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const CourseModal = ({ course, onClose }: { course: any; onClose: () => void }) => {
  const { addNotification } = useAppContext();
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleEnroll = () => {
    setIsEnrolling(true);
    setTimeout(() => {
      setIsEnrolling(false);
      addNotification(`Enrolled in ${course.title} successfully!`);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-2xl bg-[#0F172A] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl"
      >
        <div className="aspect-video w-full relative">
          <img src={course.image} className="w-full h-full object-cover" alt={course.title} />
          <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2 tracking-tight">{course.title}</h2>
              <p className="text-primary font-bold text-sm uppercase tracking-widest">{course.level}</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-xs font-bold">
               <Clock size={14} className="text-primary" />
               {course.duration}
            </div>
          </div>
          <p className="text-slate-400 mb-8 leading-relaxed">
            {course.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
            {course.modules.map((m: string, i: number) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {m}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleEnroll}
              disabled={isEnrolling}
              className="flex-1 btn-premium py-4 flex items-center justify-center gap-2"
            >
              {isEnrolling ? <span className="animate-pulse">Authorizing...</span> : "Enroll Now"}
            </button>
            <button className="flex-1 btn-outline py-4">Syllabus PDF</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CourseCard = ({ course, delay }: { course: any; delay: number }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        viewport={{ once: true }}
        className="glass rounded-[2.5rem] border border-white/5 p-8 group cursor-pointer hover:bg-white/[0.02] transition-all"
      >
        <div className="aspect-video rounded-3xl overflow-hidden mb-8 relative border border-white/5">
          <img src={course.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={course.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <button 
               onClick={(e) => { e.stopPropagation(); setIsDetailsOpen(true); }}
               className="w-12 h-12 bg-white text-slate-950 rounded-full flex items-center justify-center shadow-xl scale-90 group-hover:scale-100 transition-all"
             >
               <Info size={20} />
             </button>
          </div>
        </div>
        
        <div className="mb-6">
           <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{course.level}</span>
           <h3 className="text-2xl font-heading font-bold mt-2 tracking-tight">{course.title}</h3>
        </div>
        
        <div className="flex items-center justify-between text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-10">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-primary" />
            {course.duration}
          </div>
          <div className="flex items-center gap-2">
            <BarChart size={14} className="text-primary" />
            {course.complexity}
          </div>
        </div>

        <button 
          onClick={() => setIsDetailsOpen(true)}
          className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] transition-all hover:bg-white hover:text-slate-950"
        >
          Explore Level
        </button>
      </motion.div>

      <AnimatePresence>
        {isDetailsOpen && (
          <CourseModal course={course} onClose={() => setIsDetailsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

const Levels = () => {
  const courses = [
    { 
      title: "Core Fundamentals", 
      level: "Level 1", 
      complexity: "Beginner",
      duration: "8 Weeks", 
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=400",
      description: "Master the building blocks of modern technology. Focus on electronics, basic sensors, and logic.",
      modules: ["Basic Electronics", "Sensor Operations", "Micro-Controllers", "Foundation Coding"]
    },
    { 
      title: "Connectivity & IoT", 
      level: "Level 2", 
      complexity: "Intermediate",
      duration: "12 Weeks", 
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=400",
      description: "Step into the world of interconnected systems. Learn how devices communicate across the cloud.",
      modules: ["Multi-Sensor Integration", "Internet of Things", "Cloud Computing", "Project-Based Learning"]
    },
    { 
      title: "Robotics & Space Tech", 
      level: "Level 3", 
      complexity: "Advanced",
      duration: "16 Weeks", 
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400",
      description: "The peak of technical mastery. Build autonomous systems for terrestrial and space missions.",
      modules: ["Satellite Systems", "Rover Engineering", "Advanced Automation", "Elite Research"]
    },
  ];

  return (
    <section id="levels" className="py-40 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-3xl">
            <h4 className="text-primary font-bold tracking-[0.4em] text-[10px] mb-8 uppercase">Curriculum Architecture</h4>
            <h2 className="text-4xl lg:text-7xl font-heading font-bold tracking-tight">
              Progressive <span className="text-gradient">Learning Levels</span>
            </h2>
          </div>
          <button className="btn-outline px-10 py-4 uppercase tracking-[0.2em] text-[10px] font-black">View All Modules</button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {courses.map((course, i) => (
            <CourseCard key={i} course={course} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Levels;
