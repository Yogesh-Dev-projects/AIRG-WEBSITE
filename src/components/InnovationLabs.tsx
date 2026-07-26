"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Rocket, Shield, Activity, Network } from "lucide-react";

const InnovationLabs = () => {
  return (
    <section className="py-section-gap bg-obsidian-base">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-24">
          <motion.h2 className="font-heading text-4xl md:text-6xl text-[#F5F5F7] mb-4">
            Interconnected Pillars
          </motion.h2>
          <motion.p className="text-on-surface-variant font-body text-lg max-w-xl mx-auto">
            A multi-modal system designed for total integration across industries.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="space-y-8">
            <motion.div className="glass-card p-10 flex flex-col justify-between h-[400px] group hover:border-accent transition-colors">
              <Brain className="w-12 h-12 text-secondary" />
              <div>
                <h3 className="font-heading text-2xl text-white mb-2">Neural Core</h3>
                <p className="text-on-surface-variant text-sm">The central cognitive hub processing billions of transactions per second across the global grid.</p>
              </div>
            </motion.div>
            
            <motion.div className="glass-card p-10 flex flex-col justify-between h-[300px] group hover:border-accent transition-colors">
              <Cpu className="w-12 h-12 text-secondary" />
              <div>
                <h3 className="font-heading text-2xl text-white mb-2">Fabrication</h3>
                <p className="text-on-surface-variant text-sm">Automated 3D micro-assembly at atomic scales.</p>
              </div>
            </motion.div>
          </div>

          {/* Column 2 (Tall) */}
          <motion.div className="glass-card rounded-xl overflow-hidden group p-0 flex flex-col">
            <div className="p-10">
              <Rocket className="w-12 h-12 text-secondary" />
              <h3 className="font-heading text-2xl text-white mb-2 mt-4">Orbital Uplink</h3>
              <p className="text-on-surface-variant text-sm">Low-latency satellite mesh ensuring permanent global connectivity for robotics units.</p>
            </div>
            <div className="flex-1 relative overflow-hidden">
              <img 
                className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT5knC_OZEq9UEczFmbwMbtOzBvQDrFjA7Ln-UMXsMVfWMaNjg7I7Gj2pXCekJJKmZ_wxf4Ls2s0Gj4nXYI1EOgLy_fGk70qJGXL56GFgXLqjsH-89vNHU7ltlV9c09XGjqxtOKH8a8bKZFM3tb2o8KPMltmEeqjoslThYHqxHo8hUbVx52mvE653T-VVlcoUJ-kvDKC-T6OLWdC0x8ycsGYK-sGcicwqpLXzctIDLKm1T-M7cC2JaPd-PoSpEYOsT1xXOn1YNHPEt"
                alt="Orbital Mesh"
              />
            </div>
          </motion.div>

          {/* Column 3 */}
          <div className="space-y-8">
            <motion.div className="glass-card p-10 flex flex-col justify-between h-[300px] group hover:border-accent transition-colors">
              <Shield className="w-12 h-12 text-secondary" />
              <div>
                <h3 className="font-heading text-2xl text-white mb-2">Hardened Shell</h3>
                <p className="text-on-surface-variant text-sm">End-to-end encryption with quantum-resistant physical security protocols.</p>
              </div>
            </motion.div>
            
            <motion.div className="glass-card p-10 flex flex-col justify-between h-[400px] group hover:border-accent transition-colors">

              <Activity className="w-12 h-12 text-secondary" />
              <div>
                <h3 className="font-heading text-2xl text-white mb-2">Ecosystem Sync</h3>
                <p className="text-on-surface-variant text-sm">Seamless cross-platform integration for unified fleet management and observation.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default InnovationLabs;

