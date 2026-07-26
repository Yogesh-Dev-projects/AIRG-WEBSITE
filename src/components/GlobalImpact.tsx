"use client";

import { motion } from "framer-motion";

const GlobalImpact = () => {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
      <motion.h2 className="font-heading text-4xl md:text-6xl text-[#F5F5F7] mb-4">
        A Presence Without Borders
      </motion.h2>
      <motion.p className="text-on-surface-variant font-body text-lg max-w-2xl mx-auto mb-16">
        AIR G systems are currently operational in 142 countries, securing essential services for over 2 billion people.
      </motion.p>
      
      <motion.div className="glass-card w-full h-[600px] rounded-xl relative overflow-hidden flex items-center justify-center p-0">
        {/* Abstract Data Visualization Placeholder */}
        <div className="absolute inset-0 opacity-40">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKtFU87YrDZbSMPcZIiST5JD2WRtfbtCNFUCKyHf28aQ29l2cA9nBbxyZBFXDnE-jgqBV9muMebaUx_hwNDxfyEUOY8etWsFvdN1tGsTajdeih-NgOdCGBHlqSIsdv3wFKRefHxRr7TjO4CShTq4m4LauP8e1-xi5BifHULFSUymfWO-TLO16ommn8Qfq7qwnzMsTxEaavc_iExizd1e1t19eER6CuJeOpsV4MEllckLC1YowPZN9qXmDG5qN--0RH8nhzOqehBJV-"
            alt="Global Connectivity Map"
          />
        </div>
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-16 bg-black/40 backdrop-blur-md p-10 rounded-xl border border-glass-border">
          {[
            { label: "Nations", value: "142" },
            { label: "Units", value: "12M+" },
            { label: "Uptime", value: "100%" },
            { label: "Breaches", value: "0" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="font-mono text-[10px] uppercase text-on-surface-variant tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default GlobalImpact;

