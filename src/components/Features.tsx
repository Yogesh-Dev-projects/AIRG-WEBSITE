"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const Features = () => {
  return (
    <section className="py-section-gap bg-obsidian-base">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row gap-24 items-center">
          <motion.div className="md:w-1/2 order-2 md:order-1">
            <div className="relative">
              <div className="absolute -inset-10 bg-electric-glow blur-3xl opacity-20"></div>
              <img 
                className="relative z-10 w-full aspect-video object-cover rounded-xl border border-glass-border shadow-2xl" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKI3-q7RAjFyDTVnKIdrRAhNClhWwqq7DN_lpIw663vkLWqsiHtDlXcO7x4i3oWVfG1WMMTn_n9r4vZHAH2UMJvrbTeQZD0BMTHW4EYaBsd7ZNh-U-wEcIqM8B0CT_xDpK1ymaLDQR5i6DIdIgEXLCSTAv86XoyjacFUU5xDNrIyQGm8Rzc4Mu-B10suVn32fs7o-16q72E-S9LQFLLCcUYY1VwTThHukVP65FCeEcLuEM5UOIR59jwo_RNeXTeuTDTDenY3DhTWBB"
                alt="Visionary Classroom"
              />
            </div>
          </motion.div>

          <motion.div className="md:w-1/2 order-1 md:order-2">
            <span className="font-mono text-xs text-secondary tracking-[0.3em] uppercase">Education 3.0</span>
            <h2 className="font-heading text-4xl md:text-6xl text-[#F5F5F7] mt-4 mb-8">Nurturing the Next Generation of Architects.</h2>
            <p className="font-body text-lg text-on-surface-variant mb-8 leading-relaxed">
              AIR G Classrooms redefine the pedagogical experience through immersive AR environments and direct-to-cloud cognitive tools. We are building the infrastructure for the minds that will manage the future world.
            </p>
            
            <ul className="space-y-4">
              {[
                "Adaptive AI Curriculums",
                "Holographic Prototyping Labs",
                "Global Peer-to-Peer Networks"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  className="flex items-center gap-3 text-white"
                >
                  <CheckCircle className="text-secondary w-5 h-5" />
                  <span className="font-body">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;


