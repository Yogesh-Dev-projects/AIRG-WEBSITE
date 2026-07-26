"use client";

import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <motion.div className="space-y-8">
          <span className="font-mono text-xs text-secondary tracking-[0.3em] uppercase">The Intelligence Matrix</span>
          <h2 className="font-heading text-4xl md:text-6xl text-[#F5F5F7] leading-tight">Unified Autonomous Architecture.</h2>
          <p className="font-body text-lg text-on-surface-variant leading-relaxed">
            AIR G is not merely a technology company; it is the foundational layer for a post-scarcity civilization. Our integrated AI and robotics ecosystem operates at the edge of possibility, transforming physical labor and cognitive complexity into seamless digital harmony.
          </p>
          
          <div className="grid grid-cols-2 gap-8 pt-8">
            <div>
              <h4 className="text-3xl font-bold text-primary">99.9%</h4>
              <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Efficiency Gain</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-primary">2.4ms</h4>
              <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">System Latency</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="glass-card rounded-xl p-8 relative overflow-hidden group">
          <img 
            className="w-full h-96 object-cover rounded-lg brightness-75 group-hover:scale-110 transition-transform duration-700" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgY147Oy8p8vOZtekDgypHW1Lf2uBvBKI7ZsxWueKnwQCGKH7Na1QxOPb-DsjYd404MmSyepPF389Sex4bFJIOwa7hN_sVnXX9MMJuit-hpf800_H95GDIUIrC9kJ_NGXY_Sm-PCKuZWKm5Fwme3ZmtvJe8VF0_RKpsxOgrF4iZ6eLkqqq76c2NPmdaxEZElN0oOV5Iv8dcC71bofrWoU2VWDDL7YZmv321FqONe61vGJvHlZys1fe74HKiaNFOOkcT86EM6CzqcnY"
            alt="Robotic Hand Detail"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;


