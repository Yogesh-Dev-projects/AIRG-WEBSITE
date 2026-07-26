"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  UserCheck, 
  FileText, 
  Brain, 
  Bell, 
  Award, 
  CheckCircle2, 
  Clock, 
  Target 
} from "lucide-react";

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState("attendance");

  const tabs = [
    { id: "attendance", label: "Attendance", icon: UserCheck },
    { id: "assignments", label: "Assignments", icon: FileText },
    { id: "ai", label: "AI Recs", icon: Brain },
    { id: "notifications", label: "Updates", icon: Bell },
    { id: "certificates", label: "Awards", icon: Award },
  ];

  const content: Record<string, any> = {
    attendance: (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Attendance Overview</h3>
          <span className="text-primary font-bold">98.5% Total</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((day) => (
            <div key={day} className="bg-white/5 p-4 rounded-xl text-center border border-white/5">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">May 1{day}</p>
              <CheckCircle2 size={20} className="text-green-500 mx-auto" />
            </div>
          ))}
        </div>
        <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20 flex items-center gap-4">
           <Target className="text-primary" />
           <p className="text-sm font-medium text-slate-300">You are on track for the <span className="text-white font-bold">Gold Scholar</span> award this month!</p>
        </div>
      </div>
    ),
    assignments: (
      <div className="space-y-4">
        {[
          { title: "Neural Networks Intro", status: "Submitted", date: "2 days ago" },
          { title: "Advanced Web Physics", status: "Pending", date: "Due tomorrow" },
          { title: "AI Ethics Review", status: "Graded", date: "Score: 95/100" },
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/5">
            <div>
              <p className="font-bold mb-1">{item.title}</p>
              <p className="text-xs text-slate-400">{item.date}</p>
            </div>
            <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
              item.status === 'Submitted' ? 'bg-blue-500/20 text-blue-400' :
              item.status === 'Pending' ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'
            }`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    ),
    ai: (
      <div className="space-y-6">
        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
           <div className="flex items-center gap-3 mb-4 text-primary">
              <Brain size={24} />
              <h3 className="font-bold">Next Mission</h3>
           </div>
           <p className="text-sm text-slate-300 mb-6 leading-relaxed">
             Based on your progress in "AI Foundations", we recommend focusing on <span className="text-white font-bold">Linear Algebra for Robotics</span> next.
           </p>
           <button className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm">View Recommendation</button>
        </div>
      </div>
    ),
    notifications: (
      <div className="space-y-4">
        {[
          { msg: "New Live Class added for Saturday", type: "system" },
          { msg: "Trainer Sir commented on your assignment", type: "feedback" },
          { msg: "System maintenance at 02:00 AM", type: "alert" },
        ].map((n, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
            <div className={`w-2 h-2 rounded-full ${
              n.type === 'alert' ? 'bg-red-500' : 'bg-primary'
            }`} />
            <p className="text-sm font-medium">{n.msg}</p>
          </div>
        ))}
      </div>
    ),
    certificates: (
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
           <Award size={40} className="text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">No Certificates Yet</h3>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">Complete your first professional course to unlock your AIR G certification.</p>
      </div>
    )
  };

  return (
    <section id="students" className="py-32 relative overflow-hidden bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h4 className="text-primary font-bold tracking-[0.2em] text-[11px] mb-6 uppercase">Mission Control</h4>
          <h2 className="text-4xl lg:text-6xl font-heading font-bold tracking-tight mb-8">
            The Elite <span className="text-gradient">Student Dashboard</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Experience the future of educational management with our unified, AI-powered control center.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all border ${
                  activeTab === tab.id 
                  ? "bg-white/5 border-primary/30 text-white shadow-lg" 
                  : "bg-transparent border-transparent text-slate-500 hover:bg-white/2"
                }`}
              >
                <tab.icon size={20} className={activeTab === tab.id ? "text-primary" : ""} />
                <span className="font-bold text-sm">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div layoutId="tabIndicator" className="ml-auto w-1 h-5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#0F172A] rounded-[2.5rem] border border-white/5 p-10 min-h-[450px] shadow-2xl shadow-black/50"
            >
              <AnimatePresence mode="wait">
                 {content[activeTab]}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
