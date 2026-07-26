"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover opacity-40" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQOJehfVe0UqdvBB0m2OrPgJryvCRvhqYqRL29zVNPBKWmZeVnePU3Unx7ryS2PzlwILJy2VUTe0xEP2-3udkGQLq9Y_MpcM9MOx4O4Q-Y0GvVS4oY552N_ddnd0kHE3ZHyKQ3aJJcD-7JOayJjcx0ScARpVeQpRWfvBeAoMsE2X4e2qHeB65NIc4l7iwRbOLc8SUM2Kg8k7WmuqKO9On3SCRLVK5m7aBOyUJpNXnUm39IT8DvfbvGg5lC1C2m8UMqTs3G9H6N8sj2"
          alt="Futuristic Laboratory"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] atmospheric-glow"></div>
      </div>

      <div className="relative z-10 text-center px-margin-mobile">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-heading text-4xl md:text-8xl text-[#F5F5F7] tracking-tighter uppercase mb-6 leading-none"
        >
          SECURE THE<br /><span className="text-glow">FUTURE.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="max-w-2xl mx-auto font-body text-lg md:text-xl text-on-surface-variant mb-12"
        >
          Architecting the intersection of human potential and autonomous intelligence. AIR G International defines the next era of global infrastructure.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <button className="btn-premium px-10 py-4 text-lg">
            Explore Ecosystem
          </button>
          <button className="btn-outline px-10 py-4 text-lg">
            View Vision
          </button>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-on-surface-variant"
      >
        <ChevronDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  );
};

export default Hero;

